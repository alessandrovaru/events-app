import Link from "next/link"
import Image from "next/image"
export const Header = async () => {
  return (
    <header className="px-4 lg:px-6 flex items-center h-[10dvh]">
      <Link className="flex items-center justify-center" href="#">
        <Image src="/images/logo.jpg" alt="Total Elite Training" width={40} height={40} />
        <span className="font-bold">Total Elite Training</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link className="py-2 px-4 rounded-lg text-sm font-medium hover:underline underline-offset-4" href="#">
          Clases
        </Link>
        <Link className="py-2 px-4 rounded-lg bg-white text-black hover:bg-gray-200 text-sm font-medium" href="/signin">
          Iniciar sesión
        </Link>
      </nav>
    </header>
  );
}