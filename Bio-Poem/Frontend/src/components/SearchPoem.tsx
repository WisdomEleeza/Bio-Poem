import { useEffect, useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
import person from '../assets/searchImage.png';
import { searchPoem } from '../store/searchSlice';
import { useAppDispatch, useAppSelector  } from '../store/store';
import { setPoemSingleData, setShowModal } from '../store/poemSlice'
import { addRecentSearch } from '../store/recentSearchSlice';
import { data } from '../store/formSlice';

export type poem = {
  "firstName":string,
  "adjectives": string,
  "importantRelation": string,
  "loves": string,
  "feelings": string,
  "fears": string,
  "accomplishments": string,
  "expectations": string,
  "residence": string,
  "lastName": string,
  "backgroundTheme": string,
  "userName": string,
  "_id": string    
}
export interface poemArr {
    poemData: poem[]
}

const SearchPoem = () => {
  const [searchedPoem, setSearchedPoem] = useState<string>('')
  const [searchResults, setSearchResults] = useState<any>([])
  const [fetchPoems, setFetchPoems] = useState<data[]>([])
  const [displayedDivs, setDisplayedDivs] = useState(5)
  const [showMore, setShowMore] = useState<boolean>(true)

  const searchResponse = useAppSelector((state) => state.search.response);
  const darkMode = useAppSelector((state) => state.darkMode.toggle)

  const dispatch = useAppDispatch()

 

  const handleShowSinglePoem = (data: any) => {
    dispatch(setPoemSingleData(data)) 
    dispatch(setShowModal());
  };

  useEffect(() => {
    dispatch(searchPoem())
    setFetchPoems(searchResponse.poems)
    setDisplayedDivs(5)
    dispatch(addRecentSearch(searchResults))
  }, [dispatch, searchedPoem]);
  

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedPoem( e.target.value.toLowerCase()) 
    localStorage.setItem('searchedPoem', searchedPoem)
    const filteredResults = fetchPoems.filter((ele:any)=>{
    const fullName = `${ele.firstName} ${ele.lastName}`.toLowerCase()
    return fullName.includes(searchedPoem)      
  }) ;

    setSearchResults(filteredResults)
  };

  useEffect(() => {
    const recentSearch = localStorage.getItem('searchedPoem');
    if (recentSearch) {
      setSearchedPoem(recentSearch);
      const filteredResults = fetchPoems.filter((ele: any) => {
        const fullName = `${ele.firstName} ${ele.lastName}`.toLowerCase();
        return fullName.includes(recentSearch);
      });
      setSearchResults(filteredResults);
    }
  }, [fetchPoems]);

  
  const removeItem = (id:string) =>{
    const updatedPoems = fetchPoems?.filter((poem:any)=>poem._id !==id)
    setFetchPoems(updatedPoems)
    setDisplayedDivs(displayedDivs - 1)
  };

  const removeSearchItem = (id:string) => {
    const updatedPoems = searchResults.filter((poem:poem)=>poem._id !==id)
    setSearchResults(updatedPoems)
    setDisplayedDivs(displayedDivs - 1)
  };

  const seeMore = () =>{
    setDisplayedDivs(fetchPoems.length)
    setShowMore(false)
  };


  const  clearAll = () => setDisplayedDivs(0);

  
  return (
    <div className="fixed top-0 h-screen overflow-y-auto overflow-x-hidden lg:ml-[7rem] xl:ml-[7rem] 2xl:ml-[7rem] border-[#D9D9D9] border-r-[0.5px] flex flex-col items-center text-[#343434] z-10">
      <div
        className={`flex items-center border border-[#D9D9D9] rounded-lg py-3 pl-3.5 w-[23.438rem] mt-[53px] mb-[40px] mr-3.5  ml-4 ${
          darkMode ? 'bg-[#fff]' : ''
        }`}
      >
        <BiSearchAlt2 style={{ color: '#8E8D8D' }} className="mr-4 cursor-pointer" />
        <input
          type="text"
          placeholder="Search..."
          className="focus:outline-none"
          value={searchedPoem}
          onChange={handleSearch}
        />
      </div>
      <div className={`flex gap-x-56 px-2.5 py-3 border-y-[0.5px] border-[#D9D9D9] mb-[40px] w-full justify-between`}>
        <p className={`text-base ${darkMode ? 'text-[#fff]' : ''}`}>Recent</p>
        {searchResults.length !== 0 && displayedDivs !== 0 ? (
          <p className="text-[#F06A30] w-max cursor-pointer" onClick={clearAll} >Clear all</p>
        ) : (
          ''
        )}
      </div>

      {/* Search results */}
      { displayedDivs === 0  || (searchResults.length === 0) ? (
        <p className="text-[#F06A30] mt-[207px]">No Results...</p>
      ) : (
        <>
          {searchResults.length !== 0 ? (<>
            {searchResults.slice(0,displayedDivs).map((ele:poem) => (
            <div className="flex gap-x-28 mb-[30px] px-3.5 w-full justify-between" key={ele._id}>
              <div className="flex items-center">
                <img src={person} alt="person" className="rounded-[50%] w-[55px] h-[55px]" />
                <p className={`ml-5 font-medium ${darkMode ? 'text-[#fff]' : ''}`}>
                  {ele.firstName} {ele.lastName}
                </p>
              </div>

              <div className="flex items-center ">
                <button className="text-white bg-orange-500 px-2.5 rounded-r-full rounded-l-full font-medium cursor-pointer" onClick={()=>dispatch(setShowModal())}>
                  View
                </button>
                <div className="ml-5 bg-[#D9D9D9] rounded-full  cursor-pointer">
                  <MdClose  onClick={()=>removeItem(ele._id)}/>
                </div>
              </div>
            </div>
          ))}
          {showMore && <p className="text-[#F06A30] border-b-[1px] border-[#F06A30] cursor-pointer" onClick={seeMore}>See more</p>}
          </>
          )
          :(
            <>
              {searchResults.slice(0,displayedDivs).map((ele:poem) => (
            <div className="flex gap-x-28 mb-[30px] px-3.5 w-full justify-between" key={ele._id}>
              <div className="flex items-center">
                <img src={person} alt="person" className="rounded-[50%] w-[55px] h-[55px]" />
                <p className={`ml-5 font-medium ${darkMode ? 'text-[#fff]' : ''}`}>
                  {ele.firstName} {ele.lastName}
                </p>
              </div>

              <div className="flex items-center ">
                <button className="text-white bg-orange-500 px-2.5 rounded-r-full rounded-l-full font-medium cursor-pointer" onClick={() => handleShowSinglePoem(ele)}>
                  View
                </button>
                <div className="ml-5 bg-[#D9D9D9] rounded-full  cursor-pointer">
                  <MdClose  onClick={()=>removeSearchItem(ele._id)}/>
                </div>
              </div>
            </div>
          ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPoem;
