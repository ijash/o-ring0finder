import {
  IData,
  IDataFilter,
  Standard,
  DataRepresentation,
} from "../data/IData";

export function TableRowsComponent(data: IData[], filter?: IDataFilter) {
  function setStandardColor(color: Standard): string {
    switch (color) {
      case Standard.AS:
        return "primary";
      case Standard.JIS:
        return "info";
      case Standard.METRIC:
        return "success";
      default:
        return "dark";
    }
  }
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
  return rows.map((row) => {
    const result = (
      <tr>
        <td
          className={`fw-bold text-${setStandardColor(
            row.standard as Standard
          )}`}
        >
          {row.standard}
        </td>
        <td className="fw-bold ">{row.code}</td>
        <td>{row.id}</td>
        <td>{row.od}</td>
        <td>{row.cs}</td>
      </tr>
    );
    return result;
  });
}
