'use client'
import { useAuth } from '@/app/auth/AuthContext';
import { useEffect, useState } from 'react';

export const AdminUsersPaymentsModal = ({ data, fetchUserPayments, usersPayments }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const handleOpen = () => {
    setIsOpen(true);
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  const handleEdit = async (id, verified) => {
    const token = user.idToken;

    try {
      const response = await fetch('/api/payments/edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          docId: id, 
          verified: verified,
          token
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al editar el Payment');
      }

      alert('Pago actualizado exitosamente.');
      fetchUserPayments(data.id);
    } catch (error) {
      console.error('Error al editar el Payment:', error);
      alert(error.message);
    }
  }


  useEffect(() => {
    if(isOpen) {
      fetchUserPayments(data.id);
    }
  }, [isOpen]);

  return (
    <>
      <div className="relative">
        <button onClick={handleOpen} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Ver pagos
        </button>
      </div>
      {isOpen ? (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-10">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <button
              className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-700"
              onClick={handleClose}
            >
              &times;
            </button>
            <div className="mt-3">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Pagos</h3>
              <div className="mt-2">
                <p>No paymesnts available</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};