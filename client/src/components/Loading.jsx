import Lottie from 'react-lottie-player'
import loadingAnimationLottie from "../../public/assets/loadingAnimationLottie.json"

const Loading = () => {
    return (
        <div className='fixed inset-0 bg-white bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50'>
            <Lottie
                loop={false}
                animationData={loadingAnimationLottie}
                play
                style={{ width: 250, height: 250 }}
            />
        </div>
    )
}

export default Loading