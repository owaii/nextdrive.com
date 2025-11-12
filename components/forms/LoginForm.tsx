import React from "react";

export default function LoginForm() {
    return (
        <div className="WebWindow w-full h-full flex items-center justify-center">
            <div className="FormWindow w-50% h-[50vh] rounded-b-4xl shadow-lg flex flex-col">
                <div className="FormHeader w-full h-auto p-4 flex items-center justify-center">
                    <h1 className="text-white text-2xl font-bold">Login</h1>
                </div>
                <div className="FormBody w-full h-auto p-6 flex items-center justify-center flex-col gap-4">
                    <div className="LoginInput w-full">
                        <label className="block text-white mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your username"
                        />

                        <label className="block text-white mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="LoginActions w-full flex flex-col items-center gap-4 mt-4">
                        <button
                            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Login
                        </button>
                        <div className="w-full flex justify-between text-sm text-white">
                            <a href="#" className="hover:underline">
                                Forgot Password?
                            </a>
                            <a href="#" className="hover:underline">
                                Sign Up
                            </a>
                        </div>
                    </div>
                </div>
            </div> 
        </div> 
    );
}