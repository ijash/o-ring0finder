import React from "react";
import { StandardElementProps } from "components/common";
interface props extends StandardElementProps {
  name: string;
  placeholder?: string;
  handleChange: React.MouseEventHandler<HTMLButtonElement>;
}
const style = `text-center btn btn-primary form-control form-control-sm`;

export const ButtonInput: React.FC<props> = ({ name, value, handleChange }) => {
  return (
    <div className="shadow-sm">
      <button className={`${style}`} onClick={handleChange}>
        {value}
      </button>
    </div>
  );
};
