import { PlusCircle } from 'lucide-react';

export const AddNewModal = async () => {
  return (
    <div className="relative course-card p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="absolute bg-black h-full w-full top-0 left-0 opacity-50 hover:opacity-80 transition-opacity duration-300 flex items-center justify-center rounded-lg cursor-pointer">
        <PlusCircle />
      </div>
    </div>
  );
};