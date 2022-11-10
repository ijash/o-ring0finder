import React from "react";
import { StandardElementProps, inputStyle } from "components/common";
interface props extends StandardElementProps {
  name: string;
  placeholder?: string;
}
const style = ` ${inputStyle} form-control form-control-sm`;

export const TextInput: React.FC<props> = ({ name, placeholder }) => {
  return (
    <div>
      <input
        name={name}
        type="text"
        placeholder={placeholder ?? name}
        className={`${style}`}
      />
    </div>
  );
};
