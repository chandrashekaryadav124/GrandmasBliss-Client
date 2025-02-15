import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Register from "./pages/Register";



export default function App() {
  return (
    <div className="bg-yellow-50 min-h-screen flex flex-col">
      <Header />
      <HeroSection />
      <Footer />
      <Register/>
        
      
    </div>
  );
}