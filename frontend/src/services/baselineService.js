import axios from '../api/axios';

export const getBaselines = async () => {
  const token = localStorage.getItem('token');
  console.log('Using token:', token);

  const response = await axios.get('/baseline', {
    headers: {
      'Authorization': `Token ${token}`,
    }
  });
  return response.data;
};

export const addBaseline = async (formData) => {
  const response = await axios.post('/baseline', formData, {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data',
    }
  });
  return response.data;
};

export const deleteBaseline = async (baselineId) => {
  const response = await axios.delete('/baseline', {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    },
    data: { baseline_id: baselineId }
  });
  return response.data;
};