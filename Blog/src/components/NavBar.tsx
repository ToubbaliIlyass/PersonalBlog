import logo from "../assets/logo.png";
import { Button } from "@/components/ui/button";
import BurgerMenu from "./BurgerMenu";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { user } = useAuth();
  const { logout } = useAuth();
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
    <nav className=" container  flex items-center justify-between p-7 mx-auto  mt-5  rounded-t-[40px]">
      <Link to={"/"}>
        <img
          src={logo}
          alt="icon + Ilyass Toubbali"
          className="h-[40px] w-auto"
        />
      </Link>
      {/* For big screens */}
      <div className="hidden  lg:flex items-center lg:space-x-8 ">
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
        <Button onClick={handlePortfolioClick} variant="link">
          Portfolio
        </Button>
        <Button variant="link">About Me</Button>

        {user ? (
          <Button variant="link" onClick={logout}>
            Log Out
          </Button>
        ) : (
          <Link to={"/login"}>
            <Button variant="link">Login</Button>
          </Link>
        )}

        <Button className="bg-[#f4a067] shadow-lg">Subscribe Today</Button>
      </div>

      {/* For small screens */}
      <div className="lg:hidden flex gap-5">
        <Button className="bg-[#f4a067] hidden sm:flex shadow-lg ">
          Subscribe Today
        </Button>
        <BurgerMenu />
      </div>
    </nav>
  );
};

export default NavBar;
