// src/services/api.js

const API_BASE_URL =  'https://citu-backend.vercel.app/api/waitlist';

export const submitUserWaitlist = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to submit form');
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting user form:', error);
    throw error;
  }
};

export const submitAgentWaitlist = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/agent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to submit form');
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting agent form:', error);
    throw error;
  }
};