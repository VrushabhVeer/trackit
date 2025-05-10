import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { IconMenu2, IconX } from '@tabler/icons-react'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  
  const navLinkClasses = ({ isActive }) => 
    `relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
     ${isActive 
      ? 'text-primary-700' 
      : 'text-gray-700 hover:text-primary-600'
     }`
  
  return (
    <nav 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-xl md:text-2xl font-kaushan text-orange-600 line-through font-bold"
          >
            <span>trackit.</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavLink to="/" className={navLinkClasses} end>Home</NavLink>
            <NavLink to="/about" className={navLinkClasses}>About</NavLink>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <IconX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <IconMenu2 className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg rounded-b-lg">
          <NavLink 
            to="/" 
            className={({isActive}) => 
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive 
                  ? 'text-primary-700 bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              }`
            }
            end
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink 
            to="/about" 
            className={({isActive}) => 
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive 
                  ? 'text-primary-700 bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar