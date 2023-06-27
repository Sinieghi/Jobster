import React, { useEffect } from 'react'
import Job from './job'
import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../assets/wrappers/JobsContainer'
import Loading from '../components/Loading'
import { getAllJobs } from '../features/allJobs.js/allJobsSlice'
import PageBtnContainer from './PageBtnContainer'

const JobsContainer = () => {
  const {jobs, isLoading, totalJobs, numOfPages, page, searchStatus, searchType, sort, search} = useSelector((store)=>store.allJob)
  const dispatch = useDispatch()

    useEffect(()=>{
    dispatch(getAllJobs())
  },[page, searchStatus, searchType, sort, search])


  
  if(isLoading){
   return <Loading center>
      <h2>Loading...</h2>
    </Loading>
  }
  if(!jobs){
    return <h1>no jobs</h1>
  }


  
  return (
    <Wrapper>
      <h5>{totalJobs} job{jobs.length > 1 && 's'}</h5>
      <div className="jobs">
        {jobs.map((job)=>{   
          return <Job key={job?._id} {...job}/>
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer/>}
    </Wrapper>
  )
}

export default JobsContainer