// pages/index.js
import fs from "fs";
import path from "path";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";

interface MockData {
  id: number;
  title: string;
  description: string;
}

export default function Home(data: MockData[]) {
  const router = useRouter();
  const { t, i18n } = useTranslation("common"); // i18n은 기본적으로 사용할 수 있어야 함

  const changeLanguage = (lang: string) => {
    i18n?.changeLanguage(lang);
    router.push(router.asPath, router.asPath, { locale: lang }); // URL 업데이트
  };

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>

      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("ko")}>한국어</button>

      <ul>
        {data?.map((item) => (
          <li key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext) {
  const filePath = path.join(process.cwd(), "public", "data", "mockData.json");
  const jsonData = fs.readFileSync(filePath, "utf8");
  const data: MockData = JSON.parse(jsonData);

  return {
    props: {
      ...(await serverSideTranslations(locale || "en", ["common"])), // i18n 삭제
      data,
    },
  };
}
