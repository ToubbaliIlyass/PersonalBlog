import TypingEffect from "@/components/TypingEffect";

const NotFoundPage = () => {
  return (
    <div className="container mx-auto bg-[#F8F6F2] h-[400px] flex justify-center items-center rounded-b-[40px] p-6 text-5xl font-special">
      <TypingEffect
        strings={["404", "Not Found", "Where?", "Go back..."]}
      ></TypingEffect>
    </div>
  );
};

export default NotFoundPage;
