import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const [shippingInfo, setShippingInfo] = useState(null);
  const [orderedItems, setOrderedItems] = useState([]);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const navigate = useNavigate();
  const invoiceRef = useRef();

  useEffect(() => {
    const storedShipping = localStorage.getItem("shipmentDetails");
    const storedCart = localStorage.getItem("cart");

    if (storedShipping) {
      setShippingInfo(JSON.parse(storedShipping));
    }

    if (storedCart) {
      setOrderedItems(JSON.parse(storedCart));
    }

    // Generate invoice number and timestamp
    const generatedInvoice = "INV-" + Math.floor(100000 + Math.random() * 900000);
    const dateNow = new Date().toLocaleString();
    setInvoiceNumber(generatedInvoice);
    setTimestamp(dateNow);
  }, []);

  const handlePrint = () => {
    window.print(); // Native browser print / save as PDF
  };

  return (
    <div style={styles.container}>
      <div ref={invoiceRef}>
        <h1 style={styles.heading}>🎉 Order Confirmed!</h1>
        <p style={styles.message}>
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        <div style={styles.detailsBox}>
          <h2 style={styles.subHeading}>🧾 Invoice Details</h2>
          <p><strong>Invoice Number:</strong> {invoiceNumber}</p>
          <p><strong>Date & Time:</strong> {timestamp}</p>
        </div>

        {shippingInfo && (
          <div style={styles.detailsBox}>
            <h2 style={styles.subHeading}>📦 Shipping Information</h2>
            <p><strong>Name:</strong> {shippingInfo.fullName}</p>
            <p><strong>Email:</strong> {shippingInfo.email}</p>
            <p><strong>Phone:</strong> {shippingInfo.phone}</p>
            <p><strong>Address:</strong> {shippingInfo.address}, {shippingInfo.city}</p>
            <p><strong>State:</strong> {shippingInfo.state}</p>
            <p><strong>Delivery Type:</strong> {shippingInfo.deliveryOption}</p>
          </div>
        )}

        {orderedItems.length > 0 && (
          <div style={styles.orderBox}>
            <h2 style={styles.subHeading}>🛒 Ordered Items</h2>
            {orderedItems.map((item) => (
              <div key={item.id} style={styles.itemCard}>
                <img src={item.imageUrl} alt={item.name} style={styles.image} />
                <div>
                  <h3 style={{ margin: 0 }}>{item.name}</h3>
                  <p style={{ margin: "4px 0" }}>{item.description}</p>
                  <p>Price: ₹{item.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Total: ₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={styles.buttonGroup}>
        <button style={styles.printBtn} onClick={handlePrint}>🖨️ Print / Download Invoice</button>
        <button style={styles.backBtn} onClick={() => navigate("/home")}>⬅️ Back to Home</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    textAlign: "center",
    backgroundColor: "#f3f4f6",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "2.5rem",
    color: "#10b981",
  },
  message: {
    marginTop: "0.5rem",
    fontSize: "1.2rem",
    color: "#374151",
  },
  detailsBox: {
    marginTop: "2rem",
    padding: "1.5rem",
    backgroundColor: "#fff",
    borderRadius: "10px",
    textAlign: "left",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "600px",
    marginInline: "auto",
  },
  orderBox: {
    marginTop: "2rem",
    padding: "1.5rem",
    backgroundColor: "#fff",
    borderRadius: "10px",
    textAlign: "left",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "800px",
    marginInline: "auto",
  },
  subHeading: {
    fontSize: "1.5rem",
    color: "#1f2937",
    marginBottom: "1rem",
  },
  itemCard: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1rem",
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: "1rem",
  },
  image: {
    width: "90px",
    height: "90px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  buttonGroup: {
    marginTop: "2rem",
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    flexWrap: "wrap",
  },
  printBtn: {
    backgroundColor: "#f59e0b",
    color: "white",
    border: "none",
    padding: "0.8rem 1.6rem",
    borderRadius: "6px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  backBtn: {
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    padding: "0.8rem 1.6rem",
    borderRadius: "6px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default OrderConfirmation;
