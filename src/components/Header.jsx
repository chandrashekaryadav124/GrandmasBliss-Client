import Button from "./button"; 
import Register from "../pages/Register"; 

import { ShoppingCart } from "lucide-react";

export default function Header() {
  return (
    <>
    <header className="nav-header">
      <h1 className="logo-title">Grandma’s Bliss</h1>
      <nav>
        <ul className="flex gap-6 text-gray-700">
          <li><a href="#about" className="hover:text-gray-900">About</a></li>
          <li><a href="#products" className="hover:text-gray-900">Products</a></li>
          <li><a href="#contact" className="hover:text-gray-900">Contact</a></li>
          <li ><a href="#gallary" className="hover:text-gray-900" >Gallary</a></li><br />
          <li><a href="#Login.jsx" className="hover:text-gray-900">Login</a></li>
          <li><a href="Register.jsx" className="hover:text-gray-900">Register</a></li>
          
        </ul>
        
      </nav>
       <Button className="shopnow-button">
        <ShoppingCart size={18} /> Cart
      </Button>
    </header>
    </>
    
  );
}
