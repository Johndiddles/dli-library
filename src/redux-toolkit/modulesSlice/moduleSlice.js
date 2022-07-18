import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_BASE_URL_DEVELOPMENT
    : process.env.REACT_APP_BASE_URL_PRODUCTION;

const initialState = {
  status: "idle",
  allModules: [],
  addStatus: "idle",
  error: "",
};

export const fetchAllModules = createAsyncThunk(
  "modules/allModules",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/modules`);
      //   console.log(response.data);
      //   console.log(response);
      return response.data;
    } catch (error) {
      //   console.log(error);
      if (error.message) {
        initialState.error = error.message;
        toast.error(error.message);
      }
      return error;
    }
  }
);

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setStatus: {
      reducer(state, action) {
        state.status = action.payload;
      },
      prepare(status) {
        return {
          payload: {
            status,
          },
        };
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllModules.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchAllModules.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allModules = action.payload;
        // console.log(action.payload);
      })
      .addCase(fetchAllModules.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const getAllModules = (state) => state.modules.allModules;
export const getStatus = (state) => state.modules.status;
export const getError = (state) => state.modules.error;

export const { setStatus } = modulesSlice.actions;

export default modulesSlice.reducer;
