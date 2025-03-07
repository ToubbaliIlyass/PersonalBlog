import axios from 'axios';

const API_URL = 'https://personalblog-production-1b15.up.railway.app';


export const api = {
  getAllBlogs: async () => {
    const response = await axios.get(`${API_URL}/api/blogs`);
    return response.data;
  },

  getBlogById: async (id: string) => {
    const response = await axios.get(`${API_URL}/api/blogs/${id}`);
    return response.data;
  },

  createBlog: async (title: string, content: string, status: string, slug: string, token: string) => {
    
    if (!token) return;
    console.log("Sending request with:", { title, content, status, slug, token });
    try {
      const response = await axios.post(`${API_URL}/api/blogs`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, status, slug }),
      });
      console.log("Response status:", response.status);
  
    }catch (error) {
        console.error('Error creating blog:', error);
        throw error;
      }
  },
  addemail: async (email: string) => {
    const response = await axios.post(`${API_URL}/api/email`, { email });
    return response.data;
  },  
};