import { UserPayments } from "@/components/profile/payments/UserPayments";

export default async function Page() {
  return (
    <>
      <section className="text-white body-font">
        <div className="container px-5 pt-24 pb-10 mx-auto">
          <h1 className="text-3xl font-medium title-font text-white mb-12 ">Payments</h1>
          <p className="text-white">Esta es la sección de pagos. Puedes dejar tu comprobante de pago o revisar tus pagos antiguos</p>
        </div>
        <UserPayments />
        
      </section>
    </>
  );
}