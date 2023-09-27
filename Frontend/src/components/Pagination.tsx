import { useState, useEffect } from 'react'
import arrowLeft from '../assets/arrow-left.png';
import arrowRight from '../assets/arrow-right.png';
import { useAppDispatch, useAppSelector } from '../store/store';
import { getRecentPoems } from '../store/poemSlice';


const Pagination = () => {
    const dispatch = useAppDispatch()

    const total = useAppSelector(state=> state.poem.total)
    const hasMore = useAppSelector(state=> state.poem.hasMore)
    // const [poemsPerPage, setPoemsPerPage] = useState(12)
    // const openSearch = useAppSelector((state)=>state.search.openSearch)
    const poemsPerPage =  12 ;
    const pageNumbers: number[] = []
    const [currentPage, setCurrentPage ] = useState(1);

    for(let i = 1; i <= Math.ceil(total/poemsPerPage); i++){
        pageNumbers.push(i)
    }

    const goToNextPage = () =>{
        if (hasMore && pageNumbers[pageNumbers.length - 1]!== currentPage){
            setCurrentPage(prev => prev + 1) 
        }
    }

    const goToPreviousPage = () =>{
        if (pageNumbers[0] < currentPage){
            setCurrentPage(prev => prev - 1) 
        }
    }

    useEffect(() => {
        dispatch(getRecentPoems(currentPage))
      }, [currentPage, dispatch])

    const toggle = useAppSelector((state)=>state.darkMode.toggle)
 
 
  return (
    <div className="w-full flex justify-center">
      <div className={`flex my-6 ${toggle ? 'bg-black' : ''}`}>
        <div className="py-3 px-4 border-y-2 border-l-2 rounded-l-lg cursor-pointer flex items-center gap-3" onClick={goToPreviousPage}>
          <div>
            <img src={arrowLeft} alt="<-" />
          </div>
          <span>Previous</span>
        </div>
        {pageNumbers &&
          pageNumbers.map((number, index) => (
            <div
              key={index}
              onClick={() => setCurrentPage(number)}
              className={`${
                currentPage === number
                  ? "bg-gray-300 text-gray-700"
                  : "text-gray-800"
              } py-3 px-4 border-y-2 border-l-2 cursor-pointer text-sm`}
            >
              {number}
            </div>
          ))}
        <div className="py-3 px-4 border-2 rounded-r-lg cursor-pointer flex flex-row-reverse items-center gap-3" onClick={goToNextPage}>
          <div>
            <img src={arrowRight} alt="->" />
          </div>
          <span>Next</span>
        </div>
      </div>
    </div>
  )
}

export default Pagination