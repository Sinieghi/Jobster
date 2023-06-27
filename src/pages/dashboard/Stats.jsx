import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { showStats } from '../../features/allJobs.js/allJobsSlice'
import StatsContainer from '../../components/StatsContainer'
import ChartsContainer from '../../components/ChartsContainer'
const Stats = () => {
  const {isLoading, monthlyApplications} = useSelector((store)=>store.allJob)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(showStats())
  },[])
  return (
    <>
    <StatsContainer/>
    {monthlyApplications.length > 0 && <ChartsContainer/>}
    </>
  )
}

export default Stats