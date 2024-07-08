import React from 'react';

const PrimaryButton = React.memo( ( { title, isLoading, ...props } ) => {
  return (
    <button
      type='submit'
      className={ `${isLoading ? 'opacity-40 cursor-not-allowed' : '' } min-w-[50%] flex mx-auto items-center justify-center py-2 px-4 mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-md shadow-purple-500 hover:bg-gradient-to-l hover:scale-105 active:scale-110 active:duration-0 transition ease-in-out delay-150 duration-300` }
      disabled={ isLoading }
      { ...props }
    >
      { title }
    </button>
  );
} );

export default PrimaryButton;