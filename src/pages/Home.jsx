import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Gift, ShoppingBag } from "lucide-react";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const [products] = useState([
    { id: 1, name: "Grandma's Special Mango Pickle", price: "$12", image: "https://andhrapachallu.com/cdn/shop/files/IMG_6614-transformed.jpg?v=1714676495" },
    { id: 2, name: "Classic Besan Ladoo", price: "$10", image: "https://almondhouse.com/cdn/shop/files/shagunladdu_2.jpg?v=1703676525&width=1000" },
    { id: 3, name: "Jelebi", price: "$20", image: "https://www.flourandspiceblog.com/wp-content/uploads/2022/04/IMG_7323.jpg" }
  ]);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="home-hero">
        <div className="home-hero-content">
          <h1>Welcome to Grandma`s Bliss</h1>
          <p>Homemade sweets & pickles made with love and tradition.</p>
          <button 
            className="home-shop-btn"
            onClick={() => navigate("/products")}
          >
            <ShoppingBag className="home-inline-block home-mr-2" size={20} />
            Shop Now
          </button>
        </div>
      </header>

      {/* Featured Products */}
      <section className="home-featured-products">
        <h2>Featured Products</h2>
        <div className="home-products-grid">
          {products.map((product) => (
            <div key={product.id} className="home-product-card">
              <div className="home-image-container">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="home-product-details">
                <h3>{product.name}</h3>
                <p className="home-price">{product.price}</p>
                <button className="home-add-to-cart">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="home-cta">
        <div className="home-cta-content">
          <h2>Gifting made easy!</h2>
          <p>Send your loved ones a taste of tradition with customizable gift packages.</p>
          <button className="home-gift-btn">
            <Gift className="home-inline-block home-mr-2" size={20} />
            Explore Gifts
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
