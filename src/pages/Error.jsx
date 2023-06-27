import React from 'react'
import Wrapper from '../assets/wrappers/ErrorPage'
import img from '../assets/images/not-found.svg'
import {Link} from 'react-router-dom'
const Error = () => {
  return (
    <Wrapper className='full-page'>
      <div>
        <img src={img} alt="error" />
        <h3>not foud</h3>
        <p>this page does not existe</p>
        <Link to='/'>back home</Link>
      </div>
    </Wrapper>
  )
}

export default Error