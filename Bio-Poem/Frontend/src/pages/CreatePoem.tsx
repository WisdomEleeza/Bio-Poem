import { CreatePoemHeader } from '../components/CreatePoemHeader'
import { CreatePoemContent } from '../components/CreatePoemContent'
import SideBar from '../components/SideBar'
import { useAppSelector } from '../store/store'
import SearchPoem from '../components/SearchPoem'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

export const CreatePoem = () => {
  const navigate = useNavigate();

  const userId = useAppSelector(state=> state.user.userId);

  useEffect(()=> {
    if(!userId){
      navigate('/get-started')
    }
  })

  const openSearch = useAppSelector((state)=>state.search.openSearch)
  return (
    <div className='flex overflow-x-hidden'>
        <SideBar/>
        {openSearch && <SearchPoem/>}
        {/* Main Content */}
        <div className={`pt-4 w-9/12  md:px-5 xl:pl-10 xl:pr-14 ${openSearch ? 'lg:ml-[34rem] xl:ml-34 2xl:ml-[38rem]' : '2xl:ml-72  ml-64'}`}>
            <CreatePoemHeader/>
            <CreatePoemContent/>
        </div>
    </div>
  )
}
