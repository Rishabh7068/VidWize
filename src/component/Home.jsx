import {React} from 'react';
import { useNavigate } from "react-router-dom";
import Footer from './Footer';

const Home = () => {
  return (
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
              Services
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Testimonials
            </a>
            <a href="/login" className="text-gray-700 hover:text-blue-600">
              Login
            </a>
            <a href="/signup" className="text-gray-700 hover:text-blue-600">
              Signup
            </a>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <section className="text-center py-20">
          <h1 className="text-5xl font-bold text-gray-900">
            Welcome to VidWize
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Helping YouTubers manage their content workflow effectively.
          </p>
          <div className="flex justify-center mt-8">
            
            <a href='/signup' 
              className="bg-green-500 text-white py-3 px-6 ml-4 rounded-lg hover:bg-green-700 transition"
            >
              Join Us
            </a>
          </div>
        </section>

        <section className="py-20 bg-gray-100">
          <h2 className="text-4xl font-bold text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold">Video Uploads</h3>
              <p className="mt-2 text-gray-600">
                Upload your videos effortlessly with our simple interface.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold">Editor Assignment</h3>
              <p className="mt-2 text-gray-600">
                Assign tasks to editors quickly and manage your projects
                efficiently.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold">Content Recommendations</h3>
              <p className="mt-2 text-gray-600">
                Receive tailored content suggestions to optimize your channel.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <h2 className="text-4xl font-bold text-center">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600">
                "VidWize has changed the way I manage my YouTube channel!"
              </p>
              <p className="mt-4 font-semibold">- Creator Name</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600">
                "The editor assignment feature is a game changer!"
              </p>
              <p className="mt-4 font-semibold">- Editor Name</p>
            </div>
          </div>
        </section>
      </main>

      <Footer/>
    </div>
  );
};

export default Home;
