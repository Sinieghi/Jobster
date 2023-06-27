import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  clearStoreThunk,
  deleteJobThunk,
  getAllJobsThunk,
  showStatsThunk,
} from "./allJobsThunk";

//qual é a desse aproach dos 2 initial aqui? Basicamente o fato de ter um spread ali no initial state faz com que na hora de dar resetar
// as config para o defaul, coisa que o botão clear faz voce não precisa reescrever todo o initial state  ao atribuir la no reducers do clearFilters
const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllJobs = createAsyncThunk("allJob/getJobs", getAllJobsThunk);
export const deleteJob = createAsyncThunk("job/deleteJob", deleteJobThunk);
export const showStats = createAsyncThunk("allJob/showStats", showStatsThunk);
export const clearStore = createAsyncThunk("user/clearStore", clearStoreThunk);

const allJobSlice = createSlice({
  name: "allJob",
  initialState,
  reducers: {
    shwLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    clearFilter: (state) => {
      return { ...state, ...initialFiltersState };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    clearAllJobSstate: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const { jobs, numOfPages, totalJobs } = payload;
        state.jobs = jobs;
        state.numOfPages = numOfPages;
        state.totalJobs = totalJobs;
      })
      .addCase(getAllJobs.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.log(payload);
      })
      .addCase(showStats.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(showStats.fulfilled, (states, { payload }) => {
        states.isLoading = false;
        states.stats = payload.defaultStats;
        states.monthlyApplications = payload.monthlyApplications;
      })
      .addCase(showStats.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.error(payload);
      })
      .addCase(clearStore.rejected, (state, { payload }) => {
        console.log(payload);
      });
  },
});

export const {
  hideLoading,
  shwLoading,
  handleChange,
  clearFilter,
  changePage,
  clearAllJobSstate,
} = allJobSlice.actions;

export default allJobSlice.reducer;
