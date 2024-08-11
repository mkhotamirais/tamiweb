import React from "react";

export const Title = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="font-raleway text-2xl sm:text-3xl text-center font-semibold py-6">{children}</h2>;
};
