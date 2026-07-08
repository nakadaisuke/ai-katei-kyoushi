import type { Chapter } from "@/lib/types";

// 問題は下記の実在教材の設問・解答をもとに作成（AIによる自由生成は行っていない）。
// - 宮城県教育センター「わくわくワーク」小学4年 算数 単元12「面積のはかり方と表し方」
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele4_math/answer/37.els4.kaitou.12.1hop.pdf
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele4_math/answer/38.els4.kaitou.12.2stp.pdf
// 注：階段状の図形や、内側に別の長方形をふくむ土地の見取り図など、単純な四角形の
// 図コンポーネントでは再現しきれない複合図形の問題は、引き続き文章のみで出題する。
export const g4Area: Chapter = {
  id: "g4-area",
  grade: "小学4年",
  title: "面積のはかり方と表し方",
  explanation: {
    summary: `広さのことを「面積」といいます。1辺の長さが1cmの正方形の面積を「1平方センチメートル」といい、「1c㎡」と書きます。

長方形の面積は「たて×横」（または「横×たて」）で求めることができます。正方形の面積は「1辺×1辺」で求めることができます。

面積の単位には、1辺が1mの正方形の面積である「平方メートル（㎡）」、1辺が1kmの正方形の面積である「平方キロメートル（k㎡）」もあります。1㎡＝10000c㎡、1k㎡＝1000000㎡です。

また、土地の面積を表すときには「アール（a）」「ヘクタール（ha）」という単位も使われます。1辺が10mの正方形の面積が1a、1辺が100mの正方形の面積が1haで、1a＝100㎡、1ha＝10000㎡です。

面積を計算するときは、単位をそろえてから計算することが大切です（例：40mmは4cmになおしてから計算する）。`,
    keyPoints: [
      "長方形の面積＝たて×横（または横×たて）",
      "正方形の面積＝1辺×1辺",
      "1c㎡＝1辺1cmの正方形の面積、1㎡＝1辺1mの正方形の面積、1k㎡＝1辺1kmの正方形の面積",
      "1㎡＝10000c㎡、1k㎡＝1000000㎡",
      "1a（アール）＝1辺10mの正方形の面積＝100㎡、1ha（ヘクタール）＝1辺100mの正方形の面積＝10000㎡",
      "面積を求めるときは、単位をそろえてから計算する",
    ],
    diagram: {
      kind: "quadrilateral",
      shape: "rectangle",
      sideLabels: ["横", "たて", "横", "たて"],
      showRightAngles: true,
    },
    notebookExample: {
      question: "例：たて4cm、横7cmの長方形の面積",
      lines: [
        "長方形の面積＝たて×横",
        "4 × 7 = 28",
        "28c㎡",
      ],
    },
    midCheckpoint: {
      summary: `ここまでで、面積の意味と「たて×横」「1辺×1辺」の公式を確認しました。

ここからは、面積の単位（㎡・k㎡・a・ha）の変換や、公式を逆向きに使う問題に取り組みます。

たとえば「面積とたての長さが分かっていて、横の長さを求める」ような問題では、たて×横＝面積の式を、横＝面積÷たて に置きかえて考えます。3年生で学んだ「□を使った式」と同じ考え方です。`,
      keyPoints: [
        "面積の公式：長方形＝たて×横、正方形＝1辺×1辺",
        "1辺の長さと面積が分かっていて、もう1辺を求めるときは「面積÷分かっている1辺」で計算する",
        "単位の変換（1㎡＝10000c㎡など）も、公式とあわせて使えるようにしておく",
      ],
      diagram: {
        kind: "quadrilateral",
        shape: "rectangle",
        sideLabels: ["横", "？", "横", "？"],
        showRightAngles: true,
      },
    },
  },
  practiceProblems: [
    {
      id: "g4-area-easy-1",
      difficulty: "easy",
      question: "1辺の長さが1cmの正方形の面積を何といい、どう書きますか。",
      answer: "1平方センチメートル、1c㎡",
      steps: ["1辺の長さが1cmの正方形の面積を「1平方センチメートル」といい、「1c㎡」と書く"],
      tags: ["面積の単位"],
    },
    {
      id: "g4-area-easy-2",
      difficulty: "easy",
      question: "たて4cm、横5cmの長方形の面積を求めましょう。",
      answer: "20c㎡",
      figure: {
        kind: "quadrilateral",
        shape: "rectangle",
        sideLabels: ["5cm", "4cm", "5cm", "4cm"],
        showRightAngles: true,
      },
      steps: ["長方形の面積＝たて×横", "4 × 5 = 20", "20c㎡"],
      tags: ["長方形の面積"],
    },
    {
      id: "g4-area-normal-1",
      difficulty: "normal",
      question: "長方形の面積を求める公式は「たて×横」です。正方形の面積を求める公式は何ですか。",
      answer: "1辺×1辺",
      steps: ["正方形はたてと横の長さが同じ", "だから公式は「1辺×1辺」"],
      tags: ["正方形の面積"],
    },
    {
      id: "g4-area-normal-2",
      difficulty: "normal",
      question: "たて4cm、横7cmの長方形の面積を求めましょう。",
      answer: "28c㎡",
      figure: {
        kind: "quadrilateral",
        shape: "rectangle",
        sideLabels: ["7cm", "4cm", "7cm", "4cm"],
        showRightAngles: true,
      },
      steps: ["長方形の面積＝たて×横", "4 × 7 = 28", "28c㎡"],
      tags: ["長方形の面積"],
    },
  ],
  assessmentProblems: [
    {
      id: "g4-area-normal-3",
      difficulty: "normal",
      question: "たて20m、横30mの長方形の面積を求めましょう。",
      answer: "600㎡",
      figure: {
        kind: "quadrilateral",
        shape: "rectangle",
        sideLabels: ["30m", "20m", "30m", "20m"],
        showRightAngles: true,
      },
      steps: ["長方形の面積＝たて×横", "20 × 30 = 600", "600㎡"],
      tags: ["長方形の面積"],
    },
    {
      id: "g4-area-normal-4",
      difficulty: "normal",
      question: "たて40mm、横9cmの長方形の面積を求めましょう（単位をそろえてから計算しましょう）。",
      answer: "36c㎡",
      figure: {
        kind: "quadrilateral",
        shape: "rectangle",
        sideLabels: ["9cm", "40mm", "9cm", "40mm"],
        showRightAngles: true,
      },
      steps: ["40mm = 4cmになおす", "4 × 9 = 36", "36c㎡"],
      tags: ["長方形の面積", "単位換算"],
    },
    {
      id: "g4-area-normal-5",
      difficulty: "normal",
      question: "1辺の長さが1mの正方形の面積を1平方メートル（1㎡）といいます。1㎡は何c㎡ですか。",
      answer: "10000c㎡",
      steps: ["1mは100cm", "100 × 100 = 10000", "1㎡ = 10000c㎡"],
      tags: ["面積の単位"],
    },
    {
      id: "g4-area-normal-6",
      difficulty: "normal",
      question: "1辺の長さが1kmの正方形の面積を1平方キロメートル（1k㎡）といいます。1k㎡は何㎡ですか。",
      answer: "1000000㎡",
      steps: ["1kmは1000m", "1000 × 1000 = 1000000", "1k㎡ = 1000000㎡"],
      tags: ["面積の単位"],
    },
    {
      id: "g4-area-hard-1",
      difficulty: "hard",
      question: "横の長さが8mで、面積が104㎡の音楽室があります。この音楽室のたての長さは何mですか。",
      answer: "13m",
      figure: {
        kind: "quadrilateral",
        shape: "rectangle",
        sideLabels: ["8m", "？", "8m", "？"],
        showRightAngles: true,
      },
      steps: ["たての長さを□mとすると、□×8=104", "□ = 104 ÷ 8 = 13", "13m"],
      tags: ["長方形の面積", "文章題"],
    },
    {
      id: "g4-area-normal-7",
      difficulty: "normal",
      question:
        "約150c㎡の面積のものを、次のア～エの中から1つ選びましょう。ア：切手1枚の面積　イ：年賀はがき1枚の面積　ウ：算数の教科書1冊の表紙の面積　エ：教室1部屋のゆかの面積",
      answer: "イ",
      steps: ["切手は数c㎡程度、教科書の表紙は数百c㎡程度、教室のゆかはとても広い", "年賀はがき1枚がおよそ150c㎡に近い"],
      tags: ["面積の感覚"],
    },
    {
      id: "g4-area-easy-3",
      difficulty: "easy",
      question: "ミニバスケットボールのコートの面積は420（　）です。（　）にあてはまる面積の単位は何ですか。",
      answer: "㎡",
      steps: ["コート1面くらいの広さなので、平方メートル（㎡）が適切"],
      tags: ["面積の単位"],
    },
    {
      id: "g4-area-easy-4",
      difficulty: "easy",
      question: "宮城県の面積は7000（　）です。（　）にあてはまる面積の単位は何ですか。",
      answer: "k㎡",
      steps: ["県全体のようなとても広い面積には、平方キロメートル（k㎡）を使う"],
      tags: ["面積の単位"],
    },
    {
      id: "g4-area-normal-8",
      difficulty: "normal",
      question: "1㎡の正方形の中に、1c㎡の正方形は何個ならべることができますか。",
      answer: "10000こ",
      steps: ["1㎡はたて100cm、横100cm", "100 × 100 = 10000", "10000こ"],
      tags: ["面積の単位"],
    },
    {
      id: "g4-area-hard-2",
      difficulty: "hard",
      question: "横4km、たて3000mの長方形をしたあき地の面積は何k㎡ですか。",
      answer: "12k㎡",
      steps: ["k㎡で答えるので、3000mを3kmになおす", "たて×横：3 × 4 = 12", "12k㎡"],
      tags: ["長方形の面積", "単位換算", "文章題"],
    },
    {
      id: "g4-area-normal-9",
      difficulty: "normal",
      question: "1辺2cmと1辺3cmが交わる長方形（となりあう辺の長さが2cmと3cm）の面積を求めましょう。",
      answer: "6c㎡",
      figure: {
        kind: "quadrilateral",
        shape: "rectangle",
        sideLabels: ["3cm", "2cm", "3cm", "2cm"],
        showRightAngles: true,
      },
      steps: ["長方形の面積＝たて×横", "2 × 3 = 6", "6c㎡"],
      tags: ["長方形の面積"],
    },
    {
      id: "g4-area-hard-3",
      difficulty: "hard",
      question:
        "あかねさんは、階段のような形をした畑の面積を、2×8+(6-2)×12という式で求めました。この式で求めた畑の面積は何㎡ですか。",
      answer: "64㎡",
      steps: ["2×8=16", "(6-2)×12=4×12=48", "16 + 48 = 64"],
      tags: ["面積の求め方のくふう", "文章題"],
    },
    {
      id: "g4-area-hard-4",
      difficulty: "hard",
      question:
        "たて20cm、横30cmの長方形の土地の中に、たて6cm、横15cmの長方形の池があります。池の部分を除いた土地の面積は何c㎡ですか。",
      answer: "510c㎡",
      steps: ["外側の長方形の面積：20 × 30 = 600", "池の面積：6 × 15 = 90", "600 - 90 = 510"],
      tags: ["面積の求め方のくふう", "文章題"],
    },
    {
      id: "g4-area-normal-10",
      difficulty: "normal",
      question: "1辺の長さが10mの正方形の面積を1アール（1a）といいます。1aは何㎡ですか。",
      answer: "100㎡",
      steps: ["10 × 10 = 100", "1a = 100㎡"],
      tags: ["面積の単位"],
    },
    {
      id: "g4-area-normal-11",
      difficulty: "normal",
      question: "1辺の長さが100mの正方形の面積を1ヘクタール（1ha）といいます。1haは何㎡ですか。",
      answer: "10000㎡",
      steps: ["100 × 100 = 10000", "1ha = 10000㎡"],
      tags: ["面積の単位"],
    },
    {
      id: "g4-area-hard-5",
      difficulty: "hard",
      question: "面積が1600㎡の長方形の畑があります。横の長さが80mとすると、たての長さは何mですか。",
      answer: "20m",
      figure: {
        kind: "quadrilateral",
        shape: "rectangle",
        sideLabels: ["80m", "？", "80m", "？"],
        showRightAngles: true,
      },
      steps: ["たての長さを□mとすると、□×80=1600", "□ = 1600 ÷ 80 = 20", "20m"],
      tags: ["長方形の面積", "文章題"],
    },
    {
      id: "g4-area-hard-6",
      difficulty: "hard",
      question: "上の畑（たて20m、横80m）のまわりの長さは何mになりますか。",
      answer: "200m",
      figure: {
        kind: "quadrilateral",
        shape: "rectangle",
        sideLabels: ["80m", "20m", "80m", "20m"],
        showRightAngles: true,
      },
      steps: ["まわりの長さは、たて＋横＋たて＋横", "(80 + 20) × 2 = 100 × 2 = 200", "200m"],
      tags: ["長方形のまわりの長さ", "文章題"],
    },
    {
      id: "g4-area-hard-7",
      difficulty: "hard",
      question:
        "54mのロープで長方形のドッジボールコートを作ります。たての長さは横の長さより7m短くなりました。このコートの面積を求めましょう。",
      answer: "120㎡",
      steps: [
        "たてが横より7m短いので、54mから7mを2つ分ひくと、たての長さの5つ分になる",
        "(54 - 7×2) ÷ 5 = 40 ÷ 5 = 8（たての長さ）",
        "横の長さ：8 + 7 = 15",
        "面積：8 × 15 = 120",
      ],
      tags: ["長方形の面積", "文章題"],
    },
  ],
};
