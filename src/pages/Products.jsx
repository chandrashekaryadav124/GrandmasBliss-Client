import  { useState } from "react";
import "./Products.css";

export default function Products() {
  const allProducts = [
    { category: "Sweets", name: "Gulab Jamun", description: "Soft and spongy dumplings soaked in sugar syrup.", price: "₹199.00 – ₹499.00", reviews: 120, image: "/sweetsimages/gulab-jamun.jpg" },
    { category: "Sweets", name: "Jalebi", description: "Crispy and juicy deep-fried spirals dipped in syrup.", price: "₹150.00 – ₹450.00", reviews: 98, image: "/sweetsimages/jalebi.jpg" },
    { category: "Sweets", name: "Rasgulla", description: "Soft and spongy cheese balls soaked in sugar syrup.", price: "₹180.00 – ₹480.00", reviews: 85, image: "/sweetsimages/Rasgulla-Featured-Image.jpg" },
    { category: "Sweets", name: "Kaju Katli", description: "Delicious cashew fudge with a smooth texture.", price: "₹350.00 – ₹850.00", reviews: 220, image: "/sweetsimages/kaju.jpg" },
    { category: "Sweets", name: "Laddu", description: "Traditional round sweets made with gram flour and sugar.", price: "₹250.00 – ₹650.00", reviews: 145, image: "/sweetsimages/motichoor laddu.jpeg" },
    { category: "Sweets", name: "Mysore Pak", description: "Rich, buttery, and melt-in-mouth gram flour sweet.", price: "₹270.00 – ₹700.00", reviews: 160, image: "/sweetsimages/mysore pak.jpg" },
    { category: "Sweets", name: "Peda", description: "Soft, milky, and deliciously flavored sweet.", price: "₹200.00 – ₹600.00", reviews: 110, image: "/sweetsimages/pedda.jpeg" },
    { category: "Sweets", name: "Halwa", description: "Delightful Indian pudding made with ghee and sugar.", price: "₹220.00 – ₹550.00", reviews: 132, image: "/sweetsimages/Sooji-Halwa.jpg" },
    { category: "Sweets", name: "Burfi", description: "Delicious fudgy sweet made with nuts and milk solids.", price: "₹300.00 – ₹750.00", reviews: 175, image: "/sweetsimages/burfi.jpeg" },
    { category: "Sweets", name: "Modak", description: "A traditional sweet dumpling filled with coconut and jaggery.", price: "₹280.00 – ₹720.00", reviews: 90, image: "/sweetsimages/modak.jpeg" },
    { category: "Pickles", name: "Mango Pickle", description: "Spicy and tangy mango pickle made with traditional spices.", price: "₹120.00 – ₹320.00", reviews: 75, image: "/sweetsimages/mango.jpeg" },
    { category: "Pickles", name: "Lime Pickle", description: "Zesty and flavorful lime pickle with a spicy kick.", price: "₹100.00 – ₹280.00", reviews: 65, image: "/sweetsimages/lime.jpeg" },
    { category: "Pickles", name: "Mixed Pickle", description: "A delicious mix of vegetables and spices in tangy oil.", price: "₹130.00 – ₹350.00", reviews: 80, image: "/sweetsimages/mixedveg.jpeg" }
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const [minReviews, setMinReviews] = useState(0);
  const [sortBy, setSortBy] = useState("name");

  const getPriceValue = (priceString) => {
    const matches = priceString.match(/₹(\d+)/);
    return matches ? parseInt(matches[1]) : 0;
  };

  const filteredProducts = allProducts
    .filter(product => 
      (selectedCategory === "All" || product.category === selectedCategory) &&
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       product.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (priceRange === "all" ||
       (priceRange === "under200" && getPriceValue(product.price) < 200) ||
       (priceRange === "200-500" && getPriceValue(product.price) >= 200 && getPriceValue(product.price) <= 500) ||
       (priceRange === "above500" && getPriceValue(product.price) > 500)) &&
      product.reviews >= minReviews
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return getPriceValue(a.price) - getPriceValue(b.price);
        case "price-high":
          return getPriceValue(b.price) - getPriceValue(a.price);
        case "reviews":
          return b.reviews - a.reviews;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="page-container">
      <div className="filters-sidebar">
        <h2 className="filters-title">Filters</h2>
        
        <div className="filter-section">
          <h3>Search</h3>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-section">
          <h3>Category</h3>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Categories</option>
            <option value="Sweets">Sweets</option>
            <option value="Pickles">Pickles</option>
          </select>
        </div>

        <div className="filter-section">
          <h3>Price Range</h3>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="price"
                value="all"
                checked={priceRange === "all"}
                onChange={(e) => setPriceRange(e.target.value)}
              />
              All Prices
            </label>
            <label>
              <input
                type="radio"
                name="price"
                value="under200"
                checked={priceRange === "under200"}
                onChange={(e) => setPriceRange(e.target.value)}
              />
              Under ₹200
            </label>
            <label>
              <input
                type="radio"
                name="price"
                value="200-500"
                checked={priceRange === "200-500"}
                onChange={(e) => setPriceRange(e.target.value)}
              />
              ₹200 - ₹500
            </label>
            <label>
              <input
                type="radio"
                name="price"
                value="above500"
                checked={priceRange === "above500"}
                onChange={(e) => setPriceRange(e.target.value)}
              />
              Above ₹500
            </label>
          </div>
        </div>

        <div className="filter-section">
          <h3>Minimum Reviews</h3>
          <input
            type="range"
            min="0"
            max="200"
            value={minReviews}
            onChange={(e) => setMinReviews(parseInt(e.target.value))}
            className="range-slider"
          />
          <span className="range-value">{minReviews}+ reviews</span>
        </div>

        <div className="filter-section">
          <h3>Sort By</h3>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="name">Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="reviews">Most Reviews</option>
          </select>
        </div>
      </div>

      <div className="main-content">
        <h1 className="heading">Our Products</h1>
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
    </div>
  );
}