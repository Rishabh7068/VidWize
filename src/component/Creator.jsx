import React, { useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signOut } from "../Firebase/firebaseconfige";
import Footer from "./Footer";

const Creator = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);


    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      console.log(storedUser.role);
      if (storedUser.role !== "creator") {
        navigate("/editor");
      }
    }, []);


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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
                Services
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </a>
              <Link
                to="/recommendation"
                className="text-gray-700 hover:text-blue-600"
              >
                Recommendation
              </Link>
              <a
                onClick={handleLogout}
                className="text-gray-700 hover:text-blue-600"
              >
                Logout
              </a>
            </div>
          </nav>
        </header>

        <main className="flex-1 p-6">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold">Creator Dashboard</h1>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={openModal}
            >
              + Assign Work
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Assign Work Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                  <h2 className="text-lg font-semibold">Assign Work</h2>
                  <form className="mt-4">
                    <label className="block mb-2 text-sm font-medium">
                      Select Editor:
                    </label>
                    <select className="border border-gray-300 rounded-lg mb-4 w-full">
                      <option value="">Select Editor</option>
                      <option value="editor1">Editor 1</option>
                      <option value="editor2">Editor 2</option>
                    </select>

                    <label className="block mb-2 text-sm font-medium">
                      Project Name:
                    </label>
                    <input
                      type="text"
                      className="border border-gray-300 rounded-lg mb-4 w-full"
                      placeholder="Project Name"
                      required
                    />

                    <label className="block mb-2 text-sm font-medium">
                      Google Drive Link:
                    </label>
                    <input
                      type="url"
                      className="border border-gray-300 rounded-lg mb-4 w-full"
                      placeholder="https://drive.google.com/..."
                      required
                    />

                    <label className="block mb-2 text-sm font-medium">
                      Optional Instructions:
                    </label>
                    <textarea
                      className="border border-gray-300 rounded-lg mb-4 w-full"
                      rows="3"
                      placeholder="Any instructions..."
                    ></textarea>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium">
                          Current Date:
                        </label>
                        <input
                          type="date"
                          className="border border-gray-300 rounded-lg w-full"
                          required
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium">
                          Due Date:
                        </label>
                        <input
                          type="date"
                          className="border border-gray-300 rounded-lg w-full"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        Assign
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Pending Review Work Section */}
            <section>
              <h2 class="text-2xl font-semibold mb-4">Pending Review Work</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="bg-white rounded-lg shadow-md p-4">
                  <h3 class="font-semibold">Project Name</h3>
                  <p class="text-gray-600">Editor Name</p>
                  <p className="text-sm text-gray-500">
                    Instructions : ___________________
                  </p>
                  <p class="text-sm text-gray-500">Allotted Date: 01/01/2023</p>
                  <p class="text-sm text-gray-500">Due Date: 01/15/2023</p>
                  <div class="mt-4 flex space-x-2">
                    <button class="bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-700 transition">
                      Preview
                    </button>
                    <button
                      class="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-700 transition"
                      onClick={() => setIsFeedbackModalOpen(true)}
                    >
                      Approve
                    </button>
                    <button
                      class="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-700 transition"
                      onClick={() => setIsRejectModalOpen(true)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {isFeedbackModalOpen && (
              <div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                  <h2 class="text-lg font-semibold">Approval Feedback</h2>
                  <form class="mt-4">
                    <label class="block mb-2 text-sm font-medium">
                      Feedback:
                    </label>
                    <textarea
                      class="border border-gray-300 rounded-lg mb-4 w-full"
                      rows="3"
                      placeholder="Provide feedback..."
                    ></textarea>

                    <div class="flex justify-end space-x-2">
                      <button
                        type="button"
                        class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                        onClick={() => setIsFeedbackModalOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Reject Modal */}
            {isRejectModalOpen && (
              <div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                  <h2 class="text-lg font-semibold">Rejection Feedback</h2>
                  <form class="mt-4">
                    <label class="block mb-2 text-sm font-medium">
                      Feedback:
                    </label>
                    <textarea
                      class="border border-gray-300 rounded-lg mb-4 w-full"
                      rows="3"
                      placeholder="Explain reasons for rejection..."
                    ></textarea>

                    <div class="flex justify-end space-x-2">
                      <button
                        type="button"
                        class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                        onClick={() => setIsRejectModalOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        Confirm Reject
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Pending Work Section */}
            <h2 className="text-2xl font-semibold mb-4">Pending Work</h2>
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="font-semibold">Project Name</h3>
                  <p className="text-sm text-gray-500">
                    Editor Name
                  </p>
                  <p className="text-sm text-gray-500">
                    Instructions : ___________________
                  </p>
                  <p className="text-sm text-gray-500">
                    Allotted Date: 01/02/2023
                  </p>
                  <p className="text-sm text-gray-500">Due Date: 01/16/2023</p>
                  <p className="text-sm text-gray-500">
                    Google Drive Link:{" "}
                    <a href="#" className="text-blue-600">
                      View Link
                    </a>
                  </p>
                </div>
              </div>
            </section>
            

            {/* Completed Work Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Completed Work</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="font-semibold">Video Title</h3>
                  <p className="text-sm text-gray-500">
                    Editor Name
                  </p>
                  <p className="text-sm text-gray-500">
                    Completion Date: 01/10/2023
                  </p>
                  <p className="text-sm text-gray-500">
                    Video Link:{" "}
                    <a href="#" className="text-blue-600">
                      Watch Video
                    </a>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>

        <Footer/>
      </div>
    </>
  );
};

export default Creator;
