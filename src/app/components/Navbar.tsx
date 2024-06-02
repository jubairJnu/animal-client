import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import AddAnimal from "./animal/AddAnimal";
import AddCategory from "./category/AddCategory";
import AllCategoryPage from "./category/AllCategory";

const Navbar = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-5 mt-16 w-full max-w-7xl mx-auto">
      {/* div 1 */}
      <div>
        <AllCategoryPage />
      </div>

      {/* div 2 */}

      <div className="flex gap-5">
        <ThemeSwitcher />
        <AddAnimal />
        <AddCategory />
      </div>
    </div>
  );
};

export default Navbar;
