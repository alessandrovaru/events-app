import { Dumbbell, Wallet } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
export default function LogoLink() {
  return (
    <div className="text-center sm:mb-0 sm:ms-4">
      <Link className="flex items-center justify-start" href="#">
        <Dumbbell className="w-8 h-8 text-white mr-2" />
        <span className="font-bold">Craig Jones Seminars</span>
      </Link>
    </div>
  );
}