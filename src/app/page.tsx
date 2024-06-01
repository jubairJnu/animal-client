import AddAnimal from "./components/animal/AddAnimal";
import AddCategory from "./components/category/AddCategory";

const HomePage = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-5 mt-16">
      {/* div 1 */}
      <div>
        <h1>mmmmm</h1>
      </div>

      {/* div 2 */}

      <div className="flex gap-5">
        <AddAnimal />
        <AddCategory />
      </div>
    </div>
  );
};

export default HomePage;
