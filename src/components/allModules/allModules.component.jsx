import React, { useState, useEffect } from "react";
import Module from "../module/Module.component";

const AllModules = ({ levelFilter, deptFilter }) => {
  const baseUrl = window.location.href.includes("localhost")
    ? process.env.REACT_APP_BASE_URL_DEVELOPMENT
    : process.env.REACT_APP_BASE_URL_PRODUCTION;
  console.log(baseUrl);
  console.log("levelFilter", levelFilter);
  const [allModules, setAllModules] = useState([]);
  const filteredModules = allModules.filter((module) => {
    return (
      module.level.includes(levelFilter) &&
      module.department.toLowerCase().includes(deptFilter.toLowerCase())
    );
  });
  useEffect(() => {
    fetch(`${baseUrl}/modules`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAllModules(data);
      });
  }, [baseUrl]);
  return (
    <div className="homepage__modules">
      {filteredModules &&
        filteredModules
          .sort((a, b) => (a.level > b.level ? 1 : -1))
          .map((module) => <Module key={module._id} module={module} />)}
    </div>
  );
};

export default AllModules;
