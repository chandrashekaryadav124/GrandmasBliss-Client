import { Link, useLocation } from "react-router-dom";
import "../App.css";

export default function Header() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      {/* Logo Section */}
      <div className="logo">
        <span role="img" aria-label="sweets" className="logo-icon">🍯</span>
        <span className="logo-text">Grandma’s Bliss</span>
      </div>

      {/* Navigation Section */}
      <nav>
        <ul className="nav-links">
          {[
            { name: "Home", path: "/home" },
            { name: "About", path: "/about" },
            { name: "Products", path: "/products" },
            { name: "Contact", path: "/contact" },
            { name: "Gallery", path: "/gallery" }
          ].map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={isActive(item.path) ? "nav-link active" : "nav-link"}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Auth Section */}
      <div className="auth-buttons">
        <Link to="/register" className="btn btn-register">Register</Link>
        <Link to="/login" className="btn btn-login">Login</Link>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Grandma`s Bliss. All rights reserved.</p>
      <p className="footer-subtext">Made with ❤️ and sweet memories</p>
    </footer>
  );
}
