import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { BsFillGridFill, BsList } from "react-icons/bs";

import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";

const ProductsContainer = () => {
  const { meta } = useLoaderData();
  // console.log(meta);
  const totalProducts = meta.pagination.total;

  // useState
  const [layout, setLayout] = useState("grid");

  // utility function
  const activeButton = (pattern) => {
    return `btn btn-sm btn-circle  ${
      pattern === layout
        ? "btn-primary text-primary-content"
        : "btn-ghost text-based-content"
    }`;
  };

  return (
    <>
      {/* header */}
      <div className="pb-4 border-b-[1px] border-base-300 flex justify-between items-center">
        <div>
          <h4>
            {totalProducts} product{totalProducts > 1 && "s"}
          </h4>
        </div>

        <div className="space-x-1 ">
          <button
            type="button"
            className={activeButton("grid")}
            onClick={() => setLayout("grid")}
          >
            <BsFillGridFill />
          </button>
          <button
            type="button"
            className={activeButton("list")}
            onClick={() => setLayout("list")}
          >
            <BsList />
          </button>
        </div>
      </div>

      {/* total product = 0  */}
      {totalProducts === 0 && (
        <h5 className="mt-12 text-2xl">
          Sorry, no products match your search ...
        </h5>
      )}
      {/* grid or list */}
      {layout === "grid" ? <ProductsGrid /> : <ProductsList />}
    </>
  );
};

export default ProductsContainer;
