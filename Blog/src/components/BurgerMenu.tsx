import { useState } from "react";
import { Button } from "./ui/button";
import { X, Menu } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BurgerMenu = () => {
  const { user } = useAuth();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const location = useLocation();
  const navigate = useNavigate();

  const handlePortfolioClick = () => {
    if (location.pathname === "/") {
      // Scroll to the Portfolio section if already on homepage
      document
        .getElementById("portfolio-section")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to homepage with hash and let browser handle scrolling
      navigate("/", { replace: false });

      // Delay scrolling slightly to ensure the homepage renders first
      setTimeout(() => {
        document
          .getElementById("portfolio-section")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <div className="relative">
      {/* Burger Icon */}
      <button
        className="lg:hidden p-2 text-gray-700 focus:outline-none bg-[#fcd36b] rounded-lg "
        onClick={toggleMenu}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Menu Items */}
      <div
        className={` z-50 fixed top-0 left-0 w-full h-screen bg-[#F8F6F2] flex flex-col p-6 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } `}
      >
        <Link to={"/"} className="block w-full text-center">
          <Button
            onClick={() => setIsOpen(false)}
            className="mt-[50px]"
            variant="link"
          >
            Home
          </Button>
        </Link>
        <Link to={"/Blog"} className="block w-full text-center">
          <Button onClick={() => setIsOpen(false)} variant="link">
            Blog
          </Button>
        </Link>

        <Button
          onClick={() => {
            setIsOpen(false);
            handlePortfolioClick();
          }}
          variant="link"
        >
          <a href="https://www.youtube.com/@IlyassToubbali" target="blank">
            Youtube
          </a>
        </Button>
        <Button
          onClick={() => {
            handlePortfolioClick();
            setIsOpen(false);
          }}
          variant="link"
        >
          Portfolio
        </Button>
        <Button onClick={() => setIsOpen(false)} variant="link">
          About Me
        </Button>

        {user ? (
          <Button
            variant="link"
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
          >
            Log Out
          </Button>
        ) : (
          <Button
            onClick={() => {
              setIsOpen(false);
              navigate("/login");
            }}
            variant="link"
          >
            Login
          </Button>
        )}

        <Button
          onClick={() => setIsOpen(false)}
          className="bg-[#7dd3fc] sm:hidden"
        >
          Subscribe Today
        </Button>

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
