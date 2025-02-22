import { useState } from "react";
import { Button } from "./ui/button";
import { X, Menu } from "lucide-react";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      {/* Burger Icon */}
      <button
        className="md:hidden p-2 text-gray-700 focus:outline-none bg-[#fcd36b] rounded-lg "
        onClick={toggleMenu}
      >
        {isOpen ? <X size={30} /> : <Menu size={30} />}
      </button>

      {/* Menu Items */}
      <div
        className={` z-50 fixed top-0 left-0 w-full h-screen bg-[#F8F6F2] flex flex-col p-6 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } `}
      >
        <Button className="mt-[50px]" variant="link">
          Blog
        </Button>
        <Button variant="link">Youtube</Button>
        <Button variant="link">Portfolio</Button>
        <Button variant="link">About Me</Button>
        <Button className="bg-[#7dd3fc]">Subscribe Today</Button>

        <button
          className="absolute top-6 right-6 text-gray-700 dark:text-white"
          onClick={toggleMenu}
        >
          <X size={35} />
        </button>
      </div>
    </div>
  );
};

export default BurgerMenu;
