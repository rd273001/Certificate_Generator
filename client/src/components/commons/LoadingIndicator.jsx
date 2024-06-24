import React from 'react';

const LoadingIndicator = React.memo( ( { loadingText } ) => {
  return (
    <div className='flex flex-col items-center justify-center fixed z-30 top-0 left-0 right-0 bottom-0 m-auto border-2 border-gray-400 py-8 px-12 size-fit rounded-2xl bg-[radial-gradient(#bbb,#444)]'>
      <div className='flex p-3 bg-[conic-gradient(#fff,#ec4899,#a855f7,#581c87)] rounded-full animate-[spin_350ms_linear_infinite] duration-1000'>
        <div
          className='rounded-full p-5 bg-[radial-gradient(#eee,#444)] animate-[spin_300ms_linear_infinite_reverse]'
        >
          <div className='size-4 -m-4 rounded-full bg-[radial-gradient(#aaa,#222)]'></div>
        </div>
      </div>
      <p className='mt-1 font-medium text-lg'>{ loadingText }</p>
    </div>
  );
} );

export default LoadingIndicator;