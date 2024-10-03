import { UserPayments } from "@/components/profile/payments/UserPayments";

export default async function Page() {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1 className="text-3xl font-medium title-font text-gray-900 mb-12 text-center">Payments</h1>
          <p className="text-center">Esta es la sección de pagos. Puedes dejar tu comprobante de pago o revisar tus pagos antiguos</p>
        </div>
        <UserPayments />
        
      </section>
    </>
  );
}