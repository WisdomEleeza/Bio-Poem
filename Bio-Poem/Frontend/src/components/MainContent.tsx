import Header from '../components/Header'
import Carousel2 from '../components/Carousel2'
import RecentPoems from '../components/RecentPoems'
import Modal from './Modal'
import { useAppSelector } from '../store/store'

const MainContent = () => {
  const openSearch = useAppSelector((state)=>state.search.openSearch)
  
  return (
    <div className={` pl-4 ${openSearch ? '2xl:w-9/12  xl:w-8/12 lg:w-7/12': 'w-full'}`}>
        <Header/>
        <div className='relative'>
          <Carousel2/>
          <RecentPoems/>
          <Modal/>
        </div>
    </div>
  )
}

export default MainContent