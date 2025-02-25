import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/HomePage";
import Blog from "./pages/BlogPage";
import NotFound from "./pages/NotFoundPage";
import BlogPost from "./pages/BlogPostPage.tsx";
import { AlertProvider } from "./context/AlertContext";
import { AlertNotification } from "./components/Alert";

const App = () => {
  return (
    <AlertProvider>
      <NavBar />
      <AlertNotification />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </AlertProvider>
  );
};

export default App;
