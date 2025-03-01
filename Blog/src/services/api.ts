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
  
    try {
      const response = await fetch(`${API_URL}/api/blogs`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, status, slug }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        throw new Error(errorData.message || "Failed to create blog");
      }
  
      return await response.json(); // Return the created blog data
    } catch (error) {
      console.error("Request failed:", error);
      throw error;
    }
  },
  addemail: async (email: string) => {
    const response = await axios.post(`${API_URL}/api/email`, { email });
    return response.data;
  },  
};