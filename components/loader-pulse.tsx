import { PulseLoader } from "react-spinners";

export const LoaderPulse = () => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <div className="w-full flex justify-center mt-32">
      <PulseLoader />
    </div>
  );
};
