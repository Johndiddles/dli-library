import React, { useEffect } from "react";
import Module from "../module/Module.component";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllModules,
  getStatus,
  getAllModules,
  getError,
} from "../../redux-toolkit/modulesSlice/moduleSlice";

import LoadingState from "../Loader/Loader.component";
import { toast } from "react-toastify";

const AllModules = ({ levelFilter, deptFilter }) => {
  const dispatch = useDispatch();
  const modules = useSelector(getAllModules);
  const status = useSelector(getStatus);
  const fetchError = useSelector(getError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllModules());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (fetchError !== "") {
      toast.error(fetchError);
    }
  });

  // console.log("status: ", status);
  // console.log("modules: ", modules);
  // console.log("error: ", fetchError);

  // console.log("levelFilter", levelFilter);
  const filteredModules = modules?.filter((module) => {
    return (
      module.level.includes(levelFilter) &&
      module.department.toLowerCase().includes(deptFilter.toLowerCase())
    );
  });

  return (
    <div className="homepage__modules">
      {status === "idle" || status === "pending" ? (
        <LoadingState />
      ) : (
        filteredModules &&
        filteredModules
          .sort((a, b) => (a.level > b.level ? 1 : -1))
          .map((module) => <Module key={module._id} module={module} />)
      )}
    </div>
  );
};

export default AllModules;
