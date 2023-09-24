import { NavLink, useLoaderData } from "react-router-dom";
import { formatPrice, customFetch, generateAmountOptions } from "../utilize";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";

const singleProductQuery = (id) => {
  return {
    queryKey: ["singleProduct", id],
    queryFn: () => customFetch(`/products/${id}`),
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const id = params.id;

    const response = await queryClient.ensureQueryData(singleProductQuery(id));
    // console.log(response);
    const product = response.data.data;

    return product;
  };

const SingleProduct = () => {
  const product = useLoaderData();
  // console.log(product);
  const { title, image, price, colors, description, company } =
    product.attributes;
  // use 幣值 & 數字轉換
  const dollarAmount = formatPrice(price);

  // useState
  const [productColor, setProductColor] = useState(colors[0]);
  // console.log(productColor);
  const [amount, setAmount] = useState(1);

  const dispatch = useDispatch();

  const cartProduct = {
    cartID: product.id + productColor,
    productID: product.id,
    image,
    title,
    price,
    company,
    productColor,
    amount,
  };

  return (
    <section>
      {/* Breadcrumb */}
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          <li className="capitalize">{title}</li>
        </ul>
      </div>
      <div className="mt-6 grid gap-x-8 gap-y-12 items-center md:grid-cols-2 lg:gap-x-16">
        {/* image */}
        <img
          src={image}
          alt={title}
          className="w-full h-96 object-cover object-center rounded-lg"
        />
        {/* info */}
        <div>
          <h1 className="text-4xl font-bold tracking-wide capitalize">
            {title}
          </h1>
          <h4 className="mt-4 text-lg text-neutral-focus tracking-wide">
            {company}
          </h4>
          <p className="text-lg tracking-wide text-secondary-focus">
            {dollarAmount}
          </p>
          <p className="mt-6 leading-7 tracking-wide">{description}</p>
          {/* colors -> badge */}
          <div className="mt-6">
            <h4 className="text-lg tracking-wide capitalize">colors</h4>
            <div className="mt-2 space-x-2">
              {colors.map((color) => {
                return (
                  <button
                    type="button"
                    key={color}
                    className={`badge w-6 h-6 badge-md border-error border-[3px] ${
                      color !== productColor && "border-transparent"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setProductColor(color)}
                  ></button>
                );
              })}
            </div>
          </div>
          {/* amount -> text input & select */}
          <div className="form-control w-full max-w-xs mt-2">
            <label className="label" htmlFor="amount">
              <span className="label-text text-lg tracking-wide capitalize">
                amount
              </span>
            </label>
            <select
              className="select select-bordered select-secondary"
              id="amount"
              value={amount}
              // e.target.value 拿到的會是個 string (記得要轉換成 number)
              onChange={(e) => setAmount(parseInt(e.target.value))}
            >
              {generateAmountOptions(10)}
            </select>
          </div>
          {/* cart button */}
          <div className="mt-6">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => dispatch(addItem({ product: cartProduct }))}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
