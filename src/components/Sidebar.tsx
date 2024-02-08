import React from "react";
import CheckboxInput from "./CheckboxInput";

interface sidebarType {
  handleCategory: (
    e: React.ChangeEvent<HTMLInputElement>,
    toInsert: boolean
  ) => void;
  handleSort: (order: string) => void;
}
const Sidebar: React.FC<sidebarType> = ({ handleCategory, handleSort }) => {
  return (
    <div>
      {/* Categories */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">Categories</h2>
        <div className="flex flex-col space-y-2">
          {/* Checkboxes for categories */}
          <CheckboxInput value="smartphones" handleCategory={handleCategory} />
          <CheckboxInput value="laptops" handleCategory={handleCategory} />
          <CheckboxInput value="fragrances" handleCategory={handleCategory} />
          <CheckboxInput value="skincare" handleCategory={handleCategory} />
          <CheckboxInput
            value="home-decoration"
            handleCategory={handleCategory}
          />
        </div>
      </div>
      {/* Sorting */}
      <div className="p-4 border-t">
        <h2 className="text-lg font-semibold mb-2">Sort Prices</h2>
        <div className="flex flex-col space-y-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => {
              handleSort("asc");
            }}
          >
            Highest to Lowest
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => {
              handleSort("desc");
            }}
          >
            Lowest to Highest
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
