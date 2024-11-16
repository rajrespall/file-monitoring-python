import axios from '../api/axios';

export const startScan = async () => {
    try {
        const response = await axios.post('/scan', {}, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error starting scan:', error);
        throw error;
    }
};

export const individualScan = async (id) => {
    try {
        const response = await axios.get(`/baseline/${id}/scan`, {
            headers: {
               'Authorization': `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error scanning:', error);
        throw error;
    }
};