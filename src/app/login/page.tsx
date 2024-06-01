'use client'
import { FormEvent } from 'react';

const LoginPage = () => {
    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
    }
    return (
        <div className='w-11/12 md:w-10/12 mx-auto my-5'>
            <div className='w-2/4 mx-auto bg-gray-100 rounded-lg py-10'>
                <h1 className='text-4xl font-bold text-center text-primary'>Login</h1>
                <p className='text-center text-gray-500'>Login to your account</p>
                <form
                    onSubmit={handleLogin}
                    className='p-10'
                >
                    <div>
                        <label htmlFor="email" className='w-full block font-semibold mb-1'>Enter Email</label>
                        <input type="email" name="email" id="email" className='w-full block p-3 focus:outline-none rounded-md bg-gray-300'/>
                    </div>
                    <div>
                        <label htmlFor="password" className='w-full block font-semibold mb-1'>Enter Password</label>
                        <input type="password" name="password" id="password" className='w-full block p-3 focus:outline-none rounded-md bg-gray-300'/>
                    </div>
                    <button type='submit' className='bg-primary hover:bg-secondary text-white font-semibold w-full py-3 rounded-md mt-5 duration-300 ease-in-out'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage