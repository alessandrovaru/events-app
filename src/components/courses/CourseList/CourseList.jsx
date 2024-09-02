import { getFirestore } from "firebase-admin/firestore";
import { getFirebaseAdminApp } from '@/app/firebase';

const db = getFirestore(getFirebaseAdminApp());


export const CourseList = async () => {

  const snapshot = await db.collection('courses').get();
  const courses = [];

  snapshot.forEach(doc => {
    courses.push({ id: doc.id, ...doc.data() });
  });
  return (
    <>
      <h2 className="text-3xl font-bold text-white mb-6 ps-6 pt-6">Cursos</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 p-6">
        {courses.map(course => (
          <div key={course.id} className="course-card p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold mb-2 text-gray-700">{course.name}</h2>
            <p className="text-gray-700 mb-4">{course.description}</p>
            <p className="text-gray-900"><strong>Discipline:</strong> {course.discipline}</p>
          </div>
        ))}
      </div>
    </>
  );
}