import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection.tsx";
import Blog from "./components/Blog.tsx";
import Seperator from "./components/Seperator.tsx";
import Footer from "./components/Footer.tsx";

// const App = () => {
//   return (
//     <>
//       <div className="w-screen flex flex-col justify-center items-center">
//         <NavBar></NavBar>
//         <HeroSection></HeroSection>
//         <Seperator></Seperator>
//         <Blog></Blog>
//         <Seperator></Seperator>
//         <Footer></Footer>
//       </div>
//     </>
//   );
// };

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center">
        <NavBar />
        <HeroSection />
        <Seperator />
        <Blog />
        <Seperator />
      </div>
      <Footer />
    </div>
  );
};

export default App;
