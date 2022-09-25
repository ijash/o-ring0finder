import React, { useState, useEffect } from "react";
import "./App.css";
import { As568Data, JisData, MetricData } from "./data/values";
import { TableRowsComponent } from "./components/TableRow";
import { MeasurementUnit, IDataFilter } from "./data/IData";
import oringSpec from "./assets/img/oring-spec.jpg";
import { divWrapper } from "./components/wrapper/divWrapper";
import { StandardData } from "./data/StandardData";

function App() {
  const as568 = As568Data;
  const jis = JisData;
  const metric = MetricData;

  const [filterTerm, setFilterTerm] = useState<IDataFilter>({
    unit: MeasurementUnit.MM,
  });
  useEffect(() => {
    console.log(filterTerm);
  }, [filterTerm]);

  return (
    <div className="App container">
      <h1 className="h1">O-Ring Size Finder</h1>
      <p>
        Straight to the point o-ring size finder tool by{" "}
        <a href="https://github.com/ijash/">ijash</a>
      </p>
      {divWrapper(
        "row",

        <div className="text-start">
          <div className=" row">
            <div className="input-group-sm col-9 bg-secondary rounded-3 fw-bold">
              <div className="row">
                {divWrapper(
                  "col",
                  <div id="unitForm">
                    <label className="form-label" htmlFor="measurementUnit">
                      Unit
                    </label>
                    <select
                      className="form-select shadow-sm"
                      name="Unit"
                      id="measurementUnit"
                      onChange={(event) => {
                        setFilterTerm({
                          ...filterTerm,
                          unit: event.target.value as MeasurementUnit,
                        });
                      }}
                    >
                      <option value={MeasurementUnit.MM}>Metric (mm)</option>
                      <option value={MeasurementUnit.INCH}>
                        Imperial (Inch)
                      </option>
                    </select>
                  </div>
                )}
                {divWrapper(
                  "col",
                  <div id="ringCodeForm">
                    <label className="form-label" htmlFor="ringCode">
                      Ring Code
                    </label>
                    <input
                      className="form-control shadow-sm"
                      type="text"
                      name="Ring Code"
                      placeholder="Code"
                      id="ringCode"
                      onChange={(event) => {
                        setFilterTerm({
                          ...filterTerm,
                          code: event.target.value,
                        });
                      }}
                    />
                  </div>
                )}
                {divWrapper(
                  "col",
                  <div id="minIdForm">
                    <label className="form-label" htmlFor="IDMin">
                      Min ID
                    </label>
                    <input
                      className="form-control shadow-sm"
                      type="number"
                      step="0.01"
                      min="0"
                      name="Min ID "
                      placeholder="Min ID"
                      id="IDMin"
                      onChange={(event) => {
                        setFilterTerm({
                          ...filterTerm,
                          minId: parseFloat(event.target.value) || 0,
                        });
                      }}
                    />{" "}
                  </div>
                )}
                {divWrapper(
                  "col",
                  <div id="maxIdForm">
                    <label className="form-label" htmlFor="IDMax">
                      Max ID
                    </label>
                    <input
                      className="form-control shadow-sm"
                      type="number"
                      step="0.01"
                      min="0"
                      name="Max ID "
                      placeholder="Max ID"
                      id="IDMax"
                      onChange={(event) => {
                        setFilterTerm({
                          ...filterTerm,
                          maxId: parseFloat(event.target.value) || 0,
                        });
                      }}
                    />{" "}
                  </div>
                )}
              </div>
              <div className="row">
                {divWrapper(
                  "col",
                  <div id="minOdForm">
                    <label className="form-label" htmlFor="ODMin">
                      Min OD
                    </label>
                    <input
                      className="form-control shadow-sm"
                      type="number"
                      step="0.01"
                      min="0"
                      name="Min OD "
                      placeholder="Min OD"
                      id="ODMin"
                      onChange={(event) => {
                        setFilterTerm({
                          ...filterTerm,
                          minOd: parseFloat(event.target.value) || 0,
                        });
                      }}
                    />{" "}
                  </div>
                )}
                {divWrapper(
                  "col",
                  <div id="maxOdForm">
                    <label className="form-label" htmlFor="ODMax">
                      Max OD
                    </label>
                    <input
                      className="form-control shadow-sm"
                      type="number"
                      step="0.01"
                      min="0"
                      name="Max OD "
                      placeholder="Max OD"
                      id="ODMax"
                      onChange={(event) => {
                        setFilterTerm({
                          ...filterTerm,
                          maxOd: parseFloat(event.target.value) || 0,
                        });
                      }}
                    />{" "}
                  </div>
                )}
                {divWrapper(
                  "col",
                  <div id="minCsForm">
                    <label className="form-label" htmlFor="CSMin">
                      Min CS
                    </label>
                    <input
                      className="form-control shadow-sm"
                      type="number"
                      step="0.01"
                      min="0"
                      name="Min CS "
                      placeholder="Min CS"
                      id="CSMin"
                      onChange={(event) => {
                        setFilterTerm({
                          ...filterTerm,
                          minCs: parseFloat(event.target.value) || 0,
                        });
                      }}
                    />{" "}
                  </div>
                )}
                {divWrapper(
                  "col",
                  <div id="maxCsForm">
                    <label className="form-label" htmlFor="CSMax">
                      Max CS{" "}
                    </label>
                    <input
                      className="form-control shadow-sm"
                      type="number"
                      step="0.01"
                      min="0"
                      name="Max CS "
                      placeholder="Max CS"
                      id="CSMax"
                      onChange={(event) => {
                        setFilterTerm({
                          ...filterTerm,
                          maxCs: parseFloat(event.target.value) || 0,
                        });
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="col-3">
              <img
                src={oringSpec}
                alt="O-ring Specifications"
                className="shadow-sm d-flex h-75"
              />
            </div>
          </div>
        </div>
      )}
      <div className="row text-start">
        <table className="table table-hover table-striped table-sm table-responsive table caption-top shadow-sm">
          <caption>
            O-ring size table represented in <strong>{filterTerm.unit}</strong>
          </caption>
          <thead className="table-dark bg-dark">
            {StandardData.getHeaders().map((h: string) => (
              <th>
                <strong>{h}</strong>
              </th>
            ))}
          </thead>
          <tbody className="table-group-divider">
            {TableRowsComponent([as568, jis, metric], filterTerm)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
