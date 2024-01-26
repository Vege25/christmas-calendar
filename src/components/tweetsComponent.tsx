import React, { useState, useEffect } from 'react';
import Tweet from './tweetComponent';
import Loading from './loadingComonent';
import { LoginProps } from '../interfaces/firebase';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore';

interface Message {
  id: string;
  uid: string;
  displayName: string;
  photoURL: string;
  imageUrl?: string;
  text: string;
  createdAt: any; // You might want to use a specific type for the createdAt property
}

const Tweets: React.FC<LoginProps> = ({ firebase }) => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [visibleMessages, setVisibleMessages] = useState<number>(10);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const firestore = getFirestore(firebase);
        const messagesCollection = collection(firestore, 'messages');
        const q = query(
          messagesCollection,
          orderBy('createdAt', 'desc'),
          limit(100)
        );
        const querySnapshot = await getDocs(q);

        const fetchedMessages: Message[] = [];
        querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
          const data = doc.data();
          fetchedMessages.push({
            id: doc.id,
            uid: data.uid,
            displayName: data.displayName,
            photoURL: data.photoURL,
            text: data.text,
            imageUrl: data.imageUrl,
            createdAt: data.createdAt,
          });
        });

        setMessages(fetchedMessages);
        setLoading(false);

        if (querySnapshot.size > 0) {
          setLastVisible(querySnapshot.docs[querySnapshot.size - 1]);
        }
      } catch (error) {
        console.error('Error getting documents: ', error);
      }
    };

    fetchMessages();
  }, [firebase]);

  const loadMoreMessages = async () => {
    try {
      const firestore = getFirestore(firebase);
      const messagesCollection = collection(firestore, 'messages');
      const q = query(
        messagesCollection,
        orderBy('createdAt', 'desc'),
        startAfter(lastVisible),
        limit(10)
      );
      const querySnapshot = await getDocs(q);

      const newMessages: Message[] = [];
      querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        const data = doc.data();
        newMessages.push({
          id: doc.id,
          uid: data.uid,
          displayName: data.displayName,
          photoURL: data.photoURL,
          text: data.text,
          imageUrl: data.imageUrl,
          createdAt: data.createdAt,
        });
      });

      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
      setVisibleMessages((prevVisibleMessages) => prevVisibleMessages + 10);

      if (querySnapshot.size > 0) {
        setLastVisible(querySnapshot.docs[querySnapshot.size - 1]);
      }
    } catch (error) {
      console.error('Error getting more documents: ', error);
    }
  };

  const view = () => {
    const visibleMessagesList = messages.slice(0, visibleMessages);

    return (
      <>
        <div className=''>
          {visibleMessagesList.map((msg) => (
            <Tweet key={msg.id} message={msg} firebase={firebase} />
          ))}
        </div>
        {visibleMessagesList.length < messages.length && (
          <div className='pb-4 m-auto'>
            <button
              className='p-2 text-xl border-2 border-black border-solid bg-light rounded-xl'
              onClick={loadMoreMessages}
            >
              Lataa lisää muistoja
            </button>
          </div>
        )}
      </>
    );
  };

  return <>{loading ? <Loading /> : view()}</>;
};

export default Tweets;
