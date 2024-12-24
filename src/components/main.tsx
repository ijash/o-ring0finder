import {
  NavBar,
  Title,
  InputSection,
  TableSection,
  FilterContextProvider,
  FooterText,
} from "components";

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
    </main>
  );
};
