import React from "react";

const Selector = ({ onChange }) => {
  return (
    <div>
      <label htmlFor="category">
        <select
          id="category"
          name="category"
          className="bg-[#FAB275] rounded-full py-2 px-4 m-2 text-white text-center"
          onChange={onChange}
        >
          <option value="all">All</option>
          <option value="produce">Produce</option>
          <option value="dairy">Dairy</option>
          <option value="meat">Meats & Seafood</option>
          <option value="bakery">Bakery</option>
          <option value="beverages">Beverages</option>
          <option value="snack">Snacks</option>
          <option value="condiments">Condiments</option>
        </select>
      </label>
    </div>
  );
};

export default Selector;
