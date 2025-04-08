import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Truck } from "lucide-react";
import PropTypes from 'prop-types';

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

  const navigate = useNavigate();

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
    if (onSave) onSave(shipmentDetails);
    alert("Shipping details saved!");
  };

  const handleCheckout = () => {
    handleSave();
    if (window.confirm("Proceed to payment?")) {
      navigate("/payment");
    }
  };
  Shipment.propTypes = {
    onSave: PropTypes.func.isRequired,
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          <Truck size={24} style={{ marginRight: 8 }} />
          Shipping Information
        </h2>

        <p style={styles.subtitle}>Please enter your delivery address and contact details.</p>

        <div style={styles.formGroup}>
          <label style={styles.label}>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={details.fullName}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={details.phone}
            onChange={handleChange}
            style={styles.input}
            placeholder="e.g. 9876543210"
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email Address</label>
          <input
            type="email"
            name="email"
            value={details.email}
            onChange={handleChange}
            style={styles.input}
            placeholder="yourname@example.com"
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Full Address</label>
          <textarea
            name="address"
            value={details.address}
            onChange={handleChange}
            style={styles.textarea}
            placeholder="House No, Street, Landmark..."
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>State</label>
          <select
            name="state"
            value={details.state}
            onChange={handleChange}
            style={styles.select}
            required
          >
            <option value="">Select your state</option>
            {statesOfIndia.map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Delivery Option</label>
          <select
            name="deliveryOption"
            value={details.deliveryOption}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="free">Free (5–7 days)</option>
            <option value="standard">Standard - ₹9.99 (3–5 days)</option>
            <option value="express">Express - ₹49.99 (1–2 days)</option>
          </select>
        </div>

        <div style={styles.buttonGroup}>
          <button onClick={handleSave} style={styles.secondaryBtn}>Save</button>
          <button onClick={handleCheckout} style={styles.primaryBtn}>
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    padding: "40px 20px",
    backgroundColor: "#f6f7f9",
    minHeight: "100vh",
  },
  card: {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  title: {
    display: "flex",
    alignItems: "center",
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "25px",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontWeight: "500",
    marginBottom: "6px",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "15px",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "15px",
    resize: "vertical",
    minHeight: "100px",
  },
  select: {
    width: "100%",
    padding: "12px",
    fontSize: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "30px",
    gap: "10px",
  },
  secondaryBtn: {
    flex: 1,
    padding: "12px",
    backgroundColor: "#e0e0e0",
    color: "#333",
    border: "none",
    borderRadius: "8px",
    fontWeight: "500",
    cursor: "pointer",
  },
  primaryBtn: {
    flex: 2,
    padding: "12px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default Shipment;
