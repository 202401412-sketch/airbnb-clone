import api from './axios';

/**
 * Fetch user's conversation list
 */
export const getConversations = async () => {
  const response = await api.get('/messages/conversations');
  return response.data;
};

/**
 * Get messages inside a specific conversation
 * @param {number|string} id - Conversation ID
 */
export const getConversationMessages = async (id) => {
  const response = await api.get(`/messages/conversations/${id}`);
  return response.data;
};

/**
 * Send a new message
 * @param {Object} data - { conversationId, recipientId, listingId, messageText, senderId }
 */
export const sendMessage = async (data) => {
  const response = await api.post('/messages/send', data);
  return response.data;
};

/**
 * Mark a specific message as read
 * @param {number|string} id - Message ID
 */
export const markAsRead = async (id) => {
  const response = await api.patch(`/messages/${id}/read`);
  return response.data;
};

/**
 * Get total unread messages count
 */
export const getUnreadCount = async () => {
  const response = await api.get('/messages/unread-count');
  return response.data;
};

/**
 * Delete an entire conversation thread
 * @param {number|string} id - Conversation ID
 */
export const deleteConversation = async (id) => {
  const response = await api.delete(`/messages/conversations/${id}`);
  return response.data;
};
