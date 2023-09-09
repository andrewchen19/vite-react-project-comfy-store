import { Form, NavLink, useLoaderData } from "react-router-dom";

import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormRange from "./FormRange";
import FormCheckbox from "./FormCheckbox";

const Filter = () => {
  const { meta, params } = useLoaderData();
  //  console.log(meta);

  // 讓 inputs 與 query parameters (查詢參數) 同步
  // 這樣當 refresh page 時，才不會出現 inputs 與 底下的 filter products 「不同步」的情況發生
  const { search, category, company, order, price, shipping } = params;

  return (
    <Form className="mb-8 bg-base-300 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {/* search -> text input */}
      <FormInput
        label="search product"
        type="text"
        name="search"
        size="input-sm"
        defaultValue={search}
      />
      {/* category -> select */}
      <FormSelect
        label="select category"
        name="category"
        list={meta.categories}
        size="select-sm"
        defaultValue={category}
      />
      {/* company -> select */}
      <FormSelect
        label="select company"
        name="company"
        list={meta.companies}
        size="select-sm"
        defaultValue={company}
      />
      {/* sort -> select */}
      <FormSelect
        label="sort by"
        name="order"
        list={["a-z", "z-a", "high", "low"]}
        size="select-sm"
        defaultValue={order}
      />
      {/* range -> range input  */}
      <FormRange
        label="select price"
        name="price"
        size="range-sm"
        defaultValue={price}
      />
      {/* shipping -> checkbox input */}
      <FormCheckbox
        label="free shipping"
        name="shipping"
        size="checkbox-sm"
        defaultValue={shipping}
      />
      {/* buttons */}
      <button type="submit" className="btn btn-sm btn-neutral">
        search
      </button>
      {/* 這邊必須使用 NavLink */}
      {/* 讓 url 回到只有 products 而沒有後面 query parameters 的狀態 */}
      <NavLink to="/products" className="btn btn-sm btn-secondary">
        reset
      </NavLink>
    </Form>
  );
};

export default Filter;
