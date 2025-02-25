import { useState } from 'react'

function Dashboard() {
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')


  const repairs = [
    {
      id: '1',
      customer: 'John Doe',
      device: 'Laptop',
      status: 'Pending',
      date: '2024-03-15',
    },
    {
      id: '2',
      customer: 'Jane Smith',
      device: 'Smartphone',
      status: 'In Progress',
      date: '2024-03-14',
    },
    {
      id: '3',
      customer: 'Bob Johnson',
      device: 'Desktop',
      status: 'Completed',
      date: '2024-03-13',
    },
  ]

  const filteredRepairs = repairs
    .filter((repair) => filter === 'all' || repair.status.toLowerCase() === filter)
    .filter((repair) =>
      repair.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repair.device.toLowerCase().includes(searchQuery.toLowerCase())
    )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Repair Requests Dashboard</h2>
        
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
            <option value="in progress">In Progress</option>
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
                Date
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
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      repair.status === 'Completed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : repair.status === 'In Progress'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                    }`}
                  >
                    {repair.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {repair.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard