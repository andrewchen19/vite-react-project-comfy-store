import { customFetch } from "../utilize";

import { Filter, PaginationContainer, ProductsContainer } from "../components";

const filterProductsQuery = (params) => {
  const { search, category, company, order, price, shipping, page } = params;

  return {
    // Nullish coalescing operator
    // if left hand side is 「undefined」 or 「null」, return right hand side
    queryKey: [
      "filterProducts",
      search ?? "",
      category ?? "all",
      company ?? "all",
      order ?? "a-z",
      price ?? "100000",
      shipping ?? "off",
      page ?? "1",
    ],
    // 第二個參數 config -> params (an object)
    // 用於指定請求的查詢參數 (query parameters)
    queryFn: () => customFetch("/products", { params }),
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    // creates a new URL object
    const url = new URL(request.url);
    // url.searchParams return an URLSearchParams object (iterable)
    // Object.fromEntries() turn a list of key-value pairs into an object
    const params = Object.fromEntries(url.searchParams);
    // console.log(params);

    const response = await queryClient.ensureQueryData(
      filterProductsQuery(params)
    );
    // console.log(response);

    return {
      products: response.data.data,
      meta: response.data.meta,
      params,
    };
  };

const Products = () => {
  return (
    <>
      <Filter />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};

export default Products;
