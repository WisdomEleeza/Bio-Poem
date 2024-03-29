import { IoChevronDown, IoChevronUp } from 'react-icons/io5'
import { AiOutlineClose } from 'react-icons/ai'
import { fontColors } from '../fontColors'
import { useAppDispatch, useAppSelector } from '../store/store'
import { selectFontColor, setView } from '../store/formSlice'
import { resetTheme } from '../store/themeSlice'
import { FontStyles } from './FontStyles'


export const PoemFont: React.FC = () => {
  const dispatch = useAppDispatch();

  const userPoem = useAppSelector(state=> state.form.answers.backgroundTheme);
  const selectedFontColor = useAppSelector(state => state.form.answers.fontColor);
  const view = useAppSelector(state=> state.form.view);
  const chosenFont = useAppSelector(state=> state.form.answers.fontFamily);


  const handleColorSelection = () => {
    dispatch(resetTheme())
    dispatch(setView())
  };

  return (
    <>
    <div className="mt-8 w-full border">
      <div className="text-customOrange flex w-[48px] justify-between items-center cursor-pointer text-sm mb-4"  
      onClick={handleColorSelection}>Font{view ? <IoChevronUp/> 
        : <IoChevronDown/>}
      </div>
      { view ? 
      <div className='border rounded-lg p-4 flex'>
        {/* Font types */}
        <FontStyles/>
        {/* Preview selected preferences */}
        <div className='p-2 pt-0'>
          <div className='flex justify-between'>
            <div>Preview</div>
            <AiOutlineClose className="cursor-pointer" onClick={()=>dispatch(setView())}/> 
          </div>
          {/* Sample text */}
          <div className='mt-2 border rounded-lg relative z-40 overflow-hidden' style={{color: selectedFontColor, background:userPoem.length <= 9 ? userPoem : undefined }}>
          <img 
            src={userPoem.length > 9 ? userPoem : undefined} 
            className='absolute z-10 h-full w-full'
            style={userPoem.length <= 9 ? {display: 'none'} : undefined  }/>
          <div className='p-3 relative z-40' style={{fontFamily: chosenFont}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Atque perferendis asperiores tempora fuga non illum placeat inventore doloremque, 
            dolores saepe ratione autem est veniam laboriosam! 
            Expedita ex quaerat mollitia eos!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Atque perferendis asperiores tempora fuga non illum placeat inventore doloremque, 
            dolores saepe ratione autem est veniam laboriosam! 
            Expedita ex quaerat mollitia eos!
          </div>
          </div>
          {/* Font size and color */}
          <div className='mt-4 flex'>
            <div>
              <div className=''>
                <div className='text-[#565555] mb-2'>Font colour</div>
                <div className='flex items-center justify-center border rounded-lg h-6 w-24 p-6'>
                  <span className='flex flex-col justify-center items-center h-7 ml-1 text-white bg-customOrange rounded-lg p-3'>A</span>
                </div>
              </div>
            </div>
          </div>
          {/* Colors */}
          <div className='mt-12 border rounded-lg grid grid-cols-6 p-1 gap-x-2 gap-y-16 md:w-10/12 xl:w-full'>
              {
                fontColors.map((color)=> 
                <div 
                  key={color.id} 
                  className='w-12 h-10 rounded-lg border cursor-pointer' 
                  style={{background:color.color}}
                  onClick={()=>dispatch(selectFontColor(color.color))}>
                </div>
                )
              }
              </div>
            </div>
        </div>
      : undefined
      }
    </div>
    </>
  )
}
