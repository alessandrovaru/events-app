import Image from "next/image";

const champsData = [
  {
    name: "Barbara Felizola",
    image: "/images/barb.jpg",
    description: "Medalla de oro en el World Master de Jiu-Jitsu 2024"
  }
];

export function Champs() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32  flex items-center justify-center bg-black">
      <div className="container px-4 md:px-6 text white">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-white">Campeones Mundiales</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5">
          {champsData.map((champ, index) => (
            <div key={index} className="relative flex flex-col items-start justify-end space-y-2 border-gray-800 p-4 bg-gray-400 h-[600px] rounded-lg hover:bg-gray-200 transition duration-300 cursor-pointer">
              <Image src={champ.image} alt={`Champ ${index + 1}`} className="h-full w-full mb-2 object-cover rounded-lg z-0 mix-blend-multiply" fill />
              <h2 className="text-3xl font-bold z-10 text-white">{champ.name}</h2>
              <p className="text-sm text-white  z-10">{champ.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}