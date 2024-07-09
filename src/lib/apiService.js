import axios from 'axios';

// Base URL for NexusPay API
const BASE_URL = 'https://api.nexuspay.cloud';

// Axios instance with default headers
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer W6Bqqa2nhGmcWKFg5trryaaQjtOspejlo33Oep4='
  }
});

// Function to process payin
export const processPayin = async (payinData) => {
  try {
    const response = await axiosInstance.post('/payin/process', payinData);
    return response.data;
  } catch (error) {
    console.error("Error processing payin:", error);
    throw error;
  }
};

// Function to process payout
export const processPayout = async (payoutData) => {
  try {
    const response = await axiosInstance.post('/payout/payout', payoutData);
    return response.data;
  } catch (error) {
    console.error("Error processing payout:", error);
    throw error;
  }
};