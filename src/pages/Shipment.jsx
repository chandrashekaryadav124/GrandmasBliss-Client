import { useState, useEffect } from "react";
import { CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

const statesOfIndia = [
  "Andhra Pradesh", "Telangana", "Karnataka", "Tamil Nadu", "Maharashtra", "Kerala",
  "Gujarat", "Rajasthan", "Punjab", "Haryana", "Uttar Pradesh", "Madhya Pradesh",
  "West Bengal", "Bihar", "Odisha", "Assam", "Chhattisgarh", "Jharkhand", "Goa",
  "Himachal Pradesh", "Uttarakhand", "Delhi", "Jammu and Kashmir"
];

const Shipment = ({ onSave }) => {
  const [details, setDetails] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    state: "",
    deliveryOption: "standard",
  });

  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const parsedCart = storedCart ? JSON.parse(storedCart) : [];
    setCart(parsedCart);
  }, []);

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const shippingCost =
      details.deliveryOption === "express" ? 49.99 :
      details.deliveryOption === "standard" ? 9.99 : 0;

    const shipmentDetails = {
      ...details,
      shippingCost,
    };

    localStorage.setItem("shipmentDetails", JSON.stringify(shipmentDetails));
    onSave && onSave(shipmentDetails);
    alert("Shipping details saved!");
  };

  const subtotal = cart.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 1),
    0
  );
  const shipping = details.deliveryOption === "express" ? 49.99 :
                   details.deliveryOption === "standard" ? 9.99 : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    handleSave(); // Save shipment details first
    if (window.confirm("Proceed to payment?")) {
      navigate("/payment");
    }
  };

  return (
    <div style={styles.container}>
      <h3>Shipping Details</h3>

      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={details.fullName}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={details.phone}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={details.email}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <textarea
        name="address"
        placeholder="Full Address"
        value={details.address}
        onChange={handleChange}
        style={styles.textarea}
        required
      />
      <label style={styles.label}>State:</label>
      <select
        name="state"
        value={details.state}
        onChange={handleChange}
        style={styles.select}
        required
      >
        <option value="">Select State</option>
        {statesOfIndia.map((st) => (
          <option key={st} value={st}>{st}</option>
        ))}
      </select>

      <label style={styles.label}>Delivery Option:</label>
      <select
        name="deliveryOption"
        value={details.deliveryOption}
        onChange={handleChange}
        style={styles.select}
      >
        <option value="free">Free (5-7 days)</option>
        <option value="standard">Standard - ₹9.99 (3-5 days)</option>
        <option value="express">Express - ₹49.99 (1-2 days)</option>
      </select>

      <button onClick={handleSave} style={styles.button}>
        Save Shipment Info
      </button>

      {/* Order Summary Section */}
      {cart.length > 0 && (
        <div style={styles.summaryBox}>
          <h3 style={{ marginBottom: "10px" }}>Order Summary</h3>
          <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
          <p>Shipping: ₹{shipping.toFixed(2)}</p>
          <p>Tax (10%): ₹{tax.toFixed(2)}</p>
          <h4>Total: ₹{total.toFixed(2)}</h4>

          <button onClick={handleCheckout} style={styles.checkoutBtn}>
            <CreditCard size={18} style={{ marginRight: 6 }} />
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    margin: "30px auto",
    padding: "20px",
    maxWidth: "500px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },
  textarea: {
    width: "100%",
    minHeight: "80px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },
  label: {
    display: "block",
    marginBottom: "6px",
    fontWeight: "bold",
  },
  select: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    marginBottom: "15px",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  summaryBox: {
    padding: "15px",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    marginTop: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  checkoutBtn: {
    marginTop: "15px",
    padding: "12px 18px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
};

export default Shipment;
