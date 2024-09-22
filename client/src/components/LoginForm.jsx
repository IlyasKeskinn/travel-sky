import { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';

const LoginForm = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    const toggleMode = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <div className="relative bg-white rounded-3xl shadow-lg w-full max-w-4xl overflow-hidden h-[650px]">
            {/* Toggle between SignIn and SignUp */}
            <div className={`absolute inset-0 flex flex-col lg:flex-row transform transition-transform duration-700 ${isSignUp ? '-translate-x-full' : ''}`}>
                {/* Sign In Form */}
                <Login />
                {/* Sign Up Side */}
                <div className="w-full h-full lg:w-1/2 bg-gradient-to-r from-teal-500 to-green-500 text-white p-10 flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-bold">Hello, Traveler!</h1>
                    <p className="text-sm mt-4">Register with your personal details to access all site features.</p>
                    <button onClick={toggleMode} className="mt-10 py-2 px-10 bg-white text-green-500 rounded-lg hover:bg-gray-200 transition">Sign Up</button>
                    <Link className='mt-2' to={ROUTES.HOME}>Go Home</Link>
                </div>
            </div>

            {/* Toggle between SignUp and SignIn */}
            <div className={`absolute inset-0 flex flex-col lg:flex-row transform transition-transform duration-700 ${!isSignUp ? 'translate-x-full' : ''}`}>
                {/* Sign Up Form */}
                <SignUp />
                {/* Sign In Side */}
                <div className="w-full h-full lg:w-1/2 bg-gradient-to-r from-teal-500 to-green-500 text-white p-10 flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-bold">Welcome Back!</h1>
                    <p className="text-sm mt-4">Enter your details to sign in and continue where you left off.</p>
                    <button onClick={toggleMode} className="mt-10 py-2 px-10 bg-white text-green-500 rounded-lg hover:bg-gray-200 transition">Login</button>
                    <Link className='mt-2' to={ROUTES.HOME}>Go Home</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
