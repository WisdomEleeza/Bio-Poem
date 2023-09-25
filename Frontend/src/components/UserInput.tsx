import { Questions } from './Questions'
import { useState } from 'react'
import camera from '../assets/camera-icon.png'
import dummyProfile from '../assets/searchImage.png'
import axios from 'axios'
import { useAppDispatch, useAppSelector } from '../store/store'
import { setProfile } from '../store/userProfile'
import { toast } from 'react-toastify'
import { RotatingLines } from 'react-loader-spinner'


type Props = {
  currentPage: number,
  }


export const UserInput: React.FC<Props> = ({currentPage}) => {
  const dispatch = useAppDispatch();

  const userName = useAppSelector(state=> state.user.userName);
  const profileImg = useAppSelector(state=> state.userProfile.userImage)  
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];
    if(selectedImage) {
      setLoading(true)
      setImage(selectedImage)
      const filePreviewUrl = URL.createObjectURL(selectedImage);
      setPreviewUrl(filePreviewUrl)
    };

  };

  const handleImageUpload = async () => {
    if(!image) {
      console.error('No file selected.');
      return;
    }
  

  try {
    const response = await axios.post(`https://bio-poem.onrender.com/api/v1/poems/${userName}/profile-image`, {image: image},
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        },
      }
    );
    
    console.log('File uploaded successfully:', response.data);
    if(response.data.success){
      setImage(null)
      setLoading(false)
      dispatch(setProfile(response.data.data))
      toast.success(response.data.message)
    }
  } catch (error) {
    console.error('Error uploading image:', error)
  }
}

  return (
    <div className='md:w-5/6 xl:w-3/6 my-4 mx-auto'>
        {currentPage ===  1 ?
        <label htmlFor='fileInput' className='flex flex-col justify-center'>
          <div className='relative w-20 mx-auto cursor-pointer'>
            <img className='w-20 h-20 rounded-full mx-auto' src={previewUrl ? previewUrl : profileImg ? profileImg : dummyProfile}/>
            { profileImg ? undefined :
              <div className='absolute w-8 h-8 border bg-white flex items-center justify-center border-black rounded-full top-10 -right-2'>
                  <img className='' src={camera} />
              </div>
            }
            <input type='file' accept='image/*' id='fileInput' onChange={handleImageChange} className='hidden'/>
          </div>
          {image ? <button 
          onClick={handleImageUpload}
          className='mt-4 bg-customOrange w-fit mx-auto text-white px-4 py-2 rounded-lg'>Upload Image</button> 
          :
          loading ? 
          <RotatingLines
            strokeColor="#F06A30"
            strokeWidth="5"
            animationDuration="0.75"
            width="30"
            visible={true}/> 
            :
            undefined}
        </label>
        : undefined
        }
        <Questions currentPage={currentPage}/>
    </div>
  )
}
