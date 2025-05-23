import { BrowserRouter, useRoutes } from 'react-router-dom';
import { ShoppingCartContext, ShoppingCartProvider } from './Context/ShoppingCartContext';
import Home from './Pages/Home/Home';
import MyAccount from './Pages/MyAccount/MyAccount';
import MyOrder from './Pages/MyOrder/MyOrder';
import MyOrders from './Pages/MyOrders/MyOrders';
import NotFound from './Pages/NotFound/NotFound';
import SignIn from './Pages/SignIn/SignIn';
import Navbar from './Components/Navbar/Navbar';
import CheckoutSideMenu from './Components/CheckoutSideMenu/CheckoutSideMenu';
import { useContext, type JSX } from 'react';
import { getParsedStorageObject, userHasAccountFrom } from './utils';

const AppRoutes = () => {
  const context = useContext(ShoppingCartContext);
  const parsedAccount = getParsedStorageObject('account');
  const parsedSignOut = getParsedStorageObject('sign-out');
  const userHasAccount = userHasAccountFrom(parsedAccount, context.account);
  const isUserSignOut = context.signOut || parsedSignOut;

  const protectRoute = (element: JSX.Element) => {
    return userHasAccount && !isUserSignOut ? element : <SignIn />;
  };

  const routes = useRoutes([
    { path: '/', element: protectRoute(<Home />) },
    { path: '/clothes', element: protectRoute(<Home />) },
    { path: '/electronics', element: protectRoute(<Home />) },
    { path: '/men', element: protectRoute(<Home />) },
    { path: '/women', element: protectRoute(<Home />) },
    { path: '/jewelery', element: protectRoute(<Home />) },
    { path: '/my-account', element: <MyAccount /> },
    { path: '/my-order', element: <MyOrder /> },
    { path: '/my-orders', element: <MyOrders /> },
    { path: '/my-orders/last', element: <MyOrder /> },
    { path: '/my-orders/:id', element: <MyOrder /> },
    { path: '/sign-in', element: <SignIn /> },
    { path: '*', element: <NotFound /> }
  ]);

  return routes;
};

const App = () => {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
        <CheckoutSideMenu />
      </BrowserRouter>
    </ShoppingCartProvider>
  );
};

export default App;
