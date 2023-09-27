import { FormSection } from "./FormSection"
import { BsArrowLeft } from "react-icons/bs"
import { BsArrowRight } from "react-icons/bs"
import { forward, back, submitAnswers, finishedPoem, submitPoemAnswers } from "../store/formSlice"
import { questions } from "../questionsData"
import { CardTheme } from "./CardTheme"
import { useAppDispatch, useAppSelector } from '../store/store'
import { Complete } from "./Complete"
import { toast } from 'react-toastify'



type Props = {
    currentPage: number,
    }

export const Questions: React.FC<Props> = ({currentPage}) => {
    const dispatch = useAppDispatch()
    console.log(currentPage);
    
    
    const answers = useAppSelector((state)=> state.form.answers);
    const userId = useAppSelector((state)=> state.user.userId);

    const values = Object.values(answers);
    // console.log(values);
    

    const handleSubmit = () => {
        const allAreEmpty = values.slice(0, 11).every(value => value === '')
        if(allAreEmpty){
            toast.warn("Answer all questions")
        } else {
        const data : finishedPoem = {data: answers, id: userId}
        console.log(data);
        dispatch(submitAnswers(data))
        dispatch(submitPoemAnswers())
    }
}
    

    const firstPage = questions.slice(0, 4);
    const secondPage = questions.slice(4, 7);
    const thirdPage = questions.slice(7);

    const firstPageValues = values.slice(0, 4);
    const secondPageValues = values.slice(4, 7);
    const thirdPageValues = values.slice(7, 10);
    

    let currentData;
    let currentValues: any;

    if(currentPage == 1){
        currentData = firstPage;   
        currentValues = firstPageValues;
    } 
    if(currentPage == 2){
        currentData = secondPage;
        currentValues = secondPageValues;
    } 
    if(currentPage == 3){
        currentData = thirdPage;
        currentValues = thirdPageValues; 
    } 
    
    if(status === 'Fulfilled'){
        toast.success("Success!")
    }

    return (
    <form className='mt-4'>
        {currentData?.map((data, index) => 
            <FormSection 
                question={data.question}
                type={data.type}
                id={data.id}
                height={data.height}
                placeholder={data.placeholder}
                bottom={data.bottom}
                key={data.id}
                value={currentValues[index]}
            />         
        )}

        { currentPage === 4 ? <CardTheme /> : undefined }

        { currentPage === 5 ? <Complete/> : undefined}

        {/* Navigation */}
        { 
        currentPage === 5 ? undefined : status !== 'Fulfilled' ?   
        <div className="flex justify-between mt-4 mb-8">
            <div className="flex items-center p-[10px] cursor-pointer"
                onClick={()=>{dispatch(back())}}
                style={currentPage > 1 ? {color: '#F06A30'} : undefined}>
                <BsArrowLeft/> 
                <span className="ml-[10px]">Previous</span>
            </div>

            { currentPage === 4 ? ( 
                <button 
                    className="p-[10px] bg-customOrange text-white rounded-lg"
                    onClick={handleSubmit}>Submit
                </button>
            ) :
                <div className="flex items-center p-[10px] cursor-pointer"
                    onClick={()=>{dispatch(forward())}}
                    style={{color: '#F06A30'}}>
                    <span className="mr-[10px]">Next</span>
                    <BsArrowRight/>
                </div>
            }
            </div>
            : 
            undefined 
        }
    </form>
    )
}
