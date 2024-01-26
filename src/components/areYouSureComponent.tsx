import React, { useState } from 'react';

interface AreYouSureComponentProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const AreYouSureComponent: React.FC<AreYouSureComponentProps> = ({
  onConfirm,
  onCancel,
}) => {
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  console.log(isDeleteClicked);
  const handleDeleteClick = () => {
    setIsDeleteClicked(true);
    onConfirm(); // Call the onConfirm callback when "Delete" is clicked
  };

  const handleCancelClick = () => {
    setIsDeleteClicked(false);
    onCancel(); // Call the onCancel callback when "Cancel" is clicked
  };

  return (
    <div className='fixed m-auto -translate-x-1/2 -transate-y-1/2 top-1/2 left-1/2'>
      <div className='bg-white rounded-lg shadow-lg w-80'>
        <div className='px-4 py-2 text-center'>
          <h2 className='text-base font-semibold'>Oletko varma?</h2>
          <p className='text-sm text-gray-500'>
            Haluatko varmasti poistaa muiston? Muistoa ei pysty palauttamaan.
          </p>
        </div>
        <div className='flex justify-end px-4 py-2 bg-gray-100'>
          <button
            onClick={handleCancelClick}
            className='px-4 py-2 mr-2 text-sm bg-gray-300 rounded-lg hover:bg-gray-400 focus:outline-none'
          >
            Peruuta
          </button>
          <button
            onClick={handleDeleteClick}
            className='px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none'
          >
            Poista
          </button>
        </div>
      </div>
    </div>
  );
};

export default AreYouSureComponent;
