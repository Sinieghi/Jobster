import React from 'react'
import Wrapper from '../assets/wrappers/BigSidebar'
import {useSelector} from 'react-redux'
import {Logo} from '../components'
import NavLinks from './NavLinks'
const BigSidebar = () => {
  const {isSidebarOpen} = useSelector((store)=>store.user)
  return (
    <Wrapper>
      <div className={!isSidebarOpen?"sidebar-container show-sidebar":'sidebar-container'}>
        <div className="content">
          <header>
            <Logo/>
          </header>
          <NavLinks/>
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSidebar