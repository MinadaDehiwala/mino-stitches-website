// App.js
import React, { useContext } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import Cart from './pages/Cart.jsx';
import Profile from './pages/Profile.jsx';
import MyOrders from './pages/MyOrders.jsx';
import ChatBot from './pages/ChatBot.jsx';
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Navbar from './components/Navbar.jsx';
import { AuthContext } from './context/AuthContextManager.jsx';

// import admin routes
import ManageProducts from "./pages/ManageProducts.jsx";
import ManageUsers from "./pages/ManageUsers.jsx";

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoutes from "./components/ProtectedRoutes.jsx"; // Default import


function App() {

  const { authUser } = useContext(AuthContext)

  const getRoutes = (userType) => {
    const customers_routes = [
      { path: "/login", element: <Login /> },
      { path: "/products", element: <Products /> },
      { path: "/cart", element: <Cart /> },
      { path: "/my-orders", element: <MyOrders /> },
      { path: "/chatBot", element: <ChatBot /> },
      { path: "/about", element: <About /> },
      { path: "/signup", element: <Signup /> },
      { path: "/profile", element: <Profile /> },
    ];

    const admins_routes = [
      { path: "/manager-users", element: <ManageUsers /> },
      { path: "/manage-products", element: <ManageProducts /> },
    ];

    const unauthenticated_user_routes = [
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
      { path: "/products", element: <Products /> },
      { path: "/chatBot", element: <ChatBot /> },
      { path: "/about", element: <About /> },
    ];


    if (userType === null) {
      return unauthenticated_user_routes
    } else if (userType === "customer") {
      return customers_routes;
    } else if (userType === "admin") {
      return admins_routes;
    }

  };


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      element: <ProtectedRoutes userType={authUser?.userType || null} />,
      children: getRoutes(authUser?.userType || null),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
