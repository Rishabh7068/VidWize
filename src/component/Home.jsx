import {React , useState} from 'react';
import {signInWithPopup , auth  , googleProvider   } from "../Firebase/firebaseconfige" ;
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleGoogleLoginforCretor = async () => {
        if (loading) return; 
        setLoading(true); 
        try {
          const result = await signInWithPopup(auth, googleProvider);
          console.log("Google login success:", result.user);
          setUser(result.user);
          navigate("/Creator");
    
        } catch (error) {
          console.error("Error in Google login", error);
        } finally {
          setLoading(false); 
        }
      };

      const handleGoogleLoginforEditor = async () => {
        if (loading) return; 
        setLoading(true); 
        try {
          const result = await signInWithPopup(auth, googleProvider);
          console.log("Google login success:", result.user);
          setUser(result.user);
          navigate("/Editor");
        } catch (error) {
          console.error("Error in Google login", error);
        } finally {
          setLoading(false); 
        }
      };



  return (
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
              Services
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Testimonials
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Login
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
            <a onClick={handleGoogleLoginforCretor } disabled={loading}
              className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition"
            >
              Get Started as Creator
            </a>
            <a onClick={handleGoogleLoginforEditor} disabled={loading}
              className="bg-green-500 text-white py-3 px-6 ml-4 rounded-lg hover:bg-green-700 transition"
            >
              Get Started as Editor
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
        </div>
      </footer>
    </div>
  );
};

export default Home;
