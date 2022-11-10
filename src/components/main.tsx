import { GlobalContext } from "./common";
import { Title, InputSection, TableSection } from "components";
import { useState } from "react";

interface MainProps {}

export const Main: React.FC<MainProps> = (props) => {
  const [global, setGlobal] = useState({});

  return (
    <GlobalContext.Provider value={{ global, setGlobal }}>
      <main>
        <div className="container">
          <Title />
          <InputSection />
          <TableSection />
        </div>
      </main>
    </GlobalContext.Provider>
  );
};
