import Image from "next/image";
import { ReadonlyURLSearchParams } from "next/navigation";

type Tanimal = {
  _id: string;
  name: string;
  photo: string;
};

export interface ISearchParams {
  searchParams: ReadonlyURLSearchParams;
  categoryId: string;
}

const AllAnimalPage = async ({
  searchParams,
}: {
  searchParams: ISearchParams;
}) => {
  let animalsData = [];

  // console.log(searchParams?.categoryId);

  if (searchParams.categoryId) {
    const res = await fetch(
      `https://animal-backend.vercel.app/animals?categoryId=${searchParams.categoryId}`,
      {
        cache: "no-store",
      }
    );

    animalsData = await res.json();
  } else {
    const res = await fetch("https://animal-backend.vercel.app/animals", {
      cache: "no-store",
    });

    animalsData = await res.json();
  }

  // console.log(animalsData);

  return (
    <div className="mb-5">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mt-20">
        {animalsData?.data?.length > 0
          ? animalsData?.data?.map((animal: Tanimal) => (
              <div key={animal._id} className="max-w-[170px] ">
                <div className="w-full h-[195px] border border-slate-400 flex items-center justify-center rounded-md">
                  <Image
                    src={animal.photo}
                    alt={animal.name}
                    width={100}
                    height={90}
                  />
                </div>

                <h1 className="text-center uppercase font-semibold mt-2">
                  {" "}
                  {animal.name}{" "}
                </h1>
              </div>
            ))
          : "No Animal Available"}
      </div>
    </div>
  );
};

export default AllAnimalPage;
