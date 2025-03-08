import { useLoaderData, json } from "@remix-run/react";
import { getSheetData } from "../info.server";

export const loader = async () => {
  const data = await getSheetData();
  return json({ data });
};

const Career = () => {
  const data = useLoaderData();

  return (
    <div>
      <div></div>
    </div>
  );
};

export default Career;
