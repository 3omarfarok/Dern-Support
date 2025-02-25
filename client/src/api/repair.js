import api from './axios';

export const createRepairRequest = async (data) => {
  try {
    const response = await api.post('/request/create', {
      deviceType: data.deviceType,
      issue: data.description,
      priority: 'medium', // Default priority
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to submit repair request' };
  }
};

export const getRepairStatus = async (requestId) => {
  try {
    const response = await api.get(`/request/${requestId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch repair status' };
  }
};

export const getAllRepairRequests = async () => {
  try {
    const response = await api.get('/request/all');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch repair requests' };
  }
};

export const updateRepairRequest = async (requestId, data) => {
  try {
    const response = await api.put(`/request/${requestId}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update repair request' };
  }
};

export const deleteRepairRequest = async (requestId) => {
  try {
    const response = await api.delete(`/request/${requestId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete repair request' };
  }
};