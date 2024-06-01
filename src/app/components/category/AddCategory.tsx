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
import { Field, FieldValues, useForm } from "react-hook-form";

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // handle her

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <>
      <Button variant="bordered" onPress={onOpen} >
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
