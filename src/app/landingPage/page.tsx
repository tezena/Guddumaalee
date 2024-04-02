import { LandPlot } from "lucide-react";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <section className="relative bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 sm:bg-gradient-to-r"></div>

      <div className="relative mx-auto max-w-screen-2xl px-4 py-32 lg:py-6 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl text-center sm:text-left ">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Let us find your
            <strong className="block font-extrabold text-[#7B3B99]">
              {" "}
              Law solutions.{" "}
            </strong>
          </h1>

          <p className="mt-4 max-w-lg sm:text-xl/relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            illo tenetur fuga ducimus numquam ea!
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <Button className="block w-full rounded bg-[#7B3B99] px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto">
              Get Lawyers
            </Button>

            <Button className="block w-full rounded bg-[#7B3B99] px-12 py-3 text-sm font-medium text-white shadow hover:text-white focus:outline-none focus:ring  sm:w-auto">
              Be Lawyer
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
