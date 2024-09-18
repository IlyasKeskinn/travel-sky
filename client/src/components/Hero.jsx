import { useState, useEffect, useRef } from 'react';

const images = [
    '/assets/hero-image_1.jpg',
    '/assets/hero-image_2.jpg',
    '/assets/hero-image_3.jpg',
];

/**
 * The Hero component is a full-width and full-height section that displays a changing background image.
 * It also contains a navigation system with dots that the user can click on to change the current image.
 * The component uses the `useState` and `useEffect` hooks to manage the state of the current image and to
 * start/stop the image rotation.
 **/
const Hero = () => {
    const [currentImage, setCurrentImage] = useState(0);

    /**
     * A ref to the interval ID that is used to rotate the images.
     * This ref is used to clear the interval when the component is unmounted.
     **/
    const intervalRef = useRef(null);

    /**
     * Starts the image slide by setting an interval that changes the current image every 10 seconds.
     */
    const startImageSlide = () => {
        // Clear the interval if it already exists
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        // Set the interval to change the current image every 10 seconds
        intervalRef.current = setInterval(() => {
            // If the current image is the last one in the array, set it to the first one
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 10000);
    };

    useEffect(() => {
        // Start the image rotation
        startImageSlide();
        // Clean up the interval when the component unmounts
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    /**
     * Handles the click event on the navigation dots.
     **/
    const handleDotClick = (index) => {
        // Set the current image to the one that was clicked
        setCurrentImage(index);
        // Start the image slide after the image was changed
        startImageSlide();
    };

    return (
        <section className='overflow-hidden' >
            <section className='md:h-[540px] h-[440px] overflow-hidden' style={{ margin: '0 -20%', padding: '0 20%', borderRadius: "0 0 100% 100%" }} >
                <div className="relative flex justify-center h-full bg-cover bg-no-repeat" style={{
                    backgroundImage: `url(${images[currentImage]})`,
                    backgroundPosition: 'center 30%',
                    padding: '0 32px',
                    transition: 'background-image 1s ease-in-out',
                }}>
                    {/* Hero content */}
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-2">
                        {images.map((_, index) => (
                            <div
                                key={index}
                                onClick={() => handleDotClick(index)}
                                className={`w-3 h-3 rounded-full cursor-pointer ${index === currentImage ? 'bg-green-500' : 'bg-white'}`}
                            ></div>
                        ))}
                    </div>
                    <div className="flex items-center justify-center h-full text-4xl text-white font-semibold">
                        Where would you like to explore?
                    </div>
                </div>
            </section>
        </section>
    );
};

export default Hero;
