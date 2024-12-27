import {
  FilterContextProvider,
  FooterText,
  InputSection,
  NavBar,
  TableSection,
  Title,
} from "components";
import GoatCounter from "./common/goatCounter";

interface MainProps {}

export const Main: React.FC<MainProps> = (props) => {
  return (
    <main>
      <FilterContextProvider>
        <NavBar />
        <Title />
        <div className="container">
          <InputSection />
          <TableSection />
        </div>
        <FooterText />
      </FilterContextProvider>
      <GoatCounter />
    </main>
  );
};
