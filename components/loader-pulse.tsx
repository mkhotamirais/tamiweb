"use client";

import { PulseLoader } from "react-spinners";

export const LoaderPulse = () => {
  return (
    <div className="w-full flex justify-center mt-32">
      <PulseLoader loading={true} />
    </div>
  );
};
