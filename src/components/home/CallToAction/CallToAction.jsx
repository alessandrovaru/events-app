import Link from "next/link";
export const CallToAction = async () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-black text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Elevate Your Training?
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-300 md:text-xl">
              Join Total Elite Training today and start your journey to becoming an elite MMA fighter.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <form className="flex space-x-2">
              <input className="max-w-lg flex-1 bg-white text-black" placeholder="Enter your email" type="email" />
              <button className="bg-red-600 text-white hover:bg-red-700" type="submit">
                Get Started
              </button>
            </form>
            <p className="text-xs text-gray-400">
              By signing up, you agree to our{" "}
              <Link className="underline underline-offset-2" href="#">
                Terms & Conditions
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}