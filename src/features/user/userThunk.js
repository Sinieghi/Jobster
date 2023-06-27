import authFetch from "../../ustils/authFetch";
import customFetch from "../../ustils/axios";

export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const response = await customFetch.post(url, user);
    console.log(response);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    console.log(user);
    const response = customFetch.post(url, user);

    return (await response).data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const updateUserThunk = async (url, user, thunkAPI) => {
  try {
    const response = await customFetch.patch(url, user, authFetch(thunkAPI));
    console.log(response.data);
    return response.data;
  } catch (error) {
    return checkFrUnauthorizedResponse(error, thunkAPI);
  }
};
