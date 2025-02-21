import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-white dark:bg-dark shadow-md mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-primary dark:text-secondary mb-4">
              Dern Support
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Professional technical support services for all your device needs.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-primary dark:text-secondary mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/repair-request" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-secondary">
                  Request Repair
                </Link>
              </li>
              <li>
                <Link to="/repair-tracking" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-secondary">
                  Track Repair
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-primary dark:text-secondary mb-4">
              Contact
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>Email: support@dern.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Hours: Mon-Fri 9AM-6PM</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-300">
          <p>&copy; {new Date().getFullYear()} Dern Support. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer