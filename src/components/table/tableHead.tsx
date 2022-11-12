import React from "react";

interface Props {
  headerData: string[];
}

const style = "table-dark bg-dark";

export const TableHead: React.FC<Props> = ({ headerData }) => {
  return (
    <thead className={style}>
      {headerData.map((h: string) => (
        <th>
          <strong>{h}</strong>
        </th>
      ))}
    </thead>
  );
};
