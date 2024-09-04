import Logout from '@/app/Logout';
import Link from 'next/link';
export default function DesktopNavLinks({email}) {
  return (
    <ul className="absolute right-0 flex flex-row space-x-6">
      <li className="text-xl hover:text-blue-900 hover:font-semibold flex items-center">
        <Link className="py-2 px-4 rounded-lg text-sm font-medium hover:underline underline-offset-4" href="/dashboard">
          Dashboard
        </Link>
      </li>
      <li className="text-xl hover:text-blue-900 hover:font-semibold">
        <Logout email={email}/>
      </li>
      {/* Add other navigation links */}
    </ul>
  );
}