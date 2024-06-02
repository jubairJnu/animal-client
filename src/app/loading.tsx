import { Spinner } from "@nextui-org/react";

const loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spinner color="danger" />
    </div>
  );
};

export default loading;
