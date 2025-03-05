import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
//import HeroSection from "./components/HeroSection";
import Register from "./pages/Register";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Login from "./pages/Login";
import Home from "./pages/Home";

export default function App() {
  return (
    <Router>
      <div className="bg-yellow-50 min-h-screen flex flex-col">
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          
        </Routes>
        <Footer />
      </div>
    </Router>
  );
} 
