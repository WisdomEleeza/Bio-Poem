import none from '../assets/null.png'
import defaultPattern from '../assets/default-pattern.png'
import { CardPreview } from './CardPreview'
import { useAppDispatch, useAppSelector } from '../store/store'
import { changeThemeOption, getPatterns } from '../store/themeSlice'
import { selectTheme, setView } from '../store/formSlice'
// import { RotatingLines } from 'react-loader-spinner'
import { PoemFont } from './PoemFont'
import { Themes } from './Themes'
import { useEffect } from 'react'

export type load = {
    loading: string
}

// type Props = {
//     currentPage: number,
//     }

export const CardTheme: React.FC = () => {
    const dispatch = useAppDispatch()
    const currentOption = useAppSelector((state) => state.theme.theme)
    const view = useAppSelector(state=> state.form.view);
    const patterns = useAppSelector(state=> state.theme.patterns)
    console.log(patterns.data);
    
    // const status = useAppSelector(state=> state.form.status);


    if(currentOption != 'none' && view){
        dispatch(setView())
    };

    const handleNoneTheme = () => {
        dispatch(changeThemeOption('none'))
        dispatch(selectTheme({theme:'#FFFFFF'}))
    }

    useEffect(() => {
        dispatch(getPatterns())
    }, [dispatch])
    

    return (
        <>
            {/* { currentPage === 4 && status === 'Loading...' ? 
            <div className='mx-auto flex justify-center items-center mt-6'>
            <RotatingLines
                strokeColor="#F06A30"
                strokeWidth="5"
                animationDuration="0.75"
                width="130"
                visible={true}
            />
            </div> 
            : */}
                <div className="mt-10">
                    <div className="font-semibold text-xl mb-6">11. Choose a background or theme for your card</div>
                    {/* Select theme */}
                    <div className='flex'>
                        {/* None */}
                        <div className='flex flex-col items-center mr-8 cursor-pointer' 
                            onClick={handleNoneTheme}>
                            <div className='w-16 h-14 bg-[#D9D9D98C] rounded-lg flex justify-center items-center mb-2'
                            style={currentOption === 'none' ? {border: '1px solid #F06A30'}: undefined}>
                                <img src={none}/>
                            </div>
                            <div className="text-sm font-semibold">None</div>
                        </div>
                        {/* Solid */}
                        <div className='flex flex-col items-center mr-8 cursor-pointer' 
                            onClick={()=>{dispatch(changeThemeOption('solid'))}}>
                            <div className='w-16 h-14 rounded-lg bg-[#00000075] mb-2'
                            style={currentOption === 'solid' ? {border: '1px solid #F06A30'}: undefined}>
                            </div>
                            <div className="text-sm font-semibold">Solid</div>
                        </div>
                        {/* Pattern */}
                        <div className='flex flex-col items-center mr-8 cursor-pointer' 
                            onClick={()=>{dispatch(changeThemeOption('pattern'))}}>
                            <div className='w-16 h-14 bg-[#D9D9D98C] rounded-lg flex justify-center items-center mb-2 overflow-hidden'
                            style={currentOption === 'pattern' ? {border: '1px solid #F06A30'}: undefined}>
                                <img src={defaultPattern}/>
                            </div>
                            <div className="text-sm font-semibold">Pattern</div>
                        </div>
                    </div>
                    <Themes currentOption={currentOption} />
                    <PoemFont/>
                    <CardPreview/>
                </div>
            {/* } */}
        </>
    )
}
