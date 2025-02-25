import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getAllRepairRequests, updateRepairRequest, deleteRepairRequest } from '../../api/repair';
import toast from 'react-hot-toast';

function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [repairs, setRepairs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRepairs();
  }, []);

  const fetchRepairs = async () => {
    try {
      setLoading(true);
      const data = await getAllRepairRequests();
      setRepairs(data.map(repair => ({
        id: repair._id,
        customer: repair.userId.email,
        device: repair.deviceType,
        status: repair.status,
        date: new Date(repair.createdAt).toLocaleDateString(),
        priority: repair.priority,
        description: repair.issue
      })));
    } catch (error) {
      toast.error('Failed to fetch repair requests');
    } finally {
      setLoading(false);
    }
  };

  const updateRepairStatus = async (repairId, newStatus) => {
    try {
      await updateRepairRequest(repairId, { status: newStatus });
      toast.success('Repair status updated successfully');
      fetchRepairs();
    } catch (error) {
      toast.error('Failed to update repair status');
    }
  };

  const updateRepairPriority = async (repairId, newPriority) => {
    try {
      await updateRepairRequest(repairId, { priority: newPriority });
      toast.success('Priority updated successfully');
      fetchRepairs();
    } catch (error) {
      toast.error('Failed to update priority');
    }
  };

  const handleDelete = async (repairId) => {
    if (window.confirm('Are you sure you want to delete this repair request?')) {
      try {
        await deleteRepairRequest(repairId);
        toast.success('Repair request deleted successfully');
        fetchRepairs();
      } catch (error) {
        toast.error('Failed to delete repair request');
      }
    }
  };

  const filteredRepairs = repairs
    .filter((repair) => filter === 'all' || repair.status.toLowerCase() === filter)
    .filter((repair) =>
      repair.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repair.device.toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-300">Welcome, {user.email}</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search repairs..."
            className="input-field md:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <select
            className="input-field md:w-48"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Device
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredRepairs.map((repair) => (
              <tr key={repair.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {repair.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {repair.customer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {repair.device}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <select
                    className="input-field text-sm py-1"
                    value={repair.status}
                    onChange={(e) => updateRepairStatus(repair.id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <select
                    className="input-field text-sm py-1"
                    value={repair.priority}
                    onChange={(e) => updateRepairPriority(repair.id, e.target.value)}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {repair.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    className="text-primary dark:text-secondary hover:underline mr-3"
                    onClick={() => navigate(`/admin/repairDetails/${repair.id}`)}
                  >
                    View Details
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(repair.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;