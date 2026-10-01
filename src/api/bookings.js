import api from './axios';

/**
 * Create a new booking
 * @param {Object} data - { propertyId, checkIn, checkOut, guestsCount, totalPrice, guestId, guestName }
 */
export const createBooking = async (data) => {
  const response = await api.post('/bookings', data);
  return response.data;
};

/**
 * Fetch current user's bookings (as Guest)
 * @param {Object} [params] - Query params: page, limit, status
 */
export const getMyBookings = async (params = {}) => {
  const response = await api.get('/bookings/my-bookings', { params });
  return response.data;
};

/**
 * Fetch incoming reservations for current user (as Host)
 * @param {Object} [params] - Query params: page, limit, status
 */
export const getHostReservations = async (params = {}) => {
  const response = await api.get('/bookings/host-reservations', { params });
  return response.data;
};

/**
 * Check date availability for a property
 * @param {string|number} propertyId
 * @param {Object} [params] - { checkIn, checkOut }
 */
export const checkAvailability = async (propertyId, params = {}) => {
  const response = await api.get(`/bookings/check-availability/${propertyId}`, { params });
  return response.data;
};

/**
 * Cancel a booking by ID
 * @param {number|string} id
 * @param {string} [reason]
 */
export const cancelBooking = async (id, reason = '') => {
  const cleanId = parseInt(String(id ?? '').replace(/#/g, '').trim(), 10);
  const response = await api.patch(`/bookings/${cleanId}/cancel`, { reason });
  return response.data;
};

/**
 * Get booking details by ID
 * @param {number|string} id
 */
export const getBookingById = async (id) => {
  const cleanId = parseInt(String(id ?? '').replace(/#/g, '').trim(), 10);
  const response = await api.get(`/bookings/${cleanId}`);
  return response.data;
};

/**
 * Host approves booking request
 * @param {number|string} id
 */
export const approveBooking = async (id) => {
  const cleanId = String(id ?? '').replace(/#/g, '').trim();
  const response = await api.patch(`/bookings/${cleanId}/approve`);
  return response.data;
};

/**
 * Host rejects booking request
 * @param {number|string} id
 * @param {string} [reason]
 */
export const rejectBooking = async (id, reason = '') => {
  const cleanId = String(id ?? '').replace(/#/g, '').trim();
  const response = await api.patch(`/bookings/${cleanId}/reject`, { reason });
  return response.data;
};
