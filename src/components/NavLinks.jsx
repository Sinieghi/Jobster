import React from 'react'
import {NavLink} from 'react-router-dom'
import { links } from '../ustils/links'
const NavLinks = ({toggleSidebar}) => {
  return (
       <div className="nav-links">
            {links.map((lin)=>{
              
              const {id,text,path,icon} = lin

              return <NavLink key={id} to={path} onClick={toggleSidebar}
              className={({isActive})=>{
                return isActive?'nav-link active':'nav-link'
              }}end  ><span className='icon'>{icon}</span>{text}</NavLink>
            })}
          </div>
  )
}

export default NavLinks