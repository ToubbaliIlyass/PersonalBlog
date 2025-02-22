import BlogCard from "./BlogCard";
import { useRef } from "react";

const Blog = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="container flex flex-col h-screen  p-7 mx-6 rounded-[40px]  items-center">
        <h1 className="text-5xl md:text-7xl font-bold font-special p-5">
          The story...
        </h1>

        <div className="flex flex-row w-full justify-between">
          <h1 className="text-3xl md:text-5xl font-semibold font-primary">
            Read My Latest <span className="font-special"> Blogs</span>
          </h1>

          <div className="hidden md:flex flex-row gap-5">
            <button
              onClick={scrollLeft}
              className="h-12 w-12 rounded-full bg-[#ffd66b] flex items-center justify-center  hover:bg-[#5dccf1] transition-all  duration-250 ease-in-out"
            >
              <span className="sr-only">Previous</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={scrollRight}
              className="h-12 w-12 rounded-full bg-[#ffd66b] flex items-center justify-center   hover:bg-[#5dccf1] transition-all  duration-250 ease-in-out"
            >
              <span className="sr-only">Next</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative w-full mt-[40px]">
          {/* Use overflow-x-auto on an outer container */}
          <div className="overflow-hidden w-full">
            {/* Add w-full to ensure proper width calculation */}
            <div
              ref={scrollRef}
              className=" flex gap-5 pt-5 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide w-full"
            >
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
