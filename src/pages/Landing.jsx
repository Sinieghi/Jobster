import React from 'react'
import logo from '../assets/images/logo.svg'
import main from '../assets/images/main.svg'
import { styled } from 'styled-components'
import {Logo} from '../components'
import { Link } from 'react-router-dom'
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo/>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>jaob <span>tracking</span></h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, iusto voluptatum numquam assumenda odit reprehenderit? Ut eum, cupiditate ipsum voluptatibus reiciendis aut similique magni quis ea soluta voluptas numquam commodi praesentium dolore, 
            amet pariatur voluptatum excepturi dolorem eius necessitatibus nemo!</p>
        <Link to='/register' className="btn btn-hero">login/register</Link>
        </div>
        <img src={main} alt="main" className="img main-img" />
      </div>
      
    </Wrapper>
  )
}
const Wrapper = styled.main`
nav{
  width: var(--fluid-width);
  max-width: var(--max-width);
  margin: 0 auto;
  height: var(--nav-height);
  display: flex;
  align-items: center;
}
.page{
  min-height: calc(100vh - var(--nav-height));
  display: grid;
  align-items: center;
}
h1{
  font-weight: 700;
  span{
    color: var(--primary-500);
  }
}
 p{
    color: var(--grey-600);
  }
  .main-img{
    display: none;
  }
  @media (min-width:992px) {
    .page{
      grid-template-columns: 1fr 1fr;
      column-gap: 2rem;
    }
    .main-img{
      display: block;
    }
  }
`
export default Landing