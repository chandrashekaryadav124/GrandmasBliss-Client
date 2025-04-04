import { useState, useEffect } from "react";
import { ShoppingCart, Trash2, Plus, Minus, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Cart.css"; // Import your CSS file for styling

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [ setIsCartOpen] = useState(false);
  const [ setOrderSummaryOpen] = useState(false);

  const navigate = useNavigate();

  // Load cart from localStorage on component mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart).map((item) => ({
          ...item,
          quantity: item.quantity || 1,
        }));
        setCart(parsedCart);
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      setCart([]);
    }
  }, []);

  // Handle checkout process
  const handleCheckout = () => {
    if (window.confirm("Are you sure you want to proceed to checkout?")) {
      setCart([]);
      localStorage.removeItem("cart");
      navigate("/order-confirmation");
    }
  };

  // Remove an item from the cart
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Update the quantity of an item in the cart
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Clear the entire cart
  const clearCart = () => {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      setCart([]);
      localStorage.removeItem("cart");
      setOrderSummaryOpen(false);
    }
  };

  // Calculate order totals
  const subtotal = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );
  const shipping = subtotal > 1000 ? 0 : 9.99; // Free shipping for orders over Rs 1000
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className="container">
      <header className="header">
        <h1>Your Cart</h1>
        <button onClick={() => setIsCartOpen(true)} className="cart-icon">
          <ShoppingCart size={28} />
          {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
        </button>
      </header>

      {cart.length === 0 ? (
        <div className="empty">
          <p>Your cart is empty.</p>
          <button onClick={() => navigate("/products")} className="shop-btn">
            Shop Now
          </button>
        </div>
      ) : (
        <>
          <div className="cart-grid">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.imageUrl} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <strong>Rs {item.price.toFixed(2)}</strong>
                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus size={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="total-section">
            <h2>Order Summary</h2>
            <div className="summary-line">
              <span>Subtotal:</span>
              <span>Rs {subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Shipping:</span>
              <span>Rs {shipping.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Tax (10%):</span>
              <span>Rs {tax.toFixed(2)}</span>
            </div>
            <div className="summary-line total">
              <span>Total:</span>
              <span>Rs {total.toFixed(2)}</span>
            </div>
            <div className="button-group">
              <button className="checkout-btn" onClick={handleCheckout}>
                <CreditCard size={18} /> Proceed to Checkout
              </button>
              <button className="clear-btn" onClick={clearCart}>
                <Trash2 size={18} /> Clear Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;