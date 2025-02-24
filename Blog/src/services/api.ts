import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

export const api = {
  getAllBlogs: async () => {
    const response = await axios.get(`${API_URL}/blogs`);
    return response.data;
  },

  getBlogById: async (id: string) => {
    const response = await axios.get(`${API_URL}/blogs/${id}`);
    return response.data;
  },

  createBlog: async (blogData: { title: string; content: string; slug: string }) => {
    const response = await axios.post(`${API_URL}/blogs`, blogData);
    return response.data;
  }
};