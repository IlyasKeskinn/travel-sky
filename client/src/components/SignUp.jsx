const SignUp = () => {
    return (
        <div className="w-full lg:w-1/2 p-10 bg-white flex flex-col justify-center items-center">
            <h1 className="text-2xl font-semibold">Create Account</h1>
            <input type="text" placeholder="Name" className="w-full mt-4 p-2 border border-gray-300 rounded-md focus:outline-none" />
            <input type="email" placeholder="Email" className="w-full mt-4 p-2 border border-gray-300 rounded-md focus:outline-none" />
            <input type="password" placeholder="Password" className="w-full mt-4 p-2 border border-gray-300 rounded-md focus:outline-none" />
            <button className="w-full mt-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Sign Up</button>
        </div>
    );
};

export default SignUp;
