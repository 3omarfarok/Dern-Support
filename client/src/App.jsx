import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import RepairRequest from './pages/RepairRequest'
import RepairTracking from './pages/RepairTracking'
import AdminDashboard from './pages/admin/Dashboard'
import RepairDetails from './pages/admin/RepairDetails'
// import Dashboard from './pages/Dashboard'
import Footer from './components/Footer'
import AdminRoute from './components/AdminRoute'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/repair-request" element={<RepairRequest />} />
            <Route path="/repair-tracking" element={<RepairTracking />} />
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/repairDetails/:id"
              element={
                <AdminRoute>
                  <RepairDetails /> 
                </AdminRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App