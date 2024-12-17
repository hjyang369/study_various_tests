import Head from "next/head";
import { io } from "socket.io-client";

const socket = io(
  process.env.NEXT_PUBLIC_REACT_APP_SERVER_URI || "http://localhost:8000",
  { transports: ["websocket"] }
);

export default function Home() {
  console.log("socket", socket);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>test</div>
        <div>소켓 연결됨? {socket ? socket.connected : "연결 중..."}</div>
        {/* <button>소켓 방 들어가기</button> */}
      </main>
    </>
  );
}
