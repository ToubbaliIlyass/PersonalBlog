//
import TypingEffect from "@/components/TypingEffect";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { X } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  created_at: string;
  status: string;
}

function BlogPage() {
  const { user } = useAuth();
  const { token } = useAuth();

  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [postsToShow, setPostsToShow] = useState(4);

  const handleDelete = async (id: string) => {
    if (!token) {
      alert("You must be logged in to delete a blog");
      return;
    }
    try {
      const data = await api.deleteBlog(id, token);
      console.log(data);
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = (await api.getAllBlogs()) as BlogPost[];
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const displayedPosts = blogs.slice(0, postsToShow);
  const hasMorePosts = postsToShow < blogs.length;

  const loadMore = () => {
    setPostsToShow((prev) => prev + 4);
  };

  const filteredPosts = user
    ? displayedPosts
    : displayedPosts.filter((post) => post.status === "Published");

  const groupedPosts = filteredPosts.reduce((acc, post) => {
    const year = new Date(post.created_at).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {} as Record<number, BlogPost[]>);

  if (loading)
    return (
      <div className="container   flex h-[200px] justify-center gap-10 w-full px-7 mx-auto font-special">
        <TypingEffect strings={["Loading..."]}></TypingEffect>
      </div>
    );
  return (
    <>
      <div className="container mx-auto rounded-b-[40px] p-6">
        <h1 className="text-4xl font-bold text-center font-special pt-6 pb-6">
          The Blog,{" "}
          <TypingEffect
            strings={[
              "My Journey",
              "My Story",
              "My Life",
              "My Chaos",
              "My Truth",
            ]}
          />
          :
        </h1>

        {/* Add New Blog Button */}

        {/* Blogs  */}
        <div className="max-w-4xl mx-auto p-4">
          {Object.keys(groupedPosts)
            .sort((a, b) => Number(b) - Number(a))
            .map((year) => (
              <div key={year} className="mb-8">
                <h1 className="text-3xl font-bold mb-4">{year}</h1>
                <div className="space-y-6">
                  {groupedPosts[Number(year)].map((post) => {
                    const date = new Date(post.created_at);
                    const formattedDate = date
                      .toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                      .toUpperCase();
                    return (
                      <div
                        key={post.id}
                        className="flex gap-8 group items-center"
                      >
                        <div className="w-20 text-gray-500 uppercase text-sm">
                          {formattedDate}
                        </div>
                        <div className="flex justify-between items-center w-full">
                          <Link to={`/blog/${post.id}`}>
                            <h1 className="text-gray-800 hover:text-[#5dccf1] transition-colors duration-200">
                              {post.title}
                            </h1>
                          </Link>

                          {user && (
                            <div className="flex gap-4 items-center ">
                              {post.status === "Draft" ? (
                                <span className=" text-gray-500">Draft</span>
                              ) : (
                                <span className=" text-green-500">
                                  Published
                                </span>
                              )}
                              <Link to={`/edit-blog/${post.id}`}>
                                <Button className="text-[16px]" variant="ghost">
                                  Edit Post
                                </Button>
                              </Link>
                              <button
                                onClick={() => {
                                  handleDelete(post.id);
                                }}
                              >
                                <X className="text-red-500"></X>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

          {hasMorePosts && (
            <div className="mt-8">
              <Button
                onClick={loadMore}
                variant="outline"
                className="w-full py-6 text-white bg-[#f4a067]"
              >
                Load More Posts
              </Button>
            </div>
          )}

          {user && (
            <>
              <div className="flex justify-center max-w-4xl mx-auto p-4">
                <Link to={"/create-blog"}>
                  <Button className="bg-[#f4a067] w-full">Add New Blog</Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default BlogPage;
