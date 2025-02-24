// seed.js
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  // user: process.env.DB_USER,
  // host: process.env.DB_HOST,
  // database: process.env.DB_NAME,
  // password: process.env.DB_PASSWORD,
  // port: process.env.DB_PORT,
  user: "ilyasstoubbali",
  host: "localhost",
  database: "blog_db",
  password: "ilyasstoubbali2024",
  port: 5432,
});

const fakeBlogs = [
  {
    title: "Getting Started with React",
    content: `# Getting Started with React
    
React is a JavaScript library for building user interfaces.

## Why React?
- Component-based architecture
- Virtual DOM for performance
- Strong ecosystem

\`\`\`javascript
function HelloWorld() {
  return <h1>Hello, world!</h1>;
}
\`\`\``,
    slug: "getting-started-with-react",
  },
  {
    title: "TypeScript Best Practices",
    content: `# TypeScript Best Practices
    
TypeScript adds static typing to JavaScript to help you catch errors early.

## Tips
1. Use strict mode
2. Define interfaces for objects
3. Use type inference when appropriate

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

function greetUser(user: User): string {
  return \`Hello, \${user.name}!\`;
}
\`\`\``,
    slug: "typescript-best-practices",
  },
  {
    title: "CSS Grid Layout Tutorial",
    content: `# CSS Grid Layout Tutorial
    
CSS Grid Layout is a two-dimensional layout system for the web.

## Basic Grid
\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
\`\`\`

This creates a 3-column grid with equal width columns and 20px gaps.`,
    slug: "css-grid-layout-tutorial",
  },
];

async function seedDatabase() {
  try {
    for (const blog of fakeBlogs) {
      try {
        await pool.query(
          "INSERT INTO public.blogs (title, content, slug) VALUES ($1, $2, $3)",
          [blog.title, blog.content, blog.slug]
        );
        console.log(`Blog titled "${blog.title}" inserted successfully`);
      } catch (error) {
        console.error(`Error inserting blog titled "${blog.title}":`, error);
      }
    }
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    pool.end();
  }
}

seedDatabase();
