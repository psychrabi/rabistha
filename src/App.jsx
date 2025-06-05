import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Purchase from "./pages/Purchase";
import FAQ from "./pages/FAQ";
import Wiki from "./pages/Wiki";
import Contact from "./pages/Contact";
import Features from "./pages/Features";
import './App.css'

function App() {
  return (
    <Router basename="/rabistha">
      <div className="min-h-screen bg-base-200">
        <div className="navbar bg-base-100 shadow mb-6">
          <div className="flex-1">
            <Link to="/" className="btn btn-ghost text-xl">ASTER Multiseat</Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/purchase">Purchase</Link></li>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/wiki">Wiki</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/features" element={<Features />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/wiki" element={<Wiki />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;