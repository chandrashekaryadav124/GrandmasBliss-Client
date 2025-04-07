import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [tax, setTax] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const calculatedSubtotal = cart.reduce((acc, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = item.quantity || 1;
      return acc + price * quantity;
    }, 0);

    const savedShipment = JSON.parse(localStorage.getItem("shipmentDetails"));
    const calculatedShipping = savedShipment?.shippingCost ?? (calculatedSubtotal > 1000 ? 0 : 9.99);
    const calculatedTax = calculatedSubtotal * 0.1;

    setSubtotal(calculatedSubtotal);
    setShipping(calculatedShipping);
    setTax(calculatedTax);
    setTotal(calculatedSubtotal + calculatedShipping + calculatedTax);

    const savedPaymentMethod = localStorage.getItem("paymentMethod");
    if (savedPaymentMethod) setPaymentMethod(savedPaymentMethod);
  }, []);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    localStorage.setItem("paymentMethod", method);
  };

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

  return (
    <div style={styles.container}>
      <h2>Select Payment Method</h2>
      <div style={styles.breakdown}>
        <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
        <p>Shipping: ₹{shipping.toFixed(2)}</p>
        <p>Tax: ₹{tax.toFixed(2)}</p>
        <h3>Total: ₹{total.toFixed(2)}</h3>
      </div>
      <form onSubmit={handlePayment} style={styles.form}>
        <div style={styles.radioGroup}>
          <label>
            <input
              type="radio"
              value="card"
              checked={paymentMethod === "card"}
              onChange={() => handlePaymentMethodChange("card")}
            />
            Credit / Debit Card
          </label>
          <label>
            <input
              type="radio"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => handlePaymentMethodChange("cod")}
            />
            Cash on Delivery (COD)
          </label>
        </div>

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

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            type="submit"
            style={styles.button}
            disabled={paymentMethod === "card" && !isCardPaymentValid()}
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
    maxWidth: "400px",
    margin: "40px auto",
    padding: "20px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
  breakdown: {
    marginBottom: "20px",
    fontSize: "16px",
    lineHeight: "1.5",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  radioGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    fontSize: "16px",
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
