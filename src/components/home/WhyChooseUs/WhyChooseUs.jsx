import { Dumbbell, Users, Trophy, Swords, Medal, Baby } from "lucide-react";


const data = {
  title: "¿Por qué elegirnos?",
  features: [
    {
      icon: Dumbbell,
      title: "Entrenadores Expertos",
      description: "Aprende de profesionales experimentados de MMA"
    },
    {
      icon: Swords,
      title: "Entrenamiento Diverso",
      description: "MMA, Kickboxing, BJJ y más"
    },
    {
      icon: Trophy,
      title: "Resultados Comprobados",
      description: "Alcanza tus objetivos de fitness y MMA"
    },
    {
      icon: Users,
      title: "Comunidad de Apoyo",
      description: "Entrena en un ambiente motivador y amigable"
    },
    {
      icon: Medal,
      title: "Campeones Mundiales",
      description: "Entrena con campeones mundiales de Jiu-Jitsu"
    },
    {
      icon: Baby,
      title: "Clases de Niños",
      description: "Clases de Jiu-Jitsu para niños de 5 a 12 años"
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
        <div className={`grid gap-10 sm:grid-cols-3`}>
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