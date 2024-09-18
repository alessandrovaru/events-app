import Logout from "@/app/Logout";
import { X } from "lucide-react";
import Link from "next/link";

export default function MobileDrawer({ isOpen, onClose, email }) {
  return (
    <div
      className={`fixed flex flex-col justify-center items-center z-10 top-0 right-0 h-full w-full bg-white text-black transition-transform duration-300 transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <button className="absolute right-7 top-4 p-3" onClick={onClose}>
        <X className="text-5xl" />
      </button>
      <ul className="flex flex-col justify-center items-center space-y-4">
        <li className="text-xl hover:text-blue-900 hover:font-semibold">
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li className="text-xl hover:text-blue-900 hover:font-semibold">
          <Logout email={email} noProfile={true} />
        </li>
        {/* Add other navigation links */}
      </ul>
    </div>
  );
}