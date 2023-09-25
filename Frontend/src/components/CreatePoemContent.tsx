import { ProgressStepper } from './ProgressStepper'
import { UserInput } from './UserInput'
import { useAppSelector } from '../store/store'


export const CreatePoemContent = () => {
  const currentPage = useAppSelector((state)=> state.form.page);

  return (
    <div className='my-4'>
        <ProgressStepper currentPage={currentPage}/>
        <UserInput currentPage={currentPage}/>
    </div>
  )
}
