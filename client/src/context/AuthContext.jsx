import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const login = (credentials) => {
    // Mock admin credentials for demonstration
    if (credentials.email === 'admin@dern.com' && credentials.password === 'admin123') {
      const adminUser = {
        id: '1',
        email: credentials.email,
        name: 'Admin User',
        role: 'admin'
      }
      setUser(adminUser)
      localStorage.setItem('user', JSON.stringify(adminUser))
      toast.success('Welcome back, Admin!')
      navigate('/admin/dashboard')
      return true
    }
    
    // Mock regular user login
    const regularUser = {
      id: Date.now().toString(),
      email: credentials.email,
      name: 'Regular User',
      role: 'user'
    }
    setUser(regularUser)
    localStorage.setItem('user', JSON.stringify(regularUser))
    toast.success('Login successful!')
    navigate('/')
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    toast.success('Logged out successfully')
    navigate('/')
  }

  const isAdmin = () => {
    return user?.role === 'admin'
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}