import { Button } from "@nextui-org/react";
import Link from "next/link";

type TCategoryPropos = {
  _id: string;
  name: string;
};

const AllCategoryPage = async () => {
  const res = await fetch("https://animal-backend.vercel.app/categories", {
    cache: "no-store",
  });

  const categoryData = await res.json();
  // console.log(categoryData);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {categoryData?.data?.map((category: TCategoryPropos) => (
        <Link key={category._id} href={`/?categoryId=${category._id}`}>
          <div className="rounded-full border-2 border-[#EF0D0D] text-[#EF0D0D] text-center py-2 px-4 ">
            {category.name}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AllCategoryPage;
