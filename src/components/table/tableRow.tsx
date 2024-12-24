import React, { useState } from "react";
import { IData, IDataFilter, Standard, DataRepresentation } from "data";
import { useSort } from "components/context/SortContext";
import CustomModal from "components/modal/modal";

interface props {
  data: IData[];
  filter?: IDataFilter;
}
const rowStyle = "ps-2";
const specialStyle = {
  standard: (color: Standard): string => {
    let standardColor;
    switch (color) {
      case Standard.AS:
        standardColor = "primary";
        break;
      case Standard.JIS:
        standardColor = "info";
        break;
      case Standard.METRIC:
        standardColor = "success";
        break;
      default:
        standardColor = "dark";
        break;
    }
    return `text-${standardColor}`;
  },
  code: "fw-bold ",
};

export const TableRowsComponent: React.FC<props> = ({ data, filter }) => {
  const { sortBy, sortDirection } = useSort();
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<DataRepresentation | null>(null);
  const handleShowModal = (rowData: DataRepresentation) => {
    setModalData(rowData);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  let rows: DataRepresentation[] = [];

  data.forEach((s) => {
    let processedData: DataRepresentation[];

    if (filter) {
      processedData = s.getValues(filter.unit).filter((row) => {
        if (filter.minCs && row.cs < filter.minCs) return false;
        if (filter.maxCs && row.cs > filter.maxCs) return false;
        if (filter.minId && row.id < filter.minId) return false;
        if (filter.maxId && row.id > filter.maxId) return false;
        if (filter.minOd && row.od < filter.minOd) return false;
        if (filter.maxOd && row.od > filter.maxOd) return false;
        if (
          filter.code &&
          !row.code.toLowerCase().includes(filter.code.toLowerCase())
        )
          return false;
        if (
          filter.standard &&
          !filter.standard.includes(row.standard as Standard)
        )
          return false;
        return true;
      });
    } else {
      processedData = s.getValues();
    }
    rows.push(...processedData);
  });

  rows.sort((a, b) => {
    if (sortBy && sortDirection !== "undefined") {
      const aValue = a[sortBy as keyof DataRepresentation];
      const bValue = b[sortBy as keyof DataRepresentation];
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <>
      {rows.map((row) => {
        const result = (
          <tr
            vocab="https://schema.org/"
            typeof="Product"
            key={row.code}
            onClick={() => handleShowModal(row)}
            style={{ cursor: "pointer" }}
          >
            <td
              className={`${rowStyle} ${specialStyle.standard(
                row.standard as Standard
              )}`}
              property="brand"
            >
              {row.standard}
            </td>
            <td className={`${rowStyle} ${specialStyle.code}`} property="size">
              {row.code}
            </td>
            <td className={`${rowStyle}`}>{row.id}</td>
            <td className={`${rowStyle}`}>{row.od}</td>
            <td className={`${rowStyle}`}>{row.cs}</td>
          </tr>
        );
        return result;
      })}
      <CustomModal
        show={showModal}
        handleClose={handleCloseModal}
        rowData={modalData}
      />
    </>
  );
};
