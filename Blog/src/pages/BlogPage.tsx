import TypingEffect from "@/components/TypingEffect";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function BlogPage() {
  const allPosts = [
    {
      id: 1,
      date: "2025-02-20",
      title:
        "3-2-1: Four questions for life, how to learn like a child, and seeing things in a generous way",
    },
    {
      id: 2,
      date: "2025-02-13",
      title:
        "3-2-1: On getting what you deserve, the power of flexibility, and how good decisions are made",
    },
    {
      id: 3,
      date: "2023-02-06",
      title:
        "3-2-1: On grief and friendship, the value of reputation, and prevailing when you're in a tight spot",
    },
    {
      id: 4,
      date: "2024-01-30",
      title:
        "3-2-1: On the danger of a good idea, how to do your best work, and a question to inspire action",
    },
    {
      id: 5,
      date: "2025-01-23",
      title:
        "3-2-1: On what it takes to be consistent, how to make a bad situation worse, and noticing small joys",
    },
  ];

  const [postsToShow, setPostsToShow] = useState(4);
  const displayedPosts = allPosts.slice(0, postsToShow);
  const hasMorePosts = postsToShow < allPosts.length;

  const loadMore = () => {
    setPostsToShow((prev) => prev + 4);
  };

  const groupedPosts = displayedPosts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {} as Record<number, typeof displayedPosts>);

  return (
    <>
      <div className="container mx-auto bg-[#F8F6F2] rounded-b-[40px] p-6">
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
          ></TypingEffect>
          :
        </h1>
        <div className="max-w-4xl mx-auto p-4">
          {Object.keys(groupedPosts)
            .sort((a, b) => Number(b) - Number(a))
            .map((year) => (
              <div key={year} className="mb-8">
                <h1 className="text-3xl font-bold mb-4">{year}</h1>
                <div className="space-y-6">
                  {groupedPosts[Number(year)].map((post) => {
                    const date = new Date(post.date);
                    const formattedDate = date
                      .toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                      .toUpperCase();
                    return (
                      <div key={post.id} className="flex gap-8 group">
                        <div className="w-20 text-gray-500 uppercase text-sm">
                          {formattedDate}
                        </div>
                        <div className="flex-1">
                          <a
                            href="#"
                            className="text-gray-800 hover:text-[#5dccf1] transition-colors duration-200"
                          >
                            {post.title}
                          </a>
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
                className="w-full py-6 text-white  bg-[#f4a067]"
              >
                Load More Posts
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BlogPage;
