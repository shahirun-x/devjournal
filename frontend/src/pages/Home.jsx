import { useEffect, useState } from "react";
import api from "../services/api";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]); // Store the list of posts
  const [loading, setLoading] = useState(true); // Is it loading?
  const navigate = useNavigate();

  // 1. The Fetch Function
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts/");
        setPosts(response.data); // Save the data to our state
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchPosts();
  }, []);

  // 2. Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Throw away the wristband
    navigate("/login"); // Kick user to login page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header / Navbar */}
      <nav className="bg-white shadow-sm p-4 mb-8">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">DevJournal</h1>
          <div className="space-x-4">
             <button 
               onClick={() => navigate("/create")} 
               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
             >
               Write Post
             </button>
             <button 
               onClick={handleLogout} 
               className="text-gray-600 hover:text-red-500"
             >
               Logout
             </button>
          </div>
        </div>
      </nav>

      {/* Main Feed */}
      <div className="max-w-2xl mx-auto px-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading posts...</p>
        ) : posts.length === 0 ? (
           <div className="text-center py-10">
             <p className="text-gray-500">No posts yet.</p>
             <p className="text-sm text-gray-400">Be the first to write one!</p>
           </div>
        ) : (
          posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;