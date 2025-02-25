import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRepairStatus, updateRepairRequest } from '../../api/repair';
import toast from 'react-hot-toast';

function RepairDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [repair, setRepair] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchRepairDetails(id);
    }
  }, [id]);

  const fetchRepairDetails = async (repairId) => {
    try {
      setLoading(true);
      const data = await getRepairStatus(repairId);
      setRepair(data);
    } catch (error) {
      toast.error('Failed to fetch repair details');
      navigate('/admin/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePriority = async (newPriority) => {
    try {
      const updatedRepair = await updateRepairRequest(repair._id, { priority: newPriority });
      setRepair(updatedRepair);
      toast.success('Priority updated successfully');
    } catch (error) {
      toast.error('Failed to update priority');
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    try {
      const updatedRepair = await updateRepairRequest(repair._id, { status: newStatus });
      setRepair(updatedRepair);
      toast.success('Status updated successfully');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  if (!repair) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Repair Request Not Found</h2>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="btn-primary"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Repair Request Details</h2>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        <div className="px-6 py-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Request Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Customer Email</p>
                  <p className="font-medium">{repair.userId?.email || 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Request ID</p>
                  <p className="font-medium">{repair._id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Created At</p>
                  <p className="font-medium">
                    {new Date(repair.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Device Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Device Type</p>
                  <p className="font-medium">{repair.deviceType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Issue Description</p>
                  <p className="font-medium">{repair.issue}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Last Updated</p>
                  <p className="font-medium">
                    {new Date(repair.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-semibold mb-4">Status Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  className="input-field w-full"
                  value={repair.status}
                  onChange={(e) => handleUpdateStatus(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Priority</label>
                <select
                  className="input-field w-full"
                  value={repair.priority}
                  onChange={(e) => handleUpdatePriority(e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RepairDetails;