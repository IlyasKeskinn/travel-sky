const SignIn = () => {
    return (
        <div className="w-full lg:w-1/2 p-10 bg-white flex flex-col justify-center items-center">
            <h1 className="text-2xl font-semibold">Sign In</h1>
            <input type="email" placeholder="Email" className="w-full mt-4 p-2 border border-gray-300 rounded-md focus:outline-none" />
            <input type="password" placeholder="Password" className="w-full mt-4 p-2 border border-gray-300 rounded-md focus:outline-none" />
            <a href="#" className="text-sm text-gray-500 hover:underline mt-2">Forgot your password?</a>
            <button className="w-full mt-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Sign In</button>
        </div>
    );
};

export default SignIn;
