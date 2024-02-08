import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";

interface ProductDetailsType {
  id: string;
  title: string;
  description: string;
  price: string;
  discountPercentage: string;
  rating: string;
  stock: string;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState<ProductDetailsType>();
  console.log(id);
  const settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch products details");
        }
        const data = await response.json();
        console.log(data);
        setProductDetails(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-center">
      
      {productDetails && (
        <div className="gap-2 w-[max]-screen rounded-xl shadow-md p-6 bg-gray-200 bg-opacity-30 backdrop-filter backdrop-blur-lg grid md:grid-cols-2 grid-cols-1 ">
          <div>
            <Slider {...settings}>
              {productDetails["images"] &&
                productDetails["images"].map((imgSrc) => {
                  return (
                    <img
                      src={imgSrc}
                      alt="image"
                      className="object-cover h-max-screen"
                    ></img>
                  );
                })}
            </Slider>
          </div>
          {/* <div className="font-semibold text-lg">Today</div>
        <div className="font-semibold text-5xl tracking-tight">$12.921</div>
        <div className="font-normal">Gross volume</div> */}
          <div className="details gap-5 p-10">
            <div>
              <div className="text-gray-900 font-bold text-xl mb-2">
                {productDetails["title"]}
              </div>
              <p className="text-gray-700 text-base">
                {productDetails["description"]}
              </p>
              <div className="mt-2 grid grid-flow-col w-16">
                {/* <span> */}
                <div>
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
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                </div>
                <div>
                  <p>{productDetails["rating"]}</p>
                </div>
                {/* </span> */}
              </div>
              <div className="mt-2 grid grid-flow-col w-16">
                {/* <span> */}
                <div>
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
                      d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
                <div>
                  <p>{productDetails["price"]}</p>
                </div>
                {/* </span> */}
              </div>
            </div>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
