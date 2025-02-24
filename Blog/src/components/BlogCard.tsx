interface BlogPost {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <div
      className="group w-[300px] min-w-[300px]  h-[500px] md:w-[450px] md:min-w-[450px] md:h-[625px] bg-[#F8F6F2] rounded-[40px] p-2 hover:bg-[#f4a067] hover:translate-y-[-10px] hover:shadow-lg
      transition-all  duration-500 ease-in-out  
      "
    >
      {/* <div className="rounded-[40px] w-full bg-white h-2/5 overflow-hidden">
        <img
          src={thumbnail}
          alt="thumbnail"
          className=" transition-transform duration-500 ease-in-out group-hover:scale-110   w-full h-full object-cover"
        />
      </div> */}
      <div className="p-6 normal-case ">
        <p>{new Date(post.created_at).toLocaleDateString()}</p>
        <h1 className="md:text-5xl text-4xl mt-7  font-special break-words whitespace-normal">
          {post.title}
        </h1>
      </div>
    </div>
  );
};

export default BlogCard;
