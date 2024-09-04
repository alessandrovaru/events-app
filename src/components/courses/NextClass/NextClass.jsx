import { getFirestore } from "firebase-admin/firestore";
import { getFirebaseAdminApp } from '@/app/firebase';
import Image from "next/image";

import arteSuaveBg from "/public/images/artesuave.jpg";
import entrenamientoFuncionalBg from "/public/images/main.jpg";
import mmaBg from "/public/images/genier.jpg";
import { LockKeyhole } from "lucide-react";

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

export const NextClass = async ({ tokens }) => {
  const snapshotClasses = await db.collection('classes').get();
  const snapshotUsers = await db.collection('users').doc(tokens.decodedToken.uid).get();
  const snapshotCourses = await db.collection('courses').get();
  
  const classes = [];
  const courses = [];
  const groupedClasses = {};

  snapshotCourses.forEach(doc => {
    courses.push({ id: doc.id, ...doc.data() });
  });

  const user = snapshotUsers.data();
  const userCourseIds = user.enrolledCourses?.map(course => course._path.segments[1]);
  snapshotClasses.forEach(doc => {
    const currentDay = new Date().getDay();
    if (!userCourseIds?.includes(doc.data().courseId._path.segments[1])) {
      return;
    }
    const classItem = { 
      id: doc.id, 
      ...doc.data(), 
      today: currentDay, 
      courseName: courses.find(course => course.id === doc.data().courseId._path.segments[1]).name 
    };

    // Group classes by day
    classItem.days.forEach(day => {
      if (!groupedClasses[day]) {
        groupedClasses[day] = [];
      }
      groupedClasses[day].push(classItem);
    });
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

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-white mb-6 ps-6 pt-6">Tu próxima clase</h2>
      <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 p-6">
      {limitedClasses.length === 0 ? (
        <>
        <div className="absolute h-full w-full top-0 left-0 bg-black bg-opacity-80 z-0 transition-opacity duration-300 flex items-center justify-center z-20">
          <LockKeyhole />
        </div>
          <div className={`relative course-card p-6 cursor-pointer rounded-lg transition-shadow duration-300`}>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2 text-white">Lunes</h2>
              <span className="text-white mb-4 text-xs">6:00PM - 8:00PM</span>
              <p className="text-white text-sm"><strong></strong> Colinas de los ruices</p>
              <p>Brazilian Jiu-jitsu</p>
              
            </div>
            <div className="absolute h-full w-full top-0 left-0 bg-red-700 bg-opacity-90 rounded-lg z-0 transition-opacity duration-300">
              <Image src={arteSuaveBg} className="object-cover mix-blend-darken rounded-lg" alt={'foto'} fill={true} />
            </div>
          </div>
          <div className={`relative course-card p-6 cursor-pointer rounded-lg transition-shadow duration-300`}>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2 text-white">Martes</h2>
              <span className="text-white mb-4 text-xs">6:00PM - 8:00PM</span>
              <p className="text-white text-sm"><strong></strong> Colinas de los ruices</p>
              <p>Brazilian Jiu-jitsu</p>
              
            </div>
            <div className="absolute h-full w-full top-0 left-0 bg-red-700 bg-opacity-90 rounded-lg z-0 transition-opacity duration-300">
              <Image src={arteSuaveBg} className="object-cover mix-blend-darken rounded-lg" alt={'foto'} fill={true} />
            </div>
          </div>
          <div className={`relative course-card p-6 cursor-pointer rounded-lg transition-shadow duration-300`}>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2 text-white">Martes</h2>
              <span className="text-white mb-4 text-xs">Todo el día</span>
              <p className="text-white text-sm"><strong></strong> Colinas de los ruices</p>
              <p>Entrenamiento Corporal</p>
              
            </div>
            <div className="absolute h-full w-full top-0 left-0 bg-blue-700 bg-opacity-90 rounded-lg z-0 transition-opacity duration-300">
              <Image src={entrenamientoFuncionalBg} className="object-cover mix-blend-darken rounded-lg" alt={'frank'} fill={true} />
            </div>
          </div>
          <div className={`relative course-card p-6 cursor-pointer rounded-lg transition-shadow duration-300`}>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2 text-white">Martes</h2>
              <span className="text-white mb-4 text-xs">Todo el día</span>
              <p className="text-white text-sm"><strong></strong> Colinas de los ruices</p>
              <p>MMA</p>
              
            </div>
            <div className="absolute h-full w-full top-0 left-0 bg-green-700 bg-opacity-90 rounded-lg z-0 transition-opacity duration-300">
              <Image src={mmaBg} className="object-cover mix-blend-darken rounded-lg" alt={'frank'} fill={true} />
            </div>
          </div>
          <div className={`relative course-card p-6 cursor-pointer rounded-lg transition-shadow duration-300`}>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2 text-white">Miércoles</h2>
              <span className="text-white mb-4 text-xs">6:00PM - 8:00PM</span>
              <p className="text-white text-sm"><strong></strong> Colinas de los ruices</p>
              <p>Brazilian Jiu-jitsu</p>
              
            </div>
            <div className="absolute h-full w-full top-0 left-0 bg-red-700 bg-opacity-90 rounded-lg z-0 transition-opacity duration-300">
              <Image src={arteSuaveBg} className="object-cover mix-blend-darken rounded-lg" alt={'foto'} fill={true} />
            </div>
          </div>
          <div className={`relative course-card p-6 cursor-pointer rounded-lg transition-shadow duration-300`}>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2 text-white">Miércoles</h2>
              <span className="text-white mb-4 text-xs">Todo el día</span>
              <p className="text-white text-sm"><strong></strong> Colinas de los ruices</p>
              <p>Entrenamiento Corporal</p>
              
            </div>
            <div className="absolute h-full w-full top-0 left-0 bg-blue-700 bg-opacity-90 rounded-lg z-0 transition-opacity duration-300">
              <Image src={entrenamientoFuncionalBg} className="object-cover mix-blend-darken rounded-lg" alt={'frank'} fill={true} />
            </div>
          </div>
        </>
      ) : (
        limitedClasses.map(classItem => (
          <div key={`${classItem.id}-${classItem.day}`} className={`relative course-card p-6 cursor-pointer rounded-lg transition-shadow duration-300 ${days[classItem.today] === days[classItem.day] ? 'animate-pulse ' : ''}`}>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2 text-white">{days[classItem.day]}</h2>
              <span className="text-white mb-4 text-xs">{classItem.time}</span>
              <p className="text-white text-sm"><strong></strong> {classItem.location}</p>
              <p>{classItem.courseName}</p>
              {days[classItem.today] === days[classItem.day] && (
                <p className="text-white font-bold">Hoy</p>
              )}
            </div>
            {classItem.courseName === 'Arte Suave' && (
              <div className="absolute h-full w-full top-0 left-0 bg-red-700 bg-opacity-90 rounded-lg z-0 transition-opacity duration-300">
                <Image src={arteSuaveBg} className="object-cover mix-blend-darken rounded-lg" alt={classItem.courseId.name} fill={true} />
              </div>
            )}
            {classItem.courseName === 'Entrenamiento Funcional' && (
              <div className="absolute h-full w-full top-0 left-0 bg-blue-700 bg-opacity-90 rounded-lg z-0 transition-opacity duration-300">
                <Image src={entrenamientoFuncionalBg} className="object-cover mix-blend-darken rounded-lg" alt={classItem.courseId.name} fill={true} />
              </div>
            )}
          </div>
        ))
      )}
      </div>
    </div>
  );
}