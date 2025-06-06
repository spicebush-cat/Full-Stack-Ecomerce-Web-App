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
import { Shopprovider } from "./context/ShopContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Favorits from "./pages/Favorits";
import ForgottenPass from "./pages/ForgottenPass";

function App() {
  return (
    <AuthProvider>
      <Shopprovider>
        <div className="flex flex-col px-3 sm:px-[5vw] md:px-[7vw] lg:px-[8vw] min-h-screen">
          <ToastContainer />
          <NavBar />
          <SearchBar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/form" element={<Formula />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgottenPass />} />
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
              <Route path="/card" element={<ProtectedRoute><Card /></ProtectedRoute> } />
              <Route path="/PlaceOrder" element={<ProtectedRoute><PlaceOrder /></ProtectedRoute>} />
              <Route path="/favorits" element={<ProtectedRoute><Favorits /></ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute><Order /></ProtectedRoute>} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Shopprovider>
    </AuthProvider>
  );
}

export default App;