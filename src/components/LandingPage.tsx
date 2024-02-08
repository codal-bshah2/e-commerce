import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Loader from "./Loader";
import Sidebar from "./Sidebar";
import Hamburger from "hamburger-react";


interface ProductType {
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

const LandingPage = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([
    ...products,
  ]);
  const [isOpen, setOpen] = useState(false);
  // const [sort, setSort] = useState("asc");

  // const [isOpen, setIsOpen] = useState(false);
  // let filteredData: ProductType[] = [];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: ProductType[] = await response.json();
        console.log(data);
        setProducts(data["products"]);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedFilters.length > 0) {
      const tempProducts = selectedFilters.map((cat) => {
        return products.filter((product) => product["category"] == cat);
      });
      console.log(tempProducts);
      setFilteredProducts(tempProducts.flat());
    } else {
      setFilteredProducts(products);
    }
  }, [selectedFilters, products]);

  const handleInput = (query: string) => {
    setSearchQuery(query);

    // setFilteredData(tempData);
  };
  if (loading) {
    return <Loader />;
  }

  const handleCategory = (e: any, toInsert: boolean) => {
    if (toInsert) {
      setSelectedFilters([...selectedFilters, e.target.value]);
    } else {
      setSelectedFilters(
        selectedFilters.filter((filterVal) => {
          return filterVal != e.target.value;
        })
      );
    }
    console.log(selectedFilters);
  };

  const handleSort = (order: string) => {
    console.log("sorting");
    const sortedProducts = filteredProducts.sort((a, b) => {
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);
      return order == "desc" ? priceA - priceB : priceB - priceA;
    });
    console.log(sortedProducts);
    setFilteredProducts([...sortedProducts]);
    console.log("sorted");
  };
  return (
    <>
      <div>
        <div className="md:hidden ">
          <Hamburger toggled={isOpen} size={20} toggle={setOpen} />
          {isOpen && (
            <Sidebar handleCategory={handleCategory} handleSort={handleSort} />
          )}
        </div>
        <div className="grid md:grid-cols-4 grid-cols-3">
          {/* Sidebar for Categories and Sorting */}
          <div className="hidden md:block w-56">
            <Sidebar handleCategory={handleCategory} handleSort={handleSort} />
          </div>

          <div className="col-span-3">
            <div className="flex justify-end mr-10 w-4/5">
              <input
                type="text"
                placeholder="Search"
                className="rounded-lg px-4 py-2 w-30 md:w-64 border border-blue "
                onChange={(e) => handleInput(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 m-5 sm:grid-cols-2 lg:grid-cols-3 ">
              {/* Product cards */}
              {filteredProducts
                ? filteredProducts
                    .filter((product) => {
                      return searchQuery.toLowerCase() === ""
                        ? product
                        : product["title"]
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase());
                    })
                    .map((product) => (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        thumbnail={product.thumbnail}
                        category={product.category}
                      />
                    ))
                : products
                    .filter((product) => {
                      return searchQuery.toLowerCase() === ""
                        ? product
                        : product["title"]
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase());
                    })
                    .map((product) => (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        thumbnail={product.thumbnail}
                        category={product.category}
                      />
                    ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
