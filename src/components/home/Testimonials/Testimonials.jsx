const data = {
  title: "What Our Fighters Say",
  testimonials: [
    {
      quote: "Total Elite Training has transformed my skills and confidence. The coaches here are world-class!",
      author: "Sarah J., Amateur MMA Fighter"
    },
    {
      quote: "I've never felt stronger or more disciplined. This gym is like a second home to me.",
      author: "Mike T., BJJ Enthusiast"
    },
    {
      quote: "From beginner to competitor, Total Elite Training has supported me every step of the way.",
      author: "Alex R., Muay Thai Practitioner"
    }
  ]
};

export const Testimonials = async () => {
  const { title, testimonials } = data;
  const colCount = testimonials.length;

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">{title}</h2>
        <div className={`grid gap-10 sm:grid-cols-2 md:grid-cols-${colCount}`}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col items-center space-y-2 border p-4 rounded-lg">
              <p className="text-sm text-gray-500 italic">&lsquo;{testimonial.quote}&lsquo;</p>
              <p className="text-sm font-bold">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};