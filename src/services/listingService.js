import api from './api';

export const getListings = async (params) => {
  const response = await api.get('/listings', { params });
  return response.data;
};

export const getListingById = async (id) => {
  const response = await api.get(`/listings/${id}`);
  return response.data;
};