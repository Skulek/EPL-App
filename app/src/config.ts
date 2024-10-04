const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5201';
console.log('API_URL:', API_URL); // This will log the URL being used

export { API_URL };