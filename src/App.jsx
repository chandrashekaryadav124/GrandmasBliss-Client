import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Register from "./pages/Register";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Profile from './components/Profile';
import Cart from './pages/Cart';
import './App.css';
import { ToastContainer } from "react-toastify";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    // Check if the user is authenticated
    const authToken = localStorage.getItem('authToken');
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    const storedBio = localStorage.getItem('bio');
    const storedProfileImage = localStorage.getItem('profileImage') || '/images/profile.jpg'; // Default profile image
    if (authToken) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
      setEmail(storedEmail);
      setBio(storedBio);
      setProfileImage(storedProfileImage);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('bio');
    localStorage.removeItem('profileImage');
    setIsAuthenticated(false);
    setUsername('');
    setEmail('');
    setBio('');
    setProfileImage('');
  };

  return (
    <Router>
      <div className="bg-yellow-50 min-h-screen flex flex-col">
        <Header isAuthenticated={isAuthenticated} username={username} email={email} bio={bio} onLogout={handleLogout} profileImage={profileImage} />
        <Routes>
          <Route path="/register" element={<PublicRoute element={<Register />} isAuthenticated={isAuthenticated} />} />
          <Route path="/login" element={<PublicRoute element={<Login setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} />} isAuthenticated={isAuthenticated} />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} isAuthenticated={isAuthenticated} />} />
          <Route path="/about" element={<About/>} />
          <Route path="/products" element={<PrivateRoute element={<Products />} isAuthenticated={isAuthenticated} />} />
          <Route path="/contact" element={<PrivateRoute element={<Contact />} isAuthenticated={isAuthenticated} />} />
          <Route path="/gallery" element={<PrivateRoute element={<Gallery />} isAuthenticated={isAuthenticated} />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile username={username} email={email} bio={bio} onLogout={handleLogout} />} isAuthenticated={isAuthenticated} />} />
          <Route path="/cart" element={<PrivateRoute element={<Cart />} isAuthenticated={isAuthenticated} />} />
        </Routes>
        <Footer />
        <ToastContainer/>
      </div>
    </Router>
  );
}
