import type { Chapter } from "@/lib/types";

// 問題は下記の実在教材の設問・解答をもとに作成（AIによる自由生成は行っていない）。
// - 宮城県教育センター「わくわくワーク」小学3年 算数 単元5「長いものの長さのはかり方と表し方」・単元13「重さのたんいとはかり方」
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele3_math/answer/00.els3.kaitou.all.pdf
// - 埼玉県「学力向上ワークシート」算数 小学3年 5 長さ・13 重さ
//   https://www.pref.saitama.lg.jp/documents/56538/3-5nagaimonononagasa-mondai.pdf
//   https://www.pref.saitama.lg.jp/documents/56538/3-13omosanotanitohakarikata-mondai.pdf
//   （県の著作権ページには教育目的の一律利用許可の記載はなく、すたぺんドリルと
//   同様に「個人利用の範囲で使用し、商用化・配布前に見直す」caveatを踏襲する）
export const g3LengthWeight: Chapter = {
  id: "g3-length-weight",
  grade: "小学3年",
  title: "長さと重さ",
  explanation: {
    summary: `長さの単位には mm・cm・m・km があります。1m = 100cm、1km = 1000m です。
重さの単位には g・kg・t（トン）があります。1kg = 1000g、1t = 1000kg です。

長さや重さの単位換算は、大きい単位から小さい単位にするときは「×1000」（または×100）、小さい単位から大きい単位にするときは「÷1000」（または÷100）と覚えておくと便利です。

例えば9km200mをすべてmで表すときは、9km = 9000mなので、9000 + 200 = 9200mです。

道のり（実際に歩く道に沿った長さ）と、きょり（まっすぐ測った長さ）は違うことにも注意しましょう。`,
    keyPoints: [
      "長さの単位：1m = 100cm、1km = 1000m",
      "重さの単位：1kg = 1000g、1t = 1000kg",
      "大きい単位→小さい単位は掛け算、小さい単位→大きい単位は割り算で変換する",
      "道のり（実際に歩く長さ）と、きょり（まっすぐの長さ）は違う",
    ],
    notebookExample: {
      question: "例：9km200mは、何mですか。",
      lines: [
        "9km を m に直す：9km = 9000m",
        "9000m + 200m = 9200m",
        "9km200m = 9200m",
      ],
    },
  },
  practiceProblems: [
    {
      id: "g3-lenwt-easy-1",
      difficulty: "easy",
      question: "3km は何mですか。",
      answer: "3000",
      steps: ["1km = 1000mなので、3km = 3 × 1000 = 3000m"],
      tags: ["長さの単位換算"],
    },
    {
      id: "g3-lenwt-easy-2",
      difficulty: "easy",
      question: "1kgは何gですか。",
      answer: "1000",
      steps: ["1kg = 1000gというきまりを使う"],
      tags: ["重さの単位換算"],
    },
    {
      id: "g3-lenwt-normal-1",
      difficulty: "normal",
      question: "9km200mは何mですか。",
      answer: "9200",
      steps: ["9km = 9000m", "9000m + 200m = 9200m"],
      tags: ["長さの単位換算"],
    },
    {
      id: "g3-lenwt-normal-2",
      difficulty: "normal",
      question: "2300gは何kg何gですか。",
      answer: "2kg300g",
      steps: ["2300gのうち、1000gごとに1kgとする", "2300g = 2000g + 300g = 2kg300g"],
      tags: ["重さの単位換算"],
    },
  ],
  assessmentProblems: [
    {
      id: "g3-lenwt-easy-3",
      difficulty: "easy",
      question: "6000mは何kmですか。",
      answer: "6",
      steps: ["1000mで1kmなので、6000m = 6km"],
      tags: ["長さの単位換算"],
    },
    {
      id: "g3-lenwt-easy-4",
      difficulty: "easy",
      question: "4kgは何gですか。",
      answer: "4000",
      steps: ["1kg = 1000gなので、4kg = 4 × 1000 = 4000g"],
      tags: ["重さの単位換算"],
    },
    {
      id: "g3-lenwt-easy-5",
      difficulty: "easy",
      question: "1トンは何キログラムですか。",
      answer: "1000",
      steps: ["1t = 1000kgというきまりを使う"],
      tags: ["重さの単位換算"],
    },
    {
      id: "g3-lenwt-normal-3",
      difficulty: "normal",
      question: "4800mは何km何mですか。",
      answer: "4km800m",
      steps: ["4800mのうち、1000mごとに1kmとする", "4800m = 4000m + 800m = 4km800m"],
      tags: ["長さの単位換算"],
    },
    {
      id: "g3-lenwt-normal-4",
      difficulty: "normal",
      question: "2km600mは何mですか。",
      answer: "2600",
      steps: ["2km = 2000m", "2000m + 600m = 2600m"],
      tags: ["長さの単位換算"],
    },
    {
      id: "g3-lenwt-normal-5",
      difficulty: "normal",
      question: "3000gは何kgですか。",
      answer: "3",
      steps: ["1000gで1kgなので、3000g = 3kg"],
      tags: ["重さの単位換算"],
    },
    {
      id: "g3-lenwt-normal-6",
      difficulty: "normal",
      question: "7kg30gは何gですか。",
      answer: "7030",
      steps: ["7kg = 7000g", "7000g + 30g = 7030g"],
      tags: ["重さの単位換算"],
    },
    {
      id: "g3-lenwt-normal-7",
      difficulty: "normal",
      question:
        "たろうさんの家から学校までの道は、途中の角まで600m、そこから学校まで300mです。たろうさんの家から学校までの道のりは何mですか。",
      answer: "900",
      steps: ["道のりは実際に歩く道に沿った長さの合計", "600m + 300m = 900m"],
      tags: ["長さの単位換算", "文章題"],
    },
    {
      id: "g3-lenwt-hard-1",
      difficulty: "hard",
      question:
        "駅からスーパーまで、道にそって歩くと道のりは680mです。まっすぐ測ったきょりは520mです。道のりはきょりより何m長いですか。",
      answer: "160",
      steps: ["「道のり」と「きょり」の差を求める", "680 - 520 = 160", "道のりのほうが160m長い"],
      tags: ["長さの単位換算", "文章題"],
    },
    {
      id: "g3-lenwt-hard-2",
      difficulty: "hard",
      question:
        "中身の入ったお弁当箱の重さをはかったら、380gありました。中身を食べてから弁当箱の重さをはかったら、75gありました。中身の重さは何gですか。",
      answer: "305",
      steps: ["「全体の重さ - 弁当箱の重さ = 中身の重さ」と考える", "380 - 75 = 305", "中身の重さは305g"],
      tags: ["重さの単位換算", "文章題"],
    },
    {
      id: "g3-lenwt-hard-3",
      difficulty: "hard",
      question: "5箱で400gのチョコレートがあります。1箱の重さは何gですか。",
      answer: "80",
      steps: ["「全体の重さ ÷ 箱の数 = 1箱の重さ」と考える", "400 ÷ 5 = 80", "1箱の重さは80g"],
      tags: ["重さの単位換算", "文章題"],
    },
    {
      id: "g3-lenwt-hard-4",
      difficulty: "hard",
      question: "1200kgの車が、3台あります。重さはぜんぶで、何t何kgになりますか。",
      answer: "3t600kg",
      steps: [
        "1台分の重さ×台数を求める：1200 × 3 = 3600（kg）",
        "3600kgをtとkgで表す：3600kg = 3000kg + 600kg = 3t600kg",
      ],
      tags: ["重さの単位換算", "文章題", "複合問題"],
    },
    {
      id: "g3-lenwt-hard-5",
      difficulty: "hard",
      question:
        "まさおさんの体重は28kg、妹は21kgです。お母さんの体重は2人の体重を合わせたものより、7kg重いそうです。お母さんの体重は何kgですか。",
      answer: "56",
      steps: [
        "2人の体重を合わせる：28 + 21 = 49",
        "お母さんの体重はそれより7kg重い：49 + 7 = 56",
        "お母さんの体重は56kg",
      ],
      tags: ["重さの単位換算", "文章題", "複合問題"],
    },
    {
      id: "g3-lenwt-hard-6",
      difficulty: "hard",
      question:
        "はな子さんの家から学校までの道のりは2km700m、じろうさんの家から学校までの道のりは1km900mあります。どちらがどれだけ長いですか。",
      answer: "はな子さん、800m",
      steps: [
        "kmをmに直して考える：2km700m = 2700m、1km900m = 1900m",
        "2700 - 1900 = 800",
        "はな子さんが800m長い",
      ],
      tags: ["長さの単位換算", "文章題", "複合問題"],
    },
    {
      id: "g3-lenwt-normal-8",
      difficulty: "normal",
      question: "1250mは何km何mですか。",
      answer: "1km250m",
      steps: ["1250mのうち、1000mごとに1kmとする", "1250m = 1000m + 250m = 1km250m"],
      tags: ["長さの単位換算"],
    },
    {
      id: "g3-lenwt-normal-9",
      difficulty: "normal",
      question: "3kg40gは何gですか。",
      answer: "3040",
      steps: ["3kg = 3000g", "3000g + 40g = 3040g"],
      tags: ["重さの単位換算"],
    },
    {
      id: "g3-lenwt-normal-10",
      difficulty: "normal",
      question: "1600gは何kg何gですか。",
      answer: "1kg600g",
      steps: ["1600gのうち、1000gごとに1kgとする", "1600g = 1000g + 600g = 1kg600g"],
      tags: ["重さの単位換算"],
    },
    {
      id: "g3-lenwt-normal-11",
      difficulty: "normal",
      question: "2090gは何kg何gですか。",
      answer: "2kg90g",
      steps: ["2090gのうち、1000gごとに1kgとする", "2090g = 2000g + 90g = 2kg90g"],
      tags: ["重さの単位換算"],
    },
    {
      id: "g3-lenwt-normal-12",
      difficulty: "normal",
      question: "2t70kgは何kgですか。",
      answer: "2070",
      steps: ["2t = 2000kg", "2000kg + 70kg = 2070kg"],
      tags: ["重さの単位換算"],
    },
    {
      id: "g3-lenwt-normal-13",
      difficulty: "normal",
      question: "1円玉の重さは何gですか。",
      answer: "1",
      steps: ["1円玉1こは、ちょうど1gの重さになるように作られている"],
      tags: ["重さの単位換算"],
    },
    {
      id: "g3-lenwt-normal-14",
      difficulty: "normal",
      question: "1kgまではかれるはかりがあります。このはかりでは、何gまではかることができますか。",
      answer: "1000",
      steps: ["1kg = 1000gなので、このはかりは1000gまではかることができる"],
      tags: ["重さの単位換算"],
    },
    {
      id: "g3-lenwt-hard-7",
      difficulty: "hard",
      question:
        "はばが1mのモップを4つ使って、となりのモップと10cmずつ重ねてつなげます。モップ4つ分の全体のはばは何m何cmになりますか。",
      answer: "3m70cm",
      steps: [
        "モップ4つの長さの合計：1m × 4 = 4m = 400cm",
        "重なる部分は、モップとモップの間の3か所で、それぞれ10cmずつ短くなる：10 × 3 = 30cm",
        "400cm - 30cm = 370cm = 3m70cm",
      ],
      tags: ["長さの単位換算", "文章題", "複合問題"],
    },
    {
      id: "g3-lenwt-hard-8",
      difficulty: "hard",
      question:
        "けんばんハーモニカの重さをはかると700gでした。そのケースの重さをはかると600gでした。けんばんハーモニカをケースに入れると、全体の重さは何kg何gになるでしょうか。",
      answer: "1kg300g",
      steps: ["「合わせる」のでたし算 700 + 600 を考える", "700 + 600 = 1300g", "1300g = 1kg300g"],
      tags: ["重さの単位換算", "文章題"],
    },
    {
      id: "g3-lenwt-hard-9",
      difficulty: "hard",
      question:
        "重さ900gのランドセルにものを入れてはかると、合わせて2kg800gありました。ランドセルに入れたものの重さは、何kg何gあるでしょうか。",
      answer: "1kg900g",
      steps: [
        "2kg800g をgに直す：2800g",
        "「全体の重さ - ランドセルの重さ = 入れたものの重さ」と考える",
        "2800 - 900 = 1900g",
        "1900g = 1kg900g",
      ],
      tags: ["重さの単位換算", "文章題"],
    },
  ],
};
