import { Dumbbell, Users, Trophy, Swords } from "lucide-react";

const data = {
  title: "Why Choose Us",
  features: [
    {
      icon: Dumbbell,
      title: "Expert Trainers",
      description: "Learn from experienced MMA professionals"
    },
    {
      icon: Users,
      title: "Supportive Community",
      description: "Train in a motivating, friendly environment"
    },
    {
      icon: Trophy,
      title: "Proven Results",
      description: "Achieve your fitness and MMA goals"
    },
    {
      icon: Swords,
      title: "Diverse Training",
      description: "Boxing, Muay Thai, BJJ, and more"
    }
  ]
};

export const WhyChooseUs = async () => {
  const { title, features } = data;
  const colCount = features.length;

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 flex items-center justify-center">
      <div className="container px-4 md:px-6 text-black">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">{title}</h2>
        <div className={`grid gap-10 sm:grid-cols-2 md:grid-cols-${colCount}`}>
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
              <feature.icon className="h-12 w-12 mb-2 text-red-600" />
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-sm text-gray-500 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};