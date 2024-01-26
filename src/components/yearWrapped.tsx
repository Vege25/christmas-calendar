import React, { useState } from 'react';

interface YearWrappedProps {
  // Add any props you need for your component here
}

const YearWrapped: React.FC<YearWrappedProps> = () => {
  const [yearWrapped, setYearWrapped] = useState(false);
  const handleYearWrapped = () => {
    setYearWrapped(!yearWrapped);
  };
  return (
    <div
      className='w-full h-64 px-2 cursor-pointer sm:h-72 wrapped-obj'
      onClick={handleYearWrapped}
    >
      {!yearWrapped && (
        <div
          className='relative w-full h-full overflow-hidden bg-black bg-center bg-cover rounded-xl'
          style={{
            backgroundImage: 'url("/images/2023-wrapped.webp")',
            backgroundPosition: '50% 40%', // Add background position here
          }}
        >
          <div
            className='absolute bottom-0 w-full p-2 text-center text-light'
            style={{ backdropFilter: 'blur(3px)' }}
          >
            <h3 className='text-xl'>Mette & Veeti vuosi</h3>
            <h2 className='text-3xl'>2023 WRAPPED</h2>
          </div>
        </div>
      )}

      {yearWrapped && (
        <div className='relative w-full h-64 overflow-hidden bg-black bg-center bg-cover rounded-xl'>
          <div className='relative h-full'>
            <iframe
              className='absolute top-0 left-0 w-full h-full'
              src={`https://www.youtube.com/embed/vef31aECM6A`}
              title='YouTube Video'
              frameBorder='0'
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default YearWrapped;
