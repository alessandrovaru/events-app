// app/courses/[id]/components/CourseDetail.jsx
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";

const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

// Mapa de colores permitidos
const colorClasses = {
  orange: "bg-orange-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  red: "bg-red-500",
  pink: "bg-pink-500",
  purple: "bg-purple-500",
  yellow: "bg-yellow-500",
  // Añade más colores según tus necesidades
};

const hoverColorClasses = {
  orange: "hover:bg-orange-600",
  blue: "hover:bg-blue-600",
  green: "hover:bg-green-600",
  red: "hover:bg-red-600",
  pink: "hover:bg-pink-600",
  purple: "hover:bg-purple-600",
  yellow: "hover:bg-yellow-600",
};

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

  // Seleccionar la clase de color, o un color por defecto si no está definido
  const colorClass = colorClasses[color] || "bg-gray-500";

  // selecciona el color de hover, o un color por defecto si no está definido
  const hoverColorClass = hoverColorClasses[color] || "hover:bg-gray-600";
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="w-full bg-gray-100 rounded-lg overflow-hidden shadow-lg">
        <div className="relative w-full h-64 sm:h-80 md:h-96">
          <Image
            src={image_url}
            alt={name}
            fill
            objectFit="cover"
            className="object-center"
            priority
          />
        </div>
        <div className={`${colorClass} p-6`}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{name}</h1>
          <p className="text-white mt-2">{discipline}</p>
        </div>
      </section>

      {/* Descripción y Detalles */}
      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Descripción */}
        <div>
          <h2 className={`text-2xl font-semibold mb-4 text-white p-2 rounded`}>Descripción del Curso</h2>
          <p className="text-gray-700">{description}</p>
        </div>

        {/* Detalles */}
        <div>
          <h2 className={`text-2xl font-semibold mb-4 text-white p-2 rounded`}>Detalles</h2>
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
        <button className={`${colorClass} text-white px-6 py-2 rounded-lg hover:opacity-90`}>
          Inscribirse
        </button>
        <button className={`border ${hoverColorClass} text-white px-6 py-2 rounded-lg`}>
          Contactar
        </button>
        <Link href={'/dashboard'} className={`border ${hoverColorClass} text-white px-6 py-2 rounded-lg`}>
          Ver mis clases
        </Link>
      </section>
    </div>
  );
};