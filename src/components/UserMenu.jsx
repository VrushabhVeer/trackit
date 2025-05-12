import { useState, useRef, useEffect } from 'react';
import { IconChevronDown, IconLogout, IconUser } from '@tabler/icons-react';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  
  // Example user data - in a real app this would come from auth context
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com'
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="flex items-center space-x-2 p-2 rounded-full hover:bg-slate-100 transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-orange-500"
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white">
          <IconUser size={16} />
        </div>
        <IconChevronDown 
          size={16} 
          className={`text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`
          absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 
          transition-all duration-200 ease-in-out origin-top-right
          ${isOpen ? 'transform opacity-100 scale-100' : 'transform opacity-0 scale-95 pointer-events-none'}
        `}
      >
        <div className="py-1 divide-y divide-slate-100">
          <div className="px-4 py-3">
            <p className="text-sm font-medium text-slate-900">{user.name}</p>
            <p className="text-sm text-slate-500 truncate">{user.email}</p>
          </div>
          <div className="py-1">
            <button
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-100 flex items-center space-x-2"
              onClick={() => alert('Sign out clicked')}
            >
              <IconLogout size={16} />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;