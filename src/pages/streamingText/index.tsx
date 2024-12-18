import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]); // 과거 메시지 저장 배열
  const [formattedData, setFormattedData] = useState<JSX.Element[]>([]); // 현재 받아오고 있는 메시지
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetch("/api/stream");
    // reader: 스트림 데이터를 읽기 위한 ReadableStream 객체의 리더. ex) ReadableStreamDefaultReader
    // response.body가 존재하는 경우에만 getReader() 호출 가능
    const reader = response.body?.getReader();

    // TextDecoder: 바이트 데이터를 텍스트로 디코딩하는 객체.
    const decoder = new TextDecoder(); // {encoding: "utf-8", fatal: false, ignoreBOM: false}

    let result = "";

    if (!reader) return;

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        // api에서 보내주는 스트리밍 종료의 의미인 done이 트루일때 while문 종료
        setMessages((prev) => [...prev, result]);
        setFormattedData([]);
        break;
      }

      setIsLoading(false);
      // chunk는 현재 읽은 스트림 데이터.
      // value가 string이 아닌 [237, 160, 235, …] 바이트 데이터로 들어와서 decode가 필요함
      const chunk = decoder.decode(value, { stream: true });
      result += chunk;
      processText(result);
    }
  };

  const processText = (text: string) => {
    const parts = text.split("*"); // *를 기준으로 텍스트 나누기
    const formatted: JSX.Element[] = [];

    parts.forEach((part, index) => {
      if (index % 2 === 1) {
        formatted.push(
          <span key={index} style={{ color: "yellow" }}>
            {part}
          </span>
        );
      } else {
        formatted.push(
          <span key={index} style={{ color: "black" }}>
            {part}
          </span>
        );
      }
    });

    setFormattedData(formatted);
  };

  // 과거 메시지를 노란색과 흰색으로 나누는 함수
  const formatMessage = (message: string) => {
    const parts = message.split("*");
    return parts.map((part, index) => {
      return (
        <span
          key={index}
          style={{ color: index % 2 === 1 ? "orange" : "black" }}
        >
          {part}
        </span>
      );
    });
  };

  return (
    <div>
      <h1>Streaming Messages</h1>
      <button
        onClick={fetchData}
        disabled={isLoading}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          cursor: isLoading ? "not-allowed" : "pointer",
        }}
      >
        {isLoading ? "Loading..." : "Fetch Message"}
      </button>
      <div>
        {/* 과거 메시지 */}
        {messages?.map((message, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            {formatMessage(message)}
          </div>
        ))}
        {/* 실시간 메시지 */}
        <div>{isLoading ? "로딩중입니다" : formattedData}</div>
      </div>
    </div>
  );
}
