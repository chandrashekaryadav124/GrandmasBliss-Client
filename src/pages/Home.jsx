import{ useState } from "react";
import "./Home.css";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Ghee Mysore Pak",
    price: "₹349",
    image: "https://www.nativekart.com/wp-content/uploads/2022/10/21_ghee_mysorepak.jpg",
    rating: 4.8,
    desc: "Authentic soft Mysore Pak made with pure ghee and love.",
  },
  {
    id: 2,
    name: "Spicy Mango Pickle",
    price: "₹199",
    image: "https://ministryofcurry.com/wp-content/uploads/2023/04/aam-ka-achar_.jpg",
    rating: 4.6,
    desc: "Tangy and spicy mango pickle straight from grandma’s kitchen.",
  },
  {
    id: 3,
    name: "Dry Fruit Gift Box",
    price: "₹799",
    image: "https://thebaklavabox.com/cdn/shop/products/baklava-and-dry-fruits-gift-hamper-lotus-luxe-gift-box-297745.jpg?v=1680227394",
    rating: 5.0,
    desc: "Beautifully packed dry fruit box perfect for gifting!",
  },
];

const Home = () => {
  const [quickView, setQuickView] = useState(null);

  const openModal = (product) => setQuickView(product);
  const closeModal = () => setQuickView(null);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const navigate = useNavigate();


  return (
    <div className="home-container">
      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero-overlay" />
        <div className="home-hero-content">
          <h1>
            Taste the <span className="highlight">Tradition</span> of Love
          </h1>
          <p>Homemade Sweets & Pickles from Grandma’s Kitchen</p>
          <button className="home-shop-btn" onClick={() => navigate("/products")}>
Shop Now</button>
        </div>
      </section>

      {/* Featured Features */}
      <section className="home-features">
        <div className="home-features-grid">
          <div className="feature-card">
            <Star size={32} />
            <h3>Authentic Taste</h3>
            <p>Made with age-old recipes passed down generations.</p>
          </div>
          <div className="feature-card">
            <Star size={32} />
            <h3>Homemade Goodness</h3>
            <p>Each product is handcrafted with love and care.</p>
          </div>
          <div className="feature-card">
            <Star size={32} />
            <h3>Nationwide Delivery</h3>
            <p>We deliver across India to bring tradition to your doorstep.</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="home-featured-products">
        <h2 className="section-title">Featured Products</h2>
        <div className="home-products-grid">
          {products.map((product) => (
            <div key={product.id} className="home-product-card">
              <div className="home-image-container">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="home-product-details">
                <h3>{product.name}</h3>
                <div className="product-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="star-icon"
                      fill={i < Math.floor(product.rating) ? "yellow" : "none"}
                    />
                  ))}
                </div>
                <p className="home-price">{product.price}</p>
                <button
                  className="home-add-to-cart"
                  onClick={() => openModal(product)}
                >
                  Quick View
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="home-cta">
        <div className="home-cta-overlay" />
        <div className="home-cta-content">
          <h2>Send a Box of Bliss!</h2>
          <p>Celebrate festivals and occasions with Grandma’s Bliss Gift Boxes</p>
          <button className="home-gift-btn">Gift Now</button>
        </div>
      </section>

      {/* Newsletter */}
      <section className="home-newsletter">
        <div className="newsletter-content">
          <div className="newsletter-icon">📬</div>
          <h2>Subscribe to our Newsletter</h2>
          <p>Get updates on seasonal specials, offers, and new arrivals!</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>

      

      {/* Scroll to Top */}
      <button className="scroll-to-top" onClick={scrollToTop}>
        <ArrowUp size={20} />
      </button>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickView && (
          <motion.div
            className="quick-view-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="quick-view-modal"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={quickView.image} alt={quickView.name} />
              <h3>{quickView.name}</h3>
              <p className="modal-price">{quickView.price}</p>
              <p className="modal-desc">{quickView.desc}</p>
              <button className="home-add-to-cart" onClick={closeModal}>
                Add to Cart
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
