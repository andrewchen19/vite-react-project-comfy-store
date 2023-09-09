import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// cartTotalPrice 是不包含稅 & 運費之前的價格
// orderTotalPrice 是最後的總價 (加上稅 & 運費)
const defaultState = {
  cartItems: [],
  cartTotalAmount: 0,
  cartTotalPrice: 0,
  shipping: 500,
  tax: 0,
  orderTotalPrice: 0,
};

// getLocalStorage
// page refresh 時，可以拿到本地存儲的資料
const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || defaultState;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getLocalStorage(),
  reducers: {
    clearCart: (state) => {
      localStorage.setItem("cart", JSON.stringify(defaultState));
      // 完全重置，不包含本地存儲的資料
      // 當返回 defaultState 時，Redux Toolkit 會將它視為一個全新的狀態，並將其用於替換當前的狀態
      // 以確保狀態的不可變性和 Redux 的正確運作
      return defaultState;
    },
    addItem: (state, action) => {
      // console.log(action.payload);
      const { product } = action.payload;

      // 如果有找到同個 cartID 時 (代表是相同的 product id & color ) ，加上之前所儲存的數量
      // 如果沒找到，變成一個 new Item
      const item = state.cartItems.find((i) => i.cartID === product.cartID);
      if (item) {
        item.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }

      // others
      state.cartTotalAmount += product.amount;
      state.cartTotalPrice += product.amount * product.price;

      // invoke reusing codes
      // caseReducers → we can access other reducer inside specific reducer
      cartSlice.caseReducers.calculateAndStore(state);

      // toastify
      toast.success("Item added to cart", {
        icon: "🛒",
      });
    },
    removeItem: (state, action) => {
      // console.log(action.payload);
      const { cartID } = action.payload;

      // 必須放在下一行的上面，logic 才對
      const product = state.cartItems.find((i) => i.cartID === cartID);
      // 清除該 item
      state.cartItems = state.cartItems.filter((i) => i.cartID !== cartID);

      // others
      state.cartTotalAmount -= product.amount;
      state.cartTotalPrice -= product.amount * product.price;

      // invoke reusing codes
      cartSlice.caseReducers.calculateAndStore(state);

      // toastify
      toast.error("Item removed from cart", {
        icon: "😢",
      });
    },
    editItem: (state, action) => {
      // console.log(action.payload);
      const { cartID, amount } = action.payload;
      const product = state.cartItems.find((i) => i.cartID === cartID);

      // others
      state.cartTotalAmount += amount - product.amount;
      state.cartTotalPrice += (amount - product.amount) * product.price;
      // 必須放在前兩行的下面，logic 才對
      product.amount = amount;

      // invoke reusing codes
      cartSlice.caseReducers.calculateAndStore(state);

      // toastify
      toast.info("Cart updated", {
        icon: "🆕",
      });
    },
    // reusing codes
    calculateAndStore: (state) => {
      state.tax = 0.1 * state.cartTotalPrice;
      state.orderTotalPrice = state.cartTotalPrice + state.tax + state.shipping;

      // store in localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

// console.log(cartSlice);
// 輸出 slice.reducer
export default cartSlice.reducer;
// 輸出個別的 reducer
export const { clearCart, addItem, removeItem, editItem } = cartSlice.actions;
