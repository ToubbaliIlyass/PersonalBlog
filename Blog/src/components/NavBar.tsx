import logo from "../assets/LOGOPNG.png";
import { Button } from "@/components/ui/button";
import BurgerMenu from "./BurgerMenu";

const NavBar = () => {
  return (
    <nav className=" container  flex items-center justify-between p-7 mx-6  mt-5 bg-[#F8F6F2] rounded-t-[40px]">
      <img
        src={logo}
        alt="icon + Ilyass Toubbali"
        className="h-[40px] w-auto"
      />
      {/* For big screens */}
      <div className="hidden  md:flex items-center lg:space-x-8 ">
        <Button className="" variant="link">Blog</Button>
        <Button variant="link">Youtube</Button>
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
