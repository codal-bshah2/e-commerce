import React from "react";

interface ButtonType {
  children: string;
  type?: "submit" | "reset" | "button";
  onSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const Button: React.FC<ButtonType> = ({
  children,
  type = "button",
  onSubmit,
}) => {
  return (
    <>
      <button
        type={type}
        className="p-2 rounded-lg  bg-customPink w-48"
        onClick={onSubmit}
      >
        {/* {" "} */}
        {children}
      </button>
    </>
  );
};

export default Button;
