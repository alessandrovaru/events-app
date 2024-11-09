'use client';
import { useAuth } from '@/app/auth/AuthContext';

export const EnrollButton = async ({eventId, enrollments}) => {
  const { user } = useAuth();
  const isEnrolled = enrollments.enrollments.find(enrollment => enrollment.userId === user.uid && enrollment.eventId === eventId);
  const enroll = async () => {
    const data = {
      userId: user.uid,
      eventId: eventId
    }

    const token = user.idToken
    
    try {
      const response = await fetch('/api/enrollments/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...data, token })
      });
      if (response.ok) {
        alert('Enrolled successfully');
        window.location.reload();
      } else {
        alert('Error enrolling' + response.statusText);
      }
    } catch (error) {
      console.error('Error enrolling:', error);
    }
  }
  return (
    <button 
      onClick={enroll} 
      className={`${
        isEnrolled ? 'bg-green-500 hover:bg-green-700' : 'text-black bg-white hover:bg-gray-300 '
      } font-bold w-1/2 py-2 px-4 rounded-lg z-20`}
    >
      {isEnrolled ? 'Enrolled' : 'Enroll'}
    </button>
  );
};
