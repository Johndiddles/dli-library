import React, { useState } from "react";
import AllModules from "../../../components/allModules/allModules.component";

import "./homepage.style.scss";

const Homepage = () => {
  const [levelFilter, setLevelFilter] = useState("");
  const [deptFilter, setDeptFilter] = useState("");

  return (
    <div className="homepage">
      <div className="modules-header">
        <h1>All Modules</h1>

        <div className="modules-filter">
          <div className="modules-filter__form-group">
            <label htmlFor="level" className="label">
              Level:
            </label>
            <select
              onChange={(e) => setLevelFilter(e.target.value)}
              value={levelFilter}
              name="level"
              id="level-filter"
              className="options"
            >
              <option value="">All Levels</option>
              <option value="100">100 Level</option>
              <option value="200">200 Level</option>
              <option value="300">300 Level</option>
              <option value="400">400 Level</option>
              <option value="500">500 Level</option>
              <option value="600">600 Level</option>
              <option value="general">General</option>
            </select>
          </div>

          <div className="modules-filter__form-group">
            <label htmlFor="department" className="label">
              Department:
            </label>
            <select
              onChange={(e) => setDeptFilter(e.target.value)}
              value={deptFilter}
              name="department"
              id="level-filter"
              className="options"
            >
              <option value="">All Departments</option>
              <option value="accounting">Accounting</option>
              <option value="business admin">Business Administration</option>
              <option value="economics">Economics</option>
              <option value="public admin">Public Administration</option>
              <option value="general">General</option>
            </select>
          </div>
        </div>
      </div>

      <AllModules levelFilter={levelFilter} deptFilter={deptFilter} />
    </div>
  );
};

export default Homepage;
