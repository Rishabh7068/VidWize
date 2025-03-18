import React from "react";
import { Link  , useNavigate} from "react-router-dom";
import { auth , signOut } from "../Firebase/firebaseconfige";
import Footer from "./Footer";

const Recommendation = () => {

    const navigate = useNavigate();
  
    const handleLogout = async () => {
      try {
        await signOut(auth);
        localStorage.removeItem("user");
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
          <a href="/" className="text-lg font-bold text-gray-900">VidWize</a>
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
        <Footer/>
      </div>
    </>
  );
};

export default Recommendation;
