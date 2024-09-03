import Link from "next/link";

const data = {
  title: "¿Listo para Elevar tu Entrenamiento?",
  description: "Únete a Total Elite Training hoy y comienza tu viaje para convertirte en un luchador de MMA de élite.",
  placeholder: "Introduce tu correo electrónico",
  buttonText: "Comenzar",
  termsLink: {
    text: "Términos y Condiciones",
    href: "#"
  }
};

export const CallToAction = async () => {
  const { title, description, placeholder, buttonText, termsLink } = data;

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-black text-white flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {title}
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-300 md:text-xl">
              {description}
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
              <button className="bg-red-600 text-white hover:bg-red-700 py-2 px-4 rounded-lg" type="submit">
                {buttonText}
              </button>
          </div>
        </div>
      </div>
    </section>
  );
}