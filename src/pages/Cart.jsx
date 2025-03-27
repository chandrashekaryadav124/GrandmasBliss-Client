import { useState, useEffect } from "react";
import styled from "styled-components";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch cart items from localStorage
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const removeFromCart = (id) => {
    // Remove product from cart
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);

    // Update localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <Container>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <EmptyMessage>Your cart is empty.</EmptyMessage>
      ) : (
        <CartGrid>
          {cart.map((item) => (
            <CartItem key={item.id}>
              <img src={item.imageUrl} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <strong>Rs{item.price.toFixed(2)}</strong>
              </div>
              <RemoveButton onClick={() => removeFromCart(item.id)}>
                Remove
              </RemoveButton>
            </CartItem>
          ))}
        </CartGrid>
      )}
    </Container>
  );
};

export default CartPage;

// Styled Components
const Container = styled.div`
  padding: 2rem;
  text-align: center;
`;

const EmptyMessage = styled.p`
  font-size: 1.2rem;
  color: #555;
`;

const CartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const CartItem = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 0.5rem;
  }

  h3 {
    margin: 0;
  }

  p {
    color: #555;
    font-size: 0.9rem;
  }

  strong {
    color: #4f46e5;
  }
`;

const RemoveButton = styled.button`
  background-color: #ef4444;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: auto;

  &:hover {
    background-color: #dc2626;
  }
`;
