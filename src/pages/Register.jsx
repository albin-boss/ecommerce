import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "./register.css";

function Register() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!formData.name || !formData.email || !formData.phoneNumber || !formData.password) {
      alert("Please fill in all required fields!");
      return;
    }

    try {
      await axios.post("http://localhost:8005/api/employees", {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        password: formData.password,
      });

      alert("Registration successful! Redirecting to login...");
      navigate("/login"); // Redirect to login page after success
    } catch (error) {
      console.error("Error registering:", error);
      alert("Registration failed!");
    }
  };

  return (
    <div className="container-fluid bg-dak">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card my-4">
            <div className="row no-gutters">
              <div className="col-md-6 d-none d-md-block">
                <img 
                  src="https://pbs.twimg.com/ext_tw_video_thumb/1847649102181388288/pu/img/icHTcvUQRLn7rv-W.jpg"
                  alt="Sample"
                  className="card-img rounded-start"
                />
              </div>
              <div className="col-md-6">
                <div className="card-body text-black d-flex flex-column justify-content-center">
                  <h3 className="mb-5 text-uppercase fw-bold">Registration</h3>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        className="form-control form-control-lg"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email ID"
                        className="form-control form-control-lg"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        className="form-control form-control-lg"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        className="form-control form-control-lg"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-4">
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="form-control form-control-lg"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="form-control form-control-lg"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="d-flex justify-content-end pt-3">
                      <button
                        type="reset"
                        className="btn btn-light btn-lg"
                        onClick={() =>
                          setFormData({
                            name: "",
                            email: "",
                            phoneNumber: "",
                            address: "",
                            password: "",
                            confirmPassword: "",
                          })
                        }
                      >
                        Reset all
                      </button>
                      <button type="submit" className="btn btn-warning btn-lg ms-2">
                        Submit form
                      </button>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </div>
  );
}

export default Register;
