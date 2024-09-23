import { useEffect, useRef } from 'react';
import Lottie from 'react-lottie-player';
import bookConfirmLottie from '../../public/assets/bookConfirmLottie.json';
import PropTypes from 'prop-types';

const ReservationConfirmSuccess = ({ onComplete }) => {
    const lottieRef = useRef(null);

    useEffect(() => {
        if (lottieRef.current) {
            lottieRef.current.goToAndStop(50, true);
            lottieRef.current.play();
            lottieRef.current.addEventListener('complete', onComplete);

            return () => {
                lottieRef.current.removeEventListener('complete', onComplete);
            };
        }
    }, [onComplete]);

    return (
        <div className='fixed inset-0 bg-white bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50'>
            <div className="transform scale-150 transition-transform duration-300 ease-in-out">
                <Lottie
                    ref={lottieRef}
                    loop={false}
                    animationData={bookConfirmLottie}
                    style={{ width: 400, height: 400 }}
                />
            </div>
        </div>
    );
};


ReservationConfirmSuccess.propTypes = {
    onComplete: PropTypes.func.isRequired,
};
export default ReservationConfirmSuccess;

