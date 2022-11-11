import {
  Title,
  InputSection,
  TableSection,
  FilterContextProvider,
} from "components";

interface MainProps {}

export const Main: React.FC<MainProps> = (props) => {
  return (
    <main>
      <FilterContextProvider>
        <div className="container">
          <Title />
          <InputSection />
          <TableSection />
        </div>
      </FilterContextProvider>
    </main>
  );
};
