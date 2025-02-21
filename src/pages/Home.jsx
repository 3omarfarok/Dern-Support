import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-primary dark:text-secondary mb-6">
          Expert Technical Support
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Professional repair services for all your devices
        </p>
        <Link to="/repair-request" className="btn-primary text-lg">
          Request a Repair
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="card text-center">
          <h3 className="text-xl font-semibold mb-4">Fast Service</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Quick turnaround times for all repairs
          </p>
        </div>
        <div className="card text-center">
          <h3 className="text-xl font-semibold mb-4">Expert Technicians</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Certified professionals with years of experience
          </p>
        </div>
        <div className="card text-center">
          <h3 className="text-xl font-semibold mb-4">Quality Guarantee</h3>
          <p className="text-gray-600 dark:text-gray-300">
            All repairs backed by our satisfaction guarantee
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home