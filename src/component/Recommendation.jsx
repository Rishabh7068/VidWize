import React from "react";
import { Link  , useNavigate} from "react-router-dom";
import { auth , signOut } from "../Firebase/firebaseconfige";

const Recommendation = () => {

    const navigate = useNavigate();
  
    const handleLogout = async () => {
      try {
        await signOut(auth);
        alert("Logout successful!");
        navigate("/");
      } catch (error) {
        console.error("Failed to logout:", error);
      }
    };
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <header className="border-b border-gray-200 bg-white">
          <nav className="flex items-center justify-between p-6">
            <div className="text-lg font-bold text-gray-900">VidWize</div>
            <div className="space-x-4">
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Home
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                About
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Recommendations
              </a>
              <a onClick={handleLogout} className="text-gray-700 hover:text-blue-600">
                Logout
              </a>
            </div>
          </nav>
        </header>

        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Content Recommendations</h1>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="font-semibold text-lg">
                Title: Engaging Storytelling Techniques
              </h2>
              <p className="text-gray-600 mt-2">
                Script Suggestion: Focus on personal anecdotes and experiences
                to connect with your audience.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="font-semibold text-lg">
                Title: Trending Challenges to Try
              </h2>
              <p className="text-gray-600 mt-2">
                Script Suggestion: Research trending challenges and put your
                unique spin on them.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="font-semibold text-lg">
                Title: Collaborations with Other Creators
              </h2>
              <p className="text-gray-600 mt-2">
                Script Suggestion: Reach out to fellow creators and discuss
                exciting ideas to collaborate on for increased exposure.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="font-semibold text-lg">
                Title: Educational Content for Your Niche
              </h2>
              <p className="text-gray-600 mt-2">
                Script Suggestion: Share valuable insights and tips related to
                your niche to establish authority and engage viewers.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="font-semibold text-lg">
                Title: Seasonal Events and Themes
              </h2>
              <p className="text-gray-600 mt-2">
                Script Suggestion: Create content that ties into upcoming
                holidays and seasonal themes for relevancy.
              </p>
            </div>
          </section>
        </main>

        <footer className="bg-white border-t border-gray-200">
          <div className="text-center py-4">
            <p className="text-gray-600">Contact us: info@vidwize.com</p>
            <div className="mt-2">
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Terms of Service
              </a>
              <span className="mx-2">|</span>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Privacy Policy
              </a>
            </div>
            <div className="mt-2">
              <a href="#" className="text-gray-600 hover:text-blue-600 mx-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 inline"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm.39 14.89v-1.74a1.81 1.81 0 0 0-.63-.93c-1.49-1.16-2.2-1.78-2.2-2.81 0-1.05.85-1.74 1.95-1.74 1.05 0 1.57.07 2.18.14V7.93c0-.12.01-.26-.07-.38-.07-.12-.16-.2-.33-.25a1.58 1.58 0 0 0-.45-.08c-1.02 0-1.84.73-1.84 1.84v1.6H7.39v1.73h1.59v5.39h1.82v-5.39h1.47z" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 mx-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 inline"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.197 1.743a7.477 7.477 0 0 0-1.738-.105c-4.007.014-7.204 3.359-7.204 7.588a7.565 7.565 0 0 0 1.926 5.062c1.612 1.962 3.973 2.395 6.026 1.407.66-.208 1.092-.377 1.291-.695.246-.412.239-.966.033-1.315-.572-.42-1.114-.844-1.562-1.265a7.086 7.086 0 0 0 3.905-5.26C11.772 3.526 9.81.746 9.197 1.743zM7.444 12.254c-.294.882-.86 1.25-1.865 1.31a3.305 3.305 0 0 0-1.044-.093c-1.84.122-3.142-1.128-2.988-2.628a1.968 1.968 0 0 0 1.164-.377c.572-.312.982-.572 1.127-1.346.146-.794-.221-1.623-1.184-1.75.174-1.048.789-1.77 2.179-1.645 1.46.128 1.917 1.067 1.941 1.645a2.159 2.159 0 0 1-1.051 2.097z" />
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Recommendation;
