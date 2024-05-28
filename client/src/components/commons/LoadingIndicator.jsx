import React from 'react';

const LoadingIndicator = React.memo( ( { loadingText } ) => {
  return (
    <div className='flex flex-col absolute z-30 top-0 left-0 right-0 bottom-0 m-auto border-2 border-gray-400 p-8 items-center justify-center h-fit rounded-2xl bg-[radial-gradient(#bbb,#444)] w-fit'>
      <div
        className='flex items-center justify-center rounded-full p-3 bg-[conic-gradient(indigo,purple,pink,white)] animate-[spin_200ms_linear_infinite]'
      >
        <div className='size-6 rounded-full bg-[radial-gradient(#eee,#444)]'></div>
      </div>
      <p>{ loadingText }</p>
    </div>
  );
} );

export default LoadingIndicator;