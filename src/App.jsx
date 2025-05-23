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
import Profile from "./pages/Profile";
import Category from "./components/Category";
import CategoryDetail from "./pages/CategoryDetail";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { Shopprovider } from "./context/ShopContext"; // ✅ import Shopprovider
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Favorits from "./pages/Favorits";

function App() {
  return (
    <AuthProvider>
      <Shopprovider> {/* ✅ Wrap the app with Shopprovider */}
        <div className="flex flex-col px-3 sm:px-[5vw] md:px-[7vw] lg:px-[8vw] h-screen">
          <ToastContainer />
          <NavBar />
          <SearchBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/form" element={<Formula />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/category" element={<Category />} />
            <Route path="/category/:categoryName" element={<CategoryDetail />} />
            
            {/* Protected Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/card"
              element={
                <Card />
              }
            />
            <Route
              path="/PlaceOrder"
              element={
                <PlaceOrder />
              }
            />
            <Route
              path="/favorits"
              element={
                <Favorits />
              }
            />
            <Route
              path="/orders"
              element={
                <Order />
              }
            />
          </Routes>
          <Footer />
        </div>
      </Shopprovider>
    </AuthProvider>
  );
}

export default App;
