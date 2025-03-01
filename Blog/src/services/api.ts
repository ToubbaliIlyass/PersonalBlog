import axios from 'axios';
import { useAuth } from "../context/AuthContext";

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

  createBlog: async (title: string, content: string, status: string, slug: string) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { token } = useAuth();
    if (!token) return;
  
    const response = await fetch(`${API_URL}/api/blogs`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, content, status, slug }),
    });
  
    if (!response.ok) {
      throw new Error("Failed to create blog");
    }
  },
  addemail: async (email: string) => {
    const response = await axios.post(`${API_URL}/api/email`, { email });
    return response.data;
  },  
};