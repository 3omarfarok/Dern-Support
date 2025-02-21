import { useForm } from 'react-hook-form'
import { useState } from 'react'

function RepairTracking() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [trackingResult, setTrackingResult] = useState(null)

  const onSubmit = (data) => {
    // TODO: Implement tracking logic
    // This is mock data for demonstration
    setTrackingResult({
      status: 'In Progress',
      requestId: data.trackingId,
      description: 'Device diagnosis in progress',
      updatedAt: new Date().toLocaleDateString(),
    })
  }

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
  )
}

export default RepairTracking