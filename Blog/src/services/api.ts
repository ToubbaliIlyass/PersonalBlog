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

  
  editBlog: async (id: string, title: string, content: string, status: string, slug: string, token: string) => {
    if (!token) {
      throw new Error("Authentication token is required");
    }

    try {
      const response = await axios.put(
        `${API_URL}/api/blogs/${id}`,
        // Request body
        {
          title,
          content,
          status,
          slug
        },
        // Config object
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      return response.data;
    } catch (error) {
      // Handle any error as a generic Error object
      if (error instanceof Error) {
        throw new Error(`Failed to edit blog: ${error.message}`);
      }
      // Handle case where error is not an Error object
      throw new Error("An unexpected error occurred while editing the blog");
    }
},

  deleteBlog: async (id: string, token: string) => {
    if (!token) {
      throw new Error("Authentication token is required");
    } 
    try {
      const response = await axios.delete(`${API_URL}/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to delete blog: ${error.message}`);
      }
      throw new Error("An unexpected error occurred while deleting the blog");
    }
  },  
  createBlog: async (title: string, content: string, status: string, slug: string, token: string) => {
    if (!token) {
      throw new Error("Authentication token is required");
    }
    
    console.log("Sending request with:", { title, content, status, slug, token });
  
    try {
      const response = await axios.post(
        `${API_URL}/api/blogs`,
        { title, content, status, slug }, // Request body
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Response status:", response.status);
      return response.data;
  
    } catch (error) {
      console.error('Error creating blog:', error);
      throw error;
    }
  },
  addemail: async (email: string) => {
    const response = await axios.post(`${API_URL}/api/email`, { email });
    return response.data;
},
};