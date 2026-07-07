export function StepSolution({ steps, answer }: { steps: string[]; answer: string }) {
  return (
    <div className="flex flex-col gap-2 rounded bg-gray-50 p-3">
      <h3 className="text-sm font-semibold">とちゅうの式・考え方</h3>
      <ol className="list-decimal pl-5 text-sm">
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <p className="text-sm font-medium">正解：{answer}</p>
      <p className="text-xs text-gray-500">
        ノートに書いた自分の計算と、上の考え方を見比べてみましょう。
      </p>
    </div>
  );
}
