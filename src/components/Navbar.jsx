import { useState } from "react";
import { Link } from "react-router-dom";
import {
  IconX,
  IconMenu,
  IconChevronRight,
  IconUser,
} from "@tabler/icons-react";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="w-[90%] md:w-[85%] mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <h2 className="font-bold text-xl md:text-2xl font-kaushan text-orange-500 tracking-wide">
                trackit.
              </h2>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center font-medium space-x-3">
            <Link to="/">Home</Link>
            <Link to="/applications">Applications</Link>
          </nav>

          {/* User Menu (Desktop) */}
          <div className="hidden md:flex items-center">
            <UserMenu />
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={toggleMenu}
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? <IconX size={24} /> : <IconMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-b border-slate-200">
          <a
            href="/"
            className="flex items-center px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100"
          >
            Home
            <IconChevronRight size={16} className="ml-auto" />
          </a>
          <a
            href="/applications"
            className="flex items-center px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100"
          >
            Applications
            <IconChevronRight size={16} className="ml-auto" />
          </a>
          <div className="pt-4 pb-2 border-t border-slate-200">
            <div className="flex items-center px-3 py-2">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center text-white">
                  <IconUser size={20} />
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-slate-800">
                  John Doe
                </div>
                <div className="text-sm text-slate-500">
                  john.doe@example.com
                </div>
              </div>
            </div>
            <div className="mt-3 px-2">
              <button className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-slate-100">
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
