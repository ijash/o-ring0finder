import React from "react";

interface Props {
  headerData: string[];
  handleSort?: React.MouseEventHandler<HTMLTableCellElement>;
}

const tHeadstyle = "bg-dark";
const thstyle = "text-light";

export const TableHead: React.FC<Props> = ({ headerData, handleSort }) => {
  function handleSortWithId(id: string) {
    console.log(id);
    return handleSort;
  }

  return (
    <thead className={tHeadstyle}>
      {headerData.map((h: string) => {
        const headerId = "th_" + h.replace(/ /g, "").toLowerCase();
        return (
          <th className={thstyle} onClick={() => handleSortWithId(headerId)}>
            <strong>{h}</strong>
          </th>
        );
      })}
    </thead>
  );
};
