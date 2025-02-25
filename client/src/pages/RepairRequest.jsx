import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { createRepairRequest } from '../api/repair';

function RepairRequest() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { user } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      if (!user) {
        toast.error('Please login to submit a repair request');
        navigate('/login');
        return;
      }

      const formData = {
        deviceType: data.deviceType,
        description: data.description,
      };

      const response = await createRepairRequest(formData);
      toast.success(`Repair request submitted successfully! Your tracking ID is: ${response.requestId}`);
      reset(); // Reset form after successful submission
      
      // Redirect to tracking page with the request ID
      navigate(`/repair-tracking?id=${response.requestId}`);
    } catch (error) {
      toast.error(error.message || 'Failed to submit repair request');
    }
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="card text-center">
          <h2 className="text-2xl font-bold mb-4">Login Required</h2>
          <p className="mb-4">Please login to submit a repair request.</p>
          <button
            onClick={() => navigate('/login')}
            className="btn-primary"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="card">
        <h2 className="text-2xl font-bold text-center mb-6">Submit Repair Request</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name and Email fields are pre-filled from user context */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="input-field bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                value={user.email || ''}
                disabled
                className="input-field bg-gray-50"
              />
            </div>
          </div>

          <div>
            <label htmlFor="deviceType" className="block text-sm font-medium mb-1">
              Device Type
            </label>
            <select
              id="deviceType"
              className="input-field"
              {...register('deviceType', { required: 'Device type is required' })}
            >
              <option value="">Select device type</option>
              <option value="laptop">Laptop</option>
              <option value="desktop">Desktop</option>
              <option value="smartphone">Smartphone</option>
              <option value="tablet">Tablet</option>
              <option value="other">Other</option>
            </select>
            {errors.deviceType && (
              <p className="text-red-500 text-sm mt-1">{errors.deviceType.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Issue Description
            </label>
            <textarea
              id="description"
              rows="4"
              className="input-field"
              {...register('description', {
                required: 'Description is required',
                minLength: {
                  value: 20,
                  message: 'Description must be at least 20 characters',
                },
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <button type="submit" className="btn-primary w-full">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}

export default RepairRequest;