import React from "react";

interface Props {
  headerData: string[];
  handleSort?: React.MouseEventHandler<HTMLTableCellElement>;
}

const tHeadStyle = "bg-dark";
const thStyle = "text-white";

export const TableHead: React.FC<Props> = ({ headerData, handleSort }) => {
  function handleSortWithId(id: string) {
    console.log(id);
    return handleSort;
  }

  return (
    <thead className={tHeadStyle}>
      {headerData.map((h: string) => {
        const headerId = "th_" + h.replace(/ /g, "").toLowerCase();
        return (
          <th className={thStyle} onClick={() => handleSortWithId(headerId)}>
            {h}
          </th>
        );
      })}
    </thead>
  );
};
