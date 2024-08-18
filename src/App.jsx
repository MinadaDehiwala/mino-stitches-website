import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Invoice from './pages/Invoice.jsx';
import Profile from './pages/Profile.jsx';
import MyOrders from './pages/MyOrders.jsx';
import ChatBot from './pages/ChatBot.jsx';
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import ManageProducts from './pages/ManageProducts.jsx';
import ManageUsers from './pages/ManageUsers.jsx';
import Admin from './pages/Admin.jsx';
import AddProduct from './pages/AddProduct.jsx';
import EditProduct from './pages/EditProduct.jsx';
import Orders from './pages/orders.jsx';
import EditUser from './pages/EditUser.jsx';
import Custom from './pages/custom.jsx'; // Import Custom component
import Message from './pages/message.jsx'; // Import Message component
import AdminMessages from './pages/admin_messages.jsx'; // Import AdminMessages component
import AdminCustomOrders from './pages/admin_custom_orders.jsx'; // Import AdminCustomOrders component
import ProtectedRoutes from './components/ProtectedRoutes.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
    path: "/products",
    element: <Products />,
  },
  {
    path: "/chatBot",
    element: <ChatBot />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/custom",
    element: <Custom />, // Add the Custom component route
  },
  {
    path: "/message",
    element: <Message />, // Add the Message component route
  },
  {
    element: <ProtectedRoutes allowedRoles={['customer', 'admin']} />,
    children: [
      { path: "/products", element: <Products /> },
      { path: "/cart", element: <Cart /> },
      { path: "/order-summary", element: <Checkout /> },
      { path: "/invoice", element: <Invoice /> },
      { path: "/my-orders", element: <MyOrders /> },
      { path: "/profile", element: <Profile /> },
    ]
  },
  {
    element: <ProtectedRoutes allowedRoles={['admin']} />,
    children: [
      { path: "/admin", element: <Admin /> },
      { path: "/manage-users", element: <ManageUsers /> },
      { path: "/manage-products", element: <ManageProducts /> },
      { path: "/add-product", element: <AddProduct /> },
      { path: "/edit-product/:id", element: <EditProduct /> },
      { path: "/orders", element: <Orders /> },
      { path: "/edit-user/:id", element: <EditUser /> },
      { path: "/admin-messages", element: <AdminMessages /> }, // Add AdminMessages component route
      { path: "/admin-custom-orders", element: <AdminCustomOrders /> }, // Add AdminCustomOrders component route
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
