import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Loading from '../components/loadingComonent';
import { useAuthState } from 'react-firebase-hooks/auth';
import { LoginProps } from '../interfaces/firebase';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Login from './loginPage';
import Header from '../components/headerComponent';
import SettingsComponent from '../components/settingsComponent';

const Compose: React.FC<LoginProps> = ({ firebase }) => {
  interface MessageData {
    displayName: string | null;
    text: string;
    createdAt: any;
    uid: string;
    photoURL: string | null;
    imageUrl?: string; // Make imageUrl an optional property
  }
  if (!firebase) {
    return <div>Error: Firebase not available</div>;
  }

  const auth = getAuth(firebase);
  const firestore = getFirestore(firebase);
  const storage = getStorage(firebase);

  const [user, loading] = useAuthState(auth);
  const [value, setValue] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      // Handle authenticated user
      // You can perform additional actions when the user is authenticated
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  } else {
    if (!user) {
      return <Login firebase={firebase} />;
    }
  }

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Display image preview
      const reader = new FileReader();
      reader.onloadend = async () => {
        const img = new Image();
        img.src = reader.result as string;

        img.onload = async () => {
          // Create a canvas element to resize the image
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;

          // Set the canvas dimensions to the desired display size
          const targetWidth = 600; // Set the desired width
          const scaleFactor = targetWidth / img.width;
          canvas.width = targetWidth;
          canvas.height = img.height * scaleFactor;

          // Draw the image onto the canvas with the resized dimensions
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Convert the canvas content to a Base64-encoded string with reduced quality
          const resizedImageData = canvas.toDataURL('image/jpeg', 0.7); // Adjust quality as needed

          // Set the resized image preview
          setImagePreview(resizedImageData);

          // Create a custom File object with additional properties
          const resizedImageFile = new File(
            [await fetch(resizedImageData).then((res) => res.blob())],
            file.name,
            {
              lastModified: file.lastModified,
            }
          );

          // Set the resized image file to be uploaded
          setImage(resizedImageFile);
        };
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Your form submission logic
    const messageRef = collection(firestore, 'messages');
    const { uid, photoURL, displayName } = user;

    try {
      let postData: MessageData = {
        displayName,
        text: value,
        createdAt: serverTimestamp(),
        uid,
        photoURL,
      };

      if (image) {
        const storageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(storageRef, image);

        // Get the image URL
        const imageUrl = await getDownloadURL(storageRef);
        postData = { ...postData, imageUrl };
      }

      await addDoc(messageRef, postData);

      // Reset state
      setValue('');
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className='max-w-xl mx-auto compose'>
      <Header user={user} isGiftDisabled={false} />
      <form onSubmit={handleSubmit} className='pt-16 mx-4'>
        <div className='flex items-center justify-between pb-4 border-b border-gray-200 compose-header'>
          <div className='compose-back'>
            <a href='/' className='text-black hover:text-gray-700'>
              <i className='fa-solid fa-arrow-left'></i> Takaisin
            </a>
          </div>
          <div className='col-4'>&nbsp;</div>
        </div>
        <div className='mt-4 compose-body'>
          <div className='flex flex-col items-center justify-between mt-2 compose-image'>
            <div>
              <label
                htmlFor='image'
                className='block text-sm font-medium text-black'
              >
                Lataa kuva:
              </label>
              <input
                type='file'
                id='image'
                accept='image/*'
                placeholder='Lataa kuva'
                onChange={handleImageChange}
                className='p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
              />
            </div>
            {imagePreview && (
              <img
                src={imagePreview}
                alt='Selected Image'
                className='block object-cover w-40 h-40 mt-2 rounded-md'
              />
            )}
          </div>
          <div className='mt-4 compose-message'>
            <textarea
              name=''
              id=''
              placeholder='Lisää kuvateksti!'
              rows={5}
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
              }}
              className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
            ></textarea>
          </div>
        </div>
        <button
          type='submit'
          className='px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-600'
        >
          Luo muisto
        </button>
      </form>
      <SettingsComponent />
    </div>
  );
};

export default Compose;
