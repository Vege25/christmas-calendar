import React, { useEffect, useState } from 'react';
import { LoginProps } from '../interfaces/firebase';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  updateDoc,
  doc,
} from 'firebase/firestore';
import Header from '../components/headerComponent';
import Loading from '../components/loadingComonent';
import Login from './loginPage';
import { useAuthState } from 'react-firebase-hooks/auth';
import AreYouSureBucketComponent from '../components/areYouSureBucketComponent';

const BucketList: React.FC<LoginProps> = ({ firebase }) => {
  type BucketListItem = {
    id: string;
    text: string;
    importantLevel: number;
    completeDate: string;
    status: string; // Add the status property
    uid: string; // Add the uid property
  };

  if (!firebase) {
    return <div>Error: Firebase not available</div>;
  }

  const auth = getAuth(firebase);
  const firestore = getFirestore(firebase);

  const [user, loading] = useAuthState(auth);
  const [text, setText] = useState('');
  const [status, setStatus] = useState('');
  const [importantLevel, setImportantLevel] = useState<number | null>(null);
  const [completeDate, setCompleteDate] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [bucketList, setBucketList] = useState<BucketListItem[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [activeId, setActiveId] = useState('');
  const [totalCompleted, setTotalCompleted] = useState(0);

  useEffect(() => {
    if (user) {
      // Fetch bucket list items on component mount
      const unsubscribe = onSnapshot(
        collection(firestore, 'bucketList'),
        (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as BucketListItem[];

          // Calculate totalCompleted tasks
          const completedTasks = data.filter((item) => !!item.completeDate);
          setTotalCompleted(completedTasks.length);

          setBucketList(data);
        }
      );

      // Unsubscribe from snapshot listener when component unmounts
      return () => unsubscribe();
    }
  }, [user, firestore]);

  const handleAddBucketListItem = async (event: React.FormEvent) => {
    event.preventDefault();

    // Add a new document to the "bucketList" collection
    try {
      const bucketListRef = collection(firestore, 'bucketList');
      await addDoc(bucketListRef, {
        text,
        status,
        importantLevel,
        completeDate,
        createdAt: serverTimestamp(),
        uid: user?.uid,
      });

      // Reset form fields
      setText('');
      setStatus('');
      setImportantLevel(null);
      setCompleteDate('');
      setShowForm(false);
    } catch (error) {
      console.error('Error adding bucket list item:', error);
    }
  };

  if (loading) {
    return <Loading />;
  } else {
    if (!user) {
      return <Login firebase={firebase} />;
    }
  }
  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const handleReadyClick = (id: string, isDone: boolean) => {
    if (isDone) {
      return;
    }
    setActiveId(id);
    setShowConfirmation(true);
  };
  const handleConfirmDelete = async () => {
    setShowConfirmation(false);
    try {
      const itemRef = doc(firestore, 'bucketList', activeId);

      // Update status and completeDate based on checkbox state
      const updatedData = {
        status: status === 'done' ? '' : 'done',
        completeDate: status === 'done' ? null : serverTimestamp(),
      };

      await updateDoc(itemRef, updatedData);
    } catch (error) {
      console.error('Error updating bucket list item:', error);
    }
    setActiveId('');
  };
  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setActiveId('');
    // Optionally handle cancel logic or do nothing
  };

  return (
    <div className='max-w-xl mx-auto container-bucket'>
      <Header user={user} isGiftDisabled={false} />
      <div className='flex flex-col items-center justify-center gap-2 my-5'>
        <h3 className='text-2xl'>Meten ja Veetin</h3>
        <div className='flex flex-row items-center gap-4'>
          <h2 className='text-4xl'>Bucket list 2024</h2>
          <i className='text-4xl text-red-500 fa-regular fa-calendar'></i>
          <i className='text-4xl text-red-500 fa-regular fa-heart'></i>
        </div>
        <h4 className='text-md'>Suoritettu {totalCompleted} / 50</h4>
      </div>
      {/* Display Bucket List Items */}
      <div className='flex flex-col mx-2'>
        {bucketList.map((item, index) => (
          <div
            key={item.id}
            className='flex items-center justify-between p-4 mb-2 bg-gray-100 rounded-md'
          >
            <div className='flex items-center justify-start gap-2'>
              <p className='text-lg font-semibold'>
                {index + 1}
                {'. '}
                {item.text}
              </p>
              <div
                className={`w-4 h-4 rounded-full ${
                  item.importantLevel === 1 ? 'bg-green-500' : ''
                }${item.importantLevel === 2 ? 'bg-yellow-400' : ''}${
                  item.importantLevel === 3 ? 'bg-red-500' : ''
                }`}
              ></div>
            </div>
            <div className='flex gap-8'>
              <div className='group'>
                <i className='text-xl text-gray-500 fa-solid fa-circle-info'></i>
                <div className='absolute hidden p-3 -translate-x-full bg-gray-200 rounded-md w-42 group-hover:block'>
                  <p>
                    Tila:{' '}
                    {item.status === 'done' ? 'Suoritettu' : 'Ei suoritettu'}
                  </p>
                  <p>
                    {item.completeDate
                      ? 'Päivämäärä: ' +
                        (item.completeDate as any).toDate().toLocaleDateString()
                      : ''}
                  </p>
                </div>
              </div>
              <input
                type='checkbox'
                checked={item.status === 'done'}
                onChange={() =>
                  handleReadyClick(item.id, item.status === 'done')
                }
                className='w-6 h-6 border border-gray-300 rounded-md appearance-none checked:bg-green-500 checked:border-transparent focus:outline-none focus:ring focus:border-blue-300'
              />
            </div>
          </div>
        ))}
      </div>
      <div className='w-full px-2 mt-10 mb-28'>
        <div
          className={`flex items-center justify-between w-full px-6 py-2 bg-gray-300 rounded-tl-md rounded-tr-md ${
            !showForm ? 'rounded-bl-md rounded-br-md' : ''
          }`}
        >
          <label htmlFor='showFormBtn' className='w-full cursor-pointer'>
            Lisää bucket list tapahtuma
          </label>
          <button
            id='showFormBtn'
            className='text-2xl'
            onClick={handleShowForm}
          >
            {showForm ? '-' : '+'}
          </button>
        </div>
        {showForm && (
          <form
            onSubmit={handleAddBucketListItem}
            className='px-6 py-4 bg-slate-50 rounded-bl-md rounded-br-md'
          >
            {/* Input fields for the bucket list item */}
            <div className='mb-4'>
              <label
                htmlFor='text'
                className='block text-sm font-medium text-gray-700'
              >
                Teksti
              </label>
              <input
                type='text'
                id='text'
                name='text'
                value={text}
                required
                onChange={(e) => setText(e.target.value)}
                className='w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='importantLevel'
                className='block text-sm font-medium text-gray-700'
              >
                Tärkeysaste (Vihreä = vähiten tärkeä, keltainen = ei väliä,
                Punainen = tärkein)
              </label>
              <div className='flex items-center gap-2 mt-1'>
                <input
                  type='radio'
                  id='dot1'
                  name='importantLevel'
                  value='1'
                  checked={importantLevel === 1}
                  onChange={() => setImportantLevel(1)}
                  className='w-6 h-6 mr-1'
                  required
                />
                <label
                  htmlFor='dot1'
                  className='w-4 h-4 bg-green-500 dot-label' // Set the background color here
                ></label>

                <input
                  type='radio'
                  id='dot2'
                  name='importantLevel'
                  value='2'
                  checked={importantLevel === 2}
                  onChange={() => setImportantLevel(2)}
                  className='w-6 h-6 mx-1'
                />
                <label
                  htmlFor='dot2'
                  className='w-4 h-4 bg-yellow-400 dot-label' // Set the background color here
                ></label>

                <input
                  type='radio'
                  id='dot3'
                  name='importantLevel'
                  value='3'
                  checked={importantLevel === 3}
                  onChange={() => setImportantLevel(3)}
                  className='w-6 h-6 ml-1'
                  required
                />
                <label
                  htmlFor='dot3'
                  className='w-4 h-4 ml-1 bg-red-500 dot-label' // Set the background color here
                ></label>
              </div>
            </div>

            <button
              type='submit'
              className='px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600'
            >
              Lisää tapahtuma
            </button>
          </form>
        )}
      </div>
      {showConfirmation && (
        <AreYouSureBucketComponent
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default BucketList;
