import type { MetaFunction } from "@remix-run/node";
import { useRouteLoaderData } from "@remix-run/react";
import { SiLinkedin } from "react-icons/si";
import { LuPodcast } from "react-icons/lu";
import { useColorStore } from "~/store/store";
import MainBackground from "~/components/MainBackground";
import { useEffect, useState } from "react";

export const meta: MetaFunction = () => {
  return [{ title: "이지훈" }, { name: "description", content: "이지훈" }];
};

// TODO: 언어 변경, 색상 모드 - 전역상태관리

export default function Index() {
  const data: any = useRouteLoaderData("root");
  const content = data.profile;

  const color = useColorStore((state) => state.color);
  const imageUrl =
    color === "dark" ? content.profileImageDark : content.profileImageLight;

  const [isShowImg, setIsShowImg] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setIsShowImg(true);
    };
  }, []);

  return (
    <section>
      {isShowImg ? (
        <>
          <div className="main-top-image-container">
            <div className="main-background-gradient-cover"></div>
            <MainBackground />
            <div className="main-image-content-container">
              <img
                className="profile animate-fade-in"
                src={imageUrl}
                alt="이지훈"
              />
              <h1 className="animate-from-up greeting">{content.greeting}</h1>
              <p className="animate-from-up sub-greeting">
                {content.subgreeting}
              </p>
            </div>
          </div>
          <div className="main-content-container">
            <p className="main-introduction animate-from-right">
              {content.introduction}
            </p>
            <div className="main-icon-container">
              <a href={content.podcast} target="_blank" rel="noreferrer">
                <LuPodcast />
              </a>
              <a href={content.linkedin} target="_blank" rel="noreferrer">
                <SiLinkedin />
              </a>
            </div>
          </div>
        </>
      ) : (
        "로딩 중"
      )}
    </section>
  );
}
