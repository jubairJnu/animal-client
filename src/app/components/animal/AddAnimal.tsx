"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { FieldValues, useForm } from "react-hook-form";

const AddAnimal = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // handle here

  const onSubmit = (data: FieldValues) => {
    console.log(data);
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

export default AddAnimal;
