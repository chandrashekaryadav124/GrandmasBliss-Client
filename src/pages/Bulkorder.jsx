export default function Bulkorder() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Bulk Pickles & Sweets Order</h1>
      <p style={styles.paragraph}>
        Fill out the form below to place a custom bulk order for Grandma’s Bliss products.
      </p>
      <form style={styles.form}>
        <div>
          <label style={styles.label}>Full Name</label>
          <input 
            type="text" 
            style={styles.input}
            placeholder="Enter your full name" 
            required 
          />
        </div>

        <div>
          <label style={styles.label}>Email</label>
          <input 
            type="email" 
            style={styles.input}
            placeholder="Enter your email address" 
            required 
          />
        </div>

        <div>
          <label style={styles.label}>Phone Number</label>
          <input 
            type="tel" 
            style={styles.input}
            placeholder="Enter your phone number" 
            required 
          />
        </div>

        <div>
          <label style={styles.label}>Select Product</label>
          <select style={styles.input} required>
            <option value="">-- Choose a product --</option>
            <option value="mango-pickle">Mango Pickle</option>
            <option value="lemon-pickle">Lemon Pickle</option>
            <option value="sweet-laddu">Sweet Laddu</option>
            <option value="karanji">Karanji</option>
            <option value="mixture">South Indian Mixture</option>
          </select>
        </div>

        <div>
          <label style={styles.label}>Quantity (in KG)</label>
          <input 
            type="number" 
            style={styles.input}
            placeholder="e.g. 5" 
            min="1"
            required 
          />
        </div>

        <div>
          <label style={styles.label}>Delivery Address</label>
          <textarea 
            style={styles.textarea} 
            rows="3" 
            placeholder="Enter full delivery address" 
            required
          ></textarea>
        </div>

        <div>
          <label style={styles.label}>Additional Instructions</label>
          <textarea 
            style={styles.textarea} 
            rows="3" 
            placeholder="Any special requests or notes?"
          ></textarea>
        </div>

        <button 
          type="submit" 
          style={styles.button}
        >
          Submit Bulk Order
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    marginTop: '50px',
    padding: '30px',
    backgroundColor: '#fff7ed',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)'
  },
  heading: {
    fontSize: '26px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#9a3412'
  },
  paragraph: {
    marginBottom: '25px',
    color: '#7c2d12'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  label: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#78350f'
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #fbbf24',
    borderRadius: '8px',
    fontSize: '15px'
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #fbbf24',
    borderRadius: '8px',
    fontSize: '15px'
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#d97706',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  }
};
