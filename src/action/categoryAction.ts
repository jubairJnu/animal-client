"use server";

const GetCategory = async () => {
  const res = await fetch("https://animal-backend.vercel.app/categories", {
    cache: "no-store",
  });

  const categoryData = await res.json();
  

return categoryData;
};

export default GetCategory;
