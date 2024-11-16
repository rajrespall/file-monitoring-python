import axios from '../api/axios';

export const getConfig = async () => {
  try {
    const response = await axios.get('/config', {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching config:', error);
    throw error;
  }
};

export const updateConfig = async (configData) => {
  try {
    const response = await axios.put('/config', configData, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating config:', error);
    throw error;
  }
};