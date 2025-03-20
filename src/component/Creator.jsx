import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signOut } from "../Firebase/firebaseconfige";
import Footer from "./Footer";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";

const Creator = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddEditorModalOpen, setIsAddEditorModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [pendingWorks, setPendingWorks] = useState([]);
  const [completedWorks, setCompletedWorks] = useState([]);
  const [pendingReviewWorks, setPendingReviewWorks] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const uid = user.uid;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User signed in:", user);
        getPendingReviewWork();
        getPendingWork();
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

  const [editor, setEditor] = useState({});

  const fetchEditor = async () => {
    const token = await auth.currentUser.getIdToken();

    try {
      const response = await axios.get(
        `http://localhost:9000/api/youtuber/getEditor/${uid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send JWT token for authentication
          },
        }
      );
      setEditor(response.data.editorData);
    } catch (error) {
      console.error("Error fetching editor data:", error);
      throw error;
    }
  };

  // get pending work
  const getPendingWork = async () => {
    console.log("Current User:", auth.currentUser);
    if (!auth.currentUser) {
      console.error("No user is currently signed in.");
      return;
    }
    const token = await auth.currentUser.getIdToken();
    try {
      const response = await axios.get(
        `http://localhost:9000/api/youtuber/pending_work/${uid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send JWT token for authentication
          },
        }
      );
      setPendingWorks(response.data.pendingWork);
    } catch (error) {
      console.error("Error fetching pending work:", error);
      throw error;
    }
  };

  // get pending review work
  const getPendingReviewWork = async () => {
    console.log("Current User:", auth.currentUser);
    if (!auth.currentUser) {
      console.error("No user is currently signed in.");
      return;
    }
    const token = await auth.currentUser.getIdToken();
    try {
      const response = await axios.get(
        `http://localhost:9000/api/youtuber/pending_review/${uid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send JWT token for authentication
          },
        }
      );
      setPendingReviewWorks(response.data.pendingReviews);
    } catch (error) {
      console.error("Error fetching pending work:", error);
      throw error;
    }
  };

  // get completed work
  const getCompletedWork = async () => {
    console.log("Current User:", auth.currentUser);
    if (!auth.currentUser) {
      console.error("No user is currently signed in.");
      return;
    }
    const token = await auth.currentUser.getIdToken();
    try {
      const response = await axios.get(
        `http://localhost:9000/api/youtuber/completed_work/${uid}`,
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

  const handleAddEditor = async (event) => {
    event.preventDefault();
    if (!auth.currentUser) {
      console.error("No user is currently signed in.");
      return;
    }

    const token = await auth.currentUser.getIdToken();

    const editorEmail = event.target.elements.editorEmail.value;
    try {
      const response = await axios.post(
        `http://localhost:9000/api/youtuber/add-editor/${uid}`,
        {
          editorEmail: editorEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Editor added successfully!");
      closeModalAddEditor();
    } catch (error) {
      console.error("Error adding editor:", error);
      alert("Failed to add editor. Please try again.");
    }
  };

  const handleassignWork = async (event) => {
    event.preventDefault();
    if (!auth.currentUser) {
      console.error("No user is currently signed in.");
      return;
    }

    const {
      editorId,
      projectName,
      driveLink,
      instructions,
      currentDate,
      dueDate,
    } = event.target.elements;
    const editornameandid = JSON.parse(editorId.value);
    const token = await auth.currentUser.getIdToken();
    console.log(
      editornameandid.ed_id,
      editornameandid.ed_name,
      projectName.value,
      driveLink.value,
      instructions.value,
      currentDate.value,
      dueDate.value
    );
    console.log(token);
    try {
      const response = await axios.post(
        `http://localhost:9000/api/youtuber/assign_work/${uid}`,
        {
          editorId: editornameandid.ed_id,
          editorName: editornameandid.ed_name,
          projectName: projectName.value,
          driveLink: driveLink.value,
          instructions: instructions.value,
          currentDate: currentDate.value,
          dueDate: dueDate.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Work assigned successfully!");
      closeModalAssign();
    } catch (error) {
      console.error("Error assigning work:", error);
      alert("Failed to assign work. Please try again.");
    }
  };

  const handleReject = async (event, projectId) => {
    event.preventDefault();
    const token = await auth.currentUser.getIdToken();
    console.log(uid, projectId);

    try {
      const response = await axios.put(
        `http://localhost:9000/api/youtuber/review_reject/${uid}`,
        {
          projectId: projectId,
          instructions: event.target.elements.feedback.value, // Mapping frontend "feedback" to backend "reason"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Work rejected successfully!");
      setIsRejectModalOpen(false);
    } catch (error) {
      console.error("Error rejecting work:", error);
      alert("Failed to reject work. Please try again.");
    }
  };

  const [OauthVerifed, setOauthVerifed] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("oauth_success")) {
      setOauthVerifed(true);
      alert("OAuth authentication successful! 🎉");
      // Remove query param from the URL to prevent showing alert again on refresh
      navigate("/creator", { replace: true });
    }
  }, [navigate]);


  const getAuthUrl = async () => {
    const token = await auth.currentUser.getIdToken();
    try {
      const response = await axios.get(
        `http://localhost:9000/api/auth/getOauthUrl/${uid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.href = response.data.authUrl;
    } catch (error) {
      console.error("Error fetching auth URL:", error);
    }
  };

  const openModalAssign = () => {
    setIsModalOpen(true);
    fetchEditor();
  };
  const openModalAddEditor = () => {
    setIsAddEditorModalOpen(true);
  };

  const closeModalAssign = () => {
    setIsModalOpen(false);
  };

  const closeModalAddEditor = () => {
    setIsAddEditorModalOpen(false);
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
          <div className="mb-6 flex justify-between items-center ">
            <h1 className="text-3xl font-bold ">Creator Dashboard</h1>
            <div>
              {!OauthVerifed && (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  onClick={getAuthUrl}
                >
                  Verify OAuth
                </button>
              )}
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mx-10"
                onClick={openModalAssign}
              >
                + Assign Work
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition "
                onClick={openModalAddEditor}
              >
                + Add Editor
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Assign Work Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                  <h2 className="text-lg font-semibold">Assign Work</h2>
                  <form className="mt-4" onSubmit={handleassignWork}>
                    <label className="block mb-2 text-sm font-medium">
                      Select Editor:
                    </label>
                    <select
                      name="editorId"
                      className="border border-gray-300 rounded-lg mb-4 w-full"
                    >
                      <option value="">Select Editor</option>
                      {editor.length > 0 ? (
                        editor.map((ed) => (
                          <option
                            key={ed.id}
                            value={JSON.stringify({
                              ed_id: ed.id,
                              ed_name: ed.name,
                            })}
                          >
                            {ed.name}
                          </option>
                        ))
                      ) : (
                        <option disabled>No editors available</option>
                      )}
                    </select>

                    <label className="block mb-2 text-sm font-medium">
                      Project Name:
                    </label>
                    <input
                      type="text"
                      className="border border-gray-300 rounded-lg mb-4 w-full"
                      placeholder="projectName"
                      name="projectName"
                      required
                    />

                    <label className="block mb-2 text-sm font-medium">
                      Google Drive Link:
                    </label>
                    <input
                      type="url"
                      name="driveLink"
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
                      name="instructions"
                      placeholder="Any instructions..."
                    ></textarea>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium">
                          Current Date:
                        </label>
                        <input
                          type="date"
                          name="currentDate"
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
                          name="dueDate"
                          className="border border-gray-300 rounded-lg w-full"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                        onClick={closeModalAssign}
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
            {/* Add Editor Modal */}
            {isAddEditorModalOpen && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                  <h2 className="text-lg font-semibold">Add Editor</h2>
                  <form className="mt-4" onSubmit={handleAddEditor}>
                    <label className="block mb-2 text-sm font-medium">
                      Editor Email:
                    </label>
                    <input
                      type="email"
                      name="editorEmail"
                      className="border border-gray-300 rounded-lg mb-4 w-full"
                      placeholder="Editor Email"
                      required
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                        onClick={closeModalAddEditor}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        Add Editor
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Pending Review Work Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Pending Review Work
              </h2>
              {pendingReviewWorks.length === 0 ? (
                <p className="text-gray-500">No pending reviews available.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pendingReviewWorks.map((work) => (
                    <div
                      key={work.id}
                      className="bg-white rounded-lg shadow-md p-4"
                    >
                      <h3 className="font-semibold">{work.projectName}</h3>
                      <p className="text-gray-600">{work.editorName}</p>
                      <p className="text-sm text-gray-500">
                        <strong>Instructions:</strong>{" "}
                        {work.instructions || "N/A"}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Allotted Date:</strong> {work.allottedDate}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Due Date:</strong> {work.dueDate}
                      </p>
                      <div className="mt-4 flex space-x-2">
                        <a
                          href={work.preview}
                          target="_blank"
                          className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition"
                        >
                          Preview
                        </a>
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
                          onClick={() => setIsFeedbackModalOpen(true)}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
                          onClick={() => {
                            setSelectedProjectId(work.id); // Store project ID for rejection
                            setIsRejectModalOpen(true);
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {isFeedbackModalOpen && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                  <h2 className="text-lg font-semibold">Approval Feedback</h2>
                  <form className="mt-4">
                    <label className="block mb-2 text-sm font-medium">
                      Feedback:
                    </label>
                    <textarea
                      className="border border-gray-300 rounded-lg mb-4 w-full"
                      rows="3"
                      placeholder="Provide feedback..."
                    ></textarea>

                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                        onClick={() => setIsFeedbackModalOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
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
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                  <h2 className="text-lg font-semibold">Rejection Feedback</h2>
                  <form
                    className="mt-4"
                    onSubmit={(event) => handleReject(event, selectedProjectId)}
                  >
                    <label className="block mb-2 text-sm font-medium">
                      Feedback:
                    </label>
                    <textarea
                      className="border border-gray-300 rounded-lg mb-4 w-full"
                      rows="3"
                      placeholder="Explain reasons for rejection..."
                      name="feedback"
                    ></textarea>

                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                        onClick={() => setIsRejectModalOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        Confirm Reject
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Pending Review */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Pending Work</h2>
              {pendingWorks.length === 0 ? (
                <p className="text-gray-500">
                  No pending review work available.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pendingWorks.map((work) => (
                    <div
                      key={work.id}
                      className="bg-white rounded-lg shadow-md p-4"
                    >
                      <h3 className="font-semibold">{work.projectName}</h3>
                      <p className="text-sm text-gray-500">
                        <strong>Editor:</strong> {work.editorName}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Instructions:</strong>{" "}
                        {work.instructions || "N/A"}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Allotted Date:</strong> {work.currentDate}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Due Date:</strong> {work.dueDate}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Google Drive Link:</strong>{" "}
                        <a
                          href={work.driveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Link
                        </a>
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Completed Work Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Completed Work</h2>
              {completedWorks.length === 0 ? (
                <p className="text-gray-500">No completed work available.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedWorks.map((work) => (
                    <div
                      key={work.id}
                      className="bg-white rounded-lg shadow-md p-4"
                    >
                      <h3 className="font-semibold">{work.videoTitle}</h3>
                      <p className="text-sm text-gray-500">{work.editorName}</p>
                      <p className="text-sm text-gray-500">
                        <strong>Completion Date:</strong> {work.completionDate}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Video Link:</strong>{" "}
                        <a
                          href={work.videoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Watch Video
                        </a>
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Creator;
