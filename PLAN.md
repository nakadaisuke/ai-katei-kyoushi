# AI家庭教師 プロトタイプ設計プラン

## 0. このフェーズのゴール

**フェーズ1（完了）**: 単元を1つ（小3わり算）に絞り、「解説 → 演習 → ノート回答 → 採点＋途中式 → 分からなければAI個別再解説 → ヒント」という学習フロー全体を、実際に動くWebアプリとして通しで作った。保護者ダッシュボードも用意した。

**フェーズ2（完了）**: 4年生・5年生への展開を見据え、以下を拡張した。
- 学年選択 → 単元選択という入口に変更（`getAvailableGrades()`で実データのある学年のみ表示、他は「準備中」）
- 単元内フローを4段階「解説 → 練習問題（解説付き） → 簡単/普通/チャレンジ（同じく途中式は都度表示） → 章末小テスト（5問、全問終了後にまとめて結果表示）」に拡張
- 小学3年生の算数カリキュラムを12単元（実質13単元分、「倍の計算」はわり算単元に統合）すべて作成

- **対象外（引き続きスコープ外）**: 4年・5年生以降の学年、応用問題（受験問題）データの選定・組み込み、子ども自身の個別ログイン

## 1. 技術構成

| 要素 | 選択 | 理由 |
|---|---|---|
| フレームワーク | Next.js (App Router) + TypeScript | フロント・API Routesを一本化でき、Vercelにそのままデプロイ可能 |
| スタイリング | Tailwind CSS | 素早くレスポンシブなUIを組める |
| AI | Anthropic Claude API（サーバーサイドのRoute Handlerからのみ呼び出す） | APIキーをブラウザに露出させない |
| データ永続化 | Supabase (Postgres + Auth) | 保護者が別デバイスからアクセスするため、localStorageではなくサーバー側DBに学習履歴を持つ必要がある |
| 認証 | Supabase Auth（メール＋パスワード） | 保護者アカウントのみ発行。子どものプロファイルは保護者アカウント配下に作成（詳細は2章） |
| デプロイ | Vercel | ユーザー希望。API RoutesがそのままServerless Functionになる |

教材データ（解説・問題・正解・途中式）はユーザーごとに変わらない静的コンテンツなので、リポジトリ内TSファイルのまま管理する。Supabaseに置くのは「ユーザー・子どものプロファイル・学習履歴」のようなユーザー生成データのみ。

## 1.5 アカウント設計（ファミリーアカウント方式）

- 保護者がSupabase Auth（メール＋パスワード）でサインアップ／ログインする。**ログインするのは保護者アカウントのみ**。
- ログイン後、その保護者に紐づく「子どもプロファイル」を作成・選択できる（Netflixのプロファイル切替に近い）。
- 学習端末（子どもが使うタブレット等）でも、まず保護者アカウントでログインし、その後「今日勉強する子」のプロファイルを選ぶ。選んだプロファイルIDはUI上の状態として保持し、以降の採点結果はそのプロファイルに紐づけてSupabaseへ書き込む。
- 保護者は自分のスマホなど別デバイスから同じアカウントでログインし、子どもプロファイルごとの進捗を閲覧する。
- 子ども自身のパスワード管理は発生しない（対象が小学生〜中学生のため）。

### テーブル設計（Supabase / Postgres）

```sql
-- auth.users はSupabase Auth標準テーブル（保護者アカウント）

create table students (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  grade text not null,          -- 例: "小学3年"
  created_at timestamptz not null default now()
);

create table attempts (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students(id) on delete cascade,
  chapter_id text not null,      -- 例: "g3-division"
  problem_id text not null,
  student_answer text not null,
  correct boolean not null,
  used_hint_levels int not null default 0,
  requested_reexplain boolean not null default false,
  duration_ms int,
  created_at timestamptz not null default now()
);

create table chapter_progress (
  student_id uuid not null references students(id) on delete cascade,
  chapter_id text not null,
  completed_at timestamptz,
  primary key (student_id, chapter_id)
);
```

RLS（Row Level Security）方針：
- `students`: `parent_id = auth.uid()` の行のみ select/insert/update/delete 可能
- `attempts` / `chapter_progress`: `student_id in (select id from students where parent_id = auth.uid())` の行のみ操作可能
- これにより、保護者は自分の子どものデータにしかアクセスできない

将来的な拡張（今回は対象外）：子どもが個別ログインする方式にしたい場合、`students`テーブルに`auth_user_id`を追加し招待コードで紐付ける形に移行できる。

## 2. ディレクトリ構成（現状）

```
AI家庭教師/
  PLAN.md
  package.json
  next.config.ts
  supabase/
    migrations/
      0001_init.sql                # students / attempts / chapter_progress + RLS
      0002_add_is_quiz.sql         # attempts.is_quiz（章末小テストの回答を区別するフラグ）
  src/
    proxy.ts                        # 未ログイン時にlogin/signupへリダイレクト（Next.js 16でmiddleware.tsから改称）
    app/
      login/page.tsx                # 保護者ログイン
      signup/page.tsx               # 保護者サインアップ
      profiles/page.tsx             # 子どもプロファイル選択・作成（ログイン後の最初の画面）
      page.tsx                      # 学年選択画面（getAvailableGrades()を一覧表示、子どもの学年を強調）
      grade/[grade]/page.tsx        # 単元一覧（その学年の単元カード＋進捗バー）
      chapter/[chapterId]/page.tsx  # 学習画面（ChapterView本体をレンダリング）
      chapter/[chapterId]/ChapterView.tsx  # 学習フローの状態機械（後述）
      parent/page.tsx               # 保護者ダッシュボード（子どもプロファイル一覧）
      parent/[studentId]/page.tsx   # 保護者ダッシュボード詳細（進捗・苦手分析）
      api/
        hint/route.ts               # ヒント生成（段階的）
        reexplain/route.ts          # 分からないボタン→AIによる別アプローチの解説
    content/
      curriculum.ts                  # 全学年・全単元のレジストリ（getChapter/getChaptersByGrade/getAvailableGrades）
      chapters/g3-*.ts               # 学年・単元ごとのデータ本体（12ファイル、詳細は5.5節）
    lib/
      supabase/
        client.ts / server.ts / proxy.ts / database.types.ts
      ai/
        model.ts                    # AI_PROVIDER/AI_MODEL環境変数からモデルを返す（プロバイダー切替の唯一の場所）
        tutor.ts                    # generateHint / generateReexplanation
      progress.ts                   # attempts/chapter_progressの読み書き（Supabase経由）
      review.ts                     # pickReviewProblem（理解不足時の確認問題選定）
      quiz.ts                       # pickQuizProblems（章末小テストの出題選定）
      grading.ts                    # answer文字列の正規化・正誤判定
      types.ts                      # Chapter/Problem/ExplanationDiagram/ProblemFigureなど共有型
      constants.ts                  # ACTIVE_STUDENT_COOKIE
    components/
      ExplanationPanel.tsx / ExplanationDiagram.tsx
      ProblemView.tsx / QuizProblemView.tsx / QuizReview.tsx
      StepSolution.tsx / HintButton.tsx / MagnitudeBar.tsx / ProblemFigureView.tsx
      diagrams/GroupingDiagram.tsx / BarChartDiagram.tsx / TableDiagram.tsx
  .env.local.example                # NEXT_PUBLIC_SUPABASE_URL= / NEXT_PUBLIC_SUPABASE_ANON_KEY= / SUPABASE_SERVICE_ROLE_KEY= / AI_PROVIDER= / AI_MODEL= / ANTHROPIC_API_KEY=
```

## 3. 単元データモデル（`lib/types.ts` + `content/curriculum.ts`）

```ts
type Difficulty = "easy" | "normal" | "hard";

// 単元解説に添える図（例: わり算=grouping）。種類は単元追加のたびに増やす
type ExplanationDiagram = { kind: "grouping"; total: number; groups: number; label?: string };

// 表・棒グラフの読み取り問題に添える図（値が空欄の問題は"ア"などの文字を入れる）
type ProblemFigure =
  | { kind: "bar-chart"; unit: string; maxValue: number; yLabels: number[]; bars: { label: string; value: number }[] }
  | { kind: "table"; columns: string[]; rows: { label: string; cells: (string | number)[] }[] };

interface Problem {
  id: string;
  difficulty: Difficulty;
  question: string;
  answer: string;           // 正解（あまりは "4あまり2"、分数は "1/3" のような文字列表現も許容）
  steps: string[];          // 途中式・考え方を順に表示
  tags: string[];           // 苦手分析・確認問題選定用（例: "あまりの扱い", "文章題"）
  figure?: ProblemFigure;   // 表・棒グラフが必要な問題にのみ付与
}

interface Chapter {
  id: string;               // 例: "g3-division"
  grade: string;            // 例: "小学3年"
  title: string;            // 例: "わり算"
  explanation: {
    summary: string;
    keyPoints: string[];
    diagram?: ExplanationDiagram;
    notebookExample?: { question: string; lines: string[] };  // ノートの書き方の実例
  };
  practiceProblems: Problem[];    // 解説付き練習（3〜4問、代表パターンを1問ずつ）
  assessmentProblems: Problem[];  // 簡単→普通→チャレンジの順
}
```

`content/curriculum.ts`が全学年・全単元を集約するレジストリ：`chapters: Chapter[]`、`GRADE_ORDER`（小学1〜6年・中学1〜3年）、`getChapter(chapterId)` / `getChaptersByGrade(grade)` / `getAvailableGrades()`（実データのある学年のみGRADE_ORDER順に返す）。各`content/chapters/g3-*.ts`はそのファイル冒頭のコメントに出典（宮城県教育センター／すたぺんドリル等）を明記する。

採点はAIを使わず、`answer`との厳密比較（`lib/grading.ts`で表記ゆれ・全角数字などを正規化して吸収）で行う。AIは「ヒント」と「個別再解説」にのみ使う。

## 4. 学習フロー（画面遷移）

```
[ログイン / サインアップ]（保護者アカウント、Supabase Auth）
        ▼
[プロファイル選択]（子どもプロファイルを作成 or 選択）
        ▼
[学年選択]（getAvailableGrades()を一覧表示。子どもの学年をハイライト、データが無い学年は「準備中」）
        ▼
[単元一覧]（その学年の単元カード＋進捗バー）
   └ 単元カードをクリック
        ▼
[学習画面（ChapterView）]
  1. 解説パネル（要点＋具体例＋必要に応じて図・ノートの書き方の例）
        ▼
  2. 練習問題（解説付き、3〜4問）
     - 画面には問題文（＋表/グラフがあれば図）のみ。生徒はノートで計算
     - 回答送信 → 正誤に関わらず「途中式」を都度開示
     - ボタン：「わかった／次へ」「よく分からない」（→AI個別再解説、後述）
        ▼
  3. 簡単→普通→チャレンジ問題（同じく回答ごとに途中式を都度開示。フロー自体は2と同じ、練習との違いは
     「解説」枠の外に出て自力で解く位置づけという点のみ）
        ▼
  4. 章末小テスト（5問、`pickQuizProblems`で難易度バランスよく出題）
     - 都度の正誤・途中式・ヒント・AI再解説は出さない（テスト形式）
        ▼
  5. 小テスト結果画面（quiz-review）
     - 5問分の自分の回答・正誤を一覧表示、不正解のみ途中式を開示
     - スコアと合格ライン（80%）バッジを表示
     - 「学習マップに戻る」→ 学年選択画面へ（chapter_progress.completed_atはこの時点で更新済み）
```

各問題画面（練習・簡単/普通/チャレンジ）には常時「ヒント」ボタンを表示。押すたびに段階的にヒントが強くなる：
1回目＝着眼点、2回目＝使う公式、3回目＝最初の1ステップ。ヒントもClaude APIで生成するが、公式解答は絶対に含めないようプロンプトで制約する。章末小テストのみ、テスト形式を保つためヒント・AI再解説は提供しない。

2問目以降には「← 前の問題に戻る」リンクも表示する（`ProblemView`/`QuizProblemView`の`onBack`props）。練習・簡単/普通/チャレンジの画面では、答え合わせ後（結果表示中）は非表示にし、「わかった・次へ」の流れを優先させる。章末小テスト・マイルストーンテスト・卒業テストでも同様に戻れるが、戻った問題を解き直すと、結果一覧（`quizResults`）ではその位置の結果を最新の回答で置き換える（重複エントリを防ぐため、戻った時点で該当位置以降の結果を切り詰めてから再提出を待つ）。

## 5. AI呼び出し設計

AI呼び出しは [Vercel AI SDK](https://sdk.vercel.ai/)（`ai` + `@ai-sdk/anthropic`）経由で行い、`@anthropic-ai/sdk`を直接は呼ばない。理由：将来別プロバイダー（OpenAI等）に乗り換える際、`generateText({model, system, prompt})`という呼び出し形はそのままに、`src/lib/ai/model.ts`の`getModel()`内のswitch文にケースを1つ足し、`AI_PROVIDER`/`AI_MODEL`環境変数を変えるだけで切り替えられるようにするため。

```
src/lib/ai/
  model.ts   # AI_PROVIDER/AI_MODEL環境変数からLanguageModelを返す（プロバイダー切り替えの唯一の場所）
  tutor.ts   # generateHint / generateReexplanation（ハルシネーション対策込み、プロバイダーに依存しない）
```

乗り換え例（OpenAIに変える場合）：
1. `npm install @ai-sdk/openai`
2. `model.ts`に `case "openai": return openai(MODEL_ID);` を追加
3. `.env.local`で `AI_PROVIDER=openai` `AI_MODEL=gpt-4o-mini` `OPENAI_API_KEY=...` を設定

### `POST /api/hint`
```ts
Request:  { problemId: string; hintLevel: 1 | 2 | 3 }
Response: { hint: string }
```
プロンプトには問題文・想定解法の要点（steps）を渡し、「hintLevelに応じた強さのヒントのみ返す。最終的な答えの数値は書かない」という制約を明記する。

### `POST /api/reexplain`
```ts
Request:  { chapterId: string; problemId?: string; priorAttempts: {question:string; studentAnswer:string; correct:boolean}[] }
Response: { explanation: string }
```
元の解説文とは異なるアプローチ（比喩・図解の言葉での説明）を生成するよう指示。学年相応の語彙に絞るようプロンプトで指定。

両エンドポイントとも `ANTHROPIC_API_KEY` 未設定時は500エラーではなく、分かりやすいメッセージを返して画面側でフォールバック文言を表示する。

## 5.5 ハルシネーション対策

このアプリには2種類のAI関連コンテンツがあり、対策が異なる。

**(A) 教材データ（問題文・正解・途中式）は、AIに生成させず実在の教材から採用する。**
小学3年生の全12単元（実質13単元分、下表）は、以下の2つの実在教材の設問・解答をもとに作成している（各ファイル冒頭のコメントに出典を明記）。文部科学省の学習指導要領とも整合を確認済み。
- **宮城県教育センター**「わくわくワーク」小学3年算数（`00.els3.kaitou.all.pdf`、全73ページ、教員向け解答付き）。ほぼ全単元をカバーしており主要な出典。
- **すたぺんドリル**（startoo.co）小3算数。分量が必要な単元の補完・裏取りに使用。**同サイトの利用規約は「本サービスを商業的に利用する行為」を禁止行為として明記しているため、現状は個人利用の範囲でのみ採用している。本アプリを配布・商用化する場合は、該当箇所を差し替えるか、サイト運営元に別途許諾を得る必要がある。**
- **埼玉県「学力向上ワークシート」算数**（pref.saitama.lg.jp）・**大阪府「小学校算数・ワークブック」**（pref.osaka.lg.jp）小3算数。問題数を各単元20〜30問程度まで拡充する際に追加採用。**いずれも著作権ページに教育目的の一律利用許可の記載はなく、標準の著作権が適用されるため、すたぺんドリルと同じ「個人利用の範囲で使用し、商用化・配布前に見直す」caveatを踏襲する。**

| ファイル | 単元 | 問題数 |
|---|---|---|
| `g3-division.ts` | わり算 | 27 |
| `g3-multiplication-written.ts` | かけ算の筆算 | 27 |
| `g3-time.ts` | 時こくと時間のもとめ方 | 27 |
| `g3-addition-subtraction-written.ts` | たし算とひき算の筆算 | 29 |
| `g3-large-numbers.ts` | 大きい数 | 29 |
| `g3-length-weight.ts` | 長さと重さ | 29 |
| `g3-circle-sphere.ts` | 円と球 | 24 |
| `g3-decimals.ts` | 小数 | 29 |
| `g3-fractions.ts` | 分数 | 25 |
| `g3-expressions-with-box.ts` | □を使った式 | 26 |
| `g3-bar-graphs.ts` | 棒グラフと表 | 24 |
| `g3-triangles.ts` | 二等辺三角形・正三角形 | 26 |

「倍の計算（何倍でしょうか）」は独立単元としては教科書に存在せず、わり算の文章題（タグ「文章題」）の一部として扱っている。

今後、4年・5年生の単元を追加する際も、AIに問題を自由生成させるのではなく、教科書・教育委員会等が公開する実在の問題を出典付きで採用する方針とする。ただし出典が商用利用不可のサイトの場合は、上記と同様に注記し、配布前に見直す。

**(B) 実行時にAIが動的生成するのは「ヒント」と「個別再解説」のみで、これらは常に検証済みデータ（`problem.answer` / `problem.steps`）を根拠として渡し、AI自身に計算をやり直させない。**
- `generateHint`（`src/lib/ai/tutor.ts`）: プロンプトに正解と想定手順を明示した上で「これを言い換えるだけ」と指示し、生成後に`leaksAnswer()`で正解の数値が本文に混入していないか機械的にチェックする。混入していた場合、またはAPI呼び出しが失敗した場合は、あらかじめ用意した安全な定型ヒントに差し替える。
- `generateReexplanation`: 対象の問題の`steps`・`answer`を必ずプロンプトに含め、「検証済みの解き方と矛盾しないこと」「自分で新しい計算をしないこと」を明示する。API失敗時はエラーメッセージではなく、大人と一緒に確認する旨のフォールバック文言を返す。

これにより、正誤判定・教材内容はAIの生成結果に依存せず、AIは「同じ正解に至るまでの説明の言い換え」のみを担当する設計になっている。

## 5.6 理解が浅い場合の再確認問題

生徒が「よく分からない」を押してAI再解説を受けた後、そのまま次の問題に進めると理解度を確認できない。かといって、まったく新しい問題をAIに作らせるとハルシネーションのリスクが再び生じる。そこで：

- `src/lib/review.ts`の`pickReviewProblem(chapter, strugglingProblem, excludeIds)`が、つまずいた問題と**タグを共有する別の実在問題**（同じ`chapter.problems`内）を選び、確認問題として1問はさむ。同じ難易度のものを優先。
- 選定は完全にコード側のロジックで行い、AIには問題文を作らせない（対策Aと同じ理由）。
- 該当タグの別問題が存在しない場合（例：`複合問題`タグは現状1問のみ）は確認問題を挟まず、そのまま次の問題に進む。
- `ChapterView`は確認問題を通常の問題キューには含めず、一時的に割り込ませてから元の続きに戻る（`pendingNextPhaseRef`で退避）。確認問題の回答も通常どおり`attempts`テーブルに記録される。
- 各単元とも14〜19問（practiceProblems＋assessmentProblems合計）を用意しており、タグごとに複数の類題があるため、ほとんどのケースで確認問題を挟める。

## 5.7 章末小テストの出題（`lib/quiz.ts`）

各単元の最後に5問の小テストを行う（4章「学習フロー」参照）。出題も確認問題と同じ考え方で、新規問題はAIに作らせず、その単元の`practiceProblems + assessmentProblems`全体から選ぶ。

- `pickQuizProblems(chapter, count = 5)`は、easy/normal/hardの順（既定パターン`["easy","normal","hard","easy","normal"]`）で各難易度から1問ずつ、決定的に選ぶ純関数。該当難易度に問題が無い／使い切った場合は他の難易度から補充する。
- 小テストの回答は`attempts`テーブルに`is_quiz = true`で記録し（`0002_add_is_quiz.sql`）、ダッシュボード・保護者ページの進捗集計（`fetchAttempts`結果を`!a.is_quiz`でフィルタ）からは除外している。小テストの成績を通常演習の進捗率に混ぜないため。
- 合格ラインは正答率80%（`QuizReview`コンポーネントの`PASS_RATIO`）。将来、複数章をまたぐ「小テストで理解が浅い章へ自動的に戻す」機能を作る際の土台になる。

## 5.8 図を使う問題（`ProblemFigure` / `ExplanationDiagram`）

`Problem.figure`（問題ごとの図）と`Chapter.explanation.diagram`（単元解説の図）は同じ形の判別共用体で、`kind`ごとにディスパッチする2つのコンポーネント（`components/ProblemFigureView.tsx` / `components/ExplanationDiagram.tsx`）が、`components/diagrams/`配下の個別コンポーネントへ振り分ける。`ProblemView`・`QuizProblemView`・`QuizReview`のどれでも問題文の下に図を描画する。

現在サポートしている`kind`：
- `table` / `bar-chart`（`TableDiagram.tsx` / `BarChartDiagram.tsx`）：「棒グラフと表」単元用。棒グラフはあえて棒の上に数値ラベルを付けない（目盛りを読んで数量を答えさせるのがこの単元の目的のため）。表は空らんのセルに「ア」「？」などの文字をそのまま入れて、実データの表を忠実に再現する。
- `grouping`（`GroupingDiagram.tsx`）：わり算の等分のようすを示す図。
- `triangle`（`TriangleDiagram.tsx`）：二等辺三角形・正三角形単元用。実際の長さの比率には忠実でない模式図（頂点A=上・B=左下・C=右下で固定）。`sideLabels`で辺の長さ、`equalMarks`（0〜2）で等しい辺に付けるチックマークの数を指定する。
- `circle`（`CircleDiagram.tsx`）：円と球単元用。中心・半径・（`showDiameter`が真なら）直径を描く。`radiusLabel`／`diameterLabel`が無い場合はその線自体を描画しない（問題に無関係な線で図を煩雑にしないため）。
- `number-line`（`NumberLineDiagram.tsx`）：時こく・大きい数・分数単元用。`majorStep`／`minorStep`で目盛りを、`markers`で位置を示す矢印を描く。`markers`は`value`で実際の位置に矢印を配置しつつ、表示するのは`label`（"ア"など）のみにして答えの数値を見せない（棒グラフが棒に数値ラベルを付けない設計と同じ考え方）。

いずれも共通のカラーパレット（`#2a78d6`/`#3987e5`塗り、`#c3c2b7`/`#383835`線、`#eda100`/`#c98500`の強調色など、ライト/ダーク両対応）に揃えている。単元解説の図と問題の図は別々のデータ（`explanation.diagram`と`problem.figure`）なので、同じ単元でも解説用と個々の問題用で異なる具体的な数値を持たせられる。

## 5.9 マイルストーンテスト・卒業テスト・合格お祝い演出（`lib/milestones.ts`）

単元末小テストの上位に、複数単元をまたぐ「確認テスト（マイルストーンテスト）」と、全単元から出題する「卒業テスト」を追加した。

- `getMilestonesForGrade(grade)`：`getChaptersByGrade(grade)`を`MILESTONE_SIZE=4`単元ごとに区切り、各グループを1つの`MultiChapterTest`とする（小3・全12単元なら3回）。`getGraduationTest(grade)`はその学年の全単元をまとめた1件を返す。IDは学年の最初の章ID接頭辞（例："g3-division" → "g3"）から自動導出するため、4年・5年を追加しても変更不要。
- 出題は`pickMultiChapterTestProblems(chapters)` = 各章に対して既存の`pickQuizProblems(chapter, PROBLEMS_PER_CHAPTER=2)`を呼んで結合するだけ（`quiz.ts`は無改修）。新しい問題プールや選定ロジックは作らず、既存のハルシネーション対策をそのまま踏襲。
- **DBスキーマの追加なし**：`chapter_progress`/`attempts`の`chapter_id`は単なる`text`のため、マイルストーン・卒業テストのIDをそのまま`chapter_id`として使い、既存の`recordAttempt`・`markChapterComplete`・`fetchAllChapterProgress`・RLSポリシーをそのまま再利用している（`is_quiz: true`で記録するため、単元別の演習進捗集計は汚染されない）。
- `MultiChapterTestView`（`components/MultiChapterTestView.tsx`）が`/milestone/[testId]`・`/graduation`の実体。前提単元の完了チェック（ロック）は**あえて設けていない**（ユーザー指示）——単元一覧ページに常にリンクとして表示され、いつでも受験できる。
- 単元一覧ページ（`app/grade/[grade]/page.tsx`）は4単元ごと・末尾に確認テスト／卒業テストのカードを差し込む。新規Supabaseクエリは追加していない（既存の`fetchAllChapterProgress`が合成IDの行もそのまま返すため）。
- **合格お祝い演出**：`QuizReview`が正答率80%（既存の`PASS_RATIO`）以上で`Celebration`コンポーネント（`components/Celebration.tsx`）を表示する。絵文字の紙吹雪をCSSキーフレーム（`globals.css`の`confetti-fall`）で降らせ、「おめでとう！🎉」の吹き出しを出す（外部ライブラリ不使用）。卒業テストのみ紙吹雪の数を増やし、「そつぎょう おめでとう！🏆」という専用メッセージにしている。既存の単元末小テスト（`ChapterView`からの`<QuizReview results={...} />`呼び出し）も無改修のまま同じ演出を受け取る（新規propsは全てオプショナル）。

## 6. 学習履歴の記録（Supabase）

1章の`attempts`/`chapter_progress`テーブルに、生徒が1問回答するたびに1行INSERTする（`lib/progress.ts`が`recordAttempt()`としてラップ）。書き込みは選択中の子どもプロファイル（`student_id`）に紐づける。RLSにより、その保護者アカウント配下のプロファイル以外へは書き込めない。

## 7. 保護者ダッシュボード（最小構成）

保護者が別デバイスでログインし、`parent/page.tsx`にアクセス：
1. `students`テーブルから自分の子どもプロファイル一覧を取得
2. プロファイルを選ぶと、その`student_id`の`attempts`を集計して表示：
   - 単元の進捗率（例：わり算 70%完了）
   - 直近の学習時間・取り組んだ問題数
   - 苦手分析：`tags`ごとの正答率を集計し、正答率が低いタグを一覧表示（今回はAI生成レポートではなく集計ベース。将来的にこの集計結果をAIに渡して文章化するレポート機能に拡張できる形にしておく）

## 8. 今回のスコープ外（メモ）

- マイルストーンテスト・卒業テストの成績に基づく「苦手章へ自動的に差し戻す」復習ロック機構（テスト自体は5.9節で実装済み。前提単元の完了チェックも意図的に設けていない＝ロックなし。成績を見て弱点章に誘導する機能は未実装）
- 子ども自身の個別ログイン（招待コード方式への拡張）
- 応用問題（受験問題）データの選定・組み込み
- 4年生・5年生以降の単元（学年選択の導線とレジストリ構造は用意済みなので、`content/chapters/g4-*.ts`等を追加し`curriculum.ts`に登録するだけで拡張できる。マイルストーン・卒業テストも学年ごとに自動生成されるため追加対応不要）
- 保護者ダッシュボードでの章末小テスト・マイルストーン／卒業テストのスコア表示（現状、結果は`is_quiz=true`でDBには記録されているが、保護者向けの表示はまだ無い）

## 9. 事前に必要な準備（ユーザー側作業）

- supabase.comでプロジェクトを作成済み。以下を`.env.local`に設定する（値は本人が直接編集し、チャットには貼らない）：
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`（Route Handlerでのみ使用。クライアントに露出させない）
  - `ANTHROPIC_API_KEY`
- `supabase/migrations/0001_init.sql`をSupabaseダッシュボードのSQL Editorで実行し、テーブルとRLSポリシーを作成する

---
この内容で実装に進めてよいか確認後、Next.jsプロジェクトの雛形作成に着手する。
