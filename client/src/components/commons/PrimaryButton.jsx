import React from 'react';

const PrimaryButton = React.memo( ( { title, ...props } ) => {
  return (
    <button
      type='submit'
      className='w-full py-2 px-4 mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-md hover:bg-gradient-to-l active:opacity-75'
      { ...props }
    >
      { title }
    </button>
  );
} );

export default PrimaryButton;