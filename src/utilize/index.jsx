import axios from "axios";

// create axios instance
export const customFetch = axios.create({
  baseURL: "https://strapi-store-server.onrender.com/api",
});

// 幣值 & 數字轉換
// The Intl.NumberFormat object enables language-sensitive number formatting
export const formatPrice = (price) => {
  const dollarAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((price / 100).toFixed(2));

  return dollarAmount;
};

export const formatTime = (time) => {
  return new Date(time).toLocaleString();
};

// generate amount of options
export const generateAmountOptions = (number) => {
  // return array of xxx
  return Array.from({ length: number }, (_, index) => {
    return (
      <option key={index + 1} value={index + 1}>
        {index + 1}
      </option>
    );
  });
};
