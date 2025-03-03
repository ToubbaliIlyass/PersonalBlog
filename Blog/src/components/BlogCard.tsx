
interface BlogPost {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <div
      className="group w-[300px] min-w-[300px]  h-[500px] md:w-[450px] md:min-w-[450px] md:h-[625px] bg-gradient-to-br from-gray-100 to-gray-50 rounded-[40px] p-2 hover:bg-[#f4a067] hover:translate-y-[-10px] hover:shadow-lg
      transition-all  duration-500 ease-in-out  
      "
    >
      <div className="p-6 normal-case ">
        <p>{new Date(post.created_at).toLocaleDateString()}</p>
        <h1 className="md:text-6xl text-5xl mt-7  font-special break-words whitespace-normal">
          {post.title}
        </h1>
        <p className="text-xl mt-4 text-gray-600 leading-relaxed">
          {post.content.length > 150
            ? post.content.substring(0, 150) + "..."
            : post.content}
        </p>

        <p className="mt-4 inline-block text-[#5ccaf0] hover:text-[#fbd36b] transition-all duration-300 font-semibold">
          Read more →
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
