import React, { useState } from 'react'
import Wrapper from '../assets/wrappers/Navbar'
import {FaAlignLeft, FaCaretDown, FaHome, FaUserCircle} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import Logo from './Logo'
import { logoutUser, toggleSidebar } from '../features/user/userSlice'
import { clearStore } from '../features/allJobs.js/allJobsSlice'
const Navbar = () => {
  const [showLogout, setShowLogaout] = useState(false)
  const {user} = useSelector((store)=>store.user)
  const dispatch = useDispatch()

  const toggle = ()=>{
    dispatch(toggleSidebar())
  }

  return (
    <Wrapper>
      <div className="nav-center">
        <button className='toggle-btn' type='button' onClick={toggle}>
          <FaAlignLeft/>
        </button>
        <div>
          <Logo/>
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button type='button' className='btn' onClick={()=>setShowLogaout(!showLogout)}>
            <FaUserCircle/> 
            {user?.name}
            <FaCaretDown/>
          </button>
          <div className={showLogout?"dropdown show-dropdown":'dropdown' }>
            <button className='dropdown-btn' onClick={()=>dispatch(clearStore('logout...'))}>
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar