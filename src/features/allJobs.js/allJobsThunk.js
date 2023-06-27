import authFetch from "../../ustils/authFetch";
import customFetch from "../../ustils/axios";
import { clearValues } from "../job/jobSlice";
import { logoutUser } from "../user/userSlice";
import {
  clearAllJobSstate,
  getAllJobs,
  hideLoading,
  shwLoading,
} from "./allJobsSlice";
let url = `/jobs`;

export const deleteJobThunk = async (jobId, thunkAPI) => {
  thunkAPI.dispatch(shwLoading());
  try {
    const response = await customFetch.delete(
      `${url}/${jobId}`,
      authFetch(thunkAPI)
    );
    thunkAPI.dispatch(getAllJobs());
    return response.data;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return checkFrUnauthorizedResponse(error, thunkAPI);
  }
};

export const getAllJobsThunk = async (_, thunkAPI) => {
  console.log(thunkAPI);
  const { page, search, searchStatus, searchType, sort } =
    thunkAPI.getState().allJob;
  let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
  if (search) {
    url = url + `&search=${search}`;
  }
  console.log(url);
  try {
    const response = await customFetch.get(url, authFetch(thunkAPI));
    return response.data;
  } catch (error) {
    return checkFrUnauthorizedResponse(error, thunkAPI);
  }
};

export const showStatsThunk = async (_, thunkAPI) => {
  try {
    const response = await customFetch.get(`${url}/stats`, authFetch(thunkAPI));
    console.log(response.data);
    return response.data;
  } catch (error) {
    return checkFrUnauthorizedResponse(error, thunkAPI);
  }
};

export const clearStoreThunk = async (message, thunkAPI) => {
  try {
    thunkAPI.dispatch(logoutUser(message));
    thunkAPI.dispatch(clearAllJobSstate());
    thunkAPI.dispatch(clearValues());
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
