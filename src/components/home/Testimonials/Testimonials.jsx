const data = {
  title: "Lo Que Dicen Nuestros Luchadores",
  testimonials: [
    {
      quote: "Total Elite Training ha transformado mis habilidades y confianza. ¡Los entrenadores aquí son de clase mundial!",
      author: "Sarah J., Luchadora Amateur de MMA"
    },
    {
      quote: "Nunca me he sentido más fuerte o más disciplinado. Este gimnasio es como un segundo hogar para mí.",
      author: "Mike T., Entusiasta de BJJ"
    },
    {
      quote: "Desde principiante hasta competidor, Total Elite Training me ha apoyado en cada paso del camino.",
      author: "Alex R., Practicante de Muay Thai"
    }
  ]
};

export const Testimonials = async () => {
  const { title, testimonials } = data;
  const colCount = testimonials.length;

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <h2 className="text-xl font-bold  sm:text-5xl text-center mb-12 text-white">{title}</h2>
        <div className={`grid gap-10 sm:grid-cols-3 md:grid-cols-${colCount}`}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col items-center space-y-2 border p-4 rounded-lg">
              <p className="text-sm text-gray-500 italic text-center">&lsquo;{testimonial.quote}&lsquo;</p>
              <p className="text-sm font-bold text-gray-200 text-center">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};