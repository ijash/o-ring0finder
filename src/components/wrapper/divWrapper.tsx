import React from "react";

export function divWrapper(className: string, el: JSX.Element): JSX.Element {
  return <div className={`${className}`}>{el}</div>;
}
