import { Dumbbell, Users, Trophy, Swords } from "lucide-react"

export const WhyChooseUs = async () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Why Choose Us</h2>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
            <Dumbbell className="h-12 w-12 mb-2 text-red-600" />
            <h3 className="text-xl font-bold">Expert Trainers</h3>
            <p className="text-sm text-gray-500 text-center">Learn from experienced MMA professionals</p>
          </div>
          <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
            <Users className="h-12 w-12 mb-2 text-red-600" />
            <h3 className="text-xl font-bold">Supportive Community</h3>
            <p className="text-sm text-gray-500 text-center">Train in a motivating, friendly environment</p>
          </div>
          <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
            <Trophy className="h-12 w-12 mb-2 text-red-600" />
            <h3 className="text-xl font-bold">Proven Results</h3>
            <p className="text-sm text-gray-500 text-center">Achieve your fitness and MMA goals</p>
          </div>
          <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
            <Swords className="h-12 w-12 mb-2 text-red-600" />
            <h3 className="text-xl font-bold">Diverse Training</h3>
            <p className="text-sm text-gray-500 text-center">Boxing, Muay Thai, BJJ, and more</p>
          </div>
        </div>
      </div>
    </section>
  );
}