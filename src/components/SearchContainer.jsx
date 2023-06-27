import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {FormRow, FormRowSelect} from '../components'
import { clearFilter, handleChange } from '../features/allJobs.js/allJobsSlice'


const SearchContainer = () => {
  const {isLoading, search, searchStatus, searchType, sort, sortOptions} = useSelector((store)=>store.allJob )
  const {jobTypeOptions,statusOptions} = useSelector((store)=>store.job)
  const dispatch = useDispatch()
  const [localSearch, setLocalSearch]= useState('')

const handleSearch = (e)=>{
e.preventDefault()
const name = e.target.name
const value = e.target.value
dispatch(handleChange({name, value}))
}
const handleSubmit = (e)=>{
  e.preventDefault()
  dispatch(clearFilter())
}

///////esse cara aqui é para evitar que seja feia a requeste enquanto u ser estiver digitando no search, isso é um debouce
const debounce = ()=>{
  console.log('debounce');
  let timeoutID
  return (e)=>{
    setLocalSearch(e.target.value)
    clearTimeout(timeoutID)
    timeoutID = setTimeout(()=>{
      dispatch(handleChange({name: e.target.name,
 value: e.target.value}))
    },500)
  }
}
const optimizedDebounce = useMemo(()=>debounce(),[])
//////
  return (
    <form className='form'>
      <h4>search form</h4>
      <div className="form-center">
        {/* Search */}
        <FormRow type='text' name='search' value={localSearch} handleChange={optimizedDebounce} />
        {/* Status */}
        <FormRowSelect labelText='status' name='searchStatus' value={searchStatus} 
        handleChange={handleSearch} list={['all',...statusOptions]}/>
        {/* Text */}
        <FormRowSelect labelText='type' name='searchType' value={searchType}        
        handleChange={handleSearch} list={['all',...jobTypeOptions]}/>
        {/* Sort */}
        <FormRowSelect name='sort' value={sort} handleChange={handleSearch} list={sortOptions}/>

        
        <button className="btn btn-block btn-danger" disabled={isLoading} onClick={()=>dispatch(
          clearFilter()
        )}>clear</button>
      </div>
    </form>
  )
}

export default SearchContainer