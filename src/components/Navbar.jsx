import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { FiSun, FiMoon } from 'react-icons/fi'

function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme()
  const { user, logout, isAdmin } = useAuth()

  return (
    <nav className="bg-white dark:bg-dark shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary dark:text-secondary">
              Dern Support
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/repair-request" className="btn-primary">
              Request Repair
            </Link>
            <Link to="/repair-tracking" className="text-dark dark:text-white hover:text-primary dark:hover:text-secondary">
              Track Repair
            </Link>
            
            {user ? (
              <>
                {isAdmin() && (
                  <Link to="/admin/dashboard" className="text-dark dark:text-white hover:text-primary dark:hover:text-secondary">
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="text-dark dark:text-white hover:text-primary dark:hover:text-secondary"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="text-dark dark:text-white hover:text-primary dark:hover:text-secondary">
                Login
              </Link>
            )}
            
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar