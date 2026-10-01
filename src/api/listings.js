import api from './axios';

/**
 * Fetch paginated listings/properties
 * @param {Object} [params] - Query params: page, limit, category, etc.
 */
export const getListings = async (params = {}) => {
  const response = await api.get('/properties', { params });
  return response.data;
};

/**
 * Fetch a single listing by ID
 * @param {string|number} id
 */
export const getListingById = async (id) => {
  const response = await api.get(`/properties/${id}`);
  return response.data;
};

/**
 * Create a new listing
 * @param {Object} data - Listing payload
 */
export const createListing = async (data) => {
  const response = await api.post('/properties', data);
  return response.data;
};

/**
 * Advanced search & filters
 * @param {Object} params - Search filters: city, country, minPrice, maxPrice, etc.
 */
export const searchListings = async (params = {}) => {
  const response = await api.get('/properties/search', { params });
  return response.data;
};

/**
 * Fetch top rated listings
 * @param {number} [limit=10]
 */
export const getTopRatedListings = async (limit = 10) => {
  const response = await api.get('/properties/top-rated', { params: { limit } });
  return response.data;
};
