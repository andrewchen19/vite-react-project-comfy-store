import { NavLink, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/user/userSlice";
import { clearCart } from "../features/cart/cartSlice";

import { useQueryClient } from "@tanstack/react-query";

const Header = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const logoutHandler = () => {
    dispatch(clearCart());
    dispatch(logoutUser());
    // remove all of the queries
    queryClient.removeQueries();
    navigate("/");
  };

  return (
    <header className="bg-neutral py-2 text-neutral-content text-xs sm:text-sm">
      <div className="align-element flex justify-center sm:justify-end">
        {/* user 是否登入 */}
        {user ? (
          <div className="flex gap-x-6 items-center">
            <p className="capitalize">Hello, {user.username}</p>
            <button
              type="button"
              className="btn btn-outline btn-xs btn-error"
              onClick={logoutHandler}
            >
              logout
            </button>
          </div>
        ) : (
          <div className="flex gap-x-6 items-center">
            <NavLink to="/login" className="link link-error link-hover">
              Sign in/ Guest
            </NavLink>
            <NavLink to="/register" className="link link-error link-hover">
              Create Account
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
