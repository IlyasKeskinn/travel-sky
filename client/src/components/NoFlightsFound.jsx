

const NoFlightsFound = () => {
    return (
        <div className="flex flex-col justify-center items-center ">
            <img src="/assets/airplane_with_world.svg" alt="No Flights Found" className="w-1/2 h-1/2 md:w-1/4 md:h-1/4" />
            <div>
                <h1 className="text-2xl font-bold text-amber-400 mt-4 text-center">
                    No Flights Found
                </h1>
                <p className="text-gray-500 mt-2 text-center">
                    We couldn&apos;t find any flights matching your search.
                </p>
            </div>
        </div>
    );
};

export default NoFlightsFound;
