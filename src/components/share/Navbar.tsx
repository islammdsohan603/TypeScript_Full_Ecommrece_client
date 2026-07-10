'use client';
import Link from 'next/link';
import { ShoppingCart, CircleUserRound, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavLink {
  name: string;
  path: string;
}

interface NavIcon {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  id: number;
  path: string;
}

const navLinks: NavLink[] = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'About', path: '/about' },
];

const navProductsIcons: NavIcon[] = [
  { name: 'Cart', icon: ShoppingCart, id: 1, path: '/cart' },
  { name: 'Profile', icon: CircleUserRound, id: 2, path: '/profile' },
];

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <div className="bg-gray-800 sticky top-0 z-50 text-white p-4 shadow-md">
      <div className="w-11/12 max-w-7xl mx-auto">
        <header className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold hover:text-gray-400 transition-colors duration-300"
          >
            <h1 className="text-2xl md:text-3xl font-bold z-50">Luxury</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-6 font-medium">
              {navLinks.map(link => (
                <li
                  key={link.name}
                  className="hover:text-gray-400 transition-colors duration-300"
                >
                  <Link href={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <ul className="flex space-x-4">
              {navProductsIcons.map(item => (
                <li key={item.id}>
                  <Link href={item.path} aria-label={item.name}>
                    <item.icon className="w-6 h-6 hover:text-gray-400 transition-colors duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center z-50">
            <button
              className="text-white cursor-pointer focus:outline-none transition-transform duration-300 structural-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-7 h-7 rotate-90 transition-transform duration-300" />
              ) : (
                <Menu className="w-7 h-7 transition-transform duration-300" />
              )}
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-95 z-40 md:hidden flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        {/* Mobile Navigation Links */}
        <ul className="flex flex-col items-center space-y-6 text-xl font-semibold mb-8">
          {navLinks.map((link, index) => (
            <li
              key={link.name}
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 100}ms` : '0ms',
              }}
              className={`hover:text-gray-400 transition-all duration-500 transform ${
                isMobileMenuOpen
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              }`}
            >
              <Link href={link.path} onClick={() => setIsMobileMenuOpen(false)}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <hr className="w-1/3 border-gray-700 mb-8" />

        {/* Mobile Icons */}
        <ul className="flex space-x-8">
          {navProductsIcons.map((item, index) => (
            <li
              key={item.id}
              style={{
                transitionDelay: isMobileMenuOpen
                  ? `${(navLinks.length + index) * 100}ms`
                  : '0ms',
              }}
              className={`hover:text-gray-400 transition-all duration-500 transform ${
                isMobileMenuOpen
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              }`}
            >
              <Link
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label={item.name}
              >
                <item.icon className="w-8 h-8" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
