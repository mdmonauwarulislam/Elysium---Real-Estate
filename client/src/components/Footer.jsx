import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "../assets/public/logo.png";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#606c38] via-[#283618] to-[#606c38] py-8 shadow-inner text-whiteray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-5">
          <Link to="/">
          <img src={logo} alt="logo" className="cursor-pointer h-16" />
        </Link>
            <p className="text-gray-200">
              ELYSIUM is your one-stop solution for all your real estate needs. We provide top-notch services to help you find your dream home.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-gray-200">Home</Link></li>
              <li><Link to="/about" className="hover:text-gray-200">About</Link></li>
              <li><Link to="/services" className="hover:text-gray-200">Services</Link></li>
              <li><Link to="/contact" className="hover:text-gray-200">Contact</Link></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-gray-400">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-gray-400">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-gray-400">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-gray-400">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <p className="text-gray-300">123 Real Estate St., Suite 100<br />Hyderabad, India 500001</p>
            <p className="text-gray-300">Email: <a href="mailto:info@elysium.com" className="hover:text-gray-900">info@elysium.com</a></p>
            <p className="text-gray-300">Phone: <a href="tel:+911234567890" className="hover:text-gray-900">+91 123-456-7890</a></p>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-gray-300 text-center">
          <p>&copy; 2024 ELYSIUM. All Rights Reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <Link to="/privacy" className="text-red-500">Privacy Policy</Link>
            <Link to="/terms" className="text-red-500">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
