import { Form, redirect } from "react-router-dom";
import { FormInput, SubmitBtn } from "../components";
import { customFetch, formatPrice } from "../utilize";
import { toast } from "react-toastify";
import { clearCart } from "../features/cart/cartSlice";

export const action =
  (store, queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);

    // 拿到 cart state
    const { cartItems, cartTotalAmount, orderTotalPrice } =
      store.getState().cart;
    const data = {
      address,
      cartItems,
      chargeTotal: orderTotalPrice,
      name,
      numItemsInCart: cartTotalAmount,
      orderTotal: formatPrice(orderTotalPrice),
    };

    // 拿到 user state
    const { user } = store.getState().user;

    try {
      const response = await customFetch.post(
        "/orders",
        { data },
        // Bearer 與 token 之間記得要空一格
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // console.log(response);

      // we have to use removeQueries instead of invalidateQueries
      // because we not use useQuery in Orders component (instead queryClient.ensureQueryData in the loader function)
      // without the hook, we can’t invalidate and refetch, it won’t work since the code in the loader function doesn’t trigger that
      // We can only remove query/queries and fetch a new one
      queryClient.removeQueries({ queryKey: ["orders"] });

      // 清除購物車
      store.dispatch(clearCart());
      toast.success("order placed successfully", {
        icon: "😎",
      });

      return redirect("/orders");
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

const CheckOutForm = () => {
  return (
    <Form method="POST" className="mt-4 flex flex-col gap-y-4">
      <h3 className="text-xl tracking-wide capitalize">Shipping Information</h3>
      <FormInput label="first name" name="name" type="text" />
      <FormInput label="address" name="address" type="text" />
      {/* SubmitBtn 外面是 inline-block 屬性，不會推開上下元素 */}
      <div className="mt-4">
        <SubmitBtn text="place your order" />
      </div>
    </Form>
  );
};

export default CheckOutForm;
