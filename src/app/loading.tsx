import { Spinner } from "@nextui-org/react";

const loading = () => {
  return (
    <div className="flex justify-center items-center">
      <Spinner color="danger" />
    </div>
  );
};

export default loading;
