import axios from '../api/axios';

export const updateProfile = async (userData, profileImage) => {
  const formData = new FormData();
  
  // Add user data
  Object.keys(userData).forEach(key => {
    if (userData[key] !== '******') { // Don't send masked password
      formData.append(key, userData[key]);
    }
  });

  // Add profile image if exists
  if (profileImage) {
    formData.append('profile_image', profileImage);
  }

  const response = await axios.put('/accounts/register/', formData, {
    headers: {
      'Authorization': `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data',
    }
  });
  return response.data;
};