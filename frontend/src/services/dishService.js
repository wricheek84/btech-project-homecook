// frontend/src/services/dishService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/dishes';

// 🔐 Include auth token in headers
const getAuthConfig = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getDishesByLocation = async (city) => {
  const token = localStorage.getItem('token');

  try {
    const res = await axios.get(
      `${API_BASE_URL}?city=${city}`, // I updated this to use the constant for consistency
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    console.error('❌ Error fetching dishes by location:', err);
    return [];
  }
};

// 🧠 NEW RECOMMENDATION FUNCTION
export const getSimilarDishes = async (dishId) => {
  try {
    // Call the new backend route, using the base URL and auth config
    const res = await axios.get(`${API_BASE_URL}/${dishId}/similar`, getAuthConfig());
    return res.data; // This will be a list of dish IDs
  } catch (error) {
    console.error(`❌ Error fetching similar dishes for ${dishId}:`, error);
    return []; // Return an empty list on error
  }
};