import Link from "next/link"
import { Swords } from "lucide-react"
export const Header = async () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" href="#">
        <Swords className="h-6 w-6 mr-2" />
        <span className="font-bold">Total Elite Training</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
          Classes
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
          Schedule
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
          About
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
          Contact
        </Link>
      </nav>
    </header>
  );
}