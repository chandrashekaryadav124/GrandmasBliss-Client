import { useState, useEffect } from "react";
import styled from "styled-components";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  const quantityMultiplier = {
    "500gm": 1,
    "1kg": 2,
    "2kg": 4,
  };

  const addToCart = (product) => {
    const selectedQty = quantities[product.id] || "500gm";
    const multiplier = quantityMultiplier[selectedQty];
    const priceWithQty = product.price * multiplier;

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

  const filteredProducts = products.filter((product) => {
    const selectedQty = quantities[product.id] || "500gm";
    const multiplier = quantityMultiplier[selectedQty];
    const totalPrice = product.price * multiplier;

    return (
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (maxPrice === "" || totalPrice <= parseFloat(maxPrice)) &&
      (category === "" || product.category === category)
    );
  });

  const categories = [...new Set(products.map((product) => product.category))];

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

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </Filters>

      <ProductGrid>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const selectedQty = quantities[product.id] || "500gm";
            const multiplier = quantityMultiplier[selectedQty];
            const adjustedPrice = product.price * multiplier;

            return (
              <ProductCard key={product.id}>
                <img src={product.imageUrl} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>

                <strong>Rs {adjustedPrice.toFixed(2)}</strong>

                <select
                  value={selectedQty}
                  onChange={(e) =>
                    handleQuantityChange(product.id, e.target.value)
                  }
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

  input, select {
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    width: 200px;
  }

  input:focus, select:focus {
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
