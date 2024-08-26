export const Testimonials = async () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">What Our Fighters Say</h2>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 border p-4 rounded-lg">
            <p className="text-sm text-gray-500 italic">"Total Elite Training has transformed my skills and confidence. The coaches here are world-class!"</p>
            <p className="text-sm font-bold">- Sarah J., Amateur MMA Fighter</p>
          </div>
          <div className="flex flex-col items-center space-y-2 border p-4 rounded-lg">
            <p className="text-sm text-gray-500 italic">"I've never felt stronger or more disciplined. This gym is like a second home to me."</p>
            <p className="text-sm font-bold">- Mike T., BJJ Enthusiast</p>
          </div>
          <div className="flex flex-col items-center space-y-2 border p-4 rounded-lg">
            <p className="text-sm text-gray-500 italic">"From beginner to competitor, Total Elite Training has supported me every step of the way."</p>
            <p className="text-sm font-bold">- Alex R., Muay Thai Practitioner</p>
          </div>
        </div>
      </div>
    </section>
  );
}