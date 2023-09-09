// 基本上就複製 ProductsGrid 的 code
// 然後將 grid 的樣式改成 list

import { NavLink, useLoaderData } from "react-router-dom";
import { formatPrice } from "../utilize";

const ProductsList = () => {
  const { products } = useLoaderData();
  // console.log(products);

  return (
    <div className="mt-12 grid gap-y-4">
      {products.map((product) => {
        const { title, image, price, company } = product.attributes;
        // use 幣值 & 數字轉換
        const dollarAmount = formatPrice(price);

        return (
          <NavLink
            key={product.id}
            to={`/products/${product.id}`}
            className="p-8 rounded-lg flex flex-col gap-4 sm:flex-row shadow-md hover:shadow-xl transition-all duration-300 group"
          >
            {/* 加入 group-hover，變成是 hover 到 <a> 標籤圖片就會放大，而非一定要 hover 到 <img> 才會放大 */}
            <img
              src={image}
              alt={title}
              className=" w-24 h-24 sm:w-32 sm:h-32 object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />

            <div className="sm:ml-16">
              <h2 className=" card-title capitalize tracking-wide">{title}</h2>
              <h4 className="text-sm text-neutral-focus font-semibold tracking-wide">
                {company}
              </h4>
            </div>

            {/* margin-left:auto => 左側會自動佔據剩餘寬度，將 <p> 移置最右側 */}
            <p className="sm:ml-auto text-secondary-focus hover:ring-sky-500">
              {dollarAmount}
            </p>
          </NavLink>
        );
      })}
    </div>
  );
};

export default ProductsList;
