import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "",
  textColor = "",
  className = "",
  ...props
}) {
  return (
    <button className={`rounded-lg border border-transparent px-3 py-2 text-lg font-semibold bg-orange-500 text-white cursor-pointer transition duration-250 hover:border-white hover:bg-orange-400 ${bgColor} ${textColor} ${className}`} {...props}>
      {children}
    </button>
  );
}