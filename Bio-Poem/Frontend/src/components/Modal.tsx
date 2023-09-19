import GridImage from '../assets/user.png'
import { VscClose } from "react-icons/vsc";
import { BiDownvote, BiUpvote} from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setShowModal } from "../store/poemSlice";
import { Poem } from "./Carousel2";
import axios from 'axios'
import {useState,} from 'react'

interface ModalProps {
  poems?: Poem[];
  id?: string;
}
export interface person{
  _id : string
  username: string
  profileImage: string
}


const Modal: React.FC<ModalProps> = () => {
  const dispatch = useAppDispatch();
  
  const visible = useAppSelector((state) => state.poem.showModal);
  const singlePoem = useAppSelector((state) => state.poem.singlePoem);

  const [upvoted, setUpVoted] = useState(false)
  const [downvoted, setDownvoted] = useState(false);
 
  const upvotePoem = async () => {
    if (!upvoted){
      const url = `https://bio-poem.onrender.com/api/v1/poems/${singlePoem._id}/upvote`;
      try {
        const response = await axios.post(url);
        setUpVoted(true)
        setDownvoted(false)
        console.log('uptake', response);
        
    } catch (error) {
      console.log(error);
      throw error;
    }
    }
  }

  const downvotePoem = async () => {
    if (!downvoted) {
      const url = `https://bio-poem.onrender.com/api/v1/poems/${singlePoem._id}/downvote`;
      try {
        const response = await axios.post(url);
        setDownvoted(true);
        setUpVoted(false);
        console.log('downtake', response);
    } catch (error) {
      console.log(error);
      throw error;
    }
    }
}

  const handleClose = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

  if (target.id === "container") {
    dispatch(setShowModal());
  }
  };

  if (!visible || !singlePoem ) return null;

  return (
    <div
      id="container"
      onClick={handleClose}
      className="h-full absolute inset-0 flex justify-center z-20 pt-4"
      style={{backgroundColor: 'rgba(0,0,0, 0.45)'}}
    >
      <div className="rounded-3xl w-4/12 fixed"
      style={{ background: singlePoem.backgroundTheme ? singlePoem.backgroundTheme : "#ffffff" }}>
      {singlePoem.backgroundTheme.length > 8 ? (
        <img
          src={singlePoem.backgroundTheme}
          className="absolute h-full w-full -z-30 rounded-3xl"
          style={singlePoem.backgroundTheme.length <= 8 ? {display: 'none'}: undefined}
          alt=""
        />
      ): undefined}
        <div className="flex items-center justify-between px-12 py-2">
          <div className="flex items-center">
          {singlePoem.user.profileImage ? (
            <img
              className="rounded-full w-[65px] h-[65px]"
              src={singlePoem.user.profileImage}
            />
          ) : (
            <div className='bg-white rounded-full'>
              <img
                className="rounded-full w-[65px] h-[65px]"
                src={GridImage}
                alt="GridImage"
              />
            </div>
          )}
            <p className="ml-5 font-medium text-2xl text-black">
              {singlePoem.firstName} {singlePoem.lastName}
            </p>
          </div>

          <VscClose
            className="text-xl hover:text-gray-400 cursor-pointer"
            onClick={() => dispatch(setShowModal())}
          />
        </div>

        <div className="flex my-5">
          <div className="flex flex-col items-center ml-7 pt-1">
            <div className="w-2 h-2 rounded-full bg-black"></div>
            <div className="bg-black w-[2px] h-full"></div>
            <div className="w-2 h-2 rounded-full bg-black"></div>
          </div>
  
            <ul className="ml-16">
              <li>{singlePoem.firstName}</li>
              <li>{singlePoem.adjectives}</li>
              <li>{singlePoem.importantRelation}</li>
              <li>Loves to{" "} {singlePoem.loves}</li>
              <li>Who feels {singlePoem.feelings}</li>
              <li>And who is scared of {singlePoem.fears}</li>
              <li>Who {singlePoem.accomplishments}</li>
              <li>{singlePoem.expectations}</li>
              <li>Residence of {singlePoem.residence}</li>
              <li>{singlePoem.lastName}</li>
            </ul>
  
        </div>
        <div className="flex items-center gap-2 ml-24">
          <BiUpvote className={`cursor-pointer ${upvoted ? 'active' : ''}`} onClick={upvotePoem} style={upvoted !== false && {fill: 'red'}}/>
          <span>{upvoted ? singlePoem.upvotes + 1 : singlePoem.upvotes}</span>
          <BiDownvote className={`cursor-pointer ${downvoted ? 'active' : ''}`} onClick={downvotePoem} style={downvoted !== false && {fill: 'red'}} />
          <span>{downvoted ? singlePoem.downvotes +1 : singlePoem.downvotes}</span>
        </div>
      </div>
    </div>
  );
};

export default Modal;
