import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signOut } from "../Firebase/firebaseconfige";

const Editor = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logout successful!");
      navigate("/");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
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
              <a
                onClick={handleLogout}
                className="text-gray-700 hover:text-blue-600 cursor-pointer"
              >
                Logout
              </a>
            </div>
          </nav>
        </header>

        <main className="flex-1 p-6">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold">Editor Dashboard</h1>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={handleModalOpen}
            >
              Submit Work
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Submit Work Modal */}
            {isModalOpen && (
              <div
                className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
              >
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                  <h2 className="text-lg font-semibold">Submit Work</h2>
                  <form className="mt-4">
                    <label className="block mb-2 text-sm font-medium">
                      Select YouTuber:
                    </label>
                    <select className="border border-gray-300 rounded-lg mb-4 w-full">
                      <option value="">Select YouTuber</option>
                      <option value="youtuber1">YouTuber 1</option>
                      <option value="youtuber2">YouTuber 2</option>
                    </select>

                    <label className="block mb-2 text-sm font-medium">
                      Title:
                    </label>
                    <input
                      type="text"
                      className="border border-gray-300 rounded-lg mb-4 w-full"
                      placeholder="Project Title"
                      required
                    />

                    <label className="block mb-2 text-sm font-medium">
                      Description:
                    </label>
                    <textarea
                      className="border border-gray-300 rounded-lg mb-4 w-full"
                      rows="3"
                      placeholder="Description"
                      required
                    ></textarea>

                    <label className="block mb-2 text-sm font-medium">
                      Tags:
                    </label>
                    <input
                      type="text"
                      className="border border-gray-300 rounded-lg mb-4 w-full"
                      placeholder="Tags (comma-separated)"
                      required
                    />

                    <label className="block mb-2 text-sm font-medium">
                      Upload File:
                    </label>
                    <input
                      type="file"
                      className="border border-gray-300 rounded-lg mb-4 w-full"
                      required
                    />

                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                        onClick={handleModalClose}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        Upload
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Assigned Work Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Assigned Work</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="font-semibold">YouTube Channel Name</h3>
                  <p className="text-gray-600">Project Name: Example Project</p>
                  <p className="text-sm text-gray-500">
                    Google Drive Link:{" "}
                    <a href="#" className="text-blue-600">
                      View Link
                    </a>
                  </p>
                  <p className="text-sm text-gray-500">
                    Allotted Date: 01/01/2023
                  </p>
                  <p className="text-sm text-gray-500">Due Date: 01/15/2023</p>
                </div>
              </div>
            </section>
          </div>
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
    </>
  );
};

export default Editor;
