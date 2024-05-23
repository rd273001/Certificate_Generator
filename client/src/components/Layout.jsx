import React, { useState } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';

const Layout = () => {
  const [role, setRole] = useState( 'Admin' );
  return (
    <div className='min-h-lvh flex flex-col'>
      <header className='bg-gradient-to-r from-purple-500 to-pink-500 py-3 md:px-8 px-4'>
        <nav className='flex justify-between items-center'>
          <Link to='/' className='text-white font-bold sm:text-2xl text-xl hover:opacity-85 active:opacity-70'>
            Certificate Generator
          </Link>
          <div>
            {
              role === 'Admin' ? <NavLink
                to={ '/admin' }
                className={ ( { isActive } ) => `sm:py-1.5 py-1 px-2 sm:px-5 bg-white text-purple-600 font-semibold rounded-md hover:bg-opacity-70 active:opacity-70 ${ isActive ? setRole( 'User' ) : '' }` }
              >
                Admin
              </NavLink>
                : <NavLink
                  to={ '/' }
                  className={ ( { isActive } ) => `sm:py-1.5 py-1 px-2 sm:px-5 bg-white text-purple-600 font-semibold rounded-md hover:bg-opacity-70 active:opacity-70 ${ isActive ? setRole( 'Admin' ) : '' }` }
                >
                  Go to Home
                </NavLink>
            }
          </div>
        </nav>
      </header>

      <main className='flex-grow bg-gradient-to-tl from-gray-300 to-white md:px-8 px-4'>
        <Outlet />
      </main>

      <footer className='bg-gray-800 py-4 md:px-8 px-4 text-center text-white'>
        <p>&copy; { new Date().getFullYear() } Certificate Generator. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;