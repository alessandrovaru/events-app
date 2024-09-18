import Image from "next/image";
import { Champs } from "../Champs";
import listStorageData from "@/firebase/firestore/listData";

export async function Instructors() {

  const instructorsData = await listStorageData("instructors");
  return (
    <>
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 flex items-center justify-center bg-white">
      <div className="container px-4 md:px-6 text white">
        <h2 className="text-xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-black">Nuestros Instructores</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-6">
          {instructorsData.map((instructor, index) => (
            <div key={index} className="relative flex flex-col items-start justify-end space-y-2 border-gray-800 p-4 bg-gray-400 h-[600px] rounded-lg hover:bg-gray-200 transition duration-300 cursor-pointer">
              <Image src={instructor.image_url} alt={`Instructor ${index + 1}`} className="h-full w-full mb-2 object-cover rounded-lg z-0 mix-blend-multiply" fill />
              <h2 className="text-xl font-bold z-10 text-white">{instructor.first_name + " " + instructor.last_name}</h2>
              <p className="text-sm text-white  z-10">{instructor.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>  
    </>
  );
}