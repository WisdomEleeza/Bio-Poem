import { colors } from '../colorData';
import { patterns } from '../patternData';
import { selectTheme } from '../store/formSlice';
import { useAppDispatch, useAppSelector } from '../store/store';

type themeProps = {
  currentOption: string,
}

export const Themes: React.FC<themeProps> = ({currentOption}) => {

  const dispatch = useAppDispatch()
  const selectedTheme = useAppSelector((state)=> state.form.answers.backgroundTheme)

    if(currentOption === 'none'){
        return null
    }

    const handleSelectedTheme = (theme:string) => {
      dispatch(selectTheme({theme}))
    }
    
  return (
    <div className="mt-8 mb-6 border border-customGrey1 rounded-lg p-4 h-56 lg:w-12/12 xl:w-[480px] flex flex-wrap justify-center gap-3">
        {currentOption === 'solid' ? colors.map((color) => 
        <div 
          className='w-16 h-14 rounded-lg border border-customGrey1 cursor-pointer' 
          style={{background: color.color, border: color.color === selectedTheme ? '1px solid #F06A30' : '1px solid #D1D5DB'}} 
          key={color.id}
          onClick={()=> handleSelectedTheme(color.color)}>
        </div>
        ) 
        : undefined}
        {currentOption === 'pattern' ? patterns.map((pattern)=> 
        <img 
          className='w-16 h-14 rounded-lg border border-customGrey1 cursor-pointer' 
          src={pattern.pattern} 
          key={pattern.id}
          onClick={()=> handleSelectedTheme(pattern.pattern)}
          style={{ border: pattern.pattern === selectedTheme ? '1px solid #F06A30' : '1px solid #D1D5DB'}}
        />
        )
        : undefined
        }
    </div>
  )
}
