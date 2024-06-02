import AllAnimalPage, { ISearchParams } from "./components/animal/AllAnimal";

const HomePage = ({ searchParams }: { searchParams: ISearchParams }) => {
  return (
    <div>
      <AllAnimalPage searchParams={searchParams} />
    </div>
  );
};

export default HomePage;
