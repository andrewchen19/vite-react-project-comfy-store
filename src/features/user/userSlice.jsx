import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const themes = {
  pastel: "pastel",
  night: "night",
};

const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
};

const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem("theme") || themes.pastel;
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
};

const initialState = {
  user: getUserFromLocalStorage(),
  theme: getThemeFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const user = { ...action.payload.user, token: action.payload.jwt };
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      toast.warning("Logged out successfully", {
        icon: "🥹",
      });
    },
    toggleTheme: (state) => {
      const { pastel, night } = themes;
      state.theme = state.theme === pastel ? night : pastel;
      document.documentElement.setAttribute("data-theme", state.theme);
      localStorage.setItem("theme", state.theme);
    },
  },
});

// console.log(userSlice);
// 輸出 slice.reducer
export default userSlice.reducer;
// 輸出個別的 reducer
export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;
