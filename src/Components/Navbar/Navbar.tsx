import { useContext, type ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context/ShoppingCartContext";

const Navbar = () => {
  const context = useContext(ShoppingCartContext);
  const activeStyle = "underline underline-offset-4";

  // Sign Out
  const signOut = localStorage.getItem('sign-out');
  const parsedSignOut = signOut ? JSON.parse(signOut) as boolean : false;
  const isUserSignOut = context.signOut || parsedSignOut;

  const handleSignOut = (): void =>{
    const stringifiedSignOut = JSON.stringify(true);
    localStorage.setItem('sign-out', stringifiedSignOut);
    context.setSignOut(true);
  }

  const renderView = (): ReactNode =>{
    if (isUserSignOut) {
      return (
        <li>
          <NavLink
            to="/sign-in"
            className={({ isActive }) => isActive ? activeStyle : undefined }
            onClick={handleSignOut}>
            Sign in
          </NavLink>
        </li>
      );
    } else {
      return (
        <>
          <li className='text-black/60'>
          wences@example.com
          </li>
          <li>
            <NavLink
              to='/my-orders'
              className={({ isActive }) => isActive ? activeStyle : undefined}>
              My Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/my-account'
              className={({ isActive }) => isActive ? activeStyle : undefined}>
              My Account
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/sign-in'
              className={({ isActive }) => isActive ? activeStyle : undefined}
              onClick={handleSignOut}>
              Sign out
            </NavLink>
          </li>
        </>
      );
    }
  };

  return (
    <nav className="flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light bg-white">
      <ul className="flex items-center gap-3">
        <li className="font-semibold text-lg">
          <NavLink to="/">Shopi</NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            onClick={() => context.setSearchByCategory(null)}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/clothes"
            onClick={() => context.setSearchByCategory("clothing")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Clothes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/electronics"
            onClick={() => context.setSearchByCategory("electronics")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Electronics
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/men'
            onClick={() => context.setSearchByCategory('men')}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Men
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/women'
            onClick={() => context.setSearchByCategory('women')}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Women
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/jewelery'
            onClick={() => context.setSearchByCategory('jewelery')}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Jewelery
          </NavLink>
        </li>
      </ul>
      <ul className="flex items-center gap-3">
        {renderView()}
        <li className="flex items-center">
          <ShoppingBagIcon className="h-6 w-6 text-black" />
          <span>{context.count}</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
