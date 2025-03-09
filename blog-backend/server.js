const cors = require("cors");

require("dotenv").config();
const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const app = express();
app.use(express.json()); // To parse JSON requests

app.use(
  cors({
    origin: [
      "https://personal-blog-beryl-seven.vercel.app",
      "http://localhost:3000",
      "https://personalblog-production-1b15.up.railway.app", // Add your Railway URL
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"], // Add allowed headers
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

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Get token from "Bearer <token>"
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    // Verify token with Supabase
    const { data: user, error } = await supabase.auth.getUser(token);
    if (error || !user) return res.status(401).json({ error: "Invalid token" });

    // Check if user is the admin
    if (user.user.id !== process.env.ADMIN_USER_ID) {
      return res.status(403).json({ error: "Forbidden: Not authorized" });
    }

    req.user = user.user; // Attach user to request
    next(); // Proceed to next middleware
  } catch (error) {
    res.status(500).json({ error: "Authentication error" });
  }
};

// Protect the blog creation route
app.post("/api/blogs", authenticate, async (req, res) => {
  try {
    console.log("Received data:", req.body);
    console.log("Authenticated user:", req.user);
    const { title, content, status, slug } = req.body;

    const { data, error } = await supabase
      .from("blogs")
      .insert([{ title, content, slug, status }])
      .select() // Associate blog with user
      .single();
    console.log("Supabase response:", { data, error });

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/blogs/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, status, slug } = req.body;

    const { data, error } = await supabase
      .from("blogs")
      .update({ title, content, status, slug })
      .eq("id", id)
      .single();

    console.log("Update Query Result:", { data, error });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.delete("/api/blogs/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("blogs")
      .delete()
      .eq("id", id)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/email", async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Received email:", email);

    // Check if the email already exists in the 'emails' table
    const { data: existingEmail, error: checkError } = await supabase
      .from("emails")
      .select("email")
      .eq("email", email); 

    if (checkError) {
      throw checkError;
    }

    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" }); // Email already in the database
    }

    // Insert the email into the 'emails' table
    const { data, error } = await supabase
      .from("emails")
      .insert([{ email }])
      .single(); // Insert one row and return the inserted data

    if (error) {
      throw error;
    }

    res.status(201).json(data); // Send back the inserted data
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle any server errors
  }
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
