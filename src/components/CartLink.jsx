import { Link, useLocation } from "react-router-dom";

const CartLink = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>
        {`
          .cart-container {
            display: flex;
            align-items: center;
            margin-left: 100px;
            font-family: 'Poppins', sans-serif;
          }

          .cartlink {
            text-decoration: none;
            font-size: 1.2rem;
            font-weight: bold;
            color: #333;
            padding: 8px 12px;
            border-radius: 8px;
            
          }

          .cartlink:hover {
            background:rgb(210, 210, 210);
            color:rgb(18, 17, 17);
          }

          .cartlink.active {
            background:rgb(238, 238, 250);
            color: rgb(9, 9, 9);
            border-radius: 8px;
          }
        `}
      </style>

      <div className="cart-container">
        <Link to="/cart" className={isActive('/cart') ? "cartlink active" : "cartlink"}>
          🛒 Cart
        </Link>
      </div>
    </>
  );
};

export default CartLink;
