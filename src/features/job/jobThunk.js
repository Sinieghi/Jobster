import authFetch from "../../ustils/authFetch";
import customFetch, { checkFrUnauthorizedResponse } from "../../ustils/axios";
import { clearValues } from "./jobSlice";

export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
  console.log(job, jobId);
  try {
    const response = customFetch.patch(
      `/jobs/${jobId}`,
      job,
      authFetch(thunkAPI)
    );
    thunkAPI.dispatch(clearValues());
    console.log(response.data);
    return (await response).data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

//Deixer esse header comentado para ficar de ref, pois configurei ele direto no file axios
export const createJobThunk = async (job, thunkAPI) => {
  try {
    const response = customFetch.post("/jobs", job, authFetch(thunkAPI));
    thunkAPI.dispatch(clearValues());
    return (await response).data;
  } catch (error) {
    return checkFrUnauthorizedResponse(error, thunkAPI);
  }
};
