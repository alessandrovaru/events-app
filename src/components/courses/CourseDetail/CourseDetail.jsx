// app/courses/[id]/components/CourseDetail.jsx
import Image from "next/image";
import { format } from "date-fns";

const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

export function CourseDetail({ course }) {
  const {
    name,
    description,
    discipline,
    location,
    days,
    time,
    image_url,
    color,
    updatedAt,
  } = course;

  // Formatear las fechas
  const formattedDate = new Date(updatedAt).toLocaleDateString();

  // Obtener nombres de los días
  const dayNames = days.map((day) => daysOfWeek[day]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="w-full bg-gray-100 rounded-lg overflow-hidden shadow-lg">
        <div className="relative w-full h-64 sm:h-80 md:h-96">
          <Image
            src={image_url}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="object-center"
            priority
          />
        </div>
        <div className={`bg-${color}-500 p-6`}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{name}</h1>
          <p className="text-white mt-2">{discipline}</p>
        </div>
      </section>

      {/* Descripción y Detalles */}
      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Descripción */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Descripción del Curso</h2>
          <p className="text-gray-700">{description}</p>
        </div>

        {/* Detalles */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Detalles</h2>
          <ul className="space-y-2">
            <li>
              <span className="font-medium">Ubicación:</span> {location}
            </li>
            <li>
              <span className="font-medium">Días:</span> {dayNames.join(", ")}
            </li>
            <li>
              <span className="font-medium">Horario:</span> {time}
            </li>
            <li>
              <span className="font-medium">Actualizado:</span> {formattedDate}
            </li>
          </ul>
        </div>
      </section>

      {/* Botones de Acción */}
      <section className="mt-8 flex space-x-4">
        <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">
          Inscribirse
        </button>
        <button className="border border-orange-500 text-orange-500 px-6 py-2 rounded-lg hover:bg-orange-500 hover:text-white">
          Contactar
        </button>
      </section>
    </div>
  );
};