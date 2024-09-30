import { getFirestore } from "firebase-admin/firestore";
import { getFirebaseAdminApp } from '@/app/firebase';
import { LockKeyhole, PlusCircle } from "lucide-react";
import { AddNewModal, Modal } from "@/components/shared/Modal";
import Image from "next/image";

const numToDays = {
  0: 'Domingo',
  1: 'Lunes',
  2: 'Martes',
  3: 'Miércoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sábado'
};

const db = getFirestore(getFirebaseAdminApp());

export const CourseList = async ({ tokens, analytics }) => {
  const snapshotCourses = await db.collection('courses').get();
  const snapshotUsers = await db.collection('users').doc(tokens.decodedToken.uid).get();
  const courses = [];
  const user = snapshotUsers.data();
  const userCourseIds = user.enrolledCourses

  const isAdmin = user.role === 'admin';

  snapshotCourses.forEach(doc => {
    courses.push({ id: doc.id, ...doc.data() });
  });

  const enrolledCourses = [];
  const otherCourses = [];

  courses.forEach(course => {
    if (userCourseIds?.includes(course.id)) {
      enrolledCourses.push(course);
    } else {
      otherCourses.push(course);
    }
  });

  const sortedCourses = [...enrolledCourses, ...otherCourses];

  const getDayWithMostCourses = (courses) => {
    // Initialize an array to count courses for each day of the week (0: Sunday, 1: Monday, ..., 6: Saturday)
    const daysCount = Array(7).fill(0);
  
    // Iterate through each course
    courses.forEach(course => {
      // Iterate through each day the course is held
      course.days.forEach(day => {
        // Increment the count for the corresponding day
        daysCount[day]++;
      });
    });
  
    // Find the index of the maximum value in daysCount
    const dayWithMostCourses = daysCount.indexOf(Math.max(...daysCount));
  
    return dayWithMostCourses;
  };

  
  


  if(analytics) {
    const dayWithMostCourses = getDayWithMostCourses(courses);
    return (
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-white  ps-6 pt-6">Cantidad de cursos</h2>
        <p className="text-2xl font-bold text-white mb-6 ps-6 pt-6">{JSON.stringify(sortedCourses)}</p>
        <h2 className="text-2xl font-bold text-white  ps-6 pt-6">Díaa de la semana con más cursos</h2>
        <p className="text-2xl font-bold text-white mb-6 ps-6 pt-6">{numToDays[dayWithMostCourses]}</p>
      </div>
    )
  }


  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6 ps-6 pt-6">Cursos</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 p-6">
        {sortedCourses.map(course => (
          <div key={course.id} className={`relative course-card p-6 cursor-pointer rounded-lg transition-shadow duration-300`}>
          <div className="relative text-wrap z-10">
            <h2  className="text-2xl  hyphens-auto  font-bold mb-2 text-white">{course.name}</h2>
            <span className="text-white mb-4 text-xs">{course.time}</span>
            <p className="text-white text-sm"><strong></strong> {course.location}</p>
            <p>{course.discipline}</p>
            <p className="text-white text-sm">{course.description.slice(0, 62)}...</p>
          </div>
          <div className={`absolute h-full w-full top-0 left-0 bg-gray-600 bg-opacity-90 rounded-lg z-0 transition-opacity duration-300`}>
            <Image src={course.image_url} className="object-cover mix-blend-darken rounded-lg" alt={course.name} fill={true} />
          </div>
          {!isAdmin && !userCourseIds?.includes(course.id) ? (
            <div className="absolute bg-black h-full w-full top-0 left-0 opacity-50 hover:opacity-80 transition-opacity duration-300 flex items-center justify-center rounded-lg cursor-pointer">
              <LockKeyhole />
            </div>
          ) : null}
          {isAdmin ? (
            <Modal isEditForm={true} course={course} />
          ) : null}
        </div>
        ))}
        {isAdmin ? (
          <Modal />
        ) : null}
      </div>
    </div>
  );
}