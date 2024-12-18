export const config = {
  runtime: "edge",
};

export default async function handler(req: Request): Promise<Response> {
  const content = `
    모든 국민은 법률이 정하는 바에 의하여 공무담임권을 가진다.
    대법원장의 임기는 6년으로 하며, 중임할 수 없다.
    *대통령이 궐위된 때 또는 대통령 당선자가 사망하거나 판결 기타의 사유로
    그 자격을 상실한 때에는 60일 이내에 후임자를 선거한다.
    모든 국민은 법률이 정하는 바에 의하여 국방의 의무를 진다.*
    연소자의 근로는 특별한 보호를 받는다.
    헌법재판소 재판관은 탄핵 또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지 아니한다.
    국회의원은 법률이 정하는 직을 겸할 수 없다.
    각급 선거관리위원회의 조직·직무범위 기타 필요한 사항은 법률로 정한다.
    국가는 지역간의 균형있는 발전을 위하여 지역경제를 육성할 의무를 진다.
  `;

  const sentences: string[] = content.trim().split("\n");

  const stream = new ReadableStream({
    async start(controller) {
      for (const sentence of sentences) {
        const chunk = `${sentence.trim()}\n`;
        controller.enqueue(new TextEncoder().encode(chunk));
        await new Promise((resolve) => setTimeout(resolve, 500)); // 각 문장 사이에 딜레이
      }
      controller.close(); // 스트림 종료
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
