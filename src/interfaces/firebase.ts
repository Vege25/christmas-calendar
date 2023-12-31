interface LoginProps {
  firebase: any;
}
interface User {
  user: any;
  isGiftDisabled: any;
}
interface Message {
  message: Message;
}

interface Message {
  id: string;
  uid: string;
  displayName: string;
  photoURL: string;
  text: string;
  imageUrl?: string; // Make imageUrl optional by adding a question mark
  createdAt: any;
}
interface MessageObj {
  message: any;
  firebase: any;
}
export type { LoginProps, User, Message, MessageObj };
