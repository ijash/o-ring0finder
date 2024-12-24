import React from "react";
import { StandardElementProps, inputStyle } from "components/common";

interface ValueProp {
  name: string;
  value: string;
}
interface Props extends StandardElementProps {
  name: string;
  options: ValueProp[];
  handleChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const style = ` ${inputStyle} form-select form-select-sm`;

export const SelectInput: React.FC<Props> = ({
  name,
  options,
  handleChange,
}) => {
  return (
    <div>
      <select name={name} className={`${style}`} onChange={handleChange}>
        {options.map((o) => (
          <option value={o.value} key={o.name}>
            {o.name}
          </option>
        ))}
      </select>
    </div>
  );
};
