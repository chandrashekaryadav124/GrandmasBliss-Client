import { useState, useEffect } from "react";
import { ShoppingCart, Trash2, Plus, Minus, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [shipment, setShipment] = useState({ shippingCost: 9.99 });
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const parsedCart = storedCart
      ? JSON.parse(storedCart).map((item) => ({
          ...item,
          quantity: item.quantity || 1,
        }))
      : [];
    setCart(parsedCart);

    const storedShipment = localStorage.getItem("shipmentDetails");
    if (storedShipment) setShipment(JSON.parse(storedShipment));
  }, []);

  const subtotal = cart.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 1),
    0
  );
  const shipping = shipment?.shippingCost ?? 9.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      setCart([]);
      localStorage.removeItem("cart");
    }
  };

  const handleGoToShipment = () => {
    navigate("/shipment");
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Your Cart</h1>
        <button className="cart-icon">
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
                  <strong>₹{item.price.toFixed(2)}</strong>
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
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Shipping:</span>
              <span>₹{shipping.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Tax (10%):</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="summary-line total">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <div className="button-group">
              <button className="shipment-btn" onClick={handleGoToShipment}>
                <Truck size={18} /> Go to Shipment
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
