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
      } catch (error) {
        console.error('Error getting documents: ', error);
      }
    };

    fetchMessages();
  }, [firebase]);

  const view = () => {
    return (
      <div>
        {messages.map((msg) => (
          <Tweet key={msg.id} message={msg} firebase={firebase} />
        ))}
      </div>
    );
  };

  return <>{loading ? <Loading /> : view()}</>;
};

export default Tweets;
