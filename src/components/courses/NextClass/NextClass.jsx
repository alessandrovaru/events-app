import { getFirestore } from "firebase-admin/firestore";
import { getFirebaseAdminApp } from '@/app/firebase';
import Image from "next/image";

import logo from "/public/images/artesuave.jpg";

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

  const classes = [];

  const user = snapshotUsers.data();
  const userCourseIds = user.enrolledCourses.map(course => course._path.segments[1]);
  snapshotClasses.forEach(doc => {
    const currentDay = new Date().getDay();
    if (!userCourseIds.includes(doc.data().courseId._path.segments[1])) {
      return;
    }
    classes.push({ id: doc.id, ...doc.data(), today: currentDay });
  });

  return (
    <div class="container mx-auto">
      <h2 className="text-3xl font-bold text-white mb-6 ps-6 pt-6">Tu próxima clase</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 p-6">
        {classes.flatMap(classItem => 
          classItem.days.map(day => (
            <div key={`${classItem.id}-${day}`} className="relative course-card p-6 cursor-pointer rounded-lg transition-shadow duration-300">
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-2 text-white">{days[day]}</h2>
                <span className="text-white mb-4">{classItem.time}</span>
                <p className="text-white"><strong></strong> {classItem.location}</p>
                {days[classItem.today] === days[day] && (
                  <p className="text-green-500 font-bold">Hoy</p>
                )}
              </div>
              <div className="absolute h-full w-full top-0 left-0 bg-red-900 bg-opacity-90 rounded-lg z-0 transition-opacity duration-300">
                <Image class="object-cover mix-blend-multiply rounded-lg" src={logo} alt={classItem.courseId.name} fill={true} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}