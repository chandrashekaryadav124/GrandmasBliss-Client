//import React from "react";
import "./Gallery.css";


const images = [
  "https://www.masalakorb.com/wp-content/uploads/2020/07/Instant-Grated-Mango-Pickle-Mango-Thokku-V1.jpg",      // Pickle
  "https://www.rajbhog.com/wp-content/uploads/2024/05/Experience-the-Richness-of-Indian-Sweets-with-Rajbhog-Foods-870x635.jpg",    // Indian Sweets
  "https://i0.wp.com/foodonfarmpickles.com/wp-content/uploads/2024/07/mango-pickle-scaled.webp?fit=2560%2C1708&ssl=1",     // Mango Pickle
  "https://vismaifood.com/storage/app/uploads/public/40c/1e6/695/thumb__700_0_0_0_auto.jpg",    // Ladoo
  "https://www.hotelierindia.com/cloud/2024/10/20/indian-tea-time-snacks-in-group-sev-chivda-farsan-mixture-bakarwadi-served-in-different-bowls-free-photo-1.jpg",       // Snacks
        // Gift Packs
];
const Gallery = () => {
  return (
    <div className="gallery-container">
      <h2>Our Delicious Collection</h2>
      <div className="gallery-grid">
        {images.map((src, index) => (
          <div key={index} className="gallery-item">
            <img src={src} alt={`Gallery item ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
