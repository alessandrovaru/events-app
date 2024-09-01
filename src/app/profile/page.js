import { ProfileCard } from "@/components/profile/ProfileCard";
import { getFirestore } from "firebase-admin/firestore";
import { getFirebaseAdminApp } from '../firebase';

const db = getFirestore(getFirebaseAdminApp());

export default async function Page() {

  const snapshot = await db.collection('courses').get();
  const courses = [];

  snapshot.forEach(doc => {
    courses.push({ id: doc.id, ...doc.data() });
  });

  return (
    <>
    <ProfileCard  />
    <div>
        {courses.map(course => (
          <div key={course.id} className="course-card">
            <h2>{course.name}</h2>
            <p>{course.description}</p>
            <p><strong>Discipline:</strong> {course.discipline}</p>
          </div>
        ))}
      </div>

    </>
  );
}