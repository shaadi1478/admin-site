import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { MdLocalLibrary } from "react-icons/md";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <aside className="bg-gradient-to-br from-purple-600 to-blue-600 text-white p-4 shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/dashboard" className="text-2xl font-bold flex items-center gap-2">
          <MdLocalLibrary className="text-yellow-400" /> LibSync
        </Link>
        


        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation Links */}
        <ul
          className={`md:flex gap-6 absolute md:static left-0 w-full md:w-auto bg-white/20 backdrop-blur-md md:bg-transparent p-5 md:p-0 transition-all rounded-lg shadow-md md:shadow-none ${
            isOpen ? "top-16 opacity-100" : "top-[-400px] opacity-0 md:opacity-100"
          }`}
        >
          {[
            { name: "Dashboard", path: "/dashboard" },
            { name: "User Management", path: "/usermanagement" },
            { name: "Book Management", path: "/bookmanagement" },
          ].map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block px-4 py-2 rounded-md hover:text-yellow-400 transition ${
                  location.pathname === item.path ? "text-yellow-400 font-bold" : "text-white"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Navbar;
