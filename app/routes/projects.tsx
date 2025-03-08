import { useLoaderData, json } from "@remix-run/react";
import { getSheetData } from "../info.server";

export const loader = async () => {
  const data = await getSheetData();
  return json({ data });
};

const Project = () => {
  const data: any = useLoaderData();
  const content = data?.data?.projects;

  return (
    <section className="section">
      <h3>Projects</h3>

      {content.map((item: any, index: number) => {
        const { body } = item;

        return (
          <div className="content" key={index}>
            {body.period && (
              <div className="period flex items-center">
                <span className="period">{body.period}</span>
              </div>
            )}
            {body.name && (
              <div className="name flex items-center">
                <strong>{body.name}</strong>
                {body.type && (
                  <>
                    <span className="type">{" - "}</span>
                    <span>{body.type}</span>
                  </>
                )}
              </div>
            )}
            {body.content && (
              <div className="flex items-center">
                <div className="body-content">
                  <span className="type">{" - "}</span>
                  {body.content}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default Project;
