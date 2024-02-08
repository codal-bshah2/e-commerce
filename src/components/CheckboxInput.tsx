import React from "react";
interface CheckboxInputType {
  value: string;
  handleCategory: (e: React.ChangeEvent<HTMLInputElement>, toInsert: boolean) => void;
}

const CheckboxInput: React.FC<CheckboxInputType> = ({
  value,
  handleCategory,
}) => {
  return (
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-blue-500"
        value={value}
        onChange={(e) => {
          e.target.checked ? handleCategory(e, true) : handleCategory(e, false);
        }}
      />
      <span className="ml-2">{value}</span>
    </label>
  );
};

export default CheckboxInput;
