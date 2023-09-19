import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './App.css'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import { CreatePoem } from './pages/CreatePoem'
import { useAppSelector } from './store/store'
import { GetStarted } from "./pages/GetStarted"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';




function App() {
  const toggle = useAppSelector((state)=> state.darkMode.toggle)
  const showModal = useAppSelector((state)=>state.poem.showModal)


  return (
    <div className={`${toggle ? 'bg-[#121212E5] text-[#fff]': ''} ${showModal ? 'overflow-y-hidden' : ''}`}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/create' element={<CreatePoem/>}/>
          <Route path='/get-started' element={<GetStarted/>}/>
        </Routes>
        <ToastContainer/>
      </BrowserRouter>
    </div>
  )
}

export default App
