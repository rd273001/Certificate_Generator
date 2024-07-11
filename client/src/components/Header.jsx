import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';


const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleRole = () => {
    // Determine the target route based on the current location
    const targetRoute = location.pathname === '/' ? '/admin' : '/';
    navigate( targetRoute );   // Navigate to the target route
  };

  return (
    <header className='flex justify-between w-full items-center bg-gradient-to-r from-purple-500 to-pink-500 py-2 md:px-8 px-4 shadow-black/15 shadow-md drop-shadow'>

      <Link to='/' className='text-white font-bold sm:text-2xl text-xl hover:opacity-85 active:opacity-70'>
        Certificate Generator
      </Link>
      <Link
        to={ location.pathname === '/' ? '/admin' : '/' }
        className='sm:py-1.5 py-1 px-2 sm:px-5 bg-white text-purple-600 font-semibold rounded-md hover:bg-opacity-70 active:scale-105'
        onClick={ handleRole }
      >
        { location.pathname === '/' ? 'Admin' : 'Go to Home' }
      </Link>

    </header>
  );
};

export default Header;