'use client';
import Link from 'next/link';

const RegisterPage = () => {
    return (
        <div className='w-11/12 md:w-10/12 mx-auto my-5 md:my-10 flex justify-center'>
            <div className="w-full flex flex-col max-w-md p-4 md:p-6 rounded-r-md bg-gray-100 text-gray-900 shadow-2xl">
                <div className="mb-2 md:mb-8 text-center">
                    <h1 className="my-2 md:my-3 text-2xl md:text-4xl font-bold text-primary">Register</h1>
                </div>
                <form className="space-y-6">
                    <div className="space-y-2">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
                            <input type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="fullName" className="block mb-2 text-sm">Full Name</label>
                            <input type="text" name="fullName" id="fullName" placeholder="Leroy Jenkins" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none"
                                required
                            />
                        </div>
                        <div className='relative'>
                            <label htmlFor="password" className="text-sm">Password</label>
                            <input type='password' name="password" id="password" placeholder="***************" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="text-sm">Phone Number</label>
                            <input type="text" name="phone" id="phone" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none"
                                placeholder="+880-1XX-XXXX-XXX"

                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="profileImage" className="text-sm">Select Profile Image</label>
                            <input type="file" name="profileImage" id="profileImage" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div>
                            <button type="submit" className="w-full flex items-center justify-center px-8 py-3 font-semibold rounded-md bg-primary text-white">Register</button>
                        </div>
                        <p className="px-6 text-sm text-center text-gray-400">Already have an account?
                            <Link href="/login" className="text-primary hover:text-secondary ml-2 text-lg font-semibold">Login</Link>.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;