import { useState } from "react";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
  thumbnail: string;
}

const Cart = () => {
  const [cartData, setCartData] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const handleDeleteItem = (id: number) => {
    const updatedCart = cartData.filter((item) => item.id !== id);
    setCartData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  if (cartData.length === 0) {
    return (
      <div className="container flex flex-col justify-center mt-52">
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </div>
        <div>
          <h1 className="font-mono font-medium text-center">Empty cart</h1>
        </div>
        <div>
          <h1 className="font-mono font-medium text-center">Add items</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 m-10">
      {cartData.map((item: CartItem) => (
        <div
          key={item.id}
          className="bg-white p-4 rounded-lg shadow-md flex items-center"
        >
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-20 h-20 object-cover mr-4 rounded-md"
          />
          <div className="flex-grow">
            <div className="text-lg font-semibold">{item.title}</div>
            <div className="text-gray-500 mt-1">
              {item.quantity} x Rs.{item.price}
            </div>
            <div className="mt-2">
              <span className="text-gray-500">Total:</span>{" "}
              <span className="font-semibold">Rs.{item.total}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-green-500">
                {item.discountPercentage}% off
              </span>
              <span className="font-semibold text-green-500">
                Rs.{item.discountedPrice}
              </span>
            </div>
            <button
              onClick={() => handleDeleteItem(item.id)}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
