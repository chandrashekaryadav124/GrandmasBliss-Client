import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCreditCard, FaMoneyBillWave } from "react-icons/fa";

const PaymentPage = () => {
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [tax, setTax] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" });
  const [upiId, setUpiId] = useState("");
  const [wallet, setWallet] = useState("Paytm");
  const [bank, setBank] = useState("HDFC");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const quantityMultiplier = {
      "500gm": 1,
      "1kg": 2,
      "2kg": 4,
    };

    const calculatedSubtotal = cart.reduce((acc, item) => {
      const price = parseFloat(item.price) || 0;
      const multiplier = quantityMultiplier[item.quantity] || 1;
      const unitCount = item.unitCount || 1;
      return acc + price * multiplier * unitCount;
    }, 0);

    const savedShipment = JSON.parse(localStorage.getItem("shipmentDetails")) || {};
    const calculatedShipping = parseFloat(savedShipment.shippingCost) || (calculatedSubtotal > 1000 ? 0 : 9.99);
    const calculatedTax = calculatedSubtotal * 0.1;

    const totalAmount = calculatedSubtotal + calculatedShipping + calculatedTax;

    setSubtotal(calculatedSubtotal);
    setShipping(calculatedShipping);
    setTax(calculatedTax);
    setTotal(totalAmount);

    const savedPaymentMethod = localStorage.getItem("paymentMethod");
    if (savedPaymentMethod) setPaymentMethod(savedPaymentMethod);
  }, []);

  const handlePayment = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const confirmPayment = () => {
    alert(
      paymentMethod === "cod"
        ? "Order placed with Cash on Delivery!"
        : "Payment Successful!"
    );
    localStorage.removeItem("cart");
    navigate("/order-confirmation");
  };

  const isCardPaymentValid = () => {
    const { number, expiry, cvv } = cardDetails;
    return number && expiry && cvv;
  };

  const isUpiValid = () => upiId.includes("@");

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Secure Payment</h2>
      <div style={styles.breakdown}>
        <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
        <p>Shipping: ₹{shipping.toFixed(2)}</p>
        <p>Tax: ₹{tax.toFixed(2)}</p>
        <h3>Total: ₹{total.toFixed(2)}</h3>
      </div>

      <form onSubmit={handlePayment} style={styles.form}>
        {/* Payment Tabs */}
        <div style={styles.paymentTabs}>
          {["card", "upi", "netbanking", "wallet", "cod"].map((method) => (
            <button
              type="button"
              key={method}
              onClick={() => setPaymentMethod(method)}
              style={{
                ...styles.tabButton,
                backgroundColor: paymentMethod === method ? "#4CAF50" : "#eee",
                color: paymentMethod === method ? "#fff" : "#333",
              }}
            >
              {method === "card" && <FaCreditCard style={{ marginRight: 8 }} />}
              {method === "cod" && <FaMoneyBillWave style={{ marginRight: 8 }} />}
              {method.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Conditional Form Fields */}
        {paymentMethod === "card" && (
          <>
            <input
              placeholder="Card Number"
              required
              style={styles.input}
              value={cardDetails.number}
              onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
            />
            <input
              placeholder="Expiry MM/YY"
              required
              style={styles.input}
              value={cardDetails.expiry}
              onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
            />
            <input
              placeholder="CVV"
              required
              style={styles.input}
              value={cardDetails.cvv}
              onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
            />
          </>
        )}

        {paymentMethod === "upi" && (
          <input
            placeholder="Enter UPI ID (e.g., yourname@upi)"
            required
            style={styles.input}
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />
        )}

        {paymentMethod === "netbanking" && (
          <select
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            style={styles.input}
            required
          >
            <option value="HDFC">HDFC</option>
            <option value="SBI">SBI</option>
            <option value="ICICI">ICICI</option>
            <option value="AXIS">AXIS</option>
            <option value="KOTAK">KOTAK</option>
          </select>
        )}

        {paymentMethod === "wallet" && (
          <select
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            style={styles.input}
            required
          >
            <option value="Paytm">Paytm</option>
            <option value="Amazon Pay">Amazon Pay</option>
            <option value="PhonePe">PhonePe</option>
            <option value="Mobikwik">Mobikwik</option>
          </select>
        )}

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            type="submit"
            style={styles.button}
            disabled={
              (paymentMethod === "card" && !isCardPaymentValid()) ||
              (paymentMethod === "upi" && !isUpiValid())
            }
          >
            {paymentMethod === "cod"
              ? `Place COD Order ₹${total.toFixed(2)}`
              : `Pay ₹${total.toFixed(2)}`}
          </button>

          <button
            type="button"
            style={styles.secondaryButton}
            onClick={() => navigate("/cart")}
          >
            ← Back to Cart
          </button>
        </div>
      </form>

      {showConfirmation && (
        <div style={styles.modal}>
          <p>Are you sure you want to place this order?</p>
          <button style={styles.confirmButton} onClick={confirmPayment}>Confirm</button>
          <button style={styles.cancelButton} onClick={() => setShowConfirmation(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "480px",
    margin: "40px auto",
    padding: "24px",
    boxShadow: "0 0 12px rgba(0,0,0,0.1)",
    borderRadius: "10px",
    backgroundColor: "#fff",
    fontFamily: "sans-serif",
  },
  header: {
    fontSize: "22px",
    marginBottom: "16px",
    textAlign: "center",
    color: "#333",
  },
  breakdown: {
    marginBottom: "20px",
    fontSize: "16px",
    lineHeight: "1.6",
    borderBottom: "1px solid #eee",
    paddingBottom: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  paymentTabs: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: "10px",
  },
  tabButton: {
    padding: "10px 14px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    flex: 1,
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  secondaryButton: {
    flex: 1,
    padding: "12px",
    backgroundColor: "#ddd",
    color: "#000",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  modal: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "20px",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
    borderRadius: "8px",
    zIndex: 1000,
    textAlign: "center",
  },
  confirmButton: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "10px",
  },
  cancelButton: {
    padding: "10px 20px",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default PaymentPage;
