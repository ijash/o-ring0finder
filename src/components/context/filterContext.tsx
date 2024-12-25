import React, { createContext, useState } from "react";

import { IDataFilter, MeasurementUnit } from "data";

interface Props {
  children: React.ReactNode;
}

interface FilterContextStateType {
  filter: IDataFilter;
  setFilter: React.Dispatch<React.SetStateAction<IDataFilter>>;
}

export const FilterContext = createContext<FilterContextStateType>(
  {} as FilterContextStateType
);

export const FilterContextProvider: React.FC<Props> = ({ children }) => {
  const initFilterValue = {
    unit: MeasurementUnit.MM,
  };
  const [filter, setFilter] = useState<IDataFilter>(initFilterValue);

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
};
