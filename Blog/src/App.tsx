import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/HomePage";
import Blog from "./pages/BlogPage";
import NotFound from "./pages/NotFoundPage";
import BlogPost from "./pages/BlogPostPage.tsx";
import { AlertProvider } from "./context/AlertContext";
import { AlertNotification } from "./components/Alert";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/LogIn.tsx";
import CreateBlogPage from "./pages/CreateBlogPage.tsx";
import EditBlogPage from "./pages/EditBlogPage.tsx";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user ? children : <Login />;
};

const App = () => {
  return (
    <AuthProvider>
      <AlertProvider>
        <NavBar />
        <AlertNotification />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/protected"
              element={
                <ProtectedRoute>
                  <Blog />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-blog"
              element={
                <ProtectedRoute>
                  <CreateBlogPage />
                </ProtectedRoute>
              }
            />
            <Route 
            path='/edit-blog/:id' 
            element={
              <ProtectedRoute>
                <EditBlogPage />
              </ProtectedRoute>
            }
            />
            {/* <Route path="/about" element={<About />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </AlertProvider>
    </AuthProvider>
  );
};

export default App;
