import { NavLink, useLoaderData } from "react-router-dom";
import { formatPrice } from "../utilize";

const ProductsGrid = () => {
  const { products } = useLoaderData();
  // console.log(products);

  return (
    <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const { title, image, price, company } = product.attributes;
        // use 幣值 & 數字轉換
        const dollarAmount = formatPrice(price);

        return (
          <NavLink
            key={product.id}
            to={`/products/${product.id}`}
            className="card w-full shadow-xl hover:shadow-2xl transition-all duration-300 "
          >
            <figure>
              <img
                src={image}
                alt={title}
                className="w-full h-64 md:h-56 object-cover object-center"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title capitalize tracking-wide">{title}</h2>
              <h4 className="text-sm font-semibold  text-neutral-focus  tracking-wide">
                {company}
              </h4>
              <span className="mt-4 text-secondary-focus">{dollarAmount}</span>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};

export default ProductsGrid;
