import axios from "axios";
import { getFromLocalStorage } from "./localStorage";
import { clearStore } from "../features/allJobs.js/allJobsSlice";

const customFetch = axios.create({
  baseURL: "https://jobify-prod.herokuapp.com/api/v1/toolkit",
});

// esse aprouch do interceptors é para cobrir o Authorizarion, onde eu nao precise autorizar em todos os file para ter o token, com isso a customFetch ja faz automatico

// customFetch.interceptors.request.use((config) => {
//   const user = getUserFromLocalStorage();
//   if (user) {
//     config.headers["Authorization"] = `Bearer ${user.token}`;
//   }
//   return config;
// });

export const checkFrUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore());
    return toast.error("not authorized");
  }
  return console.log(error);
};

export default customFetch;
