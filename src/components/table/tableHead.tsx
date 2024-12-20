import React from "react";
import { useSort } from "components/context/SortContext";

interface Props {
  headerData: string[];
}

const tHeadStyle = "bg-dark clickable";
const thStyle = "text-white ps-2";

export const TableHead: React.FC<Props> = ({ headerData }) => {
  const { sortBy, sortDirection, setSortBy, setSortDirection } = useSort();

  const handleSort = (header: string) => {
    if (sortBy === header) {
      setSortDirection(
        sortDirection === "asc"
          ? "desc"
          : sortDirection === "desc"
          ? "undefined"
          : "asc"
      );
    } else {
      setSortBy(header);
      setSortDirection("asc");
    }
  };
  const renderSortIcon = (header: string) => {
    if (sortBy === header) {
      const style = "bg-info";
      if (sortDirection === "asc") return { direction: `▲`, style: style };
      if (sortDirection === "desc") return { direction: `▼`, style: style };
    }
    return { direction: undefined, style: "" };
  };

  return (
    <thead className={tHeadStyle}>
      {headerData.map((h: string) => {
        const headerId = h.replace(/ /g, "").toLowerCase();
        return (
          <th
            key={headerId}
            className={`${renderSortIcon(headerId)?.style} ${thStyle}`}
            onClick={() => handleSort(headerId)}
          >
            {h}
            {renderSortIcon(headerId)?.direction}
          </th>
        );
      })}
    </thead>
  );
};
