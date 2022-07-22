import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_BASE_URL_DEVELOPMENT
    : process.env.REACT_APP_BASE_URL_PRODUCTION;

const token = localStorage.token;

const initialState = {
  status: "idle",
  user: {},
  role: "",
  verifyStatus: "idle",
  isAuth: false,
  error: "",
};

export const userLogin = createAsyncThunk("user/login", async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/login`, data);
    // console.log(response);
    return response.data;
  } catch (error) {
    // console.log(error);
    return error;
  }
});

export const verifyUser = createAsyncThunk("user/verify", async () => {
  if (!token) {
    return {
      data: {
        message: "denied",
      },
    };
  } else {
    try {
      const response = await axios.post(
        `${BASE_URL}/user/verify`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(response);
      return response.data;
    } catch (error) {
      // console.log(error);
      return error;
    }
  }
});

const userSlice = createSlice({
  name: "user",
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
      .addCase(userLogin.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        if (action.payload?.code === "ERR_BAD_REQUEST") {
          // console.log(action.payload?.response?.data?.data?.message);
          alert(action.payload?.response?.data?.data?.message);
          state.status = "failed";
        } else if (action.payload?.data?.status === "success") {
          state.status = "succeeded";
          localStorage.setItem("token", action.payload?.data?.token);
          alert("logged in successfully");
          state.isAuth = true;
          state.user = action.payload?.data?.user;
        } else {
          alert("An error occured");
        }
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(verifyUser.pending, (state, action) => {
        state.verifyStatus = "pending";
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        if (
          action.payload?.code === "ERR_BAD_REQUEST" ||
          action.payload?.response?.status === 403 ||
          action.payload?.data?.message === "denied"
        ) {
          state.verifyStatus = "failed";
          state.isAuth = false;
          // localStorage.clear();
        } else if (action.payload?.message === "successfully verified user") {
          state.verifyStatus = "succeeded";
          state.isAuth = true;
          state.user = action.payload?.user;
        }
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.verifyStatus = "failed";
        state.isAuth = false;
      });
  },
});

export const getLoginStatus = (state) => state.user.status;
export const getUserDetails = (state) => state.user.user;
export const getVerifiedStatus = (state) => state.user.verifyStatus;
export const getIsAuth = (state) => state.user.isAuth;

export const { setStatus } = userSlice.actions;

export default userSlice.reducer;
