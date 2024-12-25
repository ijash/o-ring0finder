import React, { createContext, useContext, useState } from "react";

export type SortDirection = "asc" | "desc" | "undefined";

interface SortContextProps {
  sortBy: string;
  sortDirection: SortDirection;
  setSortBy: (sortBy: string) => void;
  setSortDirection: (sortDirection: SortDirection) => void;
  resetSort: () => void;
}

const SortContext = createContext<SortContextProps | undefined>(undefined);

interface SortProviderProps {
  children: React.ReactNode;
}

export const SortProvider: React.FC<SortProviderProps> = ({ children }) => {
  const [sortBy, setSortBy] = useState<string>("");
  const [sortDirection, setSortDirection] =
    useState<SortDirection>("undefined");

  const resetSort = () => {
    setSortBy("");
    setSortDirection("undefined");
  };

  return (
    <SortContext.Provider
      value={{ sortBy, sortDirection, setSortBy, setSortDirection, resetSort }}
    >
      {children}
    </SortContext.Provider>
  );
};

export const useSort = () => {
  const context = useContext(SortContext);
  if (!context) {
    throw new Error("useSort must be used within a SortProvider");
  }
  return context;
};
