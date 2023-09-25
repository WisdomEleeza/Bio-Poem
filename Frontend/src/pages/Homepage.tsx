import SideBar from '../components/SideBar'
import SearchPoem from '../components/SearchPoem'
import MainContent from '../components/MainContent'
import { resetState } from '../store/formSlice'
import { useAppDispatch, useAppSelector } from '../store/store'
import { resetTheme } from '../store/themeSlice'
import { resetProfile } from '../store/userProfile'



const Homepage = () => {
  const dispatch = useAppDispatch();

  const openSearch = useAppSelector((state)=>state.search.openSearch);

  dispatch(resetState())
  dispatch(resetTheme())
  dispatch(resetProfile())
  
  
  
  return (
    <div className='flex overflow-x-hidden'>
        <SideBar/>
        {openSearch && <SearchPoem/>}
        <div className={`w-9/12 md:px-5  ${openSearch ? 'lg:ml-[34rem] xl:ml-34 2xl:ml-[38rem]' :'xl:ml-34 2xl:ml-80 ml-auto'}`}>
        <MainContent/>
        </div>
      </div>
    )
}
export default Homepage