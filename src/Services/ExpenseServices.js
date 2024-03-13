import axios from 'axios';
import { basepath } from './Basepath';

export const getExpensesData = async () => {
    try {
        const response = await axios.get(`${basepath.base_URL}api/v1/get-expenses`);
        return response.data; // Return only response data
    } catch (error) {
        if (error.response) {

            return {
                error: true,
                message: `Server responded with status ${error.response.status}: ${error.response.data.message}`
            };
        } else if (error.request) {
            return {
                error: true,
                message: 'No response from the server'
            };
        } else {
            return {
                error: true,
                message: 'Error setting up the request: ' + error.message
            };
        }
    }
};


export const deleteExpenseById = async (id) => {
    try {
        const response = await axios.delete(`${basepath.base_URL}api/v1/delete-expense/${id}`);
        return response.data; // Return response data if needed
    } catch (error) {
        if (error.response) {

            return {
                error: true,
                message: `Server responded with status ${error.response.status}: ${error.response.data.message}`
            };
        } else if (error.request) {
            return {
                error: true,
                message: 'No response from the server'
            };
        } else {
            return {
                error: true,
                message: 'Error setting up the request: ' + error.message
            };
        }
    }
};

export const saveExpenseData = async (data) => {
    try {
        const response = await axios.post(`${basepath.base_URL}api/v1/add-expense`, data);
        return response.data; // Return response data if needed
    } catch (error) {
        if (error.response) {

            return {
                error: true,
                message: `Server responded with status ${error.response.status}: ${error.response.data.message}`
            };
        } else if (error.request) {
            return {
                error: true,
                message: 'No response from the server'
            };
        } else {
            return {
                error: true,
                message: 'Error setting up the request: ' + error.message
            };
        }
    }
};