import React from "react";
import { StandardElementProps, inputStyle } from "components/common";

interface props extends StandardElementProps {
  name: string;
  placeholder?: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

const style = ` ${inputStyle} form-control form-control-sm`;

export const NumberInput: React.FC<props> = ({
  name,
  placeholder,
  handleChange,
}) => {
  return (
    <div>
      <input
        name={name}
        type="number"
        step="0.1"
        placeholder={placeholder ?? name}
        min={0}
        className={`${style}`}
        onChange={handleChange}
      />
    </div>
  );
};
