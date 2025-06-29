"use client"

import { Link, useLocation } from "react-router-dom"
import { useState } from "react"

const Navbar = () => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg shadow-lg border-b border-green-100/50">
      <div className="container">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
              <span className="text-white font-bold text-lg">🧠</span>
            </div>
            <span className="text-2xl font-bold gradient-text">MindBloom</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink to="/" isActive={isActive("/")}>
              Home
            </NavLink>
            <NavLink to="/chat" isActive={isActive("/chat")}>
              Chat
            </NavLink>
            <NavLink to="/media" isActive={isActive("/media")}>
              Media
            </NavLink>
            <NavLink to="/profile" isActive={isActive("/profile")}>
              Profile
            </NavLink>
          </div>

          {/* Auth Links */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/login"
              className="px-5 py-2.5 text-green-600 hover:text-green-700 font-medium rounded-lg hover:bg-green-50 transition-all duration-200"
            >
              Login
            </Link>
            <Link to="/signup" className="btn-primary">
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-2">
              <MobileNavLink to="/" isActive={isActive("/")} onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </MobileNavLink>
              <MobileNavLink to="/chat" isActive={isActive("/chat")} onClick={() => setIsMobileMenuOpen(false)}>
                Chat
              </MobileNavLink>
              <MobileNavLink to="/media" isActive={isActive("/media")} onClick={() => setIsMobileMenuOpen(false)}>
                Media
              </MobileNavLink>
              <MobileNavLink to="/profile" isActive={isActive("/profile")} onClick={() => setIsMobileMenuOpen(false)}>
                Profile
              </MobileNavLink>
              <div className="pt-4 border-t border-gray-100 flex flex-col space-y-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-green-600 hover:text-green-700 font-medium rounded-lg hover:bg-green-50 transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link to="/signup" className="btn-primary mx-4" onClick={() => setIsMobileMenuOpen(false)}>
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

const NavLink = ({ to, children, isActive }) => (
  <Link to={to} className={`nav-link ${isActive ? "nav-link-active" : "nav-link-inactive"}`}>
    {children}
  </Link>
)

const MobileNavLink = ({ to, children, isActive, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`px-4 py-3 rounded-lg font-medium transition-all ${
      isActive ? "bg-green-100 text-green-700" : "text-gray-600 hover:text-green-600 hover:bg-green-50"
    }`}
  >
    {children}
  </Link>
)

export default Navbar
