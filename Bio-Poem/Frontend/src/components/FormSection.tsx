import {useDispatch} from 'react-redux'
import { updateAnswers } from "../store/formSlice";


type Props = {
    question: string,
    type: string,
    id: string,
    height: string,
    placeholder:string,
    bottom: string,
    value: string
}

export type payload = {
  id:string,
  answer: string,
}

export const FormSection: React.FC<Props> = ({question, type, id, height, placeholder, bottom, value}) => {
  const dispatch = useDispatch();

  const handleAnswers = (e:any) => {
    e.preventDefault()
    const answer:payload = {
      id:id,
      answer:e.target.value,
    }
    dispatch(updateAnswers(answer))
  }
  
  return (
    <div className="flex flex-col mb-6" >  
        <label htmlFor={id} className="px-3 font-semibold text-xl py-[10px]">{question}</label>
        <input 
        type={type} 
        id={id} 
        name={id}
        value={value} 
        className="border border-[#D9D9D9] text-[#646363] rounded-lg outline-none px-3" 
        style={{height: height, paddingBottom: bottom}}
        placeholder={placeholder}
        onChange={handleAnswers}
        />    
    </div>
  )
}
