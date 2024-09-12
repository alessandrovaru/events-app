import Logout from '@/app/Logout';
import listData from '@/firebase/firestore/listData';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DesktopNavLinks({ email, uid }) {
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

  return (
    <ul className="absolute right-0 flex flex-row space-x-6">
      <li className="text-xl hover:text-blue-900 hover:font-semibold flex items-center">
        <Link className="py-2 px-4 rounded-lg text-sm font-medium hover:underline underline-offset-4" href="/dashboard">
          Dashboard
        </Link>
      </li>
      {isAdmin && (
        <li className="text-xl hover:text-blue-900 hover:font-semibold flex items-center">
          <Link className="py-2 px-4 rounded-lg text-sm font-medium hover:underline underline-offset-4" href="/admin">
            Admin
          </Link>
        </li>
      )}
      <li className="text-xl hover:text-blue-900 hover:font-semibold">
        <Logout email={email} />
      </li>
      {/* Add other navigation links */}
    </ul>
  );
}