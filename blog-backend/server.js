// const express = require("express");
// const { Pool } = require("pg");
// const cors = require("cors");
// require("dotenv").config();
// const { createClient } = require('@supabase/supabase-js');

// // Initialize Supabase client
// const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_API_KEY
// );

// const app = express();

// // Middleware
// // app.use(cors());
// app.use(
//   cors({
//     origin: "https://personal-blog-beryl-seven.vercel.app/#/", // Change this to your frontend URL
//   })
// );
// app.use(express.json());
// // Database configuration

// // Routes
// app.get("/api/blogs", async (req, res) => {
//   try {
//     console.log("called /api/blogs");
//     const { rows } = await pool.query(
//       "SELECT * FROM public.blogs ORDER BY created_at DESC"
//     );
//     res.json(rows);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get("/api/blogs/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { rows } = await pool.query(
//       "SELECT * FROM public.blogs WHERE id = $1",
//       [id]
//     );
//     if (rows.length === 0) {
//       return res.status(404).json({ error: "Blog not found" });
//     }
//     res.json(rows[0]);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.post("/api/blogs", async (req, res) => {
//   try {
//     const { title, content, slug } = req.body;
//     const { rows } = await pool.query(
//       "INSERT INTO public.blogs (title, content, slug) VALUES ($1, $2, $3) RETURNING *",
//       [title, content, slug]
//     );
//     res.status(201).json(rows[0]);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, async () => {
//   console.log(`Server running on port ${PORT}`);
// });

require("dotenv").config();
const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const app = express();
app.use(express.json()); // To parse JSON requests

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

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
