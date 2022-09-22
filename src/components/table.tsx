import { IData, IDataFilter, MeasurementUnit, Standard } from "../data/IData";

export function TableComponent(data: IData, filter?: IDataFilter) {
  return (
    <table className="sizeTable table">
      <thead>
        {data.headers.map((h) => {
          return <th>{h}</th>;
        })}
      </thead>

      <tbody>
        {data
          .getValues()
          .filter((row) => {
            if (filter) {
              const unitMm = filter.unit === MeasurementUnit.MM;
              if (unitMm) {
                if (filter.minCs && row.mmCs < filter.minCs) return false;
                if (filter.maxCs && row.mmCs > filter.maxCs) return false;
                if (filter.minId && row.mmId < filter.minId) return false;
                if (filter.maxId && row.mmId > filter.maxId) return false;
                if (filter.minOd && row.mmOd < filter.minOd) return false;
                if (filter.maxOd && row.mmOd > filter.maxOd) return false;
              } else {
                if (filter.minCs && row.inchCs < filter.minCs) return false;
                if (filter.maxCs && row.inchCs > filter.maxCs) return false;
                if (filter.minId && row.inchId < filter.minId) return false;
                if (filter.maxId && row.inchId > filter.maxId) return false;
                if (filter.minOd && row.inchOd < filter.minOd) return false;
                if (filter.maxOd && row.inchOd > filter.maxOd) return false;
              }
              if (filter.code && !row.code.includes(filter.code)) return false;
              if (
                filter.standard &&
                !filter.standard.includes(row.standard as Standard)
              )
                return false;
              return true;
            } else return true;
          })
          .map((row, i) => {
            let rowColor = "table-secondary";
            if (i % 2 === 0) rowColor = ``;

            const result = (
              <tr className={rowColor}>
                <td>{row.code}</td>
                <td>{row.mmId}</td>
                <td>{row.mmOd}</td>
                <td>{row.mmCs}</td>
                <td>{row.inchId}</td>
                <td>{row.inchOd}</td>
                <td>{row.inchCs}</td>
              </tr>
            );
            return result;
          })}
      </tbody>
    </table>
  );
}
