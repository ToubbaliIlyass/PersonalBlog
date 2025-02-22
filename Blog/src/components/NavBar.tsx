import logo from "../assets/logo.png";
import { Button } from "@/components/ui/button";
import BurgerMenu from "./BurgerMenu";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className=" container  flex items-center justify-between p-7 mx-auto  mt-5 bg-[#F8F6F2] rounded-t-[40px]">
      <Link to={"/"}>
        <img
          src={logo}
          alt="icon + Ilyass Toubbali"
          className="h-[40px] w-auto"
        />
      </Link>
      {/* For big screens */}
      <div className="hidden  md:flex items-center lg:space-x-8 ">
        <Link to={"/blog"}>
          <Button className="" variant="link">
            Blog
          </Button>
        </Link>
        <Button variant="link">
          <a href="https://www.youtube.com/@IlyassToubbali" target="blank">
            Youtube
          </a>
        </Button>
        <Button variant="link">Portfolio</Button>
        <Button variant="link">About Me</Button>
        <Button className="bg-[#f4a067] shadow-lg">Subscribe Today</Button>
      </div>

      {/* For small screens */}
      <div className="md:hidden">
        <BurgerMenu />
      </div>
    </nav>
  );
};

export default NavBar;
