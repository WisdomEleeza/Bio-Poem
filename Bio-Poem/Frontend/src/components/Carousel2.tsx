import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LiaArrowLeftSolid, LiaArrowRightSolid } from "react-icons/lia";
import { getPopularPoems, setPoemSingleData, setShowModal } from "../store/poemSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect } from "react";
import user from '../assets/user.png'

export interface Poem {
  _id: string;
  firstName: string;
  lastName: string;
  adjectives: string;
  importantRelation: string;
  loves: string;
  feelings: string;
  fears: string;
  accomplishments: string;
  expectations: string;
  residence: string;
  upvotes: number;
  downvotes: number;
  backgroundTheme: string;
  profileImage: string;
  user: User
}

export interface User {
  _id?:string|null
  username: string
  profileImage: string
}


interface SampleArrowProps {
  onClick: () => void;
}

function SampleNextArrow({ onClick }: SampleArrowProps) {
  return (
    <div
      onClick={onClick}
      className="rounded-full border-2 border-[#F06A30] h-10 w-10 flex items-center justify-center ml-5 absolute -right-12 bottom-40 cursor-pointer"
    >
      <LiaArrowRightSolid />
    </div>
  );
}

function SamplePrevArrow({ onClick }: SampleArrowProps) {
  return (
    <div
      onClick={onClick}
      className="rounded-full border-2 border-[#F06A30] h-10 w-10 flex items-center justify-center mr-5 absolute -left-12 bottom-40 cursor-pointer"
    >
      <LiaArrowLeftSolid />
    </div>
  );
}

const Carousel2: React.FC = () => {
  const dispatch = useAppDispatch();

  const popularPoems = useAppSelector((state) => state.poem.popularPoems);

  const handleShowSinglePoem = (data:Poem) => {
    dispatch(setPoemSingleData(data)) 
    dispatch(setShowModal());    
  };

  const openSearch = useAppSelector((state)=>state.search.openSearch)
  
  

  useEffect(() => {
    dispatch(getPopularPoems());
  }, [dispatch]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow onClick={() => {}} />,
    prevArrow: <SamplePrevArrow onClick={() => {}} />,
    responsive: [
      {
        breakpoint: 1444,
        settings: {
          slidesToShow: openSearch ? 2 : 3,
          slidesToScroll: openSearch ? 2 : 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: openSearch ? 2 : 3,
          slidesToScroll: openSearch ? 2 : 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const toggle = useAppSelector((state)=>state.darkMode.toggle)
  return (
    <div className="h-[500px] w-auto mt-5 mr-auto">
      <h1 className="text-2xl font-medium py-7">Popular Poems</h1>
      <Slider {...settings} className="">
        {popularPoems?.map((ele) => (
          <div
            className="overflow-hidden border-4 border-[#F06A30] rounded-md "
            key={ele._id}
          >
            <div className={`group [perspective:1000px] ${toggle ? 'bg-black' : ''}`}>
              <div className="inset-0 transition-all duration-1000 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className="bg-white">
                  <img
                    className="object-cover w-[100%] h-[250px]"
                    src={user}
                    alt=""
                  />
                </div>
                <div className={`text-center py-5 `} >
                  <h2 className={`text-[#646363] font-semibold ${toggle ? 'text-white' :'text-[#646363]'}`}>
                    {" "}
                    {ele.firstName} {ele.lastName}
                  </h2>
                  <p
                    onClick={() => dispatch(setShowModal())}
                    className="text-[#F90A0A] cursor-pointer"
                  >
                    Bio poem
                  </p>
                </div>

                <div className="absolute inset-0 h-full w-full rounded-xl bg-white px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <div className="flex flex-col min-h-full items-center justify-center py-10">
                    <ul className="text-[#646363] text-lg font-light">
                        <li>{ele.adjectives}</li>
                        <li>{ele.importantRelation}</li>
                        <li>Loves to{" "} {ele.loves}</li>
                      </ul>
                    <button
                      onClick={() => handleShowSinglePoem(ele)}
                      className="mt-2 rounded-md border-[#A5A2A2] border-2 bg-[#F06A30] py-3 px-7 text-white"
                    >
                      View Poem
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      {/* <Modal /> */}
    </div>
  );
};

export default Carousel2;
