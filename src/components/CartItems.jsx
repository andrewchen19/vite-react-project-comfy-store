import { formatPrice, generateAmountOptions } from "../utilize";
import { removeItem, editItem } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const CartItems = ({ item }) => {
  const { title, amount, cartID, productColor, price, image, company } = item;

  const dispatch = useDispatch();

  const amountHandler = (e) => {
    // e.target.value 拿到的會是個 string (記得要轉換成 number)
    dispatch(editItem({ cartID, amount: parseInt(e.target.value) }));
  };
  const removeHandler = () => {
    dispatch(removeItem({ cartID }));
  };

  return (
    // last:border-b-0 => 讓最後一個元素沒有底線
    <article className="mb-8 flex flex-col gap-y-6 border-b border-base-300 pb-6 sm:flex-row sm:items-center last:border-b-0">
      {/* image */}
      <img
        src={image}
        alt={title}
        className="w-24 h-24 lg:w-28 lg:h-28 rounded-lg object-cover"
      />
      {/* info */}
      <div className="sm:ml-6 sm:w-40">
        <h4 className="text-lg capitalize tracking-wide font-semibold mb-2">
          {title}
        </h4>
        <p className="text-neutral-focus">{company}</p>
        <p className="flex gap-x-2 items-center capitalize">
          color:
          <span
            className="badge w-6 h-6 badge-md"
            style={{ backgroundColor: productColor }}
          ></span>
        </p>
      </div>
      {/* amount & remove */}
      <div className="sm:ml-6">
        <div className="form-control w-20">
          <label className="label" htmlFor="amount">
            <span className="label-text tracking-wide capitalize">amount</span>
          </label>
          <select
            className="select select-xs select-bordered select-secondary"
            id="amount"
            value={amount}
            onChange={amountHandler}
          >
            {/* 這樣設定，就可以根據 amount 的數量，動態生成 option */}
            {generateAmountOptions(amount + 5)}
          </select>
        </div>
        {/* 用 button 也可使用 link */}
        <button
          className="mt-2 pl-1 link link-hover link-primary"
          onClick={removeHandler}
        >
          remove
        </button>
      </div>
      {/* price */}
      <div className="sm:ml-auto">
        <p className="text-secondary-focus">{formatPrice(price)}</p>
      </div>
    </article>
  );
};

export default CartItems;
