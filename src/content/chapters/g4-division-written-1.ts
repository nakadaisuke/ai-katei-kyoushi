import type { Chapter } from "@/lib/types";

// 問題は下記の実在教材の設問・解答をもとに作成（AIによる自由生成は行っていない）。
// - 宮城県教育センター「わくわくワーク」小学4年 算数 単元3「わり算の筆算（1）」
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele4_math/answer/07.els4.kaitou.03.1hop.pdf
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele4_math/answer/08.els4.kaitou.03.2stp.pdf
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele4_math/answer/09.els4.kaitou.03.3jmp.pdf
export const g4DivisionWritten1: Chapter = {
  id: "g4-division-written-1",
  grade: "小学4年",
  title: "わり算の筆算(1)",
  explanation: {
    summary: `何十・何百のわり算は、10や100のまとまりで考えると簡単に計算できます。例えば120÷3は、120を10のたば12こと考えて、12÷3=4、だから120÷3=40です。

3けた以上のわり算の筆算では、大きい位から順に「たてる・かける・ひく・おろす」をくり返します。商がどの位からたつかは、わられる数の上の位から見て、わる数でわれるかどうかで決まります。

わり算では、たしかめざん「わる数×商＋あまり＝わられる数」で答えを確認できます。また、ある数を求める文章題では、□を使った式に表してから逆算します。

96÷8のように、わられる数を分かりやすい2つの数の和に分けて（96=80+16）、それぞれをわってから足す、というくふうもできます。`,
    keyPoints: [
      "何十・何百のわり算は、10や100のまとまりで考える",
      "筆算は大きい位から「たてる・かける・ひく・おろす」をくり返す",
      "商がどの位からたつかは、わられる数の上の位がわる数でわれるかで決まる",
      "たしかめざん：わる数×商＋あまり＝わられる数",
      "わられる数を分かりやすい数の和に分けて計算するくふうもできる",
    ],
    diagram: { kind: "long-division", dividend: 408, divisor: 7 },
    notebookExample: {
      question: "例：96÷8を、96=80+16と考えて計算する",
      lines: [
        "96 = 80 + 16 と考える",
        "80 ÷ 8 = 10",
        "16 ÷ 8 = 2",
        "10 + 2 = 12 → 96 ÷ 8 = 12",
      ],
    },
  },
  practiceProblems: [
    {
      id: "g4-divwritten1-easy-1",
      difficulty: "easy",
      question: "60 ÷ 6 = ？",
      answer: "10",
      steps: ["60を10のたば6こと考える", "6 ÷ 6 = 1（たば）", "1たば = 10なので、60 ÷ 6 = 10"],
      tags: ["何十のわり算"],
    },
    {
      id: "g4-divwritten1-easy-2",
      difficulty: "easy",
      question: "900 ÷ 9 = ？",
      answer: "100",
      steps: ["900を100のたば9こと考える", "9 ÷ 9 = 1（たば）", "1たば = 100なので、900 ÷ 9 = 100"],
      tags: ["何百のわり算"],
    },
    {
      id: "g4-divwritten1-normal-1",
      difficulty: "normal",
      question: "120 ÷ 3 = ？",
      answer: "40",
      steps: ["120を10のたば12こと考える", "12 ÷ 3 = 4（たば）", "1たば = 10なので、120 ÷ 3 = 40"],
      tags: ["何十のわり算"],
    },
    {
      id: "g4-divwritten1-normal-2",
      difficulty: "normal",
      question: "490 ÷ 7 = ？",
      answer: "70",
      steps: ["490を10のたば49こと考える", "49 ÷ 7 = 7（たば）", "1たば = 10なので、490 ÷ 7 = 70"],
      tags: ["何十のわり算"],
    },
  ],
  assessmentProblems: [
    {
      id: "g4-divwritten1-easy-3",
      difficulty: "easy",
      question: "240 ÷ 3 = ？",
      answer: "80",
      steps: ["240を10のたば24こと考える", "24 ÷ 3 = 8（たば）", "1たば = 10なので、240 ÷ 3 = 80"],
      tags: ["何十のわり算"],
    },
    {
      id: "g4-divwritten1-easy-4",
      difficulty: "easy",
      question: "540 ÷ 5 = ？",
      answer: "108",
      steps: ["540 ÷ 5を筆算で計算する", "百の位：5 ÷ 5 = 1", "十の位：4 ÷ 5はわれないので0を立てて、あまり4を一の位へ", "一の位：40 ÷ 5 = 8", "540 ÷ 5 = 108"],
      tags: ["3桁のわり算"],
    },
    {
      id: "g4-divwritten1-easy-5",
      difficulty: "easy",
      question: "30本のえんぴつを3人に同じ数ずつ分けます。1人分は何本ですか。",
      answer: "10本",
      steps: ["30本を10本ずつのたばにすると3つのたばができる", "3つのたばを3人で分けると、1人1たば", "1たばは10本なので、1人分は10本"],
      tags: ["文章題"],
    },
    {
      id: "g4-divwritten1-normal-3",
      difficulty: "normal",
      question: "252 ÷ 4 の商は、何の位からたちますか。",
      answer: "十の位",
      steps: ["252の中の200（百の位）の2は4でわれない", "25（十の位まで）は4でわれるので、十の位から商がたつ"],
      tags: ["筆算のしくみ"],
    },
    {
      id: "g4-divwritten1-normal-4",
      difficulty: "normal",
      question: "618 ÷ 6 の商は、何の位からたちますか。",
      answer: "百の位",
      steps: ["618の中の6（百の位）は6でわれる", "百の位から商がたつ"],
      tags: ["筆算のしくみ"],
    },
    {
      id: "g4-divwritten1-normal-5",
      difficulty: "normal",
      question: "512 ÷ 8 = ？",
      answer: "64",
      steps: ["512 ÷ 8を筆算で計算する", "512 ÷ 8 = 64"],
      tags: ["3桁のわり算"],
    },
    {
      id: "g4-divwritten1-normal-6",
      difficulty: "normal",
      question: "408 ÷ 7 = ？（あまりも答えよう）",
      answer: "58あまり2",
      steps: ["408 ÷ 7を筆算で計算する", "7 × 58 = 406、408 - 406 = 2", "408 ÷ 7 = 58あまり2"],
      tags: ["3桁のわり算", "あまりのあるわり算"],
    },
    {
      id: "g4-divwritten1-normal-7",
      difficulty: "normal",
      question: "36 × 6 ÷ 3 = ？",
      answer: "72",
      steps: ["左から順に計算する", "36 × 6 = 216", "216 ÷ 3 = 72"],
      tags: ["計算の順序"],
    },
    {
      id: "g4-divwritten1-normal-8",
      difficulty: "normal",
      question: "160 ÷ 8 ÷ 2 = ？",
      answer: "10",
      steps: ["左から順に計算する", "160 ÷ 8 = 20", "20 ÷ 2 = 10"],
      tags: ["計算の順序"],
    },
    {
      id: "g4-divwritten1-normal-9",
      difficulty: "normal",
      question: "20cmの赤いテープと80cmの白いテープがあります。白いテープは赤いテープの何倍ですか。",
      answer: "4倍",
      steps: ["白いテープが赤いテープのいくつ分の長さかを求める", "80 ÷ 20 = 4", "4倍"],
      tags: ["文章題", "何倍"],
    },
    {
      id: "g4-divwritten1-normal-10",
      difficulty: "normal",
      question: "あつしさんのお父さんの体重は、あつしさんの体重の3倍で、72kgです。あつしさんの体重は何kgでしょうか。",
      answer: "24kg",
      steps: ["あつしさんの体重を□kgとすると、□×3=72", "□ = 72 ÷ 3 = 24", "あつしさんの体重は24kg"],
      tags: ["文章題", "逆算"],
    },
    {
      id: "g4-divwritten1-hard-1",
      difficulty: "hard",
      question: "ある数を5でわったら、商が7であまりは2になりました。ある数はいくつですか。",
      answer: "37",
      steps: ["ある数を□とすると、□÷5=7あまり2", "□ = 5×7+2 = 35+2 = 37"],
      tags: ["文章題", "逆算"],
    },
    {
      id: "g4-divwritten1-hard-2",
      difficulty: "hard",
      question: "128÷8÷2を、はじめに8÷2を計算してから128をわると、答えをまちがえてしまいます。左から順に正しく計算すると、答えはいくつになりますか。",
      answer: "8",
      steps: ["2回続くわり算は、左から順に計算する", "128 ÷ 8 = 16", "16 ÷ 2 = 8"],
      tags: ["計算の順序"],
    },
    {
      id: "g4-divwritten1-hard-3",
      difficulty: "hard",
      question:
        "ケーキ屋さんでショートケーキを120こ作りましたが、1こゆかに落として売り物にならなくなりました。この日、ケーキを3こずつつめて売るとき、3こずつつめる箱は全部でいくつあればよいですか。",
      answer: "39箱",
      steps: ["売り物になるケーキの数を求める：120 - 1 = 119", "119 ÷ 3 = 39あまり2", "39箱"],
      tags: ["文章題", "複合問題"],
    },
    {
      id: "g4-divwritten1-hard-4",
      difficulty: "hard",
      question:
        "貯金箱に50円玉をためています。50円玉が入った貯金箱の重さは632gで、貯金箱だけの重さは120g、50円玉1枚の重さは4gです。50円玉は何枚たまっていますか。",
      answer: "128枚",
      steps: ["50円玉だけの重さを求める：632 - 120 = 512", "512 ÷ 4 = 128", "128枚"],
      tags: ["文章題", "複合問題"],
    },
    {
      id: "g4-divwritten1-hard-5",
      difficulty: "hard",
      question: "96÷8を、96は80と16の和と考えて計算します。80÷8=10、16÷8=2なので、96÷8の答えはいくつになりますか。",
      answer: "12",
      steps: ["80÷8 = 10", "16÷8 = 2", "10 + 2 = 12"],
      tags: ["計算のくふう"],
    },
  ],
};
