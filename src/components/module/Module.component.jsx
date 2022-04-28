import React, { useState } from "react";

import SingleModuleModal from "../singleModuleModal/SingleModuleModal.component";
import "./module.style.scss";

const Module = ({ module }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="module">
      <div className="module__description">
        <p className="module__code">
          <span>Course Code: </span> {module.courseCode}
        </p>
        <p className="module__title">
          <span>Course Title: </span> {module.courseTitle}
        </p>
        <p className="module__title">
          <span>Level: </span> {module.level}
        </p>
      </div>

      <button className="module__download" onClick={toggleModal}>
        View Details
      </button>
      {isOpen && <SingleModuleModal module={module} closeModal={toggleModal} />}
    </div>
  );
};

export default Module;
