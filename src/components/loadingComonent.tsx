import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FC } from 'react';

const Loading: FC = () => {
  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='row'>
        <div className='w-full text-3xl text-primary'>
          <FontAwesomeIcon icon={faSpinner} spin />
        </div>
      </div>
    </div>
  );
};

export default Loading;
