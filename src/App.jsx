import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Card from "./pages/card";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Formula from "./pages/Formula";
import PlaceOrder from "./pages/PlaceOrder";
import Product from "./pages/product";
import Order from "./pages/Order";
import Category from "./components/Category"; // Confirm path is correct
import CategoryDetail from "./pages/CategoryDetail";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
   

    <div className=" flex  flex-col px-3 sm:px-[5vw] md:px-[7vw] lg:px-[8vw] h-screen   ">
      <ToastContainer/>
      <NavBar />
      <SearchBar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/collection" element={<Collection/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/form" element={<Formula/>} />
        <Route path="/about" element={<About />} />
        <Route path="/card" element={<Card />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/orders" element={<Order />} />
        {/* Category routes */}
        <Route path="/category" element={<Category />} />
        <Route path="/category/:categoryName" element={<CategoryDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}


      
  

export default App;
