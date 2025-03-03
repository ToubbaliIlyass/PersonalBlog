import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import ReactMarkdown from "react-markdown";
import TypingEffect from "@/components/TypingEffect";
import remarkGfm from "remark-gfm";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

const BlogPost = () => {
  const { id } = useParams<{ id: string }>(); // Expecting `id` as a string
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;

      try {
        const data = (await api.getBlogById(id)) as BlogPost; // Fetch using `id`
        setBlog(data);
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

  return (
    // <article className="container mx-auto p-6  rounded-b-[40px] flex flex-col  items-center ">
    //   <h1 className="text-3xl font-bold mb-[30px]">{blog.title}</h1>
    //   <div className="text-left  w-full max-w-[700px] break-words">
    //     <ReactMarkdown>{blog.content}</ReactMarkdown>
    //   </div>
    //   <div>Posted on: {new Date(blog.created_at).toLocaleDateString()}</div>
    // </article>
    <article className="container mx-auto mt-5  rounded-b-[40px] flex flex-col  items-center">
      <h1 className="text-3xl font-bold mb-[30px]">{blog.title}</h1>
      <div className="prose prose-lg text-left  w-full max-w-[700px] break-words">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {blog.content}
        </ReactMarkdown>
      </div>
      <div className="mt-5">
        Posted on: {new Date(blog.created_at).toLocaleDateString()}
      </div>
    </article>
  );
};

export default BlogPost;
