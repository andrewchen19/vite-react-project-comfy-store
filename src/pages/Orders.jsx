import { redirect, useLoaderData } from "react-router-dom";
import {
  SectionTitle,
  OrderList,
  ModifiedPaginationContainer,
} from "../components";
import { customFetch } from "../utilize";

const ordersQuery = (params, user) => {
  const { page } = params;

  return {
    queryKey: ["orders", user.username, page ?? "1"],
    queryFn: () =>
      customFetch("/orders", {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),
  };
};

export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    // restrict access
    const user = store.getState().user.user;
    if (!user) {
      toast.warning("Please log in first", {
        icon: "😵",
      });
      return redirect("/login");
    }

    // parse the url , 拿取 search params (查詢參數)
    const url = new URL(request.url);
    const params = Object.fromEntries(url.searchParams);
    console.log(params);

    try {
      const response = await queryClient.ensureQueryData(
        ordersQuery(params, user)
      );

      return {
        orders: response.data.data,
        meta: response.data.meta,
      };
    } catch (error) {
      // console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        "There was an error placing your order";
      toast.error(errorMessage, {
        icon: "😵",
      });

      // if token expired (401) or token missing (403) , redirect to login page
      if (error?.response?.status === 401 || 403) {
        return redirect("/login");
      }

      return null;
    }
  };

const Orders = () => {
  const { meta } = useLoaderData();
  // console.log(meta);

  if (meta.pagination.total < 1) {
    return <SectionTitle text="please make an order" />;
  }

  return (
    <>
      <SectionTitle text="your orders" />
      <OrderList />
      <ModifiedPaginationContainer />
    </>
  );
};

export default Orders;
