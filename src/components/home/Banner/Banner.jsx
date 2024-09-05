import Image from "next/image";

export function Banner() {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32  flex items-center justify-center bg-black">
      <Image src={'/images/banner.jpg'} alt={`banner`} className="h-full w-full mb-2 object-cover z-0" fill />
    </section>
  );
}