const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000", // Change this to your frontend URL
  })
);
app.use(express.json());
// Database configuration
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Routes
app.get("/api/blogs", async (req, res) => {
  try {
    console.log("called /api/blogs");
    const { rows } = await pool.query(
      "SELECT * FROM public.blogs ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/blogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      "SELECT * FROM public.blogs WHERE id = $1",
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/blogs", async (req, res) => {
  try {
    const { title, content, slug } = req.body;
    const { rows } = await pool.query(
      "INSERT INTO public.blogs (title, content, slug) VALUES ($1, $2, $3) RETURNING *",
      [title, content, slug]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
