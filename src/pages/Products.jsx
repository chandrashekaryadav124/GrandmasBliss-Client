//import React, { useState } from "react";
import "./Products.css"; // Import external CSS
import { useState } from "react";

export default function Products() {
  const allProducts = [
    { category: "Sweets", name: "Gulab Jamun", description: "Soft and spongy dumplings soaked in sugar syrup.", price: "₹199.00 – ₹499.00", reviews: 120, image: "public/sweetsimages/gulab-jamun.jpg" },
    { category: "Sweets", name: "Jalebi", description: "Crispy and juicy deep-fried spirals dipped in syrup.", price: "₹150.00 – ₹450.00", reviews: 98, image: "public/sweetsimages/jalebi.jpg" },
    { category: "Sweets", name: "Rasgulla", description: "Soft and spongy cheese balls soaked in sugar syrup.", price: "₹180.00 – ₹480.00", reviews: 85, image: "public/sweetsimages/Rasgulla-Featured-Image.jpg" },
    { category: "Sweets", name: "Kaju Katli", description: "Delicious cashew fudge with a smooth texture.", price: "₹350.00 – ₹850.00", reviews: 220, image: "public/sweetsimages/kaju.jpg" },
    { category: "Sweets", name: "Laddu", description: "Traditional round sweets made with gram flour and sugar.", price: "₹250.00 – ₹650.00", reviews: 145, image: "public/sweetsimages/motichoor laddu.jpeg" },
    { category: "Sweets", name: "Mysore Pak", description: "Rich, buttery, and melt-in-mouth gram flour sweet.", price: "₹270.00 – ₹700.00", reviews: 160, image: "public/sweetsimages/mysore pak.jpg" },
    { category: "Sweets", name: "Peda", description: "Soft, milky, and deliciously flavored sweet.", price: "₹200.00 – ₹600.00", reviews: 110, image: "public/sweetsimages/pedda.jpeg" },
    { category: "Sweets", name: "Halwa", description: "Delightful Indian pudding made with ghee and sugar.", price: "₹220.00 – ₹550.00", reviews: 132, image: "public/sweetsimages/Sooji-Halwa.jpg" },
    { category: "Sweets", name: "Burfi", description: "Delicious fudgy sweet made with nuts and milk solids.", price: "₹300.00 – ₹750.00", reviews: 175, image: "public/sweetsimages/burfi.jpeg" },
    { category: "Sweets", name: "Modak", description: "A traditional sweet dumpling filled with coconut and jaggery.", price: "₹280.00 – ₹720.00", reviews: 90, image: "public/sweetsimages/modak.jpeg" },
    { category: "Pickles", name: "Mango Pickle", description: "Spicy and tangy mango pickle made with traditional spices.", price: "₹120.00 – ₹320.00", reviews: 75, image: "public/sweetsimages/mango.jpeg" },
    { category: "Pickles", name: "Lime Pickle", description: "Zesty and flavorful lime pickle with a spicy kick.", price: "₹100.00 – ₹280.00", reviews: 65, image: "public/sweetsimages/lime.jpeg" },
    { category: "Pickles", name: "Mixed Pickle", description: "A delicious mix of vegetables and spices in tangy oil.", price: "₹130.00 – ₹350.00", reviews: 80, image: "public/sweetsimages/mixedveg.jpeg" }
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = selectedCategory === "All" ? allProducts : allProducts.filter(product => product.category === selectedCategory);

  return (
    <div className="container">
      <h1 className="heading">Our Products</h1>
      <div className="filter-container">
        <select className="filter-select" onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="All">All</option>
          <option value="Sweets">Sweets</option>
          <option value="Pickles">Pickles</option>
        </select>
      </div>
      <div className="product-grid">
        {filteredProducts.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <h2 className="product-name">{product.name}</h2>
              <p className="product-description">{product.description}</p>
              <div className="product-reviews">
                <span className="stars">★★★★★</span>
                <span className="review-count">({product.reviews} reviews)</span>
              </div>
              <p className="product-price">{product.price}</p>
              <button className="select-button">SELECT OPTION</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
