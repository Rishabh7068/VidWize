import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import Footer from "./Footer";

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const auth = getAuth(); 

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      navigate(storedUser.role === "Youtuber" ? "/creator" : "/editor");
    }
  }, [navigate]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const idToken = await user.getIdToken(); 

      let apiUrl = role === "Youtuber" ? "http://localhost:9000/api/auth/loginasyoutuber" : "http://localhost:9000/api/auth/loginaseditor";

      const response = await axios.post(apiUrl, { idToken });

      if (response.status === 200) {

        localStorage.setItem("user", JSON.stringify(response.data.user));

        if (role === "Youtuber") {
          navigate("/creator");
        } else {                
            navigate("/editor");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Navbar */}
        <header className="border-b border-gray-200 bg-white">
          <nav className="flex items-center justify-between p-6">
            <a href="/" className="text-lg font-bold text-gray-900">VidWize</a>
            <div className="space-x-4">
              <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">About</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">Dashboard</a>
              <a href="/signup" className="text-gray-700 hover:text-blue-600 cursor-pointer">Signup</a>
            </div>
          </nav>
        </header>

        {/* Form */}
        <div className="flex justify-center mt-10">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-xl font-bold text-center mb-4">Login</h1>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
              {/* Role Dropdown */}
              <div className="mb-4">
                <label htmlFor="role" className="block text-gray-700">Role:</label>
                <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select...</option>
                  <option value="Editor">Editor</option>
                  <option value="Youtuber">Youtuber</option>
                </select>
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Login
              </button>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Login;
