import Image from 'next/image';
import Link from 'next/link';
export default function LogoLink() {
  return (
    <div className="text-center sm:mb-0 sm:ms-4">
      <Link className="flex items-center justify-start" href="#">
        <Image src="/images/logo.jpg" alt="Total Elite Training" width={40} height={40} />
        <span className="font-bold">Total Elite Training</span>
      </Link>
    </div>
  );
}