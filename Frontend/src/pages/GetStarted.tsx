import grid from '../assets/small-grid.png'
import circle from '../assets/design-circle.png'
import vector from '../assets/vector.png' 
import sound from '../assets/sound-on.png'
import { UserNameForm } from '../components/UserNameForm'


export const GetStarted = () => {
  return (
    <div className="py-52 h-full">
        {/* Overlay */}
        <div className="w-full h-[700px] relative z-10">
          {/* grids */}
          <img src={grid} className='absolute w-16 h-14 left-64'/>
          <img src={grid} className='absolute w-16 h-14 left-[234px] bottom-[200px]'/>
          <img src={grid} className='absolute w-16 h-14 right-[391px] top-36'/>
          <img src={grid} className='absolute w-16 h-14 right-[585px] bottom-[72px]'/>
          {/* circles */}
          <img src={circle} className='absolute left-72 top-44' />
          <img src={circle} className='absolute right-[441px] bottom-32' />
          <img src={circle} className='absolute right-14 top-52' />
          {/* vectors */}
          <img src={vector} className='absolute top-56 left-[350px] rotate-180'/>
          <img src={vector} className='absolute bottom-[218px] right-[524px]'/>
          {/* images */}
          <img src={sound} className='absolute z-20 right-16 bottom-0' />
          <UserNameForm/>
        </div>
    </div>
  )
}
