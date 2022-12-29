import React from "react";
import { names } from "components/common";
interface TitleProps {}

export const Title: React.FC<TitleProps> = (props) => {
  const title = names.siteTitle;
  return (
    <div className="text-center">
      <title>{`${names.siteTitle} - By ${names.author}`}</title>
      <meta
        name="description"
        content={`${names.description} by ${names.author}. available in three common standards, which is AS568, Japanese JIS and Common Metric.`}
      />
      <h1 className="h1">{title}</h1>
      <p>
        <small>
          {names.description} by
          <a href="https://github.com/ijash/"> {names.author}</a>
        </small>
      </p>
    </div>
  );
};
