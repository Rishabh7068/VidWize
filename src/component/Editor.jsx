import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signOut } from "../Firebase/firebaseconfige";
import Footer from "./Footer";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";

const Editor = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingReviewWorks, setpendingReviewWorks] = useState([]); 
  const [assignedWorks, setAssignedWorks] = useState([]);
  const [completedWorks, setCompletedWorks] = useState([]);
  const [youtuber, setYoutuber] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const uid = user.uid;


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log(storedUser.role);
    if (storedUser.role !== "editor") {
      navigate("/creator");
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

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User signed in:", user);
        getPendingReviewWork();
        getAssignedWork();
        getCompletedWork();
      } else {
        console.error("No user is currently signed in.");
      }
    });

    // Cleanup on unmount
    if (storedUser.role !== "youtuber") {
      navigate("/editor");
    }
    return () => unsubscribe();
  }, []);

  // // get pending review work
  const getPendingReviewWork = async () => {
    console.log("Current User:", auth.currentUser);
    if (!auth.currentUser) {
      console.error("No user is currently signed in.");
      return;
    }
    const token = await auth.currentUser.getIdToken();
    try {
      const response = await axios.get(
        `http://localhost:9000/api/editor/pending_approval/${uid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send JWT token for authentication
          },
        }
      );
      setpendingReviewWorks(response.data.pendingApprovals);
    } catch (error) {
      console.error("Error fetching pending work:", error);
      throw error;
    }
  };

  // get pending work
  const getAssignedWork = async () => {
    console.log("Current User:", auth.currentUser);
    if (!auth.currentUser) {
      console.error("No user is currently signed in.");
      return;
    }
    const token = await auth.currentUser.getIdToken();
    try {
      const response = await axios.get(
        `http://localhost:9000/api/editor/assignwork/${uid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send JWT token for authentication
          },
        }
      );
      setAssignedWorks(response.data.assignedWork);
    } catch (error) {
      console.error("Error fetching pending work:", error);
      throw error;
    }
    console.log(assignedWorks);
  };

  // get pending work
  const getCompletedWork = async () => {
    console.log("Current User:", auth.currentUser);
    if (!auth.currentUser) {
      console.error("No user is currently signed in.");
      return;
    }
    const token = await auth.currentUser.getIdToken();
    try {
      const response = await axios.get(
        `http://localhost:9000/api/editor/completed_work/${uid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send JWT token for authentication
          },
        }
      );
      setCompletedWorks(response.data.completedWork);
    } catch (error) {
      console.error("Error fetching pending work:", error);
      throw error;
    }
  };

  const fetchYoutuber = async () => {
    const token = await auth.currentUser.getIdToken();

    try {
      const response = await axios.get(
        `http://localhost:9000/api/editor/getYoutuber/${uid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send JWT token for authentication
          },
        }
      );
      setYoutuber(response.data.editorData);
    } catch (error) {
      console.error("Error fetching editor data:", error);
      throw error;
    }
  };


  const handleModalOpen = () => {
    fetchYoutuber();
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
            <a href="/" className="text-lg font-bold text-gray-900">
              VidWize
            </a>
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
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                  <h2 className="text-lg font-semibold">Submit Work</h2>
                  <form className="mt-4">
                  
                  <label className="block mb-2 text-sm font-medium">
                      Select Youtuber:
                    </label>
                    <select
                      name="editorId"
                      className="border border-gray-300 rounded-lg mb-4 w-full"
                    >
                      <option value="">Select Youtuber</option>
                      {youtuber.length > 0 ? (
                        youtuber.map((yt) => (
                          <option
                            key={yt.id}
                            value={JSON.stringify({
                              yt_id: yt.id,
                              yt_name: yt.name,
                            })}
                          >
                            {yt.name}
                          </option>
                        ))
                      ) : (
                        <option disabled>No editors available</option>
                      )}
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
              {assignedWorks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {assignedWorks.map((work, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-md p-4"
                    >
                      <h3 className="font-semibold">{work.channelName}</h3>
                      <p className="text-gray-600">
                        Project Name: {work.projectName}
                      </p>
                      <p className="text-sm text-gray-500">
                        Google Drive Link:{" "}
                        <a
                          href={work.driveLink}
                          className="text-blue-600"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Link
                        </a>
                      </p>
                      <p className="text-sm text-gray-500">
                        Instruction:{" "}
                        {work.instructions || "No instructions provided"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Allotted Date: {work.currentDate}
                      </p>
                      <p className="text-sm text-gray-500">
                        Due Date: {work.dueDate}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No assigned work available.</p>
              )}
            </section>

            {/* Pending For Approval Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Pending For Approval
              </h2>
              {pendingReviewWorks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pendingReviewWorks.map((approval, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-md p-4"
                    >
                      <h3 className="font-semibold">{approval.channelName}</h3>
                      <p className="text-gray-600">
                        Project Name: {approval.projectName}
                      </p>
                      <p className="text-sm text-gray-500">
                        Instructions:{" "}
                        {approval.instructions || "No instructions provided"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Allotted Date: {approval.currentDate}
                      </p>
                      <p className="text-sm text-gray-500">
                        Due Date: {approval.dueDate}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No pending approvals available.</p>
              )}
            </section>

            
            
            
            
            {/* Completed Work Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Completed Work</h2>
              {completedWorks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedWorks.map((work, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-md p-4"
                    >
                      <h3 className="font-semibold">{work.channelName}</h3>
                      <p className="text-gray-600">
                        Project Name: {work.projectName}
                      </p>
                      <p className="text-sm text-gray-500">
                        Completion Date: {work.completionDate}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No completed work available.</p>
              )}
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Editor;
