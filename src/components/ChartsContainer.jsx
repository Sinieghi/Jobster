import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import Wrapper from '../assets/wrappers/ChartsContainer'
import BarChart from './BarChart'
import AreaChart from './AreaChart'
const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true)
  const {monthlyApplications:data} = useSelector((store)=>store.allJob)
  return (
    <Wrapper>
      <h4>monthly Applications</h4>
      <button type='button' onClick={()=>setBarChart(!barChart)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data}/>}
    </Wrapper>
  )
}

export default ChartsContainer