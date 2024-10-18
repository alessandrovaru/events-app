'use client'
import { useAuth } from '@/app/auth/AuthContext';
import { useState } from 'react';

export const ReservationsModal = ({ classItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const data = {
      payment_for: "reservations",
      payment_type: formData.get('payment_type'),
      reference: formData.get('reference'),
      userId: user.uid,
    };

    const token = user.idToken;

    try {
      const response = await fetch('/api/payments/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ ...data, token }),
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
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="relative z-10 bg-white text-black text-xs px-3 py-1 rounded-lg hover:opacity-90"
      >
        Reservar
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-70 z-50 flex items-center justify-center"
        >
          <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg z-50">
            <button
              className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-700"
              onClick={handleClose}
            >
              &times;
            </button>
            <div className="mt-3">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Confirma tu reserva
              </h3>
              <h4 className="text-sm text-gray-500 mt-2">Detalles de la clase</h4>
              <p className="text-sm text-gray-500 mt-2">
                <span className="font-bold">Nombre de la clase:</span> {classItem.name}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                <span className="font-bold">Día:</span> {classItem.day}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                <span className="font-bold">Hora:</span> {classItem.time}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                <span className="font-bold">Lugar:</span> {classItem.location}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                <span className="font-bold">Precio:</span> {classItem.price || 'Gratis'}
              </p>
              <hr className="mt-2" />
              <div className="mt-2">
                <h4 className="text-sm text-gray-500">Confirma tu asistencia</h4>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="payment_type"
                      className="block text-gray-700 text-sm font-bold mb-2 mt-2"
                    >
                      Tipo de pago
                    </label>
                    <div className="mt-2">
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
                    <div className="mt-2">
                      <label
                        htmlFor="reference"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Número de referencia
                      </label>
                      <p className="text-gray-500 text-xs">
                        Ingresa el número de referencia del pago.
                      </p>
                      <input
                        type="text"
                        name="reference"
                        id="reference"
                        autoComplete="reference"
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    Guardar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
