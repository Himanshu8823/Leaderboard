import { useState, useCallback } from 'react';

const useApi = () => {
  const [loading, setLoading] = useState(false); // Indicates if API call is in progress
  const [error, setError] = useState(null);      // Stores error message if API call fails

  // Generic request handler for API calls
  const request = useCallback(async (apiFunc, ...args) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiFunc(...args);
      return response.data;
    } catch (err) {
      // Set error message from server response or fallback to generic error
      setError(err.response?.data?.error || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, request };
};

export default useApi;