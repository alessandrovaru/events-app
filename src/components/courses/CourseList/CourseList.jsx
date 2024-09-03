import { getFirestore } from "firebase-admin/firestore";
import { getFirebaseAdminApp } from '@/app/firebase';
import { LockKeyhole } from "lucide-react";

const db = getFirestore(getFirebaseAdminApp());

export const CourseList = async ({ tokens }) => {
  const snapshotCourses = await db.collection('courses').get();
  const snapshotUsers = await db.collection('users').doc(tokens.decodedToken.uid).get();
  const courses = [];
  const user = snapshotUsers.data();
  const userCourseId = user.enrolledCourses[0]._path.segments[1];

  snapshotCourses.forEach(doc => {
    courses.push({ id: doc.id, ...doc.data() });
  });

  const enrolledCourses = [];
  const otherCourses = [];

  courses.forEach(course => {
    if (course.id === userCourseId) {
      enrolledCourses.push(course);
    } else {
      otherCourses.push(course);
    }
  });

  const sortedCourses = [...enrolledCourses, ...otherCourses];

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-white mb-6 ps-6 pt-6">Cursos</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 p-6">
        {sortedCourses.map(course => (
          <div key={course.id} className="relative course-card p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold mb-2 text-gray-700">{course.name}</h2>
            <span className="text-gray-500 mb-4 text-sm">{course.discipline}</span>
            <p className="text-gray-700 mb-4">{course.description.slice(0, 110)}{course.description.length > 110 ? '...' : ''}</p>
            
            {course.id !== userCourseId ? (
             <>
              <div className="absolute bg-black h-full w-full top-0 left-0 opacity-50 hover:opacity-80 transition-opacity duration-300 flex items-center justify-center rounded-lg cursor-pointer">
                <LockKeyhole />
              </div>
             </>
            ): (
              <></>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}