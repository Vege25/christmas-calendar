import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { collection, deleteDoc, doc, getFirestore } from 'firebase/firestore';
import AreYouSureComponent from './areYouSureComponent';

interface ProfileComponentProps {
  props: any;
  firebase: any;
}

const ProfileComponent: React.FC<ProfileComponentProps> = ({
  props,
  firebase,
}) => {
  const { photoURL, displayName, createdAt, uid, id } = props;
  const auth = getAuth(firebase);
  const isOwnPost = uid === auth.currentUser?.uid;
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };
  const handleConfirmDelete = async () => {
    setShowConfirmation(false);
    try {
      const firestore = getFirestore(firebase);
      const messagesCollection = collection(firestore, 'messages');
      const postDoc = doc(messagesCollection, id);

      await deleteDoc(postDoc);
      console.log('Post deleted successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  const handleCancelDelete = () => {
    setShowConfirmation(false);
    // Optionally handle cancel logic or do nothing
  };

  return (
    <>
      <div className='flex items-center justify-between m-2'>
        <div className='flex flex-row items-center justify-start gap-2'>
          <div className='tweet-image'>
            <img
              className='border-2 border-solid rounded-full w-14 h-14 border-dark'
              src={
                photoURL ||
                'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'
              }
              alt='Profile picture'
            />
          </div>
          <div className='text-lg tweet-text'>
            <h6>
              {displayName || 'Unknown'} -{' '}
              {(createdAt as any).toDate().toLocaleDateString()}
            </h6>
          </div>
        </div>
        {isOwnPost && (
          <div className='mr-3'>
            <div className=''>
              <button
                className='flex gap-2 px-3 py-1 transition ease-in-out delay-150 rounded-md group bg-slate-400'
                onClick={handleDeleteClick}
              >
                X<span className='hidden group-hover:block'>Poista muisto</span>
              </button>
            </div>
          </div>
        )}
      </div>
      {showConfirmation && (
        <AreYouSureComponent
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
};

export default ProfileComponent;
