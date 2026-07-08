import type { Chapter } from "@/lib/types";

// 問題は下記の実在教材の設問・解答をもとに作成（AIによる自由生成は行っていない）。
// - 宮城県教育センター「わくわくワーク」小学4年 算数 単元1「大きい数のしくみ」
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele4_math/answer/01.els4.kaitou.01.1hop.pdf
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele4_math/answer/02.els4.kaitou.01.2stp.pdf
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele4_math/answer/03.els4.kaitou.01.3jmp.pdf
export const g4LargeNumbers: Chapter = {
  id: "g4-large-numbers",
  grade: "小学4年",
  title: "大きい数のしくみ",
  explanation: {
    summary: `数は、一・十・百・千・一万・十万・百万・千万・一億・十億・百億・千億・一兆…と、4けたごとに新しい大きな単位（万・億・兆）に変わっていきます。

大きい数を読むときは、右から4けたずつ区切ると位が分かりやすくなります（一の位のグループ、万のグループ、億のグループ、兆のグループ）。

数を10倍、100倍すると、位がそれぞれ1つ、2つ上がり、右はしに0が1こ、2こ増えます。10でわる、100でわると、位がそれぞれ1つ、2つ下がり、右はしの0が1こ、2こ減ります。

大きい数のかけ算は、0のない部分（46000×2300なら46×23）を先に計算してから、0の数だけ0をつけたすと簡単に計算できます。`,
    keyPoints: [
      "4けたごとに新しい大きな単位に変わる（一万・一億・一兆）",
      "大きい数は右から4けたずつ区切ると位が読み取りやすい",
      "10倍・100倍すると位が1つ・2つ上がり、右に0が1こ・2こ増える",
      "10でわる・100でわると位が1つ・2つ下がり、右の0が1こ・2こ減る",
      "大きい数のかけ算は、0を除いた部分を先に計算してから0をつけたす",
    ],
    diagram: {
      kind: "number-line",
      min: 0,
      max: 26,
      majorStep: 10,
      minorStep: 1,
    },
    notebookExample: {
      question: "例：46000×2300を工夫して計算する",
      lines: [
        "46000 = 46 × 1000、2300 = 23 × 100 と考える",
        "46000 × 2300 = 46 × 23 × 1000 × 100",
        "46 × 23 = 1058",
        "1058 × 100000 = 105800000",
      ],
    },
  },
  practiceProblems: [
    {
      id: "g4-largenum-easy-1",
      difficulty: "easy",
      question: "127704040の読み方を書きましょう。",
      answer: "一億二千七百七十万四千四十",
      steps: ["右から4けたずつ区切る：1|2770|4040", "1億、2770万、4040とよむ", "一億二千七百七十万四千四十"],
      tags: ["位取り"],
    },
    {
      id: "g4-largenum-easy-2",
      difficulty: "easy",
      question: "一億千三百十九万千七百十七を数字で書きましょう。",
      answer: "113191717",
      steps: ["「一億」→1のあとに億を表す位が続く", "「千三百十九万千七百十七」→ 13191717", "1のあとに13191717を続ける：113191717"],
      tags: ["位取り"],
    },
    {
      id: "g4-largenum-normal-1",
      difficulty: "normal",
      question: "520億を100倍した数はいくつですか。",
      answer: "5兆2000億",
      steps: ["100倍すると位が2つ上がる", "520億を500億と20億に分けて考える", "500億→5兆、20億→2000億", "合わせて5兆2000億"],
      tags: ["10倍・100倍"],
    },
    {
      id: "g4-largenum-normal-2",
      difficulty: "normal",
      question: "520億を100でわった数はいくつですか。",
      answer: "5億2000万",
      steps: ["100でわると位が2つ下がる", "520億を500億と20億に分けて考える", "500億→5億、20億→2000万", "合わせて5億2000万"],
      tags: ["10倍・100倍"],
    },
  ],
  assessmentProblems: [
    {
      id: "g4-largenum-easy-3",
      difficulty: "easy",
      question: "784060000000の読み方を書きましょう。",
      answer: "七千八百四十億六千万",
      steps: ["右から4けたずつ区切る：7840|6000|0000", "7840億、6000万とよむ", "七千八百四十億六千万"],
      tags: ["位取り"],
    },
    {
      id: "g4-largenum-easy-4",
      difficulty: "easy",
      question: "六兆三千八百二十三億二千五百四十万九千二百五十二を数字で書きましょう。",
      answer: "6382325409252",
      steps: ["「六兆」→6のあとに兆を表す位が続く", "「三千八百二十三億二千五百四十万九千二百五十二」→ 382325409252", "6のあとに382325409252を続ける：6382325409252"],
      tags: ["位取り"],
    },
    {
      id: "g4-largenum-easy-5",
      difficulty: "easy",
      question: "一億より200万少ない数を数字で書きましょう。",
      answer: "98000000",
      steps: ["1億 = 100000000", "100000000 - 2000000 = 98000000"],
      tags: ["位取り"],
    },
    {
      id: "g4-largenum-normal-3",
      difficulty: "normal",
      question: "5兆と100億を7こあわせた数を数字で書きましょう。",
      answer: "5070000000000",
      steps: ["100億を7こ集める：100億 × 7 = 700億", "5兆と700億をあわせる：5000000000000 + 70000000000 = 5070000000000"],
      tags: ["位取り"],
    },
    {
      id: "g4-largenum-normal-4",
      difficulty: "normal",
      question: "1130479000000について、左から3番目の数字3は、1億が何こ集まった数ですか。",
      answer: "300",
      steps: ["4けたごとに区切る：1|1304|7900|0000 → 1兆1304億7900万", "左から3番目の数字3は「百億の位」の数字なので、300億を表す", "300億は1億が300こ集まった数"],
      tags: ["位取り"],
    },
    {
      id: "g4-largenum-normal-5",
      difficulty: "normal",
      question: "1130479000000について、もっとも左がわの数字の位は何ですか。",
      answer: "一兆",
      steps: ["1130479000000は13桁の数", "いちばん左の数字は一兆の位にある"],
      tags: ["位取り"],
    },
    {
      id: "g4-largenum-normal-6",
      difficulty: "normal",
      question: "9000億は、1兆より何億小さい数ですか。",
      answer: "1000億",
      steps: ["1兆 = 10000億", "10000億 - 9000億 = 1000億"],
      tags: ["位取り"],
    },
    {
      id: "g4-largenum-normal-7",
      difficulty: "normal",
      question: "9500億は、1兆より何億小さい数ですか。",
      answer: "500億",
      steps: ["1兆 = 10000億", "10000億 - 9500億 = 500億"],
      tags: ["位取り"],
    },
    {
      id: "g4-largenum-normal-8",
      difficulty: "normal",
      question: "下の数直線で、①の位置が表す数はいくつですか（1めもりは1億を表します）。",
      answer: "3億",
      figure: {
        kind: "number-line",
        min: 0,
        max: 26,
        majorStep: 10,
        minorStep: 1,
        markers: [{ value: 3, label: "①" }],
      },
      steps: ["1めもりは1億を表す", "0から3めもり分すすんだ位置が①", "3億"],
      tags: ["数直線"],
    },
    {
      id: "g4-largenum-normal-9",
      difficulty: "normal",
      question: "下の数直線で、②の位置が表す数はいくつですか（1めもりは1億を表します）。",
      answer: "15億",
      figure: {
        kind: "number-line",
        min: 0,
        max: 26,
        majorStep: 10,
        minorStep: 1,
        markers: [{ value: 15, label: "②" }],
      },
      steps: ["10億から5めもり分すすんだ位置が②", "10億 + 5億 = 15億"],
      tags: ["数直線"],
    },
    {
      id: "g4-largenum-hard-1",
      difficulty: "hard",
      question: "下の数直線で、③の位置が表す数はいくつですか（1めもりは1億を表します）。",
      answer: "23億",
      figure: {
        kind: "number-line",
        min: 0,
        max: 26,
        majorStep: 10,
        minorStep: 1,
        markers: [{ value: 23, label: "③" }],
      },
      steps: ["20億から3めもり分すすんだ位置が③", "20億 + 3億 = 23億"],
      tags: ["数直線"],
    },
    {
      id: "g4-largenum-hard-2",
      difficulty: "hard",
      question:
        "2005年の国勢調査によると、日本の人口は127767994人で、そのうち宮城県をのぞく日本の人口は125407776人でした。宮城県の人口は何人ですか。",
      answer: "2360218",
      steps: ["「全体の人口 - 宮城県をのぞいた人口 = 宮城県の人口」と考える", "127767994 - 125407776 = 2360218", "宮城県の人口は2360218人"],
      tags: ["文章題"],
    },
    {
      id: "g4-largenum-hard-3",
      difficulty: "hard",
      question: "46000は46×1000、2300は23×100と表せます。46×23はいくつですか。",
      answer: "1058",
      steps: ["46×23を筆算で計算する", "46 × 23 = 1058"],
      tags: ["大きい数のかけ算"],
    },
    {
      id: "g4-largenum-hard-4",
      difficulty: "hard",
      question: "46000×2300はいくつですか。",
      answer: "105800000",
      steps: ["46000 = 46×1000、2300 = 23×100", "46×23 = 1058", "1058 × 1000 × 100 = 105800000"],
      tags: ["大きい数のかけ算"],
    },
    {
      id: "g4-largenum-hard-5",
      difficulty: "hard",
      question: "380000×400はいくつですか。",
      answer: "152000000",
      steps: ["0を除いた部分を計算する：38×4 = 152", "0を4+2=6こつけたす：152000000"],
      tags: ["大きい数のかけ算"],
    },
    {
      id: "g4-largenum-hard-6",
      difficulty: "hard",
      question:
        "地球から月までのきょりはおよそ38万kmです。これを400倍すると、地球から太陽までのきょり（およそ1億5000万km）と比べて長いですか、短いですか。",
      answer: "長い",
      steps: ["380000 × 400 = 152000000", "152000000は150000000より大きいので、太陽までのきょりより長い"],
      tags: ["大きい数のかけ算", "文章題"],
    },
    {
      id: "g4-largenum-hard-7",
      difficulty: "hard",
      question:
        "0から9までの数字を1回ずつ使って11けたの数をつくります（1つの数字だけ2回使います）。いちばん大きい数といちばん小さい数をつくったとき、その差はいくつになりますか。",
      answer: "89853086421",
      steps: [
        "いちばん大きい数は、大きい数字から順に並べる（9を2回使う）：99876543210",
        "いちばん小さい数は、いちばん左を0以外の最小の1にし、その後は小さい順に並べる：10023456789",
        "99876543210 - 10023456789 = 89853086421",
      ],
      tags: ["位取り", "文章題"],
    },
  ],
};
