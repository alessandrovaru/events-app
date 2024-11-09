import { Menu } from 'lucide-react';

export default function MobileMenuButton({ onClick }) {
  return (
    <button className="relative " onClick={onClick}>
      <Menu className="text-4xl" />
    </button>
  );
}