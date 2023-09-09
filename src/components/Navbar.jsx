import { BsCart3, BsMoonFill, BsSunFill } from "react-icons/bs";
import { FaBars } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/user/userSlice";

const Navbar = () => {
  const { cartTotalAmount } = useSelector((store) => store.cart);
  const { theme } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  // utility function
  const themeHandler = () => {
    dispatch(toggleTheme());
  };

  const isLightTheme = theme === "pastel";

  return (
    <nav className="bg-base-200">
      <div className="navbar align-element">
        <div className="navbar-start">
          {/* title */}
          <NavLink to="/" className="hidden lg:flex btn btn-secondary text-3xl">
            C
          </NavLink>
          {/* dropdown */}
          <div className="dropdown dropdown-start lg:hidden">
            <label tabIndex={0} className="btn btn-ghost rounded-btn">
              <FaBars className="w-6 h-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
            >
              <NavLinks />
            </ul>
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">
            <NavLinks />
          </ul>
        </div>

        <div className="navbar-end">
          {/* theme */}
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              onChange={themeHandler}
              defaultChecked={isLightTheme}
            />
            <BsSunFill className="swap-on fill-current w-6 h-6" />
            <BsMoonFill className="swap-off fill-current w-6 h-6" />
          </label>
          {/* cart */}
          <NavLink to="/cart" className="btn btn-ghost btn-circle ml-4">
            <div className="indicator">
              <span className="indicator-item badge badge-secondary">
                {cartTotalAmount}
              </span>
              <BsCart3 className="w-6 h-6" />
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
