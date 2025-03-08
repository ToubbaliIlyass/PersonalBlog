import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import ReactMarkdown from "react-markdown";
import TypingEffect from "@/components/TypingEffect";
import remarkGfm from "remark-gfm";
import { Input } from "@/components/ui/input";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
interface BlogPost {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

function createSlug(title: string) {
  return title
    .toLowerCase()
    .trim() // Removes leading and trailing spaces
    .replace(/\s+/g, "-") // Replaces multiple spaces with a single dash
    .replace(/[^a-z0-9-]+/g, ""); // Removes non-alphanumeric characters except dashes
}

const EditBlogPage = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [inPreviewMode, setInPreviewMode] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;

      try {
        const data = (await api.getBlogById(id)) as BlogPost;
        setBlog(data);
        // Initialize the form with existing blog data
        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);
  if (loading)
    return (
      <div className="container 'flex h-[200px] justify-center  gap-10 w-full px-7 mx-auto font-special">
        <TypingEffect strings={["Loading..."]}></TypingEffect>
      </div>
    );
  if (!blog) return <div>Blog not found</div>;

  function discard() {
    navigate("/blog");
  }

  async function handlesubmitblog(status: string) {
    if (!token) {
      alert("You must be logged in to create a blog");
      return;
    }

    if (!blog) {
      alert("Blog data is not available.");
      return;
    }
    const slug = createSlug(title);

    console.log("blog id: ", blog.id);
    try {
      const result = await api.editBlog(
        blog.id,
        title,
        content,
        status,
        slug,
        token
      );
      console.log("Blog edit result:", result);
      alert(`Blog ${status.toLowerCase()} successfully`);
      navigate(`/blog/${slug}`); // Navigate to the updated blog
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error editing blog:", error.message);
        alert(`Failed to ${status.toLowerCase()} blog: ${error.message}`);
      } else {
        console.error("Unexpected error:", error);
        alert(
          `Failed to ${status.toLowerCase()} blog: An unexpected error occurred.`
        );
      }
    }
  }
  const writingmode = () => (
    <div className="w-full mt-5 text-xl">
      <form action="submit" className="flex flex-col gap-2">
        <label htmlFor="title">Title:</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          id="title"
          required
        />
        <label htmlFor="content">Content:</label>
        <MDEditor
          value={content}
          onChange={(value) => setContent(value || "")}
          hideToolbar={true}
          preview="edit"
          className="border-[1px] border-black-0.5 !bg-white !shadow-none text-black"
        />
      </form>

      <div className="w-full flex justify-center gap-5 mt-5">
        <Button onClick={() => handlesubmitblog("Draft")}>Save as Draft</Button>
        <Button onClick={() => handlesubmitblog("Published")}>Publish</Button>
        <Button onClick={discard}>Discard</Button>
      </div>
    </div>
  );

  const previewmode = () => (
    <article className="container mx-auto mt-5 rounded-b-[40px] flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-[30px]">{title}</h1>
      <div className="prose prose-lg text-left w-full max-w-[700px] break-words">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </article>
  );

  return (
    <div className="container mx-auto p-7 flex flex-col items-center max-w-[700px]">
      <div className="w-full text-left flex justify-between items-center">
        <h1 className="sm:text-3xl text-xl font-semibold">Edit Blog</h1>
        <div className="flex space-x-2">
          <Button onClick={() => setInPreviewMode(false)}>Edit</Button>
          <Button onClick={() => setInPreviewMode(true)}>Preview</Button>
        </div>
      </div>

      {inPreviewMode ? previewmode() : writingmode()}
    </div>
  );
};

export default EditBlogPage;
