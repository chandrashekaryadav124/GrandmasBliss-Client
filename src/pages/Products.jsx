import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [type, setType] = useState("");
  const [quantities, setQuantities] = useState({});
  const [zoomedImage, setZoomedImage] = useState(null);

  const quantityMultiplier = {
    "500gm": 1,
    "1kg": 2,
    "2kg": 4,
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setZoomedImage(null);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const addToCart = (product) => {
    const selectedQty = quantities[product.id] || "500gm";
    const multiplier = quantityMultiplier[selectedQty];
    const priceWithQty = (product.price || 0) * multiplier;

    const productWithQty = {
      ...product,
      quantity: selectedQty,
      totalPrice: priceWithQty,
    };

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(productWithQty);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} (${selectedQty}) added to cart!`);
  };

  const handleQuantityChange = (productId, value) => {
    setQuantities((prev) => ({ ...prev, [productId]: value }));
  };

  const handleImageClick = (url) => setZoomedImage(url);

  const filteredProducts = products.filter((product) => {
    const selectedQty = quantities[product.id] || "500gm";
    const multiplier = quantityMultiplier[selectedQty] || 1;
    const price = product.price || 0;
    const totalPrice = price * multiplier;

    return (
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (maxPrice === "" || totalPrice <= parseFloat(maxPrice)) &&
      (type === "" || product.type?.toLowerCase() === type.toLowerCase())
    );
  });

  const uniqueTypes = [...new Set(products.map((product) => product.type).filter(Boolean))];

  return (
    <Container>
      <h1>Our Products</h1>

      <Filters>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All Types</option>
          {uniqueTypes.map((t, index) => (
            <option key={index} value={t}>{t}</option>
          ))}
        </select>
      </Filters>

      <ProductGrid>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const selectedQty = quantities[product.id] || "500gm";
            const multiplier = quantityMultiplier[selectedQty] || 1;
            const adjustedPrice = (product.price || 0) * multiplier;

            return (
              <ProductCard key={product.id}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  onClick={() => handleImageClick(product.imageUrl)}
                  style={{ cursor: "zoom-in" }}
                />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <strong>Rs {adjustedPrice.toFixed(2)}</strong>
                <select
                  value={selectedQty}
                  onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                >
                  <option value="500gm">500gm</option>
                  <option value="1kg">1kg</option>
                  <option value="2kg">2kg</option>
                </select>
                <AddToCartButton onClick={() => addToCart(product)}>
                  Add to Cart
                </AddToCartButton>
              </ProductCard>
            );
          })
        ) : (
          <NoResults>No products found.</NoResults>
        )}
      </ProductGrid>

      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedImage(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.8)",
              zIndex: 999,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{ position: "relative", maxWidth: "90%", maxHeight: "90%" }}
            >
              <img
                src={zoomedImage}
                alt="Zoomed"
                style={{
                  maxHeight: "80vh",
                  borderRadius: "10px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                  objectFit: "contain",
                }}
              />
              <button
                onClick={() => setZoomedImage(null)}
                style={{
                  position: "absolute",
                  top: "-12px",
                  right: "-12px",
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  fontSize: "20px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default ProductsPage;

// Styled Components
const Container = styled.div`
  padding: 2rem;
  text-align: center;
`;

const Filters = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1rem;

  input,
  select {
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    width: 200px;
  }

  input:focus,
  select:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.3);
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.2rem;
`;

const ProductCard = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 0.5rem;
  }

  h3 {
    margin: 0.5rem 0;
  }

  p {
    color: #555;
    font-size: 0.9rem;
  }

  strong {
    display: block;
    margin-top: 0.5rem;
    color: #4f46e5;
  }

  select {
    margin-top: 0.5rem;
    padding: 0.3rem;
    border-radius: 0.375rem;
    border: 1px solid #d1d5db;
  }
`;

const AddToCartButton = styled.button`
  background-color: #4f46e5;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 0.5rem;

  &:hover {
    background-color: #4338ca;
  }
`;

const NoResults = styled.p`
  font-size: 1.2rem;
  color: #ef4444;
`;