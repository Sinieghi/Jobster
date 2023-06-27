import React, { useState } from 'react'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { FormRow } from '../../components'
import { updateUser } from '../../features/user/userSlice'

const Profile = () => {
  const {isLoading, user} = useSelector((store)=>store.user)
  const [userData, setUserData] = useState({
    name:user?.name || '',
    email:user?.email || '',
    lastName:user?.lastName || '',
    location:user?.location || '',
  })
   const dispatch = useDispatch()

  const handleChange = (e)=>{
    const name = e.target.name
    const value = e.target.value
    setUserData({...userData, [name]:value})

    
  }
  const {name, email, lastName, location } = userData
  const handleSubmit = (e)=>{
    e.preventDefault()
    
    if(!name || !email || !lastName || !location){
      toast.error('please fill out all fields')
      return
    }
    dispatch(updateUser({name, email, lastName, location}))
  }


 
  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="form">
        <h3>profile</h3>
        <div className="form-center">
          <FormRow type='text' name='name' value={name} handleChange={handleChange}/>
          <FormRow type='text' labelText='last name' name='lastName' value={lastName} handleChange={handleChange}/>
          <FormRow type='email' name='email' value={email} handleChange={handleChange}/>
          <FormRow type='text' name='location' value={location} handleChange={handleChange}/>
        <button className="btn btn-block" disabled={isLoading}>
          {isLoading?'pelase wait...': 'save change'}
        </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default Profile