import type { MetaFunction } from "@remix-run/node";
import { useRouteLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "이지훈" }, { name: "description", content: "이지훈" }];
};

// TODO: 언어 변경은 전역상태관리로 변경할 것

export default function Index() {
  const data: any = useRouteLoaderData("root");

  const content = data.profile;
  const keys = Object.keys(content);

  return (
    <section className="section">
      {keys.map((v, i) => {
        return <div key={i}>{content[v]}</div>;
      })}
    </section>
  );
}
