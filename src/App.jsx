import React from 'react';
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
import ManageProducts from "./pages/ManageProducts.jsx";
import ManageUsers from "./pages/ManageUsers.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContextManager.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    element: <ProtectedRoutes allowedRoles={['customer', 'admin']} />,
    children: [
      // Customer routes
      { path: "/products", element: <Products /> },
      { path: "/cart", element: <Cart /> },
      { path: "/my-orders", element: <MyOrders /> },
      { path: "/chatBot", element: <ChatBot /> },
      { path: "/about", element: <About /> },
      { path: "/profile", element: <Profile /> },
    ]
  },
  {
    element: <ProtectedRoutes allowedRoles={['admin']} />,
    children: [
      // Admin routes
      { path: "/manage-users", element: <ManageUsers /> },
      { path: "/manage-products", element: <ManageProducts /> },
    ]
  }
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
