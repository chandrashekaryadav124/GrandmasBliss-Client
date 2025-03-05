import { useState } from "react";
import "./Home.css";


const Home = () => {
  const [products] = useState([
    { id: 1, name: "Grandma's Special Mango Pickle", price: "$12", image: "https://www.ticklingpalates.com/wp-content/uploads/2022/05/mango-pickle-recipe.jpg" },
    { id: 2, name: "Classic Besan Ladoo", price: "$10", image: "https://almondhouse.com/cdn/shop/files/shagunladdu_2.jpg?v=1703676525&width=1000" },
  ]);

  return (
    <div className="home-container">
      
      {/* Hero Section */}
      <header className="hero">
        <h1>Welcome to Grandma’s Bliss</h1>
        <p>🏠Homemade sweets & pickles made with love and tradition.</p>
        <button className="shop-btn">Shop Now</button>
      </header>

      {/* Featured Products */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="price">{product.price}</p>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Gifting made easy!</h2>
        <p>Send your loved ones a taste of tradition with customizable gift packages.</p>
        <button className="gift-btn">Explore Gifts</button>
      </section>
    </div>
  );
};

export default Home;
