import React from "react";

interface LabelWrapperProps {
  label: string;
  children?: React.ReactNode;
}
const labelSpace = 3; //max 11
const labelStyle =
  "d-flex align-items-center justify-content-start pe-0 text-wrap small text-primary";
export const LabelWrapper: React.FC<LabelWrapperProps> = ({
  label,
  children,
}) => {
  return (
    <div className="row">
      <div className={`${labelStyle} col-${labelSpace}`}>
        <strong>{label}</strong>
      </div>
      <div className={`col-${12 - labelSpace}`}>
        <>{children} </>
      </div>
    </div>
  );
};
