"use client";

import GetCategory from "@/action/categoryAction";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

// photo up key
const img_hosting_token = "38ae79dbd8a3d61f60616d880c59d99c";

interface ICategory {
  _id: string;
  name: string;
  key: string;
}

interface ICategoryData {
  data: ICategory[];
}

const AddAnimal = () => {
  const [categoryData, setCategoryData] = useState<ICategoryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await GetCategory();
        setCategoryData(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // handle here

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Animal adding..");
    const formData = new FormData();
    formData.append("image", data.photo[0]);

    try {
      // Upload the image
      const imgResponse = await fetch(img_hosting_url, {
        method: "POST",
        body: formData,
      });
      const responseImage = await imgResponse.json();
      const imageUrl = responseImage.data.display_url;
      // console.log(imageUrl, "img");

      const animalInfo = {
        name: data?.name,
        photo: imageUrl,
        category: data.category,
      };

      // now add to server

      const res = await fetch("https://animal-backend.vercel.app/animals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(animalInfo),
        cache: "no-store",
      });
      console.log(res);

      toast.success("Added Successfully", { id: toastId });
    } catch (error) {
      toast.error("Something Went Wrong", { id: toastId });
    }
    // console.log(data);
  };

  return (
    <>
      <Button variant="bordered" onPress={onOpen} color="default">
        Add Animal
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Animal
              </ModalHeader>

              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                  <Input
                    {...register("name", { required: true })}
                    autoFocus
                    label="Name"
                    variant="bordered"
                  />
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Upload file
                  </label>
                  <input
                    {...register("photo", { required: true })}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 py-3 "
                    id="file_input"
                    type="file"
                    // accept only these file type
                    accept=".png, .jpg, .jpeg"
                  />

                  {loading
                    ? "loading"
                    : categoryData && (
                        <Select
                          {...register("category", { required: true })}
                          label="Select "
                          className=""
                        >
                          {categoryData?.data?.map((item: ICategory) => (
                            <SelectItem key={item._id} value={item._id}>
                              {item?.name}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                </ModalBody>
                <ModalFooter>
                  <Button
                    type="submit"
                    onPress={onClose}
                    className="w-full bg-black text-white"
                  >
                    Save
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddAnimal;
