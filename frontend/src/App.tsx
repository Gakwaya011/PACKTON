import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // <-- Import the new footer
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import HowItWorks from './pages/HowItWorks';
import Contact from './pages/Contact';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      {/* We use flex-col and min-h-screen to ensure the footer is always pushed to the bottom */}
      <div className="min-h-screen flex flex-col bg-brand-white font-sans text-brand-dark antialiased">
        <Navbar />
        
        {/* Main Content Area (flex-grow pushes the footer down) */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>

        <Footer /> {/* <-- Place the footer here */}
      </div>
    </Router>
  );
}

export default App;