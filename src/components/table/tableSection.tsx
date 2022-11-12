import React, { useContext } from "react";
import { TableRowsComponent, TableHead } from "components";
import { As568Data, JisData, MetricData, StandardData } from "data";
import { FilterContext } from "components/context";

interface props {}

export const TableSection: React.FC<props> = () => {
  const as568 = As568Data;
  const jis = JisData;
  const metric = MetricData;
  const filterContext = useContext(FilterContext);

  const tableStyle = `
    table table-hover
    table-striped
    table-sm
    table-responsive
    table caption-top
    shadow-sm
    `;

  // TODO Enable sorting by header name

  return (
    <div className="row">
      <table className={tableStyle}>
        <caption>
          <div className="container">
            <small>
              {"O-ring size table represented in "}
              <strong>{filterContext.filter.unit}</strong>
            </small>
          </div>
        </caption>

        <TableHead headerData={StandardData.getHeaders()} />

        <tbody className="table-group-divider">
          <TableRowsComponent
            data={[as568, jis, metric]}
            filter={filterContext.filter}
          />
        </tbody>
      </table>
    </div>
  );
};
