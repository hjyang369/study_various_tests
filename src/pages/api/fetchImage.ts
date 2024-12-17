import type { NextApiRequest, NextApiResponse } from "next";

// 응답 타입 정의
type ErrorResponse = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | Buffer>
) {
  // HTTP 메소드가 GET이 아닐 경우 처리
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // URL 파라미터에서 이미지 URL을 가져옴
  const imageUrl = req.query.url as string;

  // URL이 없을 경우 에러 반환
  if (!imageUrl) {
    return res.status(400).json({ message: "Image URL is required" });
  }

  try {
    // 이미지 URL을 fetch로 요청
    const response = await fetch(imageUrl);

    // 이미지가 정상적으로 받아지지 않을 경우 에러 처리
    if (!response.ok) {
      console.log(response);
      return res.status(500).json({ message: "Failed to fetch image" });
    }

    // 이미지를 Blob 형태로 변환
    const arrayBuffer = await response.arrayBuffer();

    // Blob 데이터를 응답으로 전송
    res.setHeader("Content-Type", "image/jpeg"); // 이미지 타입을 JPEG로 설정
    res.setHeader("Content-Disposition", "inline"); // 이미지를 브라우저에서 인라인으로 보여줌
    res.status(200).send(Buffer.from(arrayBuffer));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching the image" });
  }
}
