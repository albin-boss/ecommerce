import React from 'react';
import './register.css';

function Register() {
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
                  <h3 className="mb-5 text-uppercase fw-bold">
                     Registration
                  </h3>
                  
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <input
                        type="text"
                        id="form1"
                        placeholder="First Name"
                        className="form-control form-control-lg"
                      />
                    </div>
                    <div className="col-md-6 mb-4">
                      <input
                        type="text"
                        id="form2"
                        placeholder="Last Name"
                        className="form-control form-control-lg"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <input
                      type="text"
                      id="form3"
                      placeholder="Birthday"
                      className="form-control form-control-lg"
                    />
                  </div>

                  <div className="d-md-flex justify-content-start align-items-center mb-4">
                    <h6 className="fw-bold mb-0 me-4">Gender:</h6>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="female"
                        value="female"
                      />
                      <label className="form-check-label" htmlFor="female">
                        Female
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="male"
                        value="male"
                      />
                      <label className="form-check-label" htmlFor="male">
                        Male
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="other"
                        value="other"
                      />
                      <label className="form-check-label" htmlFor="other">
                        Other
                      </label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <select className="form-select form-select-lg">
                        <option defaultValue>State</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-4">
                      <select className="form-select form-select-lg">
                        <option defaultValue>City</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-4">
                    <input
                      type="text"
                      id="form4"
                      placeholder="Pincode"
                      className="form-control form-control-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      id="form5"
                      placeholder="Address"
                      className="form-control form-control-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="int"
                      id="form5"
                      placeholder="phone"
                      className="form-control form-control-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      id="form6"
                      placeholder="Email ID"
                      className="form-control form-control-lg"
                    />
                  </div>

                  <div className="d-flex justify-content-end pt-3">
                    <button className="btn btn-light btn-lg">Reset all</button>
                    <button className="btn btn-warning btn-lg ms-2">
                      Submit form
                    </button>
                  </div>
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
