import axios from 'axios';

const API_URL = 'https://personalblog-4kkc.onrender.com';

export const api = {
  getAllBlogs: async () => {
    const response = await axios.get(`${API_URL}/api/blogs`);
    return response.data;
  },

  getBlogById: async (id: string) => {
    const response = await axios.get(`${API_URL}/api/blogs/${id}`);
    return response.data;
  },

  createBlog: async (blogData: { title: string; content: string; slug: string }) => {
    const response = await axios.post(`${API_URL}/api/blogs`, blogData);
    return response.data;
  }
};