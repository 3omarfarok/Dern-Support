# Tech Support Request System

A web application that allows users to submit and track tech support requests. Admins can manage these requests by updating their status and priority.

## Features
- **User Authentication**: Users can register, log in, and submit support requests.
- **Request Management**: Users can create, view, and track their requests.
- **Admin Control**: Admins can update request status and priority.
- **Role-Based Access**: Regular users can only manage their own requests, while admins have full control.

## Tech Stack
- **Frontend**: React.js, React Router, React Hot Toast
- **Backend**: Node.js, Express.js, MongoDB

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/3omarfarok/Dern-Support.git
   cd your-repo
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   cd backend
   npm run server
   ```
4. Start the frontend:
   ```sh
   cd frontend
   npm run dev
   ```

## API Endpoints
### User Authentication
- `POST /api/user/register` - Register a new user
- `POST /api/user/login` - Login user

### Request Management
- `POST /api/requests/create` - Create a new support request
- `GET /api/requests/:id` - Get request details
- `PUT /api/requests/:id` - Update request status (Admin only)
- `DELETE /api/requests/:id` - Delete request (Admin only)

## Future Improvements
- Improve UI/UX for better user experience
- Add email notifications for request updates



