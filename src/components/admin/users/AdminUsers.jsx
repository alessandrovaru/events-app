'use client'

import { useAuth } from "@/app/auth/AuthContext";
import { AdminUsersModal } from "@/components/shared/Modal";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";

export function AdminUsers({ analytics }) {
  const [usersData, setUsersData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const { user } = useAuth();

  const fetchUserCourses = async () => {
    try {
      const response = await fetch("/api/courses", {
        headers: {
          'Authorization': `Bearer ${user.idToken}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setCourses(data.courses);
      } else {
        console.error('Error fetching courses:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }

  const checkAdmin = async () => {
    try {
      const response = await fetch("/api/user", {
        headers: {
          'Authorization': `Bearer ${user.idToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setIsAdmin(data.user.role === 'admin');
      } else {
        console.error('Error fetching user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users", {
        headers: {
          'Authorization': `Bearer ${user.idToken}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUsersData(data.users);
      } else {
        console.error('Error fetching users:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  useEffect(() => {
    // Fetch users, courses, and check admin status on component mount
    if (user && user.idToken) {
      fetchUsers();
      fetchUserCourses();
      checkAdmin();
    }
  }, [user]);

  // Compute the number of students per course
  const studentsPerCourse = useMemo(() => {
    const courseCounts = courses.map(course => {
      const count = usersData.filter(user => 
        user.enrolledCourses?.includes(course.id)
      ).length;
      return { courseId: course.id, courseName: course.name, studentCount: count };
    });
    return courseCounts;
  }, [courses, usersData]);

  if (analytics) {
    return (
      <div className=" text-white p-6 rounded-lg shadow-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Cantidad de Inscritos en Cursos</h2>
        <table className="min-w-full bg-white text-gray-700 rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Curso</th>
              <th className="py-2 px-4 border-b">Número de Estudiantes</th>
            </tr>
          </thead>
          <tbody>
          {studentsPerCourse
            .sort((a, b) => b.studentCount - a.studentCount)
            .map(course => (
              <tr key={course.courseId} className="hover:bg-gray-600 cursor-pointer hover:text-white">
                <td className="py-2 px-4 border-b">{course.courseName}</td>
                <td className="py-2 px-4 border-b">{course.studentCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center bg-black overflow-x-scroll md:overflow-x-hidden lg:overflow-x-hidden">
      <div className="container px-4 md:px-6 text-white">
        <h1 className="text-2xl font-bold mb-4 text-white">Admin Users</h1>
        <table className="min-w-full bg-white text-black rounded-lg shadow-lg mb-8">
          <thead className="text-black">
            <tr>
              <th className="py-2 px-4 border text-left">Photo</th>
              <th className="py-2 px-4 border text-left">Name</th>
              <th className="py-2 px-4 border text-left">Cursos</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map(user => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border">
                  <Image 
                    src={user.photoURL || "/default-avatar.png"} 
                    alt={user.name} 
                    width={40} 
                    height={40} 
                    className="rounded-full border-2 border-gray-300"
                  />
                </td>
                <td className="py-2 px-4 border">{user.name}</td>
                <td className="px-4 border">
                  {courses
                    .filter(course => user.enrolledCourses?.includes(course.id))
                    .map(course => (
                      <div key={course.id} className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full mr-2 w-auto inline-block mt-2 mb-2">
                        {course.name.length > 8 ? `${course.name.slice(0, 8)}...` : course.name}
                      </div>
                    ))
                  }
                  {isAdmin && (
                    <AdminUsersModal isEditForm={true} userData={user} courses={courses} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
