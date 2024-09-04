import { Menu } from 'lucide-react';

export default function MobileMenuButton({ onClick }) {
  return (
    <button className="absolute right-0 p-2" onClick={onClick}>
      <Menu className="text-4xl" />
    </button>
  );
}