import Link from "next/link";

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Link href="/streamingText">text streaming test</Link>
      <Link href="/autoResizeTextarea">Auto Resize Textarea</Link>
    </div>
  );
}
