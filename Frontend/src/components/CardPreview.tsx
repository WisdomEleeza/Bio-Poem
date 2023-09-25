import { IoChevronDown, IoChevronUp } from 'react-icons/io5'
import {BiDownvote, BiUpvote } from 'react-icons/bi'
import { IoClose } from 'react-icons/io5'
// import { Themes } from './Themes'
import { useAppSelector } from '../store/store'
import { useState } from 'react'
// import profile from '../assets/searchImage.png'


// type themeProps = {
//     currentOption: string,
// }


export const CardPreview: React.FC = () => {
    const [view, setView] = useState<boolean>(false);

    const userPoem = useAppSelector((state)=> state.form.answers);
    const profileImg = useAppSelector(state=> state.userProfile.userImage)  
    const selectedFontColor = useAppSelector(state => state.form.answers.fontColor);



    const poemData = Object.values(userPoem);
        
return (
    <>
        <div className="mt-8">
            <div className='flex  flex-col self-start text-customOrange'>
                    <div >
                        <div className='flex w-[70px] justify-between items-center cursor-pointer text-sm mb-4' onClick={()=>setView(!view)}>Preview  {view ? <IoChevronUp/> : <IoChevronDown/>}</div> 
                    </div>
                    {/* Preview */}
                    {view ?
                        <div className='border border-customGrey1 rounded-lg p-4 lg:w-full'>
                            <div className='rounded-lg border border-black bg-contain h-72 relative overflow-hidden mx-auto lg:w-full xl:w-[480px]' style={{background: userPoem.backgroundTheme.length <= 9 ? userPoem.backgroundTheme: 'none'}}>
                                {userPoem.backgroundTheme.length > 9 ?
                                    <img 
                                        src={ userPoem.backgroundTheme} 
                                        className='absolute z-10 h-full w-full' 
                                        style={userPoem.backgroundTheme.length <= 9 ? {display: 'none'} : undefined  }/>
                                        : undefined
                                }
                                <div className='z-40 relative px-4 py-1 h-full'>
                                    <div className='flex items-center'>
                                        <img src={profileImg} alt='Profile Image' className='w-6 h-6 rounded-full'/>
                                        <div className='ml-3 text-xs' style={{color: selectedFontColor}}>{userPoem.firstName +' '+ userPoem.lastName}</div>
                                        <IoClose className="ml-auto text-black w-3 h-3"/>
                                    </div>
                                    <div className='pl-2 flex h-5/6'>
                                        <div className='flex flex-col items-center pt-1'>
                                            <div className='w-2 h-2 rounded-full' style={{background: selectedFontColor}}></div>
                                            <div className='w-[2px] h-full' style={{background: selectedFontColor}}></div>
                                            <div className='w-2 h-2 rounded-full' style={{background: selectedFontColor}}></div>
                                        </div>
                                        <ul className='text-black flex flex-col justify-between ml-5 text-sm font-semibold leading-3 h-full' style={{color:selectedFontColor}}>
                                            {
                                                poemData.slice(0, 10).map((line, index) => <li key={index}>{line}</li>)
                                            }
                                        </ul>
                                    </div>
                                    <div className='flex ml-8 mt-2 text-black'>
                                        <BiUpvote style={{color: selectedFontColor}}/> 
                                        <span className='mr-2'></span> 
                                        <BiDownvote style={{color: selectedFontColor}}/> 
                                        {/* <span></span> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        : undefined
                    }
            </div> 
        </div>
    </>
    ) 
}



