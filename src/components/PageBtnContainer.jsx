import React from 'react'
import {HiChevronDoubleLeft,HiChevronDoubleRight} from 'react-icons/hi'
import Wrapper from '../assets/wrappers/PageBtnContainer'
import {useDispatch, useSelector} from 'react-redux'
import { changePage } from '../features/allJobs.js/allJobsSlice'
const PageBtnContainer = () => {
  const {numOfPages, page} = useSelector((store)=>store.allJob)
  const dispatch = useDispatch()
  //nessa syntax o _ acessa o valor do objeto {numOfPage} que nesse caso é undefined, com isso se ignora o primerio valor no param o _ no caso
  const pages = Array.from({length:numOfPages}, (_,index)=>{
    // aqui tu retorna a construção do array, que nesse caso começa no 1! 
    return index + 1
  })

 const nextPage = () => {
  let newPage = page + 1;
  if (newPage > numOfPages) {
    newPage = 1;
  }
  dispatch(changePage(newPage));
};
const prevPage = () => {
  let newPage = page - 1;
  if (newPage < 1) {
    newPage = numOfPages;
  }
  dispatch(changePage(newPage));
};
  return (
    <Wrapper>
      <button className="prev-btn" type='button' onClick={prevPage}>
        prev
      </button>
      <div className="btn-container">
         {pages.map((pNumber)=>{
         
        return     <button
          type="button"
          className={pNumber === page ? "pageBtn active" : "pageBtn"}
          key={pNumber}
          onClick={() => dispatch(changePage(pNumber))}
        >
          {pNumber}
        </button>
      })}
      </div>  
      <button className="next-btn" type='button' onClick={nextPage}>
        next
      </button>
    </Wrapper>
  )
}

export default PageBtnContainer