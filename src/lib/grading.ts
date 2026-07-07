const FULLWIDTH_DIGITS = "０１２３４５６７８９";

function toHalfWidthDigits(input: string): string {
  return input.replace(/[０-９]/g, (ch) =>
    String(FULLWIDTH_DIGITS.indexOf(ch)),
  );
}

export function normalizeAnswer(raw: string): string {
  return toHalfWidthDigits(raw)
    .trim()
    .replace(/\s+/g, "")
    .replace(/余り|のこり|残り/g, "あまり")
    .replace(/,/g, "");
}

export function isCorrectAnswer(studentAnswer: string, correctAnswer: string): boolean {
  return normalizeAnswer(studentAnswer) === normalizeAnswer(correctAnswer);
}
