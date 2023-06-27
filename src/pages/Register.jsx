import React, { useEffect, useState } from 'react'
import Wrapper from '../assets/wrappers/RegisterPage'
import {FormRow, Logo} from '../components'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, registerUser } from '../features/user/userSlice'
import {useNavigate} from 'react-router-dom'
const initialState = {
  name:'',
  email:'',
  password:'',
  isMember:true
}
const Register = () => {
  const  [values, setValues] = useState(initialState)
  const {user, isLoading} = useSelector((store)=>store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e)=>{
    const name = e.target.name
    const value = e.target.value   
    setValues({...values, [name]:value})
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    const {name, email, password, isMember} = values
    if(!email || !password || (!name && !isMember)){
      toast.error('fill all fields')
      return
    }
    if(isMember){
      dispatch(loginUser({email:email,password:password}))
      return
    }
    dispatch(registerUser({name,email,password}))
  }

  useEffect(()=>{
    if(user){
      setTimeout(()=>{
      navigate('/')
    },2000)
  }
    
  },[user])
  
  return (
    <Wrapper className='full-page'>
      <form className="form" onSubmit={handleSubmit}>
        <Logo/>
        <h3>{values.isMember ? 'login' : 'register'}</h3>
        {/* name field */}
        {!values.isMember && 
        <FormRow type='text' name='name' value={values.name || ''} handleChange={handleChange}/>}
       
       <FormRow type='email' name='email' value={values.email || ''} handleChange={handleChange} />
       <FormRow type='password' name='password' value={values.password || ''} handleChange={handleChange} />
        <button className="btn btn-block" type='submit' disabled={isLoading}>
          {isLoading ? 'Loading...' : 'submit'}
        </button>

         <button className="btn btn-block btn-hipster" type='button' 
         onClick={()=>dispatch(loginUser({email: "testUser@test.com", password: "secret"}))} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'demo'}
        </button>
        
        <p>
          {values.isMember ? 'not member yet?' : 'already member?'}
           <button type='button' className='member-btn' onClick={()=>setValues({...values, isMember: !values.isMember })}>
          {values.isMember ? 'register' : 'login'}
        </button>
        </p>
       
      </form>
    </Wrapper>
  )
}

export default Register