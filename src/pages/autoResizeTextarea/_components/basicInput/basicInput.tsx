import S from "./basicInput.module.scss";
import { useRef } from "react";

type BasicInputProps = {
  type: string;
  value?: any;
  handleInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function BasicInput({
  type,
  value,
  handleInput,
}: BasicInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "20px";
      textarea.style.height = `${textarea.scrollHeight}px`; // 내용에 따라 높이 조정

      const container = textarea.parentElement;
      if (container) {
        container.style.height = `${textarea.scrollHeight}px`; // 컨테이너 높이 업데이트
      }
    }
    handleInput(e);
  };

  return (
    <div className={`${S.basicInput} ${S[type]}`} style={{ height: "auto" }}>
      <textarea
        ref={textareaRef}
        className={S.textarea}
        placeholder="placeholder"
        name="test"
        value={value}
        onChange={handleTextarea}
        style={{ width: "auto", inset: "0" }}
      ></textarea>
    </div>
  );
}
