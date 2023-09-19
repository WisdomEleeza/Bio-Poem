import { IoIosCheckmark } from 'react-icons/io'

type Props = {
    currentPage: number,
    }
    

export const Stepper: React.FC<Props> = ({currentPage}) => {
    const steps = [1, 2, 3, 4, 5];

    const inActive = {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        background: '#D1D5DB'
    }

    const active = {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        background: '#F06A30'
    }

    const activeBorder = {
        border: '2px solid #F06A30', 
        width: '2rem', 
        height: '2rem', 
        borderRadius: '50%',
        background: '#FFFFFF'
    }
    
    const dot = (<div style={inActive}></div>);
    const activeDot = (<div style={active}></div>);
    const complete = (<div className='step-complete' style={{background: '#F06A30'}}><IoIosCheckmark className="w-10 h-10"/></div>)

return (
    <div className='relative pt-[9px]'>
        <div className='flex justify-between relative z-30'>
            {
                steps.map((step, index) => 
                    <div className='text-center' key={index}>
                        <div 
                            style={step === currentPage ? activeBorder : undefined} 
                            className={step >= currentPage ? 'progress-step-border': 'progress-step-complete'}>
                            {currentPage === 5 ? complete: step === currentPage ? activeDot : step < currentPage ? complete : dot }
                        </div>
                        <div className='text-sm'>{step}</div>
                    </div>
                
                )
            }    
        </div>

        {/* InactiveLine */}
        <div style={{transition: '1s'}} className='w-full h-[2px] bg-customGrey1 absolute top-6 z-0 duration-1000'></div> 
        { 
            currentPage === 2 ?  <div style={{transition: '1s'}} className='w-[25%] h-[2px] bg-customOrange absolute top-6 z-0'></div> : undefined
        }
        { 
            currentPage === 3 ?  <div style={{transition: '1s'}} className='w-[50%] h-[2px] bg-customOrange absolute top-6 z-0'></div> : undefined
        }
        { 
            currentPage === 4 ?  <div style={{transition: '1s'}} className='w-[75%] h-[2px] bg-customOrange absolute top-6 z-0'></div> : undefined
        }
        { 
            currentPage === 5 ?  <div style={{transition: '1s'}} className='w-[100%] h-[2px] bg-customOrange absolute top-6 z-0'></div> : undefined
        }
    </div>
  )
}
