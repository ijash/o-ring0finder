import React from "react";
import { IData, IDataFilter, Standard, DataRepresentation } from "data";

interface props {
  data: IData[];
  filter?: IDataFilter;
}
const style = {
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
  code: "fw-bold",
};

export const TableRowsComponent: React.FC<props> = ({ data, filter }) => {
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

        if (filter.code && !row.code.includes(filter.code)) return false;
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

  return (
    <>
      {rows.map((row) => {
        const result = (
          <tr vocab="https://schema.org/" typeof="Product">
            <td
              className={`${style.standard(row.standard as Standard)}`}
              property="brand"
            >
              {row.standard}
            </td>
            <td className={style.code} property="size">
              {row.code}
            </td>
            <td>{row.id}</td>
            <td>{row.od}</td>
            <td>{row.cs}</td>
          </tr>
        );
        return result;
      })}
    </>
  );
};
