import axios from "axios";
import React, { useRef, useState } from "react";
import "./dashboard.styles.scss";

const Dashboard = () => {
  const baseUrl = window.location.href.includes("localhost")
    ? process.env.REACT_APP_BASE_URL_DEVELOPMENT
    : process.env.REACT_APP_BASE_URL_PRODUCTION;
  const [courseCode, setCourseCode] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const urlRef = useRef(null);

  const addModule = (e) => {
    e.preventDefault();
    const token = localStorage.token;
    axios
      .post(
        `${baseUrl}/modules/add`,
        {
          courseCode,
          courseTitle,
          level,
          department,
          url: urlRef.current,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        if (response.status === 201) {
          alert("Module added successfully");
          setCourseCode("");
          setCourseTitle("");
          setLevel("");
          urlRef.current = null;
        }
      })
      .catch(function (error) {
        alert("Error adding module");
        console.log(error);
      });
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="dashboard-form">
        <p className="dashboard-form__header">Add modules</p>
        <form>
          <div className="form-group">
            <label className="label" htmlFor="courseCode">
              Course Code
            </label>
            <input
              name="courseCode"
              type="text"
              className="input"
              id="courseCode"
              placeholder="Course Code"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="courseTitle">
              Course Title
            </label>
            <input
              name="courseTitle"
              type="text"
              className="input"
              id="courseTitle"
              placeholder="Course Title"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="department">
              Department
            </label>
            <select
              name="department"
              type="text"
              className="input"
              id="department"
              placeholder="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">Select Department</option>
              <option value="accounting">Accounting</option>
              <option value="business administration">Business Admin</option>
              <option value="public administration">Public Admin</option>
              <option value="economics">Economics</option>
              <option value="general">General</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label" htmlFor="level">
              Level
            </label>
            <select
              name="level"
              type="text"
              className="input"
              id="level"
              placeholder="Level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="">Select Level</option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
              <option value="500">500</option>
              <option value="600">600</option>
              <option value="general">General</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label" htmlFor="url">
              File Url
            </label>
            <input
              name="url"
              type="file"
              className="input"
              id="url"
              placeholder="File Url"
              onChange={(e) => {
                const file = e.target.files[0];
                function getBase64(file) {
                  return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = (error) => reject(error);
                  });
                }

                getBase64(file).then((data) => {
                  urlRef.current = data;
                });
              }}
            />
          </div>
          <div className="form-group">
            <button className="button" onClick={addModule}>
              Add Module
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
