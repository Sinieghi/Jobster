import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {toast} from 'react-toastify'
import {getFromLocalStorage} from '../../ustils/localStorage'
import { createJobThunk, editJobThunk } from './jobThunk'

const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
}

export const createJob = createAsyncThunk('job/creatJob', createJobThunk)
export const editJob = createAsyncThunk('job/editJob', editJobThunk)


const jobSlice = createSlice({
    name:'job',
    initialState,
    reducers:{
        handleChange: (state, {payload:{name, value}}) =>{
            state[name] = value
        },
        clearValues:()=>{
            return {
                ...initialState, jobLocation: getFromLocalStorage()?.location || ''
            }
        },
        setEditJob: (state,{payload})=>{
            return {...state, isEditing:true, ...payload}
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(createJob.pending, (state)=>{
            state.isLoading = true
        }).addCase(createJob.fulfilled, (state)=>{
            state.isLoading = false
            
            toast.success('job created')

        }).addCase(createJob.rejected, (state)=>{
            state.isLoading = false
            toast.error('fail on creat new job')
        }).addCase(editJob.pending, (state)=>{
            state.isLoading = true
        }).addCase(editJob.fulfilled, (state, {payload})=>{
            state.isLoading = false
            toast.success('edited')
        }).addCase(editJob.rejected, (state, {payload})=>{
            state.isLoading = false
            toast.error('fail on edit')
        })
    }
    
})
export const {handleChange, clearValues, setEditJob} = jobSlice.actions
export default jobSlice.reducer