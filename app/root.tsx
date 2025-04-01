import {
  Links,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { getCategoryKeys, getSheetData } from "./info.server";
import useStore, { useColorStore } from "./store/store";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const meta: MetaFunction = () => {
  return [
    { title: "안녕하세요 이지훈입니다." },
    { name: "description", content: "이지훈" },
  ];
};

export const loader = async () => {
  const rawData = await getSheetData();
  const { profile, sheetData } = rawData;
  const categoryData = await getCategoryKeys();

  const categories = categoryData.categories;

  return json({ categories, profile, ...sheetData });
};

export default function App() {
  const lang = useStore((state) => state.lang);
  const color = useColorStore((state) => state.color);

  const data: any = useLoaderData();
  const { categories } = data;

  return (
    <html lang={lang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className={color}>
        <div className="container-wrapper">
          <div className="whole-container">
            <Header categories={categories} />
            <main>
              <Outlet />
            </main>
          </div>
        </div>
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
