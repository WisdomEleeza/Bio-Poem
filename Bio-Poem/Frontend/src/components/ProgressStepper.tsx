import { Stepper } from './Stepper'
import '../App.css'

type Props = {
currentPage: number,
}

export const ProgressStepper: React.FC<Props> = ({currentPage}) => {

  
  return (
    <div className='md:w-3/6 xl:w-2/6 mx-auto'>
    <Stepper currentPage={currentPage}/>
    </div>
    )
  }
  
