import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSetRecoilState } from "recoil";
import { API_ROUTES } from "@/config/api";
import { registerSchema } from "@/formSchemas/registerSchema";
import userAtom from "@/atoms/user";
import axios from "axios";
import useErrorHandler from "@/hooks/useErrorHandler";


const SignUp = () => {
    const setUser = useSetRecoilState(userAtom);
    const handleError = useErrorHandler();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (values) => {
        try {
            const response = await axios.post(API_ROUTES.REGISTER, values);
            setUser(response.data); // Store user data in Recoil
            localStorage.setItem("user", JSON.stringify(response.data)); // Store user data in localStorage
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <div className="w-full lg:w-1/2 p-10 bg-white flex flex-col justify-center items-center">
            <h1 className="text-2xl font-semibold">Create Account</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <input
                    type="text"
                    placeholder="Name"
                    {...register("name")}
                    className="w-full mt-4 p-2 border border-gray-300 rounded-md focus:outline-none"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
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
                <button
                    type="submit"
                    className="w-full mt-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;