const FULLWIDTH_DIGITS = "０１２３４５６７８９";

function toHalfWidthDigits(input: string): string {
  return input.replace(/[０-９]/g, (ch) =>
    String(FULLWIDTH_DIGITS.indexOf(ch)),
  );
}

// 算数・数学の答えは特殊文字（㎡等）や漢字/ひらがなの表記ゆれが多いため、
// 「余り／のこり／残り→あまり」と同じ考え方で、既知の表記ゆれを1つの
// カノニカルな表記に畳み込むテーブルを積み重ねる。新しい表記ゆれが
// 見つかった場合もこのテーブルに1行足すだけで対応できるようにする。

// 面積の単位：㎡系の合字はIME入力が難しいため、ASCII表記（cm2, cm^2 等）や
// 「平方センチメートル」のような読み下し表記からも同じカノニカル表記に畳み込む。
// km2/cm2をm2より先に処理しないと、m2側のパターンに巻き込まれてしまう。
// "2"の直後に別の数字が続く場合（例："1km250m"の"km2"）は単位表記の"2乗"
// ではなく別の数の一部なので、否定先読みで除外する。
const UNIT_REPLACEMENTS: [RegExp, string][] = [
  [/km\^?2(?!\d)|km²|㎢|平方キロメートル/gi, "k㎡"],
  [/cm\^?2(?!\d)|cm²|㎠|平方センチメートル/gi, "c㎡"],
  [/m\^?2(?!\d)|m²|平方メートル/gi, "㎡"],
];

// 図形・分数などの用語は、漢字を習っていない生徒がひらがなで書いても
// 正解にする。複合語（例：平行四辺形＝へいこうしへんけい）を、それを
// 部分文字列として含む短い語（へいこう）より先に処理する必要がある。
const VOCAB_REPLACEMENTS: [RegExp, string][] = [
  [/にとうへんさんかっけい|にとうへんさんかくけい/g, "二等辺三角形"],
  [/ちょっかくさんかっけい|ちょっかくさんかくけい/g, "直角三角形"],
  [/せいさんかっけい|せいさんかくけい/g, "正三角形"],
  [/へいこうしへんけい/g, "平行四辺形"],
  [/しんぶんすう/g, "真分数"],
  [/かぶんすう/g, "仮分数"],
  [/たいぶんすう/g, "帯分数"],
  [/すいちょく/g, "垂直"],
  [/へいこう/g, "平行"],
  [/だいけい/g, "台形"],
  [/せいほうけい/g, "正方形"],
  [/ちょうほうけい/g, "長方形"],
  [/ちょくほうたい/g, "直方体"],
  [/りっぽうたい/g, "立方体"],
  [/ひしがた|菱形/g, "ひし形"],
  [/へいほう/g, "平方"],
];

export function normalizeAnswer(raw: string): string {
  let text = toHalfWidthDigits(raw)
    .trim()
    .replace(/\s+/g, "")
    .replace(/余り|のこり|残り/g, "あまり")
    .replace(/度/g, "°")
    // 数字に挟まれた半角カンマ（"13,000"の桁区切り）だけを除去する。
    // 数字に挟まれていないカンマ（"女子,39人"）はパーツ区切りとして
    // splitParts に残す必要があるため、ここでは消さない。
    .replace(/(?<=\d),(?=\d)/g, "");

  for (const [pattern, replacement] of VOCAB_REPLACEMENTS) {
    text = text.replace(pattern, replacement);
  }
  for (const [pattern, replacement] of UNIT_REPLACEMENTS) {
    text = text.replace(pattern, replacement);
  }
  return text;
}

// 「90」と「90°」のように、数値そのものが合っていれば単位の有無・表記ゆれ
// （例："度"と"°"、単位の省略）は正解として扱う。ただし分数（"3/8"など）を
// 整数部分だけで一致させてしまわないよう、単位側に数字が含まれる場合は対象外にする。
const NUMERIC_PREFIX = /^-?\d+(\.\d+)?/;

function isUnitOnly(text: string): boolean {
  return !/\d/.test(text);
}

// 引数はすでに normalizeAnswer 済みの文字列を想定
function matchesNumericWithUnit(student: string, correct: string): boolean {
  const studentMatch = student.match(NUMERIC_PREFIX);
  const correctMatch = correct.match(NUMERIC_PREFIX);
  if (!studentMatch || !correctMatch || studentMatch[0] !== correctMatch[0]) {
    return false;
  }

  const studentRest = student.slice(studentMatch[0].length);
  const correctRest = correct.slice(correctMatch[0].length);
  return isUnitOnly(studentRest) && isUnitOnly(correctRest);
}

const KANJI_DIGITS: Record<string, number> = {
  "〇": 0,
  "一": 1,
  "二": 2,
  "三": 3,
  "四": 4,
  "五": 5,
  "六": 6,
  "七": 7,
  "八": 8,
  "九": 9,
};

// "二千七百七十"のような、千・百・十の位取り表現のみからなる4桁未満の
// グループを数値に変換する（"1000万"の"1000"のような算用数字グループはこちらを通らない）。
function parseKanjiSmallGroup(text: string): number | null {
  let total = 0;
  let current = 0;
  let hasCurrent = false;
  for (const ch of text) {
    if (ch in KANJI_DIGITS) {
      if (hasCurrent) return null; // 位取りマーカーを挟まない連続数字は不正な並び
      current = KANJI_DIGITS[ch];
      hasCurrent = true;
      continue;
    }
    const multiplier = ch === "千" ? 1000 : ch === "百" ? 100 : ch === "十" ? 10 : null;
    if (multiplier === null) return null;
    total += (hasCurrent ? current : 1) * multiplier;
    current = 0;
    hasCurrent = false;
  }
  return total + current;
}

function parseNumberGroup(text: string): number | null {
  if (text === "") return 1;
  if (/^\d+$/.test(text)) return Number(text);
  return parseKanjiSmallGroup(text);
}

// 大きな数の読み方は、算用数字と漢数字（十/百/千/万/億/兆）が混在しうる
// （例："15億"、"5兆2000億"、"一億二千七百七十万四千四十"、"1億2770万4040"）。
// 兆・億・万で区切ったグループごとにパースし、生徒がどちらの書き方をしても
// 同じ数値であれば正解にできるようにする。数値表記以外の文字を含む場合は
// （"十の位"のような位取りの名称と誤認しないよう）nullを返す。
export function parseJapaneseNumber(text: string): number | null {
  if (/^\d+$/.test(text)) return Number(text);
  if (!/^[0-9〇一二三四五六七八九十百千万億兆]+$/.test(text)) return null;

  const BIG_UNITS: [string, number][] = [
    ["兆", 1e12],
    ["億", 1e8],
    ["万", 1e4],
  ];

  let remaining = text;
  let result = 0;
  for (const [unit, value] of BIG_UNITS) {
    const idx = remaining.indexOf(unit);
    if (idx === -1) continue;
    const groupValue = parseNumberGroup(remaining.slice(0, idx));
    if (groupValue === null) return null;
    result += groupValue * value;
    remaining = remaining.slice(idx + 1);
  }

  if (remaining !== "") {
    const rest = parseNumberGroup(remaining);
    if (rest === null) return null;
    result += rest;
  }

  return result;
}

function splitParts(text: string): string[] {
  return text.split(/[、，,]/).filter((part) => part.length > 0);
}

// 「、」区切りの複合的な答え（例："8月、25℃"）は、質問が2つ以上のことを
// 同時に問うている場合の順不同判定。各パーツの対応付けにも isCorrectAnswer を
// 再帰的に使うことで、単位・語彙の表記ゆれや数値+単位の寛容化がパーツ単位でも効く。
function partsMatch(studentParts: string[], correctParts: string[]): boolean {
  if (studentParts.length !== correctParts.length) return false;
  const used = new Array<boolean>(correctParts.length).fill(false);

  function backtrack(i: number): boolean {
    if (i === studentParts.length) return true;
    for (let j = 0; j < correctParts.length; j++) {
      if (used[j]) continue;
      if (isCorrectAnswer(studentParts[i], correctParts[j])) {
        used[j] = true;
        if (backtrack(i + 1)) return true;
        used[j] = false;
      }
    }
    return false;
  }

  return backtrack(0);
}

export function isCorrectAnswer(studentAnswer: string, correctAnswer: string): boolean {
  const student = normalizeAnswer(studentAnswer);
  const correct = normalizeAnswer(correctAnswer);
  if (student === correct) return true;

  if (matchesNumericWithUnit(student, correct)) return true;

  const studentNum = parseJapaneseNumber(student);
  const correctNum = parseJapaneseNumber(correct);
  if (studentNum !== null && correctNum !== null && studentNum === correctNum) {
    return true;
  }

  const correctParts = splitParts(correct);
  if (correctParts.length > 1) {
    const studentParts = splitParts(student);
    if (partsMatch(studentParts, correctParts)) return true;
  }

  return false;
}
