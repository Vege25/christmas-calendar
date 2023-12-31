import React, { useEffect, useState } from 'react';

interface SettingsComponentProps {
  // Define your component props here
}

const SettingsComponent: React.FC<SettingsComponentProps> = () => {
  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    // Check local storage for the "gift" item and set the initial state
    const storedValue = localStorage.getItem('gift');
    if (storedValue !== null) {
      setIsChecked(storedValue === 'true');
    }
  }, []);

  const handleCheckboxChange = () => {
    const newValue = !isChecked;

    // Update local storage
    localStorage.setItem('gift', newValue.toString());

    // Update state
    setIsChecked(newValue);
  };

  return (
    <div className='p-4'>
      <div className='mb-4 text-2xl font-bold text-center'>Asetukset</div>
      <div className='mb-2'>
        <div className='mb-2 text-lg font-semibold'>
          Joululahja
          <span className='ml-2 text-gray-700'>
            Haluatko nähdä joululahjan? Voit piilottaa sen tästä.
          </span>
        </div>
      </div>
      <label className='flex items-center space-x-2'>
        <input
          type='checkbox'
          checked={isChecked}
          onChange={handleCheckboxChange}
          className='text-blue-500 form-checkbox'
        />
        <span className='text-gray-700'>Näe lahja</span>
      </label>
    </div>
  );
};

export default SettingsComponent;
