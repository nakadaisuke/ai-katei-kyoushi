import type { Chapter } from "@/lib/types";

// 問題は下記の実在教材の設問・解答をもとに作成（AIによる自由生成は行っていない）。
// - 宮城県教育センター「わくわくワーク」小学4年 算数 単元11「変わり方調べ」
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele4_math/answer/34.els4.kaitou.11.1hop.pdf
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele4_math/answer/35.els4.kaitou.11.2stp.pdf
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele4_math/answer/36.els4.kaitou.11.3jmp.pdf
export const g4FunctionTables: Chapter = {
  id: "g4-function-tables",
  grade: "小学4年",
  title: "変わり方調べ",
  explanation: {
    summary: `2つの量が、一方が変わるともう一方も決まって変わるとき、その関係を表に整理すると、変わり方のきまりを見つけやすくなります。

2つの量の一方を□、もう一方を○として、その関係を式に表すことができます。例えば、20まいの紙を2人で分けるとき、1人分を□まい、もう1人分を○まいとすると、□＋○＝20という式になります。

2つの量の関係には、「一方が増えるともう一方も増える」関係と、「一方が増えるともう一方は減る」関係があります。`,
    keyPoints: [
      "変わり方は表に整理すると、きまりを見つけやすい",
      "2つの量の関係は□や○を使って式に表せる（例：□＋○＝20、□×4＝○）",
      "一方が増えるともう一方も増える関係と、一方が増えるともう一方は減る関係がある",
      "式のきまりが分かれば、表にない大きな数のときの値も計算で求められる",
    ],
    diagram: {
      kind: "table",
      columns: ["1", "2", "3", "4", "5", "6", "7"],
      rows: [
        { label: "しんご君のまい数(まい)", cells: [1, 2, 3, 4, 5, 6, 7] },
        { label: "妹のまい数(まい)", cells: [19, 18, 17, 16, 15, 14, 13] },
      ],
    },
    notebookExample: {
      question: "例：20まいの作文用紙をしんご君と妹で分ける",
      lines: [
        "しんご君のまい数を□まい、妹のまい数を○まいとする",
        "□＋○＝20という式に表せる",
        "しんご君が1まいずつ増えると、妹は1まいずつ減る",
      ],
    },
  },
  practiceProblems: [
    {
      id: "g4-functable-easy-1",
      difficulty: "easy",
      question:
        "20まいの作文用紙を、しんご君と妹で分けます。しんご君のまい数を□まい、妹のまい数を○まいとするとき、□と○の関係を式に表しましょう。",
      answer: "□＋○＝20",
      figure: {
        kind: "table",
        columns: ["1", "2", "3", "4", "5", "6", "7"],
        rows: [
          { label: "しんご君のまい数(まい)", cells: [1, 2, 3, 4, 5, 6, 7] },
          { label: "妹のまい数(まい)", cells: [19, 18, 17, 16, 15, 14, 13] },
        ],
      },
      steps: ["2人あわせて20まいになる", "□＋○＝20"],
      tags: ["変わり方"],
    },
    {
      id: "g4-functable-easy-2",
      difficulty: "easy",
      question: "しんご君の作文用紙の数が1まいずつふえると、妹の作文用紙のまい数はどのように変わりますか。",
      answer: "1まいずつへる",
      steps: ["あわせて20まいなので、片方が増えるともう片方は同じ数だけ減る"],
      tags: ["変わり方"],
    },
    {
      id: "g4-functable-normal-1",
      difficulty: "normal",
      question:
        "入れ物にジュースを入れた時間と、たまったジュースの量の関係は、「片方が増えるともう片方が増える」関係ですか、「片方が増えるともう片方が減る」関係ですか。",
      answer: "片方が増えるともう片方が増える",
      steps: ["時間が長くなるほど、たまるジュースの量も増える"],
      tags: ["変わり方の種類"],
    },
    {
      id: "g4-functable-normal-2",
      difficulty: "normal",
      question:
        "飲んだ牛乳の量と、残った牛乳の量の関係は、「片方が増えるともう片方が増える」関係ですか、「片方が増えるともう片方が減る」関係ですか。",
      answer: "片方が増えるともう片方が減る",
      steps: ["飲んだ量が増えるほど、残っている量は減る"],
      tags: ["変わり方の種類"],
    },
  ],
  assessmentProblems: [
    {
      id: "g4-functable-easy-3",
      difficulty: "easy",
      question:
        "はしごのだんの数と、下からの高さの関係は、「片方が増えるともう片方が増える」関係ですか、「片方が増えるともう片方が減る」関係ですか。",
      answer: "片方が増えるともう片方が増える",
      steps: ["だんの数が増えるほど、下からの高さも高くなる"],
      tags: ["変わり方の種類"],
    },
    {
      id: "g4-functable-easy-4",
      difficulty: "easy",
      question:
        "ろうそくをもやした時間と、残ったろうそくの長さの関係は、「片方が増えるともう片方が増える」関係ですか、「片方が増えるともう片方が減る」関係ですか。",
      answer: "片方が増えるともう片方が減る",
      steps: ["もやした時間が増えるほど、残りの長さは短くなる"],
      tags: ["変わり方の種類"],
    },
    {
      id: "g4-functable-normal-3",
      difficulty: "normal",
      question:
        "歩いた時間と、歩いた道のりの関係は、「片方が増えるともう片方が増える」関係ですか、「片方が増えるともう片方が減る」関係ですか。",
      answer: "片方が増えるともう片方が増える",
      steps: ["歩いた時間が長くなるほど、道のりも長くなる"],
      tags: ["変わり方の種類"],
    },
    {
      id: "g4-functable-normal-4",
      difficulty: "normal",
      question:
        "1辺が1cmの正方形を下の表のようにならべていくとき、正方形が8こならんだときのまわりの長さ（アの数）は何cmですか。",
      answer: "18cm",
      figure: {
        kind: "table",
        columns: ["1", "2", "3", "4", "5", "8"],
        rows: [
          { label: "正方形の数(こ)", cells: [1, 2, 3, 4, 5, 8] },
          { label: "まわりの長さ(cm)", cells: [4, 6, 8, 10, 12, "ア"] },
        ],
      },
      steps: ["正方形が1こ増えるたびに、まわりの長さは2cmずつ増える", "5このとき12cmなので、8こまでさらに3こ増える", "12 + 2×3 = 18"],
      tags: ["表と変わり方"],
    },
    {
      id: "g4-functable-hard-1",
      difficulty: "hard",
      question: "上の正方形を100こならべたとき、まわりの長さは何cmになりますか。考え方をふまえて答えましょう。",
      answer: "202cm",
      steps: ["正方形が1こ増えるたびに、まわりの長さは2cmずつ増える", "1こから100こまで99こ増えるので、2×99=198cm増える", "4 + 198 = 202"],
      tags: ["表と変わり方", "文章題"],
    },
    {
      id: "g4-functable-normal-5",
      difficulty: "normal",
      question:
        "よし子さんは、お母さんとたんじょう日が同じで、年れいが32才ちがいます。よし子さんの年れいを○才、お母さんの年れいを□才として、○と□の関係を式に表しましょう。",
      answer: "○＋32＝□",
      figure: {
        kind: "table",
        columns: ["1", "2", "3", "4", "5"],
        rows: [
          { label: "よし子さんの年れい(才)", cells: [1, 2, 3, 4, 5] },
          { label: "お母さんの年れい(才)", cells: [33, 34, 35, 36, 37] },
        ],
      },
      steps: ["お母さんはよし子さんより32才年上", "○＋32＝□"],
      tags: ["変わり方"],
    },
    {
      id: "g4-functable-normal-6",
      difficulty: "normal",
      question: "よし子さんが18才になったとき、お母さんは何才になりますか。",
      answer: "50才",
      steps: ["○＋32＝□の式に18をあてはめる", "18 + 32 = 50"],
      tags: ["変わり方", "文章題"],
    },
    {
      id: "g4-functable-normal-7",
      difficulty: "normal",
      question: "お母さんが45才のとき、よし子さんは何才になりますか。",
      answer: "13才",
      steps: ["○＋32＝45という式になる", "45 - 32 = 13"],
      tags: ["変わり方", "文章題"],
    },
    {
      id: "g4-functable-normal-8",
      difficulty: "normal",
      question:
        "1辺が1cmの正方形の1辺の長さを2cm、3cm…とのばしていくとき、1辺の長さを□cm、まわりの長さを○cmとして、□と○の関係を式に表しましょう。",
      answer: "□×4＝○",
      figure: {
        kind: "table",
        columns: ["1", "2", "3", "4", "5", "6"],
        rows: [
          { label: "1辺の長さ(cm)", cells: [1, 2, 3, 4, 5, 6] },
          { label: "まわりの長さ(cm)", cells: [4, 8, 12, 16, 20, 24] },
        ],
      },
      steps: ["まわりの長さは1辺の長さの4つ分になっている", "□×4＝○"],
      tags: ["変わり方"],
    },
    {
      id: "g4-functable-easy-5",
      difficulty: "easy",
      question: "正方形のまわりの長さは、1辺の長さの何倍になっていますか。",
      answer: "4倍",
      steps: ["正方形の辺は4つあり、すべて同じ長さ", "まわりの長さは1辺の長さの4倍"],
      tags: ["変わり方"],
    },
    {
      id: "g4-functable-normal-9",
      difficulty: "normal",
      question: "1辺の長さが24cmの正方形のまわりの長さを求めましょう。",
      answer: "96cm",
      steps: ["□×4＝○の式を使う", "24 × 4 = 96"],
      tags: ["変わり方", "文章題"],
    },
    {
      id: "g4-functable-hard-2",
      difficulty: "hard",
      question:
        "1cmのひごを20本ならべて長方形や正方形を作ります。たての長さが2cmのとき、よこの長さは何cmになりますか（下の表のアにあてはまる数）。",
      answer: "8cm",
      figure: {
        kind: "table",
        columns: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
        rows: [
          { label: "たての長さ(cm)", cells: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
          { label: "よこの長さ(cm)", cells: [9, "ア", "イ", 6, 5, 4, "ウ", 2, 1] },
        ],
      },
      steps: ["まわりの長さは20cmなので、たて＋よこ＝10cm", "たてが2cmのとき、よこは10-2=8cm"],
      tags: ["変わり方", "文章題"],
    },
    {
      id: "g4-functable-hard-3",
      difficulty: "hard",
      question: "同じ長方形で、たての長さが3cmのとき、よこの長さは何cmになりますか（表のイにあてはまる数）。",
      answer: "7cm",
      steps: ["たて＋よこ＝10cm", "たてが3cmのとき、よこは10-3=7cm"],
      tags: ["変わり方", "文章題"],
    },
    {
      id: "g4-functable-hard-4",
      difficulty: "hard",
      question: "同じ長方形で、たての長さが7cmのとき、よこの長さは何cmになりますか（表のウにあてはまる数）。",
      answer: "3cm",
      steps: ["たて＋よこ＝10cm", "たてが7cmのとき、よこは10-7=3cm"],
      tags: ["変わり方", "文章題"],
    },
    {
      id: "g4-functable-hard-5",
      difficulty: "hard",
      question:
        "1cmのひごを20本ならべて長方形や正方形を作るとき、面積がいちばん広くなるのは、たて・よこの長さがそれぞれ何cmのときですか。",
      answer: "たて5cm、よこ5cm",
      steps: ["たてが1cm,2cm,3cm…と変わるとき、面積は9c㎡,16c㎡,21c㎡…と変わる", "たて5cm、よこ5cmのとき、面積は25c㎡でいちばん広くなる"],
      tags: ["変わり方", "文章題"],
    },
  ],
};
