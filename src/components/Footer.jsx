import { Link } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container-custom py-8 md:py-12 w-[90%] md:w-[85%] mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link 
              to="/" 
              className="text-xl md:text-2xl font-kaushan text-orange-500 line-through font-bold tracking-wide"
            >
              trackit.
            </Link>
            <p className="mt-4 text-sm text-gray-600 max-w-xs">
              Track your applications and manage your job search with ease. 
              Stay organized and never miss an opportunity.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Contact
            </h3>
            <ul className="mt-4 space-y-2">
              <li className="text-sm text-gray-600">
                <a 
                  href="mailto:contact@example.com" 
                  className="hover:text-primary-600 transition-colors"
                >
                  contact@example.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            &copy; {currentYear} ModernApp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer