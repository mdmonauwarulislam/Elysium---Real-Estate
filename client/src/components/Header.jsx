import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IoMdMenu , IoMdClose} from "react-icons/io";
import logo from "../assets/public/logo.png";

//i will redirect th the page without refreshing the page
export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };
  //8:53:26
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const closeMenu = () => {
    setMenuOpen(false);
  };
  return (
    <header className="shadow-md bg-gradient-to-r from-[#606c38] via-[#283618] to-[#606c38]">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <img src={logo} alt="logo" className="cursor-pointer h-16" />
        </Link>
        <form
          onSubmit={handleSubmit}
          className="p-2 rounded-xl flex items-center outline-white outline"
        >
          <input
            type="text"
            placeholder="Search.."
            className="focus:outline-none bg-transparent
            w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-white" />
          </button>
          {/* mobile size first after small a certain size */}
        </form>
        <nav className="relative ">
          {/* Full navbar for medium and larger screens */}
          <ul className="hidden md:flex gap-8 items-center text-white">
            <Link to="/">
              <li className="text-xl hover:underline cursor-pointer text-white">Home</li>
            </Link>
            <Link to="/about">
              <li className="text-xl hover:underline cursor-pointer">About</li>
            </Link>
            <Link to="/profile">
              {currentUser ? (
                <img
                  className="rounded-full h-7 w-7 object-cover"
                  src={currentUser.avatar}
                  alt="User Avatar"
                />
              ) : (
                <li className="text-xl hover:underline cursor-pointer">Sign in</li>
              )}
            </Link>
          </ul>

          {/* Mobile menu toggle button */}
          <div className="md:hidden flex justify-between font-medium items-center w-full">
            <button
              className="text-2xl p-2 text-white"
              onClick={toggleMenu}
            >
              {menuOpen ? <IoMdClose/> : <IoMdMenu/>}
            </button>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <ul className="flex flex-col gap-6 mt-2 absolute top-full bg-white shadow-lg rounded-lg p-4 w-[150px] z-50 right-0 items-center">
              {currentUser && (
                <Link to="/profile" onClick={closeMenu}>
                  <li className="text-xl hover:underline cursor-pointer flex items-center">
                    Profile
                  </li>
                </Link>
              )}
              <Link to="/" onClick={closeMenu}>
                <li className="text-xl hover:underline cursor-pointer">Home</li>
              </Link>
              <Link to="/about" onClick={closeMenu}>
                <li className="text-xl hover:underline cursor-pointer">About</li>
              </Link>
            </ul>
          )}
        </nav>

      </div>
    </header>
  );
}