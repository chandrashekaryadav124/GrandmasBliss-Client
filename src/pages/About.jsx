const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        {/* Left Side - Image */}
        <div className="about-image">
          <img 
            src="src/assets/about-page.jpg"
            alt="About Grandma's Bliss" 
          />
        </div>
        
        {/* Right Side - Text Content */}
        <div className="about-content">
          <h1 className="about-title">About Grandma’s Bliss</h1>
          <p className="about-text">
            Welcome to Grandma’s Bliss – a place where tradition meets taste! We bring you homemade sweets and pickles crafted with love, just like grandma used to make. Every bite carries a touch of nostalgia and a whole lot of happiness.
          </p>
          <p className="about-text">
            Our ingredients are handpicked, and our recipes are passed down through generations, ensuring that every jar and every box brings warmth and joy to your home.
          </p>
          <p className="about-text">
            Thank you for being a part of our journey. Let’s cherish the flavors of tradition together!
          </p>
        </div>
      </div>
      
      {/* Why Grandma's Bliss Section */}
      <div className="why-grandmas-bliss">
        <h2 className="section-title">Why Grandma’s Bliss?</h2>
        <p className="section-text">Good Food Gives Good Mood & Good Mood Gives Health & Wealth.</p>
        <p className="section-text">If you are looking for cheap unhealthy food products then this is not a place for you. Our products are made from premium quality locally sourced ingredients, prepared with utmost care. So yes, we don’t compromise on quality of our products and hope our customers won’t too. That’s why our products are slightly more expensive—because quality comes at a cost.</p>
        
        <div className="stats-container">
          <div className="stat-box">
            <h3 className="stat-number">87+</h3>
            <p className="stat-text">Elderly Women Empowered</p>
          </div>
          <div className="stat-box">
            <h3 className="stat-number">65+</h3>
            <p className="stat-text">Countries Served</p>
          </div>
          <div className="stat-box">
            <h3 className="stat-number">45+</h3>
            <p className="stat-text">Friendly Farmer Tie-ups</p>
          </div>
        </div>
      </div>
      
      <style>{`
        .about-page {
          min-height: 100vh;
          background-color: #f3f4f6;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .about-container {
          max-width: 960px;
          background: white;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border-radius: 16px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .about-container {
            flex-direction: row;
          }
        }
      
        .about-image img {
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          max-width: 100%;
          max-height:90%;
        }
        .about-content {
          text-align: center;
          padding: 24px;
        }
        @media (min-width: 1024px) {
          .about-content {
            text-align: left;
          }
        }
        .about-title {
          font-size: 2rem;
          font-weight: bold;
          color: #d97706;
          margin-bottom: 16px;
        }
        .about-text {
          color: #4b5563;
          font-size: 1.125rem;
          line-height: 1.6;
          margin-bottom: 16px;
        }
        .why-grandmas-bliss {
          text-align: center;
          max-width: 960px;
          margin-top: 40px;
          padding: 32px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .section-title {
          font-size: 1.75rem;
          font-weight: bold;
          color: #d97706;
          margin-bottom: 16px;
        }
        .section-text {
          color: #4b5563;
          font-size: 1.125rem;
          line-height: 1.6;
          margin-bottom: 16px;
        }
        .stats-container {
          display: flex;
          justify-content: space-around;
          margin-top: 24px;
        }
        .stat-box {
          text-align: center;
          background: #fef3c7;
          padding: 16px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .stat-number {
          font-size: 1.5rem;
          font-weight: bold;
          color: #b45309;
        }
        .stat-text {
          color: #4b5563;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
};

export default About;
