import { useParams, useRouteLoaderData } from "@remix-run/react";

const CategoryRoute = () => {
  const data: any = useRouteLoaderData("root");
  const { category }: { category: string } = useParams();
  const content = data[category];

  return (
    <section className="section">
      <h3 className="animate-from-down">{category}</h3>

      {content.map((item: any, index: number) => {
        const { body } = item;

        return (
          <div className="content" key={index}>
            {body.period && (
              <div className="period flex items-center animate-from-right-1">
                <span className="period">{body.period}</span>
              </div>
            )}
            {body.name && (
              <div className="name animate-from-right-2">
                <strong>{body.name}</strong>
                {body.type && (
                  <div className="type">
                    <span className="type">{" - "}</span>
                    <span>{body.type}</span>
                  </div>
                )}
              </div>
            )}
            {body.content && (
              <div className="flex items-center animate-from-right-3">
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

export default CategoryRoute;
