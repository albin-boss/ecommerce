import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import {
  Home,
  
  AboutPage,
  ContactPage,
  Cart,
  Login,
  Register,
  Checkout,
  PageNotFound,
} from "./pages";

import ProductList from "./pages/ProductList";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import Dashboard from "./admin/dashboard";
import Afterlogin from "./pages/afterlogin";
import AddProduct from "./admin/AddProduct";
import OrderDetails from "./pages/OrderDetails";
import Profile from "./pages/profile";
import GiftCard from "./pages/GiftCard";
import WishlistView from "./pages/WishlistView";
import ProductDetail from "./pages/ProductDetail";
import CustomerList from "./admin/CustomerList";
import Allproduct from "./admin/allproduct";
import EditProduct from "./admin/EditProduct";
import CategoryManager from "./admin/CategoryManager";
import OfferManager from "./admin/OfferManager";
import PurchaseList from "./admin/PurchaseList";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter >
    <ScrollToTop>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          
        
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/categorymanager" element={<CategoryManager/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/afterlogin" element={<Afterlogin/>}/>
          <Route path="/addproduct" element={<AddProduct/>}/>
          <Route path="/myorder" element={<OrderDetails/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/giftcard" element={<GiftCard/>}/>
          <Route path="/wishlist" element={<WishlistView/>}/>
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/allproduct" element={<Allproduct/>}/>
          <Route path="/update-product/:id" element={<EditProduct />} />
          <Route path="/offermanager" element={<OfferManager/>}/>
          <Route path="/purchaselist" element={<PurchaseList/>}/>


        </Routes>
      </Provider>
    </ScrollToTop>
    <Toaster />
  </BrowserRouter>
);