import design from '../assets/header-img.png'

export const CreatePoemHeader = () => {
  return (
    <div className='flex bg-customOrange rounded-[21px] py-4 md:pl-6 xl:pl-12 md:pr-2 xl:pr-5'>
        <div className='text-white flex flex-col justify-between w-5/12'>
            <div className='text-3xl'>Bio Poem</div>
            <div>Answer questions below to create your poem</div>
        </div>
        <div className='w-7/12 h-[82px] rotate-180 self-center'>
            <img className='h-full' src={design} alt="" />
        </div>
    </div>
  )
}
