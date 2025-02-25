import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getRepairStatus } from '../api/repair';
import toast from 'react-hot-toast';

function RepairTracking() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [trackingResult, setTrackingResult] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      setValue('trackingId', id);
      fetchRepairStatus(id);
    }
  }, [searchParams, setValue]);

  const fetchRepairStatus = async (id) => {
    try {
      const response = await getRepairStatus(id);
      setTrackingResult({
        status: response.status,
        requestId: response._id,
        description: response.issue,
        deviceType: response.deviceType,
        updatedAt: new Date(response.updatedAt).toLocaleDateString(),
      });
    } catch (error) {
      toast.error(error.message || 'Failed to fetch repair status');
    }
  };

  const onSubmit = (data) => {
    fetchRepairStatus(data.trackingId);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="card mb-8">
        <h2 className="text-2xl font-bold text-center mb-6">Track Your Repair</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="trackingId" className="block text-sm font-medium mb-1">
              Tracking ID
            </label>
            <input
              type="text"
              id="trackingId"
              className="input-field"
              {...register('trackingId', { required: 'Tracking ID is required' })}
            />
            {errors.trackingId && (
              <p className="text-red-500 text-sm mt-1">{errors.trackingId.message}</p>
            )}
          </div>

          <button type="submit" className="btn-primary w-full">
            Track Repair
          </button>
        </form>
      </div>

      {trackingResult && (
        <div className="card">
          <h3 className="text-xl font-semibold mb-4">Repair Status</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Request ID</p>
              <p className="font-medium">{trackingResult.requestId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Device Type</p>
              <p className="font-medium">{trackingResult.deviceType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Status</p>
              <p className="font-medium text-primary dark:text-secondary">
                {trackingResult.status}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Description</p>
              <p className="font-medium">{trackingResult.description}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Last Updated</p>
              <p className="font-medium">{trackingResult.updatedAt}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RepairTracking;