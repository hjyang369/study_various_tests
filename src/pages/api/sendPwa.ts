export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const { title, body } = req.body;

    // 실제라면 WebPush 라이브러리 이용해서 구독자들에게 발송
    // 여기선 mock → 클라이언트에서 service worker 호출하도록 응답 반환
    res.status(200).json({
      success: true,
      title: title || "Mock Notification",
      body: body || "This is a mock push notification.",
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
