import { useState } from "react";
import JSZip from "jszip";

export default function FetchImageCORS() {
  const [loading, setLoading] = useState(false);

  const downloadZip = async (blob: any) => {
    setLoading(true);
    const zip = new JSZip();

    try {
      // 여러 이미지를 서버로부터 받아와서 압축할 것이라고 가정
      const imageUrls = [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg",
        "https://example.com/image3.jpg",
      ];

      // 각 URL에 대해 fetch로 이미지 데이터를 받아와 ZIP 파일에 추가
      const imagePromises = imageUrls.map(async (url, index) => {
        // const response = await fetch(url);
        // const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();

        // ZIP 파일에 이미지 추가 (이미지 이름 설정)
        zip.file(`image${index + 1}.jpg`, arrayBuffer);
      });

      // 모든 이미지를 가져올 때까지 대기
      await Promise.all(imagePromises);

      // ZIP 파일 생성
      const zipBlob = await zip.generateAsync({ type: "blob" });

      // ZIP 파일 다운로드
      const downloadUrl = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "images.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error creating zip file:", error);
    } finally {
      setLoading(false);
    }
  };

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const fetchImage = async () => {
    try {
      // fetch로 API 호출
      const response = await fetch(
        process.env.NEXT_PUBLIC_REACT_APP_FETCH_IMAGE_URI ||
          "/api/fetchImage?url=https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDF6h6gyJTo5v9N2BZfZlUyqyLyCg87P6zAA&s"
      );

      // 요청 실패 처리
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }

      // Blob 데이터를 받아서 이미지 URL로 변환
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      // 변환된 URL을 상태에 저장하여 이미지 표시
      setImageUrl(objectUrl);
      downloadZip(blob);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  return (
    <div>
      <h1>Image Fetch Example</h1>
      <button onClick={fetchImage}>Fetch Image</button>

      {/* 이미지가 있으면 표시 */}
      {imageUrl && <img src={imageUrl} alt="Fetched Image" />}
    </div>
  );
}
