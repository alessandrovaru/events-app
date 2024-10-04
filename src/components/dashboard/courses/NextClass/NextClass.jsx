import { getFirestore } from "firebase-admin/firestore";
import { getFirebaseAdminApp } from '@/app/firebase';
import Image from "next/image";
import { LockKeyhole } from "lucide-react";
import Link from "next/link";

const db = getFirestore(getFirebaseAdminApp());

const days = {
  0: 'Domingo',
  1: 'Lunes',
  2: 'Martes',
  3: 'Miércoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sábado'
};

const colors = {
  red: 'bg-red-700',
  blue: 'bg-blue-700',
  green: 'bg-green-700',
  yellow: 'bg-yellow-700',
  purple: 'bg-purple-700',
  pink: 'bg-pink-700',
  orange: 'bg-orange-700',
}

export const NextClass = async ({ tokens }) => {
  const snapshotUsers = await db.collection('users').doc(tokens.decodedToken.uid).get();
  const snapshotCourses = await db.collection('courses').get();
  
  const courses = [];
  const groupedClasses = {};

  snapshotCourses.forEach(doc => {
    courses.push({ id: doc.id, ...doc.data() });
  });

  const user = snapshotUsers.data();
  const userCourseIds = user.enrolledCourses

  courses.forEach(course => {
    if (!userCourseIds?.includes(course.id)) {
      return;
    }
    const currentDay = new Date().getDay();
    const classItem = { 
      id: course.id, 
      ...course, 
      today: currentDay
    };
  
    // Group classes by day
    if (classItem.days) {
      classItem.days.forEach(day => {
        if (!groupedClasses[day]) {
          groupedClasses[day] = [];
        }
        groupedClasses[day].push(classItem);
      });
    }
  });

  // Get current day
  const currentDay = new Date().getDay();

  // Sort days starting from the current day
  const sortedDays = Object.keys(days)
    .map(Number)
    .sort((a, b) => (a - currentDay + 7) % 7 - (b - currentDay + 7) % 7);

  // Limit to 6 classes
  let classCount = 0;
  const limitedClasses = sortedDays.flatMap(day => {
    if (classCount >= 6) return [];
    const dayClasses = groupedClasses[day] || [];
    const remainingSlots = 6 - classCount;
    const classesToShow = dayClasses.slice(0, remainingSlots);
    classCount += classesToShow.length;
    return classesToShow.map(classItem => ({ ...classItem, day }));
  });



  const lockedCourses = courses.filter(course => !userCourseIds?.includes(course.id));


  return (
    <div className="container mx-auto">
      <h2 className="text-xl font-bold text-white mb-6 ps-6 pt-6">Tu próxima clase</h2>
      <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 p-6">
      {limitedClasses.length === 0 ? (
        <>
          <div className="absolute h-full w-full top-0 left-0 bg-black bg-opacity-80 z-0 transition-opacity duration-300 flex items-center justify-center z-20">
            <LockKeyhole />
          </div>
          {lockedCourses.map(course => (
            <div key={course.id} className={`relative course-card p-6 cursor-pointer rounded-lg transition-shadow duration-300`}>
              <div className="relative z-10">
                <h2 className="text-2xl mb-2 text-white">{course.name}</h2>
                <span className="text-white mb-4 text-xs">{course.time}</span>
                <p className="text-white text-sm"><strong></strong> {course.location}</p>
                <p>{course.discipline}</p>
                {course.isReservable && (
                  <button className="bg-white text-black px-6 py-2 rounded-lg hover:opacity-90">Inscribirse</button>
                )}
              </div>
              <div className={`absolute h-full w-full top-0 left-0 bg-${course.color}-700 bg-opacity-90 rounded-lg z-0 transition-opacity duration-300`}>
                <Image src={course.image_url} className="object-cover mix-blend-darken rounded-lg" alt={course.name} fill={true} />
              </div>
            </div>
          ))}
        </>
      ) : (
        limitedClasses.map(classItem => (
          <Link href={`/courses/${classItem.id}`} key={`${classItem.id}-${classItem.day}`} className={`relative course-card p-6 cursor-pointer rounded-lg transition-shadow duration-300 ${days[classItem.today] === days[classItem.day] ? 'animate-pulse ' : ''}`}>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2 text-white">{days[classItem.day]}</h2>
              <span className="text-white mb-4 text-xs">{classItem.time}</span>
              <p className="text-white text-sm"><strong></strong> {classItem.location}</p>
              <p>{classItem.name}</p>
              {days[classItem.today] === days[classItem.day] && (
                <p className="text-white font-bold">Hoy</p>
              )}
              {classItem.isReservable && (
                <button className="bg-white text-black text-xs px-3 py-1 rounded-lg hover:opacity-90">Reservar</button>
              )}
            </div>
            <div className={`absolute h-full w-full top-0 left-0 ${colors[classItem.color]} bg-opacity-90 rounded-lg z-0 transition-opacity duration-300`}>
              <Image src={classItem.image_url} className="object-cover mix-blend-darken rounded-lg" alt={classItem.name} fill={true} />
            </div>
          </Link>
        ))
      )}
      </div>
    </div>
  );
}