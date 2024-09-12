import listData from '@/firebase/firestore/listData';
import { useState, useEffect } from 'react';

const useAdminStatus = (uid) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function fetchDbUser() {
      const users = await listData('users');
      const currentUser = users.find(user => user.id === uid);
      if (currentUser && currentUser.role === 'admin') {
        setIsAdmin(true);
      }
    }
    fetchDbUser();
  }, [uid]);

  return isAdmin;
};

export default useAdminStatus;