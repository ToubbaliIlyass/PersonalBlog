import HeroSection from "../components/HeroSection.tsx";
import Blog from "../components/Blog.tsx";
import Seperator from "../components/Seperator.tsx";
import PortfolioSection from "@/components/PortfolioSection.js";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center">
        <HeroSection />
        <Seperator />

        <Blog />
        <PortfolioSection id="portfolio-section" />
      </div>
    </div>
  );
};

export default HomePage;
