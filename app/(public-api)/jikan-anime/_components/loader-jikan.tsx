"use client";

import { PulseLoader } from "react-spinners";

export const LoaderJikan = () => {
  return (
    <div className="w-full flex justify-center mt-16">
      <PulseLoader color="#1ABC9C" />
    </div>
  );
};
