import { useEffect, useState } from "react";

export default function ApplyPwa() {
  // 알림 여부 저장
  const [permission, setPermission] = useState("");

  useEffect(() => {
    setPermission(Notification?.permission);
  }, []);

  // 알림 설정 안되어있을 때 알림 동의 팝업 띄우는 함수
  const handleRequestPermission = async () => {
    await requestNotificationPermission();
    setPermission(Notification.permission);
  };

  // 현재 권한 허용되어있는지 확인하는 함수
  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      alert("이 브라우저는 알림을 지원하지 않습니다.");
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("알림 권한 허용됨 ✅");
    } else {
      console.log("알림 권한 거부됨 ❌");
    }
  };

  useEffect(() => {
    // if ("serviceWorker" in navigator) {
    //   navigator.serviceWorker.register("/sw.js").then(() => {
    //     console.log("Service Worker registered ✅");
    //   });
    // }
    console.log("serviceWorker" in navigator);
  }, []);

  const sendMockNotification = async () => {
    const res = await fetch("/api/sendPwa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Hello", body: "This is mock data" }),
    });
    const data = await res.json();

    // 실제라면 push 서버 → SW → 알림
    // mock: 클라이언트에서 직접 알림 발생
    if ("serviceWorker" in navigator) {
      const reg = await navigator.serviceWorker.ready;
      reg.showNotification(data.title, {
        body: data.body,
        icon: "/icons/icon-192x192.png",
      });
    }
  };

  return (
    <div>
      <button onClick={requestNotificationPermission}>권한 확인</button>
      <button onClick={handleRequestPermission}>
        default: 알림 권한 허용하기
      </button>

      {permission === "default" && <p>알림을 설정해주세요</p>}
      {permission === "granted" && <p>알림이 활성화되었습니다 🎉</p>}
      {permission === "denied" && <p>알림이 차단되었습니다 😢</p>}

      <button onClick={sendMockNotification}>Mock 알림 보내기</button>
    </div>
  );
}
