import React from "react";
import { useSort, SortDirection } from "components/context/SortContext";

interface Props {
  headerData: string[];
}

const tHeadStyle = "bg-dark clickable";
const thStyle = "text-white ";

export const TableHead: React.FC<Props> = ({ headerData }) => {
  const { sortBy, sortDirection, setSortBy, setSortDirection } = useSort();

  const handleSort = (header: string) => {
    if (sortBy === header) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(header);
      setSortDirection("asc");
    }
  };

  const renderSortIcon = (header: string) => {
    if (sortBy === header) {
      return sortDirection === "asc" ? "▲" : "▼";
    }
    return null;
  };

  return (
    <thead className={tHeadStyle}>
      {headerData.map((h: string) => {
        const headerId = h.replace(/ /g, "").toLowerCase();
        return (
          <th
            key={headerId}
            className={thStyle}
            onClick={() => handleSort(headerId)}
          >
            {h} {renderSortIcon(headerId)}
          </th>
        );
      })}
    </thead>
  );
};
