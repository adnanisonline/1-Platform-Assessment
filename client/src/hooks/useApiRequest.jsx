import { useState, useEffect, useCallback } from 'react';

const useApiRequest = () => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendRequest = useCallback(async (url, method, headers = {}, body = null) => {
    setLoading(true);

    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: method !== 'GET' ? JSON.stringify(body) : null,
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Server Error');
      }

      const responseData = await response.json();
      setData(responseData);
      setError(null);
      return responseData;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (error) {
      console.error('API request error:', error);
    }
  }, [error]);

  return {
    data,
    error,
    loading,
    sendRequest,
  };
};

export default useApiRequest;

