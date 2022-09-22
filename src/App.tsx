import React, { useState, useEffect } from "react";
import "./App.css";
import { As568Data } from "./data/values";
import { TableComponent } from "./components/table";
import { MeasurementUnit, IDataFilter } from "./data/IData";

function App() {
  const as568 = As568Data;
  const [filterTerm, setFilterTerm] = useState<IDataFilter>({});
  useEffect(() => {
    console.log(filterTerm);
  }, [filterTerm]);
  return (
    <div className="App container">
      <h1 className="h1">O-Ring Size Finder</h1>

      <div className="input-group-sm mb-1">
        <div className="container row">
          <div className="col">
            <label className="form-label" htmlFor="measurementUnit">
              Unit
            </label>
            <select
              className="form-select"
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
              <option value={MeasurementUnit.INCH}>Imperial (Inch)</option>
            </select>
          </div>
          <div className="col">
            <label className="form-label" htmlFor="ringCode">
              Ring Code
            </label>
            <input
              className="form-control"
              type="text"
              name="Ring Code"
              placeholder="Code"
              id="ringCode"
              onChange={(event) => {
                setFilterTerm({ ...filterTerm, code: event.target.value });
              }}
            />
          </div>
        </div>

        <div className="container row">
          <div className="col">
            <label className="form-label" htmlFor="IDMin">
              Min ID
            </label>
            <input
              className="form-control"
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
          <div className="col">
            <label className="form-label" htmlFor="IDMax">
              Max ID
            </label>
            <input
              className="form-control"
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
        </div>

        <div className="container row">
          <div className="col">
            <label className="form-label" htmlFor="CSMin">
              Min CS
            </label>
            <input
              className="form-control"
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
          <div className="col">
            <label className="form-label" htmlFor="CSMax">
              Max CS{" "}
            </label>
            <input
              className="form-control"
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
            />{" "}
          </div>
        </div>

        <div className="container row">
          <div className="col">
            <label className="form-label" htmlFor="ODMin">
              Min OD
            </label>
            <input
              className="form-control"
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
          <div className="col">
            <label className="form-label" htmlFor="ODMax">
              Max OD
            </label>
            <input
              className="form-control"
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
        </div>
      </div>
      <h2 className="h2">AS568 Standard</h2>
      {TableComponent(as568, filterTerm)}
    </div>
  );
}

export default App;
