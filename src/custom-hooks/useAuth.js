import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase.config';

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Kiểm tra xem user có phải là admin hay không
        // const salesRef = db.collection('roles');
        // salesRef.get().then((querySnapshot) => {
        //   querySnapshot.forEach((doc) => {
        //     if (doc.data().uid === user.uid) {
        //       setCurrentUser({ ...user, role: 'admin' });
        //       return;
        //     }
        //   });
        //   setCurrentUser(user);
        // });
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  return {
    currentUser,
  };
};