import {
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
