import Image from "next/image"

export const Hero = async () => {
  return (
    <section className="w-full h-[75dvh] bg-black text-white flex items-center justify-center">
        <div className="container px-4 md:px-6 h-full w-full flex items-center justify-center">
          <div className="grid h-full grid-cols-1 md:grid-cols-2 gap-6 items-center py-6 md:py-12 lg:py-24">
            <div className="flex flex-col space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Unleash Your Inner Fighter
                </h1>
                <p className="max-w-[600px] text-gray-300 md:text-xl">
                  Join Total Elite Training and master the art of MMA. World-class coaches, state-of-the-art facilities, and a supportive community await you.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-black hover:bg-gray-200">Start Your Journey</button>
                <button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                  View Schedule
                </button>
              </div>
            </div>
            <div className="relative flex justify-center md:justify-end h-full w-full ">
              <Image
                src="/images/main.jpg"
                alt="MMA Fighter"
                fill
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>
  );
}