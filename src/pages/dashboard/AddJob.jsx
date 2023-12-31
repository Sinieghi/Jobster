import React, { useEffect } from 'react'
import { FormRow, FormRowSelect } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearValues, createJob, editJob, handleChange } from '../../features/job/jobSlice';
const AddJob = () => {
  const {isLoading,position,company,jobLocation,
    jobType,jobTypeOptions,statusOptions,status,
    isEditing,editJobId,job} = useSelector((store)=>store.job)
    const {user} = useSelector((store)=>store.user)
    const dispatch = useDispatch()

    const handleSubmit = (e)=>{
      e.preventDefault()

      if(!position || !company || !jobLocation){
        toast.error('fill out all fields')
        return
      }
      if(isEditing){
        dispatch(editJob({
            jobId:editJobId,
            job:{...job, position,company,jobLocation,jobType,status}
          }))
          return
      }

      dispatch(createJob({position,company,jobLocation,jobType,status}))
    }

    const handleJobInput = (e)=>{
      const name = e.target.name
      const value = e.target.value
      dispatch(handleChange({value,name}))

      
    }

    useEffect(()=>{
      if(!isEditing){
      dispatch(handleChange({
        name:'jobLocation',
        value: user.location
      }))}
    },[])

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? 'edit fob' : 'add job'}</h3>
        <div className="form-center">
          <FormRow type='text' name='position' value={position} handleChange={handleJobInput}/>
          <FormRow type='text' name='company' value={company} handleChange={handleJobInput}/>
          <FormRow type='text' labelText='job location' name='jobLocation' value={jobLocation} handleChange={handleJobInput}/>
          <FormRowSelect name='status' value={status} handleChange={handleJobInput} list={statusOptions}/>
          <FormRowSelect name='jobType' labelText='job type' value={jobType} handleChange={handleJobInput} list={jobTypeOptions}/>
        <div className="btn-container">
          <button type='button' className='btn btn-block clear-btn' onClick={()=>dispatch(clearValues())}>clear</button>
        </div>
         <div className="btn-container">
          {!isEditing ? <button type='submit' className='btn btn-block clear-btn' onClick={handleSubmit} disabled={isLoading}>submit</button>
          : 
          <button type='submit' className='btn btn-block clear-btn' onClick={handleSubmit} disabled={isLoading}>edit</button>
          }
          
        </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob