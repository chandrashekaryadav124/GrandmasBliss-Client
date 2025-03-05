import Button from "./button"; 
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header className="nav-header">
        <h1 className="logo-title" >Grandma’s Bliss</h1>
        <nav>
          <ul className="flex gap-6 text-gray-700">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about" className="hover:text-gray-900">About</Link></li>
            <li><Link to="/products" className="hover:text-gray-900">Products</Link></li>
            <li><Link to="/contact" className="hover:text-gray-900">Contact</Link></li>
            <li><Link to="/gallery" className="hover:text-gray-900">Gallery</Link></li>
            <li><Link to="/register" className="register-element">Register</Link></li>
            <li><Link to="/login" className="login-element">Login</Link></li>
          </ul>
        </nav>
        <Button className="shopnow-button">
          <ShoppingCart size={18} /> Cart
        </Button>
      </header>
    </>
  );
} 
