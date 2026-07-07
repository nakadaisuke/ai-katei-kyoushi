# AI家庭教師 プロトタイプ設計プラン

## 0. このフェーズのゴール

学年・単元を1つに絞り、「解説 → 3段階の演習 → ノート回答 → 採点＋途中式 → 分からなければAI個別再解説 → ヒント」という学習フロー全体を、実際に動くWebアプリとして通しで作る。保護者ダッシュボードも最小構成で用意する。

- **対象単元**: 小学3年生「わり算（あまりのないわり算・あまりのあるわり算）」
- **対象外（今回はやらない）**: 複数単元のカリキュラム管理、章をまたぐ小テストと復習ロック
  → これらはこの単元1本の学習フローが実際に良い体験になってから、横展開するときに設計する
- 認証・DB・親子アカウント連携（Supabase）は保護者が別デバイスから進捗を見る要件のため、今回のスコープに含める

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

## 2. ディレクトリ構成（予定）

```
AI家庭教師/
  PLAN.md
  package.json
  next.config.ts
  supabase/
    migrations/0001_init.sql        # students / attempts / chapter_progress + RLS
  src/
    proxy.ts                        # 未ログイン時にlogin/signupへリダイレクト（Next.js 16でmiddleware.tsから改称）
    app/
      login/page.tsx                # 保護者ログイン
      signup/page.tsx               # 保護者サインアップ
      profiles/page.tsx             # 子どもプロファイル選択・作成（ログイン後の最初の画面）
      page.tsx                      # 生徒ダッシュボード（選択中プロファイルの学習マップ）
      chapter/[chapterId]/page.tsx  # 学習画面（解説→問題→回答→採点）
      parent/page.tsx               # 保護者ダッシュボード（子どもプロファイル一覧→進捗）
      api/
        hint/route.ts               # ヒント生成（段階的）
        reexplain/route.ts          # 分からないボタン→AIによる別アプローチの解説
    content/
      chapters/g3-division.ts       # 単元データ本体（解説文・問題・正解・途中式・タグ）
    lib/
      supabase/
        client.ts                   # ブラウザ用Supabaseクライアント（anon key）
        server.ts                   # Route Handler/Server Component用（cookieベースセッション）
      progress.ts                   # attempts/chapter_progressの読み書き（Supabase経由）
      claude.ts                     # Anthropic API呼び出しの共通関数
      types.ts                      # 共有型定義
    components/
      ExplanationPanel.tsx
      ProblemCard.tsx
      AnswerInput.tsx
      StepSolution.tsx
      HintButton.tsx
      ProfileSwitcher.tsx
      ParentProgressChart.tsx
  .env.local.example                # ANTHROPIC_API_KEY= / NEXT_PUBLIC_SUPABASE_URL= / NEXT_PUBLIC_SUPABASE_ANON_KEY= / SUPABASE_SERVICE_ROLE_KEY=
```

## 3. 単元データモデル（`content/chapters/g3-division.ts`）

```ts
type Difficulty = "easy" | "normal" | "hard";

interface Problem {
  id: string;
  difficulty: Difficulty;
  question: string;        // 例: "12 ÷ 3 = ？"
  answer: string;           // 正解（あまりありは "4あまり2" のような形式も許容）
  steps: string[];          // 途中式・考え方を順に表示
  tags: string[];           // 苦手分析用（例: "あまりの扱い", "文章題"）
}

interface Chapter {
  id: string;               // "g3-division"
  grade: string;            // "小学3年"
  title: string;            // "わり算"
  explanation: {
    summary: string;        // 文科省の指導要領に沿った解説文（Markdown）
    keyPoints: string[];    // 要点まとめ
  };
  problems: Problem[];      // easy 3問 / normal 3問 / hard 3問 程度
}
```

採点はAIを使わず、`answer`との厳密比較（表記ゆれは正規化して吸収）で行う。AIは「ヒント」と「個別再解説」にのみ使う。

## 4. 学習フロー（画面遷移）

```
[ログイン / サインアップ]（保護者アカウント、Supabase Auth）
        ▼
[プロファイル選択]（子どもプロファイルを作成 or 選択）
        ▼
[ダッシュボード]
   └ 単元カード「小3・わり算」をクリック
        ▼
[学習画面]
  1. 解説パネル表示（要点＋具体例）
        ▼
  2. 問題表示（easy→normal→hardの順、1問ずつ）
     - 画面には問題文のみ。生徒はノートで計算
     - 回答入力欄に数値/文字列を入力して送信
        ▼
  3. 採点結果表示
     - 正誤に関わらず「途中式」をステップごとに開示
     - 生徒がノートの計算と照らし合わせる
     - ボタン：「わかった／次へ」「よく分からない」
        ▼ (よく分からない を押した場合)
  4. AI個別再解説（Claude API）
     - 元の解説とは異なる切り口（図解的比喩・日常例）で再生成
     - 再解説後、同じ問題か類題をもう一度提示
        ▼
  （全問題終了）→ ダッシュボードに戻り、達成率を更新
```

各問題画面には常時「ヒント」ボタンを表示。押すたびに段階的にヒントが強くなる：
1回目＝着眼点、2回目＝使う公式、3回目＝最初の1ステップ。ヒントもClaude APIで生成するが、公式解答は絶対に含めないようプロンプトで制約する。

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
`src/content/chapters/g3-division.ts` の問題（16問）は、以下の実在教材の設問・解答をもとに作成している（出典はファイル冒頭にコメントで明記）。文部科学省の学習指導要領（除数・商が1位数の除法、あまりの理解）とも整合を確認済み。
- 宮城県教育センターの公開教材（小学3年 算数 単元3「わり算」・単元7「あまりのあるわり算」、実際の問題と解答）
- すたぺんドリル（startoo.co）小3算数「わり算」「あまりのあるわり算」。**同サイトの利用規約は「本サービスを商業的に利用する行為」を禁止行為として明記しているため、現状は個人利用の範囲でのみ採用している。本アプリを配布・商用化する場合は、この出典分を差し替えるか、サイト運営元に別途許諾を得る必要がある。**

今後、他学年・他単元を追加する際も、AIに問題を自由生成させるのではなく、教科書・教育委員会等が公開する実在の問題を出典付きで採用する方針とする。ただし出典が商用利用不可のサイトの場合は、上記と同様に注記し、配布前に見直す。

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
- 現状、単元内の問題数は16問（宮城県教育センター9問＋すたぺんドリル7問）で、タグごとに3〜7問程度。今後さらに他の出典（都度、出典と利用条件を明記の上で採用）を追加できれば、確認問題の種類をさらに増やせる。神奈川県の教材ページ（https://www.pref.kanagawa.jp/docs/v3p/gakushushien/kadaikaiketsu/shou3sansu.html）を確認したが、わり算・あまりのあるわり算は含まれていなかった（分数・かけ算等の別単元のみ）。

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

- 複数章をまたぐ小テスト・復習ロック機構
- 子ども自身の個別ログイン（招待コード方式への拡張）
- 応用問題（受験問題）データの選定・組み込み
- 他学年・他単元への展開

## 9. 事前に必要な準備（ユーザー側作業）

- supabase.comでプロジェクトを作成済み。以下を`.env.local`に設定する（値は本人が直接編集し、チャットには貼らない）：
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`（Route Handlerでのみ使用。クライアントに露出させない）
  - `ANTHROPIC_API_KEY`
- `supabase/migrations/0001_init.sql`をSupabaseダッシュボードのSQL Editorで実行し、テーブルとRLSポリシーを作成する

---
この内容で実装に進めてよいか確認後、Next.jsプロジェクトの雛形作成に着手する。
