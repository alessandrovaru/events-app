import listStorageData from "@/firebase/storage/listStorageData";
import Image from "next/image"
import Link from "next/link";

// const data = {
//   title: "Unleash Your Inner Fighter",
//   description: "Join Total Elite Training and master the art of MMA. World-class coaches, state-of-the-art facilities, and a supportive community await you.",
//   buttons: [
//     { text: "Get Started", variant: "primary" },
//     { text: "View Schedule", variant: "outline" }
//   ],
//   image: {
//     src: "/images/main.jpg",
//     alt: "Hero Image"
//   }
// }

const dataFb = {
  buttons: [
    { text: "Empieza Ahora", variant: "primary" },
    { text: "Horarios", variant: "outline" }
  ]
}

export const Hero = async ({data}) => {
  const {  buttons } = dataFb;
  const { heroTitle: title, heroDescription: description, heroImage: image } = data;

  return (
    <section className="w-full min-h-[75dvh] bg-black text-white flex items-center justify-center">
      <div className="container px-4 md:px-6 h-full w-full flex items-center justify-center">
        <div className="grid h-full grid-cols-1 md:grid-cols-2 gap-6 items-center py-6 md:py-12 lg:py-24">
          <div className="flex flex-col space-y-4">
            <div className="space-y-2">
              <h1 className="text-xl font-bold sm:text-4xl md:text-5xl lg:text-6xl/none">
                {title}
              </h1>
              <p className="max-w-[600px] text-gray-300 md:text-xl">
                {description}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              {buttons.map((button, index) => (
                <Link
                  href={button.variant === "primary" ? "/login" : "/dashboard"}
                  key={index}
                  className={` text-center py-2 px-4 rounded-lg ${button.variant === "primary" ? "bg-white text-black hover:bg-gray-200" : "text-white border-white hover:bg-white hover:text-black"}`}
                >
                  {button.text}
                </Link>
              ))}
            </div>
          </div>
          <div className="relative flex justify-center md:justify-end w-full order-first sm:order-last h-[200px] md:h-[400px] lg:h-[500px]">
            <Image className="object-cover object-center rounded-lg" src={image} alt={'hero image'} fill />
          </div>
        </div>
      </div>
    </section>
  );
}