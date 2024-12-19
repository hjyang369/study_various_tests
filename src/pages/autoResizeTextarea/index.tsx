import React, { useRef, useState } from "react";
import BasicInput from "./_components/basicInput/basicInput";

export default function AutoResizeTextarea() {
  const [value, setValue] = useState<string>("");

  // textarea에 컨테이너 없는 경우
  // const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  // const handleInput = (
  //   e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  // ) => {
  //   const textarea = textareaRef.current;
  //   if (textarea) {
  //     textarea.style.height = "20px"; // 초기 높이 설정
  //     textarea.style.height = `${textarea.scrollHeight}px`; // 내용에 따라 높이 조절
  //   }
  //   setValue(e.target.value);
  // };

  return (
    // textarea에 컨테이너 없는 경우
    // <textarea
    //   ref={textareaRef}
    //   value={value}
    //   onInput={handleInput}
    //   rows={1}
    //   style={{
    //     width: "500px",
    //     height: "20px",
    //     resize: "none",
    //     overflow: "hidden",
    //     padding: "5px",
    //     fontSize: "14px",
    //     lineHeight: "20px",
    //     border: "1px solid #ccc",
    //     borderRadius: "4px",
    //     transition: "border-color 0.2s",
    //   }}
    // />

    // 컨테이너 있는 경우
    <div
      style={{
        width: "500px",
        display: "flex",
        flexDirection: "column",
        gap: "100px",
      }}
    >
      <BasicInput
        type="gradation"
        value={value}
        handleInput={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
