export default function Contact() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Contact Us</h1>
      <p style={styles.paragraph}>How to get in touch with us.</p>
      <form style={styles.form}>
        <div>
          <label style={styles.label}>Name</label>
          <input 
            type="text" 
            style={styles.input}
            placeholder="Your Name" 
            required 
          />
        </div>
        <div>
          <label style={styles.label}>Email</label>
          <input 
            type="email" 
            style={styles.input}
            placeholder="Your Email" 
            required 
          />
        </div>
        <div>
          <label style={styles.label}>Message</label>
          <textarea 
            style={styles.textarea} 
            rows="4" 
            placeholder="Your Message" 
            required
          ></textarea>
        </div>
        <button 
          type="submit" 
          style={styles.button}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: 'auto',
    marginTop: '50px',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  paragraph: {
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  label: {
    fontSize: '14px',
    fontWeight: '500'
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px'
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px'
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};
