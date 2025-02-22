// // import video from "../assets/Blog_Video2_compressed.mp4";
import TypingEffect from "./TypingEffect";
import hero from "../assets/hero.png";
import Newsletter from "./Newsletter";

const HeroSection = () => {
  return (
    <>
      {/* <div className="container h-[1000px] flex flex-col md:flex-row  rounded-b-[40px] bg-[#F8F6F2] p-5 "> */}
      <div className="container  bg-[#F8F6F2] flex flex-col md:flex-row items-center  gap-10 w-full px-7 mx-6">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={hero}
            alt=""
            className="w-[80%] md:w-[100%] max-w-sm md:max-w-md rounded-xl"
          />
        </div>

        <div className="w-full md:w-1/2 text-center md:text-left">
          <h3 className="text-[50px] lg:text-[60px]   font-primary font-semibold text-gray-900">
            This is where my story{" "}
            <span className="font-special relative inline-block">
              <TypingEffect string="unfolds..." />
              <span className=" ">
                <svg
                  width="250"
                  height="35"
                  viewBox="0 0 171 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.618896 6.6213C35.1466 4.52603 114.56 1.59266 155.993 6.6213M14.6026 18.3548C49.1303 16.2595 128.544 13.3261 169.977 18.3548"
                    stroke="#FED46D"
                    stroke-width="6"
                  />
                </svg>
              </span>
            </span>
          </h3>
          <p className="text-[30px]">
            I'm Ilyass. I'm A CompSci Student,
            <span className="font-bold underline hover:no-underline ">
              {" "}
              Youtuber
            </span>
            , with a long path of learning ahead.{" "}
          </p>
        </div>
      </div>
      {/* </div> */}
      <div className="container rounded-b-[40px] bg-[#F8F6F2] flex justify-center md:flex-row items-center  gap-10 w-full  px-7 mx-6 p-8">
        <Newsletter />
      </div>
    </>
  );
};

export default HeroSection;
