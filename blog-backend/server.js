const cors = require("cors");

require("dotenv").config();
const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const app = express();
app.use(express.json()); // To parse JSON requests

app.use(
  cors({
    origin: [
      "https://personal-blog-beryl-seven.vercel.app", // Deployed frontend
      "http://localhost:3000",
    ], // Change this to your frontend URL
  })
);
// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_API_KEY
);

// GET all blogs
app.get("/api/blogs", async (req, res) => {
  try {
    console.log("called /api/blogs");
    const { data, error } = await supabase
      .from("blogs") // The table name
      .select("*")
      .order("created_at", { ascending: false }); // Order by creation date descending

    if (error) {
      throw error;
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET a single blog by ID
app.get("/api/blogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("blogs") // The table name
      .select("*")
      .eq("id", id) // Match the blog with the given ID
      .single(); // Return only one row

    if (error) {
      throw error;
    }

    if (!data) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new blog
app.post("/api/blogs", async (req, res) => {
  try {
    const { title, content, slug } = req.body;

    // Insert a new blog into the 'blogs' table
    const { data, error } = await supabase
      .from("blogs") // The table name
      .insert([{ title, content, slug }]) // Insert values
      .single(); // Return only one row

    if (error) {
      throw error;
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/email", async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);

    // Insert a new blog into the 'blogs' table
    const { data, error } = await supabase
      .from("email") // The table name
      .insert([{ email }]) // Insert values
      .single(); // Return only one row

    if (error) {
      throw error;
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
