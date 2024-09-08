import axios from "axios";

const API_URL = "http://localhost:3000/products";

export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const createProduct = async (product: {
  name: string;
  price: string;
  description?: string;
}) => {
  const response = await axios.post(API_URL, product);
  return response.data;
};
