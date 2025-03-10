import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "이지훈" }, { name: "description", content: "이지훈" }];
};

// TODO: 언어 변경은 전역상태관리로 변경할 것

export default function Index() {
  return (
    <>
      {/* <div className="main-img"></div>
      <img className="profile-img" src="/asset/ddd.png" alt="" /> */}
    </>
  );
}
