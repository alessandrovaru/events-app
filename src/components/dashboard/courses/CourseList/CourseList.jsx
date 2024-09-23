import { getFirestore } from "firebase-admin/firestore";
import { getFirebaseAdminApp } from '@/app/firebase';
import { LockKeyhole, PlusCircle } from "lucide-react";
import { AddNewModal, Modal } from "@/components/shared/Modal";
import Image from "next/image";

const db = getFirestore(getFirebaseAdminApp());

export const CourseList = async ({ tokens }) => {
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


  


  return (
    <div className="container mx-auto">
      <h2 className="text-xl font-bold text-white mb-6 ps-6 pt-6">Cursos</h2>
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