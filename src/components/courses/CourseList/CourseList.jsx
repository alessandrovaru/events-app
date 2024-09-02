import { getFirestore } from "firebase-admin/firestore";
import { getFirebaseAdminApp } from '@/app/firebase';

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
    <div class="container mx-auto">
      <h2 className="text-3xl font-bold text-white mb-6 ps-6 pt-6">Cursos</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 p-6">
        {sortedCourses.map(course => (
          <div key={course.id} className="course-card p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold mb-2 text-gray-700">{course.name}</h2>
            <p className="text-gray-700 mb-4">{course.description}</p>
            <p className="text-gray-900"><strong>Discipline:</strong> {course.discipline}</p>
            {course.id === userCourseId && (
              <p className="text-green-500 font-bold">Inscrito</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}