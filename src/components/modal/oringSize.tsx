import React, { FunctionComponent } from "react";

interface OringSizeProps {
  id: number;
  cs: number;
}

const OringSize: FunctionComponent<OringSizeProps> = (props): JSX.Element => {
  return <div className="metricGrid"></div>;
};

export default OringSize;
