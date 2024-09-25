import React from "react";

const SectionBox = ({ children }) => {
  return (
    <div className="flex-1 ">
      <div className="flex items-start justify-start min-h-[300] bg-gray-100">
        <div className="w-full max-w-2xl px-4 pt-2 mt-0">{children}</div>
      </div>
    </div>
  );
};

export default SectionBox;
