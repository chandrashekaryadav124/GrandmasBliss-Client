//import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./Gallery.css";

const images = [
  "https://www.masalakorb.com/wp-content/uploads/2020/07/Instant-Grated-Mango-Pickle-Mango-Thokku-V1.jpg",      
  "https://www.rajbhog.com/wp-content/uploads/2024/05/Experience-the-Richness-of-Indian-Sweets-with-Rajbhog-Foods-870x635.jpg",    
  "https://i0.wp.com/foodonfarmpickles.com/wp-content/uploads/2024/07/mango-pickle-scaled.webp?fit=2560%2C1708&ssl=1",     
  "https://vismaifood.com/storage/app/uploads/public/40c/1e6/695/thumb__700_0_0_0_auto.jpg",    
  "https://www.hotelierindia.com/cloud/2024/10/20/indian-tea-time-snacks-in-group-sev-chivda-farsan-mixture-bakarwadi-served-in-different-bowls-free-photo-1.jpg"
];

const Gallery = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,  // Show 3 images at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <div className="gallery-container">
      <h2>Our Delicious Collection</h2>
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index} className="gallery-item">
            <img src={src} alt={`Gallery item ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Gallery;
