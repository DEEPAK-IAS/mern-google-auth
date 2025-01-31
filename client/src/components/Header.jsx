import React, {useState, useRef} from 'react'
import '../styles/Header.css'
import { Link, useNavigate } from 'react-router-dom';
import { IoMdMenu, IoMdClose } from 'react-icons/io';
import userIcon from "../assets/images/avatar.png"
import { getState } from '../utils/state';

const Header = () => {

  const navBarRef = useRef();
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNavBar = () => {
    setIsNavOpen((previousState) => !previousState)
    navBarRef.current.classList.toggle("d-none");
  }
  const userInfo = JSON.parse(getState("user_info"));
  return (
    <header className='Header' style={{zIndex: 100}}>
      <h2>MERN GOOGLE AUTH</h2> 
      { window.location.pathname === "/admin" && <input type="text" placeholder='Search' />}
      <nav ref={navBarRef} className='d-none'>
        <Link to="/" className='link'>Home</Link>
        <Link to="/about" className='link'>About</Link>
        <Link to="/contact" className='link'>Contact</Link>
        {userInfo ? (
          <img src={userInfo.avatar || userIcon} alt="userIcon" id='userIcon' referrerPolicy="no-referrer" onClick={() => navigate("/profile")}/>
        ) : (
          <>
            <Link to="/signin" className='link'>Signin</Link>
            <Link to="/signup" className='link'>Signup</Link>
          </>
        )}
        
      </nav>
      <button 
        className='toggleNav' 
        type='button'
        onClick={handleNavBar}
      >
        {isNavOpen ? <IoMdClose /> : <IoMdMenu />}
      </button>

    </header>
  )
};

export default Header
