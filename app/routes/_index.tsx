import type { MetaFunction } from "@remix-run/node";
import { useRouteLoaderData } from "@remix-run/react";
import { SiLinkedin } from "react-icons/si";
import { LuPodcast } from "react-icons/lu";

export const meta: MetaFunction = () => {
  return [{ title: "이지훈" }, { name: "description", content: "이지훈" }];
};

// TODO: 언어 변경, 색상 모드 - 전역상태관리

export default function Index() {
  const data: any = useRouteLoaderData("root");

  const content = data.profile;

  return (
    <section className="section">
      <h1 className="animation-from-up">{content.greeting}</h1>
      <p className="main-introduction">{content.introduction}</p>
      <div className="main-icon-container">
        <a href={content.podcast} target="_blank" rel="noreferrer">
          <LuPodcast />
        </a>
        <a href={content.linkedin} target="_blank" rel="noreferrer">
          <SiLinkedin />
        </a>
      </div>
    </section>
  );
}
