"use client";
import { useState, useEffect } from "react";
import Selector from "@/components/Selector";
import SearchBar from "@/components/SearchBar";
import { db } from "@/firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import AddItemModal from "@/components/AddModal";

const Pantry = () => {
  const [category, setCategory] = useState("all");
  const [data, setData] = useState([]);
  const [sortField, setSortField] = useState("category");
  const [sortDirection, setSortDirection] = useState("asc");
  const [addModal, setAddModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const quantityOrder = ["low", "half", "full"];
  const parseQuantity = (quantity) => {
    const num = parseFloat(quantity);
    if (!isNaN(num)) {
      return num;
    }

    return quantityOrder.indexOf(quantity) + 1000;
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    console.log("Selected Category:", event.target.value);
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  const handleAddModal = () => {
    setAddModal(!addModal);
  };

  const handleSort = (field) => {
    setSortDirection((prevDirection) =>
      prevDirection === "asc" ? "desc" : "asc"
    );
    setSortField(field);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const q =
          category === "all"
            ? query(collection(db, "items"))
            : query(collection(db, "items"), where("category", "==", category));
        const querySnapshot = await getDocs(q);
        let postsData = querySnapshot.docs.map((doc) => doc.data());
        if (searchInput) {
          postsData = postsData.filter((item) =>
            item.item.toLowerCase().includes(searchInput)
          );
        }
        postsData.sort((a, b) => {
          let aValue = a[sortField];
          let bValue = b[sortField];

          if (sortField === "quantity") {
            aValue = parseQuantity(aValue);
            bValue = parseQuantity(bValue);
          }

          if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
          if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
          return 0;
        });
        setData(postsData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    getData();
  }, [category, sortField, sortDirection, searchInput, addModal]);

  return (
    <div className="mx-10 mt-7">
      <div className="flex items-center justify-evenly mb-5 pb-5">
        <Selector onChange={handleCategoryChange} />
        <SearchBar onSearch={handleSearch} />
        <button
          onClick={handleAddModal}
          className="bg-[#799364] rounded-full py-2 px-6 m-2 text-white text-center"
        >
          Add Item
        </button>
      </div>

      <AddItemModal open={addModal} onClose={handleAddModal} />

      <div className="m-5 bg-[#FAB275] rounded-[30px] ">
        <div className="flex px-20 py-5 text-white font-bold sticky">
          <div
            className="flex-1 cursor-pointer hover:text-[#7C5633]"
            style={{ flexBasis: "25%" }}
            onClick={() => handleSort("category")}
          >
            Category{" "}
            {sortField === "category"
              ? sortDirection === "asc"
                ? "↑"
                : "↓"
              : ""}
          </div>
          <div
            className="flex-2 cursor-pointer hover:text-[#7C5633]"
            style={{ flexBasis: "50%" }}
            onClick={() => handleSort("item")}
          >
            Item{" "}
            {sortField === "item" ? (sortDirection === "asc" ? "↑" : "↓") : ""}
          </div>
          <div
            className="flex-1 text-center cursor-pointer hover:text-[#7C5633]"
            style={{ flexBasis: "25%" }}
            onClick={() => handleSort("quantity")}
          >
            Quantity{" "}
            {sortField === "quantity"
              ? sortDirection === "asc"
                ? "↑"
                : "↓"
              : ""}
          </div>
        </div>
        <div className="bg-stone-100 py-5 px-20 rounded-br-[30px] rounded-bl-[30px] max-h-[570px] overflow-y-auto">
          {data.length > 0 ? (
            data.map((item, index) => (
              <div key={index} className="flex py-4 border-b border-gray-300">
                <div className="flex-1" style={{ flexBasis: "25%" }}>
                  {item.category}
                </div>
                <div className="flex-2" style={{ flexBasis: "50%" }}>
                  {item.item}
                </div>
                <div
                  className="flex-1"
                  style={{ flexBasis: "25%", textAlign: "center" }}
                >
                  {item.quantity}
                </div>
              </div>
            ))
          ) : (
            <p>No items found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pantry;
