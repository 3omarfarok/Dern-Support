import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

function RepairRequest() {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    // TODO: Implement repair request submission logic
    console.log(data)
    toast.success('Repair request submitted successfully!')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="card">
        <h2 className="text-2xl font-bold text-center mb-6">Submit Repair Request</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="input-field"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="input-field"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
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

          <div>
            <label htmlFor="image" className="block text-sm font-medium mb-1">
              Upload Image (Optional)
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="input-field"
              {...register('image')}
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  )
}

export default RepairRequest