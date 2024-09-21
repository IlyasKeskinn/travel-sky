import FlightBookingForm from "@/components/FlghtBookingForm";
import Hero from "@/components/Hero";

const Home = () => {

  return (
    <>
      <Hero />
      <div className="flex">
        <div className="h-96 w-full -mt-32 md:pl-24 md:pr-24 pr-8 pl-8 z-10">
          <div className="bg-white shadow-lg rounded-md py-4">
            <FlightBookingForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
