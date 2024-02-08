import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface ProductCardType {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  price: string;
}

const ProductCard: React.FC<ProductCardType> = ({
  id,
  title,
  category,
  thumbnail,
  price,
}) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState<number>(1);

  const fxn = () => {
    navigate(`/${id}`);
  };
  const notify = () => toast("Wow so easy!");
  const handleClick = () => {
    const userId = localStorage.getItem("userId");

    fetch(`https://dummyjson.com/carts/${userId}`, {
      method: "PUT" /* or PATCH */,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        products: [
          {
            id: id,
            quantity: quantity,
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (localStorage.getItem("cart")) {
          let cartData = JSON.parse(localStorage.getItem("cart") || "[]");
          const existingProductIndex = cartData.findIndex(
            (item: ProductCardType) => item.id === id
          );

          if (existingProductIndex !== -1) {
            cartData[existingProductIndex].quantity = quantity;
          } else {
            cartData.push(data["products"][0]);
          }
          localStorage.setItem("cart", JSON.stringify(cartData));
        } else {
          localStorage.setItem("cart", JSON.stringify(data["products"]));
        }
        notify();
      });
  };

  return (
    <>
      <div className="border grid grid-flow-row grid-row-3 w-full rounded-xl shadow-md p-1 bg-gray-200 bg-opacity-30 backdrop-filter backdrop-blur-lg">
        <ToastContainer />
        <div className="row-span-2 rounded-t-xl">
          <img
            src={thumbnail}
            alt="Product Image"
            className="object-cover h-48 w-96 rounded-xl"
          />
        </div>
        <div className="grid grid-flow-row grid-row-3 rounded-b-xl p-1 ml-1">
          <div className="font-semibold text-xl">{title}</div>
          <div className="font-normal opacity-75">{category}</div>
          <div className="font-semibold text-lg tracking-tight opacity-85">
            Rs {price}
          </div>
          <div className="flex justify-between items-center">
            <div className="m-1 flex items-center">
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border border-gray-500 p-2 rounded-lg w-16 m-1"
              />
              <button
                className="border border-gray-500 p-2 rounded-lg  w-30"
                onClick={handleClick}
              >
                Add to Cart
              </button>
            </div>
          </div>
          <div className="w-full">
            <Button onSubmit={fxn}>Details</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
