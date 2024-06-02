"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import { useState } from "react";
import { Field, FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // handle her

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Category Adding..");
    try {
      const categoryInfo = {
        name: data?.name,
      };

      const res = await fetch("https://animal-backend.vercel.app/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryInfo),
        cache: "no-store",
      });

      toast.success("Added Successfully", { id: toastId });
    } catch (error) {
      toast.error("Something Went Wrong", { id: toastId });
    }
  };

  return (
    <>
      <Button variant="bordered" onPress={onOpen}>
        Add Category
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Category
              </ModalHeader>

              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                  <Input
                    {...register("name", { required: true })}
                    autoFocus
                    label="Name"
                    variant="bordered"
                  />
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

export default AddCategory;
