'use client'

import { useAuth } from "@/app/auth/AuthContext";
import { AdminUsersModal } from "@/components/shared/Modal";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";


const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  // Add more users as needed
];

export function AdminUsers(){
  const [usersData, setUsersData] = useState([]);
  const [courses, setCourses] = useState([]);

  const [isAdmin, setIsAdmin] = useState(false);


  const {user} = useAuth();

  const fetchUserCourses = async () => {
    const response = await fetch("/api/courses", {
      headers: {
        'Authorization': `Bearer ${user.idToken}`
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      setCourses(data.courses);
    } else {
      console.error('Error al obtener los cursos:', response.statusText);
    }
  }


  const checkAdmin = async () => {
    const response = await fetch("/api/user", {
      headers: {
        'Authorization': `Bearer ${user.idToken}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      setIsAdmin(data.user.role === 'admin');
    } else {
      console.error('Error al obtener los datos del usuario:', response.statusText);
    }
  }

  const fetchUsers = async () => {
    const response = await fetch("/api/users", {
      headers: {
        'Authorization': `Bearer ${user.idToken}`
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      setUsersData(data.users);
    } else {
      console.error('Error al obtener los usuarios:', response.statusText);
    }
  }
  

  useEffect(() => {
    // Fetch users from api/users
    fetchUsers();
    fetchUserCourses();
    checkAdmin();
  }, []);
  
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 flex items-center justify-center bg-black overflow-x-scroll md:overflow-x-hidden lg:overflow-x-hidden">
      <div className="container px-4 md:px-6 text white">
        <h1 className="text-2xl font-bold mb-4 text-white">Admin Users</h1>
        <table className="min-w-full bg-white text-black rounded-lg shadow-lg ">
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
                      src={user.photoURL} 
                      alt={user.displayName} 
                      width={40} 
                      height={40} 
                      className="rounded-full border-2 border-gray-300"
                    />
                </td>
                <td className="py-2 px-4 border">{user.name}</td>
                <td className="px-4 border">
                  {courses
                    .filter(course => user.enrolledCourses
                    ?.map(course => course)
                    .includes(course.id))
                    .map(course => (
                      <div key={course.id} className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full mr-2 w-auto inline-block mt-2 mb-2">
                        {course.name.length > 8 ? `${course.name.slice(0, 8)}...` : course.name}
                      </div>
                    ))
                  }
                  {isAdmin ? ( 
                    <AdminUsersModal isEditForm={true} userData={user} courses={courses} />
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};