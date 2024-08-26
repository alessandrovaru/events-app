import Image from "next/image"

const data = {
  title: "Unleash Your Inner Fighter",
  description: "Join Total Elite Training and master the art of MMA. World-class coaches, state-of-the-art facilities, and a supportive community await you.",
  buttons: [
    { text: "Get Started", variant: "primary" },
    { text: "View Schedule", variant: "outline" }
  ],
  image: {
    src: "/images/main.jpg",
    alt: "Hero Image"
  }
}

export const Hero = async () => {
  const { title, description, buttons, image } = data;

  return (
    <section className="w-full h-[75dvh] bg-black text-white flex items-center justify-center">
      <div className="container px-4 md:px-6 h-full w-full flex items-center justify-center">
        <div className="grid h-full grid-cols-1 md:grid-cols-2 gap-6 items-center py-6 md:py-12 lg:py-24">
          <div className="flex flex-col space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                {title}
              </h1>
              <p className="max-w-[600px] text-gray-300 md:text-xl">
                {description}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              {buttons.map((button, index) => (
                <button
                  key={index}
                  className={`py-2 px-4 rounded-lg ${button.variant === "primary" ? "bg-white text-black hover:bg-gray-200" : "text-white border-white hover:bg-white hover:text-black"}`}
                >
                  {button.text}
                </button>
              ))}
            </div>
          </div>
          <div className="relative flex justify-center md:justify-end h-full w-full">
            <Image src={image.src} alt={image.alt} layout="fill" objectFit="cover" />
          </div>
        </div>
      </div>
    </section>
  );
}