import FlightBookingForm from '@/components/FlghtBookingForm';
import ScrollToTop from '@/components/ScrollToTop';
import FlightList from '@/components/FlightList';
import Tab from '@/components/Tab';
import { useInView } from 'react-intersection-observer';
import { fetchFlights } from '@/services/fetchFlights';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';


const FlightResult = () => {
    const [activeTab, setActiveTab] = useState('departure'); // State to track the active tab
    const location = useLocation(); // Access location object to retrieve fetch URLs
    const navigate = useNavigate(); // Initialize useNavigate
    const fetchURL = location.state?.fetchURL; // URL for fetching departure flights
    const returnFetchURL = location.state?.returnFetchURL; // URL for fetching return flights
    const { ref, inView } = useInView(); // Intersection observer for infinite scroll

    console.log(fetchURL);


    // Redirect if fetchURL is not present
    useEffect(() => {
        if (!fetchURL) {
            navigate('/'); // Redirect to homepage
        }
    }, [fetchURL, returnFetchURL, navigate]);


    // Fetch departure flights using infinite query
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        error,
        isFetching,
    } = useInfiniteQuery({
        queryKey: ['flights', fetchURL],
        queryFn: ({ pageParam = 0 }) => fetchFlights({ pageParam, fetchURL }),
        getNextPageParam: (lastPage, allPages) => lastPage.flights.length > 0 ? allPages.length + 1 : undefined,
        enabled: !!fetchURL
    });

    // Fetch return flights using infinite query
    const {
        data: returnData,
        fetchNextPage: fetchNextReturnPage,
        hasNextPage: hasNextReturnPage,
        isFetchingNextPage: isFetchingNextReturnPage,
        error: returnError,
        isFetching: isFetchingReturn,
    } = useInfiniteQuery({
        queryKey: ['returnFlights', returnFetchURL],
        queryFn: ({ pageParam = 0 }) => fetchFlights({ pageParam, fetchURL: returnFetchURL }),
        getNextPageParam: (lastPage, allPages) => lastPage.flights.length > 0 ? allPages.length + 1 : undefined,
        enabled: !!returnFetchURL, // Enable query only if returnFetchURL exists
    });


    // Flatten flight data into arrays
    const flights = data?.pages.flatMap(page => page.flights) || [];
    const returnFlights = returnData?.pages.flatMap(page => page.flights) || [];


    // Fetch more flights when the user scrolls to the bottom of the list
    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);



    // Fetch more return flights when the user scrolls to the bottom of the list
    useEffect(() => {
        if (inView && hasNextReturnPage) {
            fetchNextReturnPage();
        }
    }, [inView, hasNextReturnPage, fetchNextReturnPage]);

    return (
        <>
            <div className='bg-white pt-4 pb-4'>
                <div className='container mx-auto'>
                    <FlightBookingForm />
                </div>
            </div>
            <div className='container mx-auto my-4'>
                <div className='flex justify-center mb-4'>
                    <Tab
                        label="Departure Flights"
                        isActive={activeTab === 'departure'}
                        onClick={() => setActiveTab('departure')}
                    />
                    {returnFetchURL && (
                        <Tab
                            label="Return Flights"
                            isActive={activeTab === 'return'}
                            onClick={() => setActiveTab('return')}
                        />
                    )}
                </div>

                {activeTab === 'departure' && (
                    <FlightList
                        flights={flights}
                        isFetching={isFetching}
                        error={error}
                        fetchNextPage={isFetchingNextPage && hasNextPage}
                        hasNextPage={hasNextPage}
                        ref={ref}
                        loadingMessage="Loading more flights..."
                    />
                )}

                {activeTab === 'return' && returnFetchURL && (
                    <FlightList
                        flights={returnFlights}
                        isFetching={isFetchingReturn}
                        error={returnError}
                        fetchNextPage={isFetchingNextReturnPage && hasNextReturnPage}
                        hasNextPage={hasNextReturnPage}
                        ref={ref}
                        loadingMessage="Loading more return flights..."
                    />
                )}
            </div>
            <ScrollToTop />
        </>
    );
};

export default FlightResult;
