
"use client"

import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../pages/firebase"

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  const isActive = (path) => location.pathname === path

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate("/")
      setIsMobileMenuOpen(false)
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

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
            <NavLink to="/practice" isActive={isActive("/practice")}>
              Practice
            </NavLink>
            <NavLink to="/connectcounselors" isActive={isActive("/ConnectCounselors")}>
              Connect with Counselors
            </NavLink>
            {user && (
              <NavLink to="/profile" isActive={isActive("/profile")}>
                Profile
              </NavLink>
            )}
          </div>

          {/* Auth Links */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-gray-700">
                  Hi, {user.displayName?.split(" ")[0] || user.email?.split("@")[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2.5 text-red-600 hover:text-red-700 font-medium rounded-lg hover:bg-red-50 transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2.5 text-green-600 hover:text-green-700 font-medium rounded-lg hover:bg-green-50 transition-all duration-200"
                >
                  Login
                </Link>
                <Link to="/signup" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
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
              <MobileNavLink to="/practice" isActive={isActive("/practice")} onClick={() => setIsMobileMenuOpen(false)}>
                Practice
              </MobileNavLink>
              <MobileNavLink
                to="/counselors"
                isActive={isActive("/counselors")}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Connect with Counselors
              </MobileNavLink>
              {user && (
                <MobileNavLink to="/profile" isActive={isActive("/profile")} onClick={() => setIsMobileMenuOpen(false)}>
                  Profile
                </MobileNavLink>
              )}
              <div className="pt-4 border-t border-gray-100 flex flex-col space-y-2">
                {user ? (
                  <>
                    <span className="px-4 py-2 text-gray-700">
                      Hi, {user.displayName?.split(" ")[0] || user.email?.split("@")[0]}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 text-red-600 hover:text-red-700 font-medium rounded-lg hover:bg-red-50 transition-all text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
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
                  </>
                )}
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