"use client";
import { useState } from "react";
import { Modal, TextField, FormControlLabel, Switch } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";

const AddItemModal = ({ open, onClose }) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("low");

  const handleSwitchChange = (event) => {
    setIsSwitchOn(event.target.checked);
  };

  const handleItemNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleSubmit = async () => {
    if (!itemName || !category || !quantity) {
      alert("Please fill out all fields.");
      return;
    }
    try {
      await addDoc(collection(db, "items"), {
        item: itemName,
        category,
        quantity: isSwitchOn ? parseFloat(quantity) : quantity,
      });
      onClose();
      setItemName("");
      setCategory("");
      setQuantity("low");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const OrangeSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "#C6D48D",
      "&:hover": {
        backgroundColor: alpha("#FAB374", theme.palette.action.hoverOpacity),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#FAB374",
    },
  }));

  return (
    <Modal open={open} onClose={onClose}>
      <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-slate-50 px-32 py-28 rounded-full border-[#C6D48D] border-8">
        <h4 className="font-medium py-2 text-[#7C5633]">Item Name:</h4>
        <input
          value={itemName}
          onChange={handleItemNameChange}
          placeholder="Item"
          className="rounded-full px-5 py-2 bg-transparent border-2 w-full border-[#FAB374]"
        />

        <div className="my-2">
          <h4 className="font-medium py-2 text-[#7C5633]">Category:</h4>
          <div className="flex flex-col">
            <div className="flex items-center justify-center my-1">
              <div>
                <input
                  type="radio"
                  name="category"
                  id="produce"
                  value="produce"
                  checked={category === "produce"}
                  onChange={handleCategoryChange}
                  className="modal"
                />
                <label htmlFor="produce" className="modal-label">
                  Produce
                </label>
              </div>
              <div className="px-2 w-fit">
                <input
                  type="radio"
                  name="category"
                  id="dairy"
                  value="dairy"
                  checked={category === "dairy"}
                  onChange={handleCategoryChange}
                  className="modal"
                />
                <label htmlFor="dairy" className="modal-label">
                  Dairy
                </label>
              </div>
              <div className="px-2 w-fit">
                <input
                  type="radio"
                  name="category"
                  id="meat"
                  value="meat"
                  checked={category === "meat"}
                  onChange={handleCategoryChange}
                  className="modal"
                />
                <label htmlFor="meat" className="modal-label">
                  Meats & Seafood
                </label>
              </div>
            </div>
            <div className="flex items-center justify-center my-1">
              <div className="px-2 w-fit">
                <input
                  type="radio"
                  name="category"
                  id="bakery"
                  value="bakery"
                  checked={category === "bakery"}
                  onChange={handleCategoryChange}
                  className="modal"
                />
                <label htmlFor="bakery" className="modal-label">
                  Bakery
                </label>
              </div>
              <div className="px-2 w-fit">
                <input
                  type="radio"
                  name="category"
                  id="beverages"
                  value="beverages"
                  checked={category === "beverages"}
                  onChange={handleCategoryChange}
                  className="modal"
                />
                <label htmlFor="beverages" className="modal-label">
                  Beverages
                </label>
              </div>
              <div className="px-2 w-fit">
                <input
                  type="radio"
                  name="category"
                  id="snacks"
                  value="snack"
                  checked={category === "snack"}
                  onChange={handleCategoryChange}
                  className="modal"
                />
                <label htmlFor="snacks" className="modal-label">
                  Snacks
                </label>
              </div>
              <div className="px-2 w-fit"></div>
              <input
                type="radio"
                name="category"
                id="condiments"
                value="condiments"
                checked={category === "condiments"}
                onChange={handleCategoryChange}
                className="modal"
              />
              <label htmlFor="condiments" className="modal-label">
                Condiments
              </label>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between">
            <h4 className="font-medium py-2 text-[#7C5633]">Quantity:</h4>
            <div className="flex items-center">
              <FormControlLabel
                control={
                  <OrangeSwitch
                    checked={isSwitchOn}
                    onChange={handleSwitchChange}
                    color="#FAB374"
                  />
                }
              />
              <h4 className="ml-[-15px]">In numbers</h4>
            </div>
          </div>

          <div>
            {!isSwitchOn ? (
              <div className="flex justify-center">
                <input
                  type="radio"
                  name="quantity"
                  id="low"
                  value="low"
                  checked={quantity === "low"}
                  onChange={handleQuantityChange}
                  className="modal"
                />
                <label htmlFor="low" className="px-10 modal-label">
                  Low
                </label>
                <input
                  type="radio"
                  name="quantity"
                  id="half"
                  value="half"
                  checked={quantity === "half"}
                  onChange={handleQuantityChange}
                  className="modal"
                />
                <label htmlFor="half" className="modal-label">
                  Half
                </label>
                <input
                  type="radio"
                  name="quantity"
                  id="full"
                  value="full"
                  checked={quantity === "full"}
                  onChange={handleQuantityChange}
                  className="modal"
                />
                <label htmlFor="full" className="modal-label">
                  Full
                </label>
              </div>
            ) : (
              <div className="flex justify-center">
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  placeholder="0"
                  className="rounded-full my-1 px-5 py-2 bg-transparent border-2 w-4/6 border-[#FAB374]"
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center pt-5 pb-[-1.5rem]">
          <button
            onClick={handleSubmit}
            className="bg-[#799364] rounded-full py-2 px-6 m-2 text-white text-center mt-4"
          >
            Add Item
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddItemModal;
