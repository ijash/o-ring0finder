import React from "react";

interface TitleProps {}

export const Title: React.FC<TitleProps> = (props) => {
  return (
    <div className="text-center">
      <h1 className="h1">O-Ring Finder</h1>
      <p>
        <small>
          Straight to the point o-ring size & code finder tool by
          <a href="https://github.com/ijash/"> ijash</a>
        </small>
      </p>
    </div>
  );
};
