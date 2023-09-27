import medal from '../assets/star-tick.png'
import { useNavigate } from "react-router"
import { resetState } from '../store/formSlice'
import { useAppDispatch,} from '../store/store'
import { resetUser } from '../store/userSlice'
import { resetProfile } from '../store/userProfile'


export const Complete = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleCompletion = (): void => {
        dispatch(resetState())
        dispatch(resetUser())
        dispatch(resetProfile())
        navigate('/')
    };
    

  return (
    <div className='mt-16 flex mx-auto w-9/12 flex-col items-center'>
      <img className='w-2/4' src={medal}/>
      <div className='text-customOrange text-2xl font-bold mt-6'>You've made it !</div>
      <div className='text-[#646363] mt-5 font-medium'>Bio poem created successfully</div>
      <button 
        className='mt-3 bg-customOrange font-bold text-white w-full py-3 rounded-lg'
        onClick={handleCompletion}>Back To Home</button>
    </div>
    ) 
}
