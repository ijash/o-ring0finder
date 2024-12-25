import { TableHead, TableRowsComponent } from "components";
import { FilterContext } from "components/context";
import { SortProvider } from "components/context/SortContext";
import { As568Data, JisData, MetricData, StandardData } from "data";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

interface props {}

export const TableSection: React.FC<props> = () => {
  const { t } = useTranslation("global");

  const as568 = As568Data;
  const jis = JisData;
  const metric = MetricData;
  const filterContext = useContext(FilterContext);
  const translatedTableHead = StandardData.getHeaders().map((header) =>
    t(`table.tableHead.${header.toLowerCase()}`)
  );
  const tableStyle = `
    table
    table-hover
    table-striped
    table-sm
    table-responsive
    table caption-top
    shadow-sm
    `;

  return (
    <SortProvider>
      <div className="row">
        <table className={tableStyle}>
          <caption>
            <div className="container">
              <small>
                {t("table.infoDesc.desc")}
                <strong>
                  {filterContext.filter.unit === "mm"
                    ? t("table.infoDesc.unit.mm")
                    : t("table.infoDesc.unit.inch")}
                </strong>
              </small>
            </div>
          </caption>

          <TableHead headerData={translatedTableHead} />

          <tbody className="table-group-divider">
            <TableRowsComponent
              data={[as568, jis, metric]}
              filter={filterContext.filter}
            />
          </tbody>
        </table>
      </div>
    </SortProvider>
  );
};
