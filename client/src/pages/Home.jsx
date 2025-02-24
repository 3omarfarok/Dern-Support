import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Clock, Users, Shield,  Phone,Mail, User, MessageSquare, Send, MapPin, PhoneCall } from 'lucide-react'

function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Form submitted:', formData)
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
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
            <Clock className="w-12 h-12 mx-auto mb-4 text-primary dark:text-secondary" />
            <h3 className="text-xl font-semibold mb-4">Fast Service</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Quick turnaround times for all repairs
            </p>
          </div>
          <div className="card text-center">
            <Users className="w-12 h-12 mx-auto mb-4 text-primary dark:text-secondary" />
            <h3 className="text-xl font-semibold mb-4">Expert Technicians</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Certified professionals with years of experience
            </p>
          </div>
          <div className="card text-center">
            <Shield className="w-12 h-12 mx-auto mb-4 text-primary dark:text-secondary" />
            <h3 className="text-xl font-semibold mb-4">Quality Guarantee</h3>
            <p className="text-gray-600 dark:text-gray-300">
              All repairs backed by our satisfaction guarantee
            </p>
          </div>
        </div>

        {/*  Contact Section */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg mb-16 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-primary dark:text-secondary mb-6">
                  Get in Touch
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  Have questions about our services? <br/>
                  We&apos;re here to help Contact us using the form below :
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-primary dark:text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary dark:text-secondary">Our Location</h3>
                    <p className="text-gray-600 dark:text-gray-300">123 Tech Street, Digital City, 12345</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <PhoneCall className="w-6 h-6 text-primary dark:text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary dark:text-secondary">Phone Number</h3>
                    <p className="text-gray-600 dark:text-gray-300">(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-primary dark:text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary dark:text-secondary">Email Address</h3>
                    <p className="text-gray-600 dark:text-gray-300">support@techrepair.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-primary dark:text-secondary" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-gray-900 dark:text-gray-300"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-primary dark:text-secondary" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-gray-900 dark:text-gray-300"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-primary dark:text-secondary" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-gray-900 dark:text-gray-300"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MessageSquare className="h-5 w-5 text-primary dark:text-secondary" />
                    </div>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-gray-900 dark:text-gray-300"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-gray-900 dark:text-gray-300"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </span>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-secondary rounded-lg">
                    Thank you! Your message has been sent successfully.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-lg">
                    Sorry, there was an error sending your message. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home