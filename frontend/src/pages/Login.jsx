import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Hook to change pages
import api from "../services/api"; // Import our API manager

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError("");

    try {
      // 1. The Request
      // We send the data using the OAuth2 format (form-urlencoded)
      // because FastAPI's default security expects form data, not JSON.
      const formData = new FormData();
      formData.append("username", email); // OAuth2 calls it 'username' even if it's an email
      formData.append("password", password);

      const response = await api.post("/auth/login", formData);

      // 2. The Success
      // Save the "Wristband" (Token) to the browser's local storage
      localStorage.setItem("token", response.data.access_token);
      
      alert("Login Successful!");
      navigate("/"); // Redirect to Home Page (we will build this next)
      
    } catch (err) {
      // 3. The Failure
      console.error("Login failed", err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;