import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Validation
    if (!title || !content) {
      setError("Please fill in all fields");
      return;
    }

    try {
      // 2. The API Call
      // Notice we don't send 'user_id'. The backend knows who we are 
      // because api.js automatically attaches our 'Authorization' token.
      await api.post("/posts/", {
        title: title,
        content: content,
        published: true
      });

      // 3. Success! Go back home to see the new post
      navigate("/");
      
    } catch (err) {
      console.error("Failed to publish:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Write New Article</h1>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter an interesting title..."
            />
          </div>

          {/* Content Input (Text Area) */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="10"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Write your thoughts here..."
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition"
            >
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;