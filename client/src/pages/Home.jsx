import { Link } from 'react-router-dom'
import { Clock, Users, Shield } from 'lucide-react'
import ContactSection from '../components/ContactSection'
import { motion } from 'framer-motion'

function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-primary dark:text-secondary mb-6">
            Expert Technical Support
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Professional repair services for all your devices
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/repair-request" className="btn-primary text-lg">
              Request a Repair
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div 
            className="card text-center"
            variants={fadeInUp}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <Clock className="w-12 h-12 mx-auto mb-4 text-primary dark:text-secondary" />
            <h3 className="text-xl font-semibold mb-4">Fast Service</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Quick turnaround times for all repairs
            </p>
          </motion.div>
          <motion.div 
            className="card text-center"
            variants={fadeInUp}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <Users className="w-12 h-12 mx-auto mb-4 text-primary dark:text-secondary" />
            <h3 className="text-xl font-semibold mb-4">Expert Technicians</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Certified professionals with years of experience
            </p>
          </motion.div>
          <motion.div 
            className="card text-center"
            variants={fadeInUp}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <Shield className="w-12 h-12 mx-auto mb-4 text-primary dark:text-secondary" />
            <h3 className="text-xl font-semibold mb-4">Quality Guarantee</h3>
            <p className="text-gray-600 dark:text-gray-300">
              All repairs backed by our satisfaction guarantee
            </p>
          </motion.div>
        </motion.div>

        <ContactSection />
      </div>
    </div>
  )
}

export default Home