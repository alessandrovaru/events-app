'use client'
import { useAuth } from '@/app/auth/AuthContext';
// No necesitas importar 'addData' ya que manejarás la solicitud vía API
import { Edit, PenTool, PlusCircle, TowerControl } from 'lucide-react';
import { useState } from 'react';

export const PaymentsModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const handleOpen = () => {
    setIsOpen(true);
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const data = {
      payment_type: formData.get('payment_type'),
      reference: formData.get('reference'),
      userId: user.uid,
    }

    // Obtener el token de autenticación del usuario si lo estás usando
    const token = user.idToken

    try {
      const response = await fetch('/api/payments/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...data, token })
      });

      if (response.ok) {
        const result = await response.json();
        handleClose();
        window.location.reload();
      } else {
        console.error('Error al crear el payment:', response.statusText);
      }
    } catch (error) {
      console.error('Error al crear el payment:', error);
    }
  }

  // const handleDelete = async () => {
  //   const token = user.idToken;

  //   try {
  //     const response = await fetch('/api/payments/delete', {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ docId: payments.id, token }),
  //     })
     
  //     const result = await response.json();

  //     if (!response.ok) {
  //       throw new Error(result.error || 'Error al eliminar el curso.');
  //     }

  //     alert('Curso eliminado exitosamente.');
  //     handleClose();
  //     window.location.reload();
  //   } catch (error) {

  //     console.error('Error al eliminar el curso:', error);
  //     alert(error.message);
  //   }
  // }

  
  return (
    <>
      <div className="relative course-card p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <button onClick={handleOpen} className="absolute bg-red-900 h-full w-full top-0 left-0 hover:opacity-80 transition-opacity duration-300 flex items-center justify-center rounded-lg cursor-pointer text-white">
          <PlusCircle /> Agregar un nuevo pago
        </button>
      </div>
      {isOpen ? (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-10">
        <div className="relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <button
            className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-700"
            onClick={handleClose}
          >
            &times;
          </button>
          <div className="mt-3">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Agrega un nuevo pago</h3>
            <div className="mt-2">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="payment_type" className="block text-gray-700 text-sm font-bold mb-2">
                    Tipo de pago
                  </label>
                  <div className="mt-1">
                    <select
                      name="payment_type"
                      id="payment_type"
                      autoComplete="payment_type"
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="pago móvil">Pago Móvil</option>
                      <option value="zelle">Zelle</option>
                      <option value="efectivo">Efectivo</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="reference" className="block text-gray-700 text-sm font-bold mb-2">
                    Número de referencia
                  </label>
                  <p className="text-gray-500 text-xs">Ingresa el número de referencia del pago.</p>
                  <input
                    type="text"
                    name="reference"
                    id="reference"
                    autoComplete="reference"
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <button type="submit" className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300">
                  Guardar
                </button>
              </form>
            </div>
            <div className="items-center px-4 py-3">
              
            </div>
          </div>
        </div>
      </div>
      ) : null}
    </>
  );
};

