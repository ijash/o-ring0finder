import { IData, IDataFilter, MeasurementUnit, Standard } from "../data/IData";

export function TableComponent(data: IData, filter?: IDataFilter) {
  return (
    <table className="sizeTable table-primary">
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
              if (!unitMm) {
                if (filter.minCs && row.inchCs < filter.minCs) return false;
                if (filter.maxCs && row.inchCs > filter.maxCs) return false;
                if (filter.minId && row.inchId < filter.minId) return false;
                if (filter.maxId && row.inchId > filter.maxId) return false;
                if (filter.minOd && row.inchOd < filter.minOd) return false;
                if (filter.maxOd && row.inchOd > filter.maxOd) return false;
              } else {
                if (filter.minCs && row.mmCs < filter.minCs) return false;
                if (filter.maxCs && row.mmCs > filter.maxCs) return false;
                if (filter.minId && row.mmId < filter.minId) return false;
                if (filter.maxId && row.mmId > filter.maxId) return false;
                if (filter.minOd && row.mmOd < filter.minOd) return false;
                if (filter.maxOd && row.mmOd > filter.maxOd) return false;
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
            let rowColor = "";
            if (i % 2 === 0) rowColor = `bg-light`;

            const result = (
              <tr className={rowColor}>
                <td className="badge bg-primary w-100 fw-semibold">
                  {row.code}
                </td>
                <td className="text-dark">{row.mmId}</td>
                <td className="text-dark">{row.mmOd}</td>
                <td className="text-dark">{row.mmCs}</td>
                <td className="text-secondary">{row.inchId}</td>
                <td className="text-secondary">{row.inchOd}</td>
                <td className="text-secondary">{row.inchCs}</td>
              </tr>
            );
            return result;
          })}
      </tbody>
    </table>
  );
}
