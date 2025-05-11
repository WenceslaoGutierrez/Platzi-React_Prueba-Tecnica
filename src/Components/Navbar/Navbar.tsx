import { useContext, useState, type ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCartContext } from "../../Context/ShoppingCartContext";
import { getParsedStorageObject, userHasAccountFrom } from "../../utils";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const context = useContext(ShoppingCartContext);
  const activeStyle = "underline underline-offset-4";
  
  const parsedAccount = getParsedStorageObject('account');
  const userHasAccount = userHasAccountFrom(parsedAccount, context.account);
  const userEmail = typeof parsedAccount.email === 'string' ? parsedAccount.email : 'Unknown';

  // Responsive
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);


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
    if (isUserSignOut || !userHasAccount) {
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
            <span className="block md:hidden lg:block">{userEmail}</span>
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
    <nav className="z-10 top-0 w-full py-5 px-6 text-sm font-light bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center w-full">
        {/* Left Side (Logo + Links) */}
        <div className="md:w-full md:flex md:items-center md:gap-6">
          {/* Logo */}
          <div className="flex justify-between items-center w-full md:w-auto">
            <NavLink
              to={isUserSignOut ? "/sign-in" : "/"}
              className="font-semibold text-lg"
            >
              Shopi
            </NavLink>

            {/* Menu */}
            <button onClick={toggleMenu} className="md:hidden">
              {mobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Categories */}
          <ul
            className={`${
              mobileMenuOpen ? "flex" : "hidden"
            } flex-col md:flex md:flex-row md:items-center gap-3 mt-4 md:mt-0`}
          >
            <li>
              <NavLink
                to="/"
                onClick={() => {
                  context.setSearchByCategory(null);
                  setMobileMenuOpen(false);
                }}
                className={({ isActive }) =>
                  isActive ? activeStyle : undefined
                }
              >
                All
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/clothes"
                onClick={() => {
                  context.setSearchByCategory("clothing");
                  setMobileMenuOpen(false);
                }}
                className={({ isActive }) =>
                  isActive ? activeStyle : undefined
                }
              >
                Clothes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/electronics"
                onClick={() => {
                  context.setSearchByCategory("electronics");
                  setMobileMenuOpen(false);
                }}
                className={({ isActive }) =>
                  isActive ? activeStyle : undefined
                }
              >
                Electronics
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/men"
                onClick={() => {
                  context.setSearchByCategory("men");
                  setMobileMenuOpen(false);
                }}
                className={({ isActive }) =>
                  isActive ? activeStyle : undefined
                }
              >
                Men
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/women"
                onClick={() => {
                  context.setSearchByCategory("women");
                  setMobileMenuOpen(false);
                }}
                className={({ isActive }) =>
                  isActive ? activeStyle : undefined
                }
              >
                Women
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/jewelery"
                onClick={() => {
                  context.setSearchByCategory("jewelery");
                  setMobileMenuOpen(false);
                }}
                className={({ isActive }) =>
                  isActive ? activeStyle : undefined
                }
              >
                Jewelery
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Right Side (User Links + Cart) */}
        <ul className={`${mobileMenuOpen ? "flex flex-col" : "hidden"} md:flex md:flex-row lg:gap-6 gap-3 mt-4 md:mt-0 whitespace-nowrap`}>
          {renderView()}
        </ul>
        <ul className="flex justify-center ml-4 md:justify-start md:w-auto">
          <li>
            <ShoppingCart />
          </li>
        </ul>
      </div>
    </nav>
  );

};

export default Navbar;
