import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [channelname, setChannelname] = useState("");
  const [channeluid, setChanneluid] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [data, setData] = useState(null);
 
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      navigate(storedUser.role === "Youtuber" ? "/creator" : "/editor");
    }
  }, [navigate]);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (password !== confirmpassword) {
      alert("Passwords do not match!");
      return;
    }
    if(role === "Youtuber" ) {
        axios.post("http://localhost:9000/api/auth/signupasyoutuber", {
            name: name,
            email: email,
            password: password,
            channelname: channelname,
            channeluid: channeluid,
        })
        .then((res) => {
            console.log(res.data);
            setData(res.data);
            alert("Signup successful!");
            navigate("/login");
        })
        .catch((err) => {
            console.error(err);
        });
    }

    if (role === "Editor") {
        axios.post("http://localhost:9000/api/auth/signupaseditor", {
            name: name,
            email: email,
            password: password,
        })
        .then((res) => {
            console.log(res.data);
            setData(res.data);
            alert("Signup successful!");
            navigate("/login");
        })
        .catch((err) => {
            console.error(err);
        });
    }

    console.log({ name, email, password, confirmpassword, role, channelname, channeluid });
  };

  // Handle input change
  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmpassword(value);
        break;
      case "role":
        setRole(value);
        break;
      case "channelname":
        setChannelname(value);
        break;
      case "channeluid":
        setChanneluid(value);
        break;
      default:
        break;
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
              <a href="/login" className="text-gray-700 hover:text-blue-600 cursor-pointer">Login</a>
            </div>
          </nav>
        </header>

        {/* Form */}
        <div className="flex justify-center mt-10">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-xl font-bold text-center mb-4">Registration Form</h1>
            <form onSubmit={handleSubmit}>
              {/* Role Dropdown */}
              <div className="mb-4">
                <label htmlFor="role" className="block text-gray-700">Role:</label>
                <select id="role" name="role" value={role} onChange={handleChange} className="w-full p-2 border rounded" required>
                  <option value="">Select...</option>
                  <option value="Editor">Editor</option>
                  <option value="Youtuber">Youtuber</option>
                </select>
              </div>

              {/* Show Channel Name & UID if Youtuber is selected */}
              {role === "Youtuber" && (
                <div>
                  <div className="mb-4">
                    <label htmlFor="channelname" className="block text-gray-700">Channel Name:</label>
                    <input type="text" id="channelname" name="channelname" value={channelname} onChange={handleChange} className="w-full p-2 border rounded" required />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="channeluid" className="block text-gray-700">Channel UID:</label>
                    <input type="text" id="channeluid" name="channeluid" value={channeluid} onChange={handleChange} className="w-full p-2 border rounded" required />
                  </div>
                </div>
              )}

              {/* Name Field */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">Name:</label>
                <input type="text" id="name" name="name" value={name} onChange={handleChange} className="w-full p-2 border rounded" required />
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email:</label>
                <input type="email" id="email" name="email" value={email} onChange={handleChange} className="w-full p-2 border rounded" required />
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={handleChange} className="w-full p-2 border rounded" required />
              </div>

              {/* Confirm Password Field */}
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" value={confirmpassword} onChange={handleChange} className="w-full p-2 border rounded" required />
              </div>

              {/* Submit Button */}
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">SignUp</button>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Signup;
