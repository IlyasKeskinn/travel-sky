import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { API_ROUTES } from "@/config/api";
import { loginSchema } from "@/formSchemas/loginSchema";
import userAtom from "@/atoms/user";
import axios from "axios";
import useErrorHandler from "@/hooks/useErrorHandler";

const Login = () => {
    const [data, setData] = useState({}); // State to store user data
    const setUser = useSetRecoilState(userAtom); // Setter function to update user atom
    const handleError = useErrorHandler(); // Use the custom hook for error handling

    // Destructuring methods and state from useForm
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema), // Using zod for form validation
    });

    const onSubmit = async (values) => {
        try {
            const response = await axios.post(API_ROUTES.LOGIN, values);
            setData(response.data);
        } catch (error) {
            handleError(error); // Use the hook for error handling
        }
    };

    useEffect(() => {
        if (data) {
            localStorage.setItem("user", JSON.stringify(data)); // Store user data in localStorage
            setUser(data); // Update Recoil state with user data
            reset(); // Reset the form fields
        }
    }, [data, reset, setUser]);

    return (
        <div className="w-full lg:w-1/2 p-10 bg-white flex flex-col justify-center items-center">
            <h1 className="text-2xl font-semibold">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                    className="w-full mt-4 p-2 border border-gray-300 rounded-md focus:outline-none"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                <input
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                    className="w-full mt-4 p-2 border border-gray-300 rounded-md focus:outline-none"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                <a href="#" className="text-sm text-gray-500 hover:underline mt-2">Forgot your password?</a>
                <button
                    type="submit"
                    className="w-full mt-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;







