import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Sun, Moon, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, logout, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const linkVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95
    }
  };

  const renderAdminLinks = () => (
    <>
      <motion.div
        variants={linkVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <Link
          to="/admin/dashboard"
          className="text-dark dark:text-white hover:text-primary dark:hover:text-secondary"
        >
          Dashboard
        </Link>
      </motion.div>

      <motion.div
        variants={linkVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <Link
          to="/admin/users"
          className="text-dark dark:text-white hover:text-primary dark:hover:text-secondary"
        >
          Manage Users
        </Link>
      </motion.div>

    </>
  );

  const renderUserLinks = () => (
    <>
      <motion.div
        variants={linkVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <Link
          to="/repair-request"
          className="btn-primary"
        >
          Request Repair
        </Link>
      </motion.div>

      <motion.div
        variants={linkVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <Link
          to="/repair-tracking"
          className="text-dark dark:text-white hover:text-primary dark:hover:text-secondary"
        >
          Track Repair
        </Link>
      </motion.div>
    </>
  );

  return (
    <motion.nav 
      className="bg-white dark:bg-dark shadow-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary dark:text-secondary">
                Dern Support
              </span>
            </Link>
          </motion.div>

          {/* Mobile menu button */}
          <motion.div 
            className="flex md:hidden"
            whileTap={{ scale: 0.9 }}
          >
            <button
              onClick={toggleMenu}
              className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="block h-6 w-6" aria-hidden="true" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-6">
            {user && (isAdmin() ? renderAdminLinks() : renderUserLinks())}

            {user ? (
              <>
                <motion.div 
                  className="flex items-center gap-2 text-dark dark:text-white"
                  whileHover={{ scale: 1.05 }}
                >
                  <User className="w-4 h-4" />
                  <span>{user.email}</span>
                </motion.div>
                <motion.button
                  onClick={logout}
                  className="text-primary font-bold dark:text-secondary hover:text-black dark:hover:text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <motion.div
                variants={linkVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  to="/login"
                    className=" btn-primary  dark:text-white dark:hover:text-secondary"
                >
                  Login
                </Link>
              </motion.div>
            )}

            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle dark mode"
            >
              <AnimatePresence mode="wait">
                {darkMode ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-5 h-5 text-dark dark:text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-5 h-5 text-dark dark:text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {user && (
                  isAdmin() ? (
                    <>
                      <motion.div
                        variants={linkVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <Link
                          to="/admin/dashboard"
                          className="block px-3 py-2 rounded-md text-base font-medium text-dark dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          Dashboard
                        </Link>
                      </motion.div>
                      <motion.div
                        variants={linkVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <Link
                          to="/admin/repairs"
                          className="block px-3 py-2 rounded-md text-base font-medium text-dark dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          Manage Repairs
                        </Link>
                      </motion.div>
                      <motion.div
                        variants={linkVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <Link
                          to="/admin/users"
                          className="block px-3 py-2 rounded-md text-base font-medium text-dark dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          Manage Users
                        </Link>
                      </motion.div>
                      <motion.div
                        variants={linkVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <Link
                          to="/admin/reports"
                          className="block px-3 py-2 rounded-md text-base font-medium text-dark dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          Reports
                        </Link>
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <motion.div
                          variants={linkVariants}
                          whileHover="hover"
                          whileTap="tap"
                        >
                          <Link
                            to="/repair-request"
                            className="block px-3 py-2 rounded-md text-base font-medium text-dark dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            Request Repair
                          </Link>
                        </motion.div>
                      <motion.div
                        variants={linkVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <Link
                            to="/repair-tracking"
                          className="block px-3 py-2 rounded-md text-base font-medium text-dark dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            Track Repair
                        </Link>
                      </motion.div>
                      </>
                    )
                )}

                {user ? (
                  <>
                    <motion.div
                      className="px-3 py-2 text-base font-medium text-dark dark:text-white flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      <User className="w-4 h-4" />
                      <span>{user.email}</span>
                    </motion.div>
                    <motion.button
                      onClick={logout}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-semibold text-primary dark:text-secondary hover:text-black dark:hover:text-white"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Logout
                    </motion.button>
                  </>
                ) : (
                  <motion.div
                    variants={linkVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Link
                      to="/login"
                      className="block px-3 py-2 rounded-md text-base font-medium text-dark dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Login
                    </Link>
                  </motion.div>
                )}

                <motion.button
                  onClick={toggleDarkMode}
                  className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-dark dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {darkMode ? (
                    <>
                      <Sun className="w-5 h-5 mr-2" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="w-5 h-5 mr-2" />
                      Dark Mode
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

export default Navbar;