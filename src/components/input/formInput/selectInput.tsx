import React from "react";
import { StandardElementProps, inputStyle } from "components/common";

interface ValueProp {
  name: string;
  value: string;
}
interface Props {
  name: string;
  options: ValueProp[];
}

const style = ` ${inputStyle} form-select form-select-sm`;

export const SelectInput: React.FC<Props> = ({ name, options }) => {
  return (
    <div>
      <select name={name} className={`${style}`}>
        {options.map((o) => (
          <option value={o.value}>{o.name}</option>
        ))}
      </select>
    </div>
  );
};
