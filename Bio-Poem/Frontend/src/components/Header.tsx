import HeaderPattern from '../assets/Group 33.png'
import { useAppSelector } from '../store/store'

const Header = () => {
  const openSearch = useAppSelector((state)=>state.search.openSearch)
  return (
    <div className={`flex border-2 border-[#D9D9D9] justify-between rounded-lg mt-8 relative p-5  ${openSearch ? '2xl:w-11/12 w-10/12':''}`}>
        <div className='absolute left-[5%] bottom-[35%]'>
            <h1 className='font-semibold text-xl lg:text-4xl'>Bio Poem</h1>
            <p className='text-xs lg:text-[21px]  text-[#343434] font-medium pt-5'>Bio poems crafted, a journey grand</p>
        </div>
        <div>
          <img src={HeaderPattern} alt="" />
        </div>
    </div>
  )
}

export default Header