import React, { useState, useEffect } from "react";
import loader from "../../assets/loader.gif";
import ReactDOM from "react-dom";

import "./SingleModuleModal.style.scss";

const SingleModuleModal = ({ module, closeModal }) => {
  const baseUrl = window.location.href.includes("localhost")
    ? process.env.REACT_APP_BASE_URL_DEVELOPMENT
    : process.env.REACT_APP_BASE_URL_PRODUCTION;
  console.log(module);
  const [moduleData, setModuleData] = useState(null);
  const date = module.date.split("T")[0];

  useEffect(() => {
    fetch(`${baseUrl}/modules/${module.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setModuleData(data[0]);
      });
  }, [module, baseUrl]);

  return ReactDOM.createPortal(
    <div className="singleModuleModal-container">
      <div className="singleModuleModalAround" onClick={closeModal}></div>

      <div className="singleModuleModal">
        {!moduleData ? (
          <div className="loader">
            <img src={loader} alt="loading" />
          </div>
        ) : (
          <div className="singleModuleModal__innerContainer">
            <div className="singleModuleModal__header">
              <h2>{module.courseCode}</h2>
              <button className="close-btn" onClick={closeModal}>
                X
              </button>
            </div>

            <div className="singleModuleModal__content">
              <div className="singleModuleModal__content-container">
                <div className="singleModuleModal__content__item">
                  <span>Course Title: </span> {module.courseTitle}
                </div>
                <div className="singleModuleModal__content__item">
                  <span>Department: </span> {module.department}
                </div>
                <div className="singleModuleModal__content__item">
                  <span>Date Uploaded:</span> {date}
                </div>
                <div className="singleModuleModal__content__item level">
                  <span>Level:</span> {module.level}
                </div>
              </div>

              <a
                href={moduleData.url}
                download
                className="singleModuleModal__content__download"
              >
                Download
              </a>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.getElementById("modals")
  );
};

export default SingleModuleModal;
