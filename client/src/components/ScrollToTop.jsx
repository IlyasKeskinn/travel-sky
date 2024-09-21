import { useEffect, useState } from "react";
import planeAnimation from "../../public/assets/scrollToTop.json"
import Lottie from "react-lottie-player";


const ScrollToTop = () => {
    // State to control the visibility of the button when scrolling down
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    useEffect(() => {
        // Function to be called when the page is scrolled
        const handleScroll = () => {
            // Show the button if the page is scrolled more than 300 pixels
            setShowScrollToTop(window.scrollY > 300);
        };

        // Add event listener for scroll event
        window.addEventListener('scroll', handleScroll);

        // Clean up by removing the event listener when the component unmounts
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Function to scroll the page to the top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0, // Scroll to the very top of the page
            behavior: 'smooth', // Make the scrolling smooth
        });
    };
    return (
        // Render the button if it should be shown
        showScrollToTop && (
            <div
                className="fixed bottom-5 right-5 cursor-pointer -rotate-90 h-12 w-12 bg-green-500 shadow-lg rounded-full flex justify-center items-center hover:bg-green-600 transition-colors duration-200"
                onClick={scrollToTop}
            >
                <Lottie
                    loop={false}
                    animationData={planeAnimation}
                    play
                    style={{ width: 36, height: 36 }}
                />
            </div>
        )
    )




}

export default ScrollToTop