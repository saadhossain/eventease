'use client';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect, useSearchParams } from 'next/navigation';
import { FormEvent, Suspense, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LoadingSpinner from '../components/spinner/LoadingSpinner';
import Processing from '../components/spinner/Processing';
import { setIsShowPassword, setLoading } from '../lib/features/commonSlice';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
const LoginPage = () => {
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl');
    const redirectEndpoint = callbackUrl?.split('3000')[1];

    const dispatch = useAppDispatch();
    const { isShowPassword, loading } = useAppSelector((state) => state.common)

    // Handle login form submission
    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setLoading());
        const form = e.target as HTMLFormElement;
        const email: string = form.email.value;
        const password: string = form.password.value;
        try {
            await signIn('credentials', {
                email,
                password,
                redirect: false,
            });
            dispatch(setLoading());
        } catch (error: any) {
            dispatch(setLoading());
            throw new Error(error.message);
        }
    };
    // Use useEffect to handle redirection based on session and callbackUrl
    useEffect(() => {
        if (session) {
            if (redirectEndpoint) {
                redirect(`${redirectEndpoint}`);
            } else {
                if (session?.user.role === 'admin') {
                    redirect('/admin/dashboard');
                } else {
                    redirect('/dashboard');
                }
            }
        }
    }, [session, redirectEndpoint]);
    return (
        <div className='w-11/12 md:w-10/12 mx-auto my-5 md:my-10 flex justify-center'>
            <div className="w-full flex flex-col max-w-md p-4 md:p-6 rounded-r-md bg-gray-100 text-gray-900 shadow-2xl">
                <div className="mb-2 md:mb-8 text-center">
                    <h1 className="my-2 md:my-3 text-2xl md:text-4xl font-bold text-primary">Login</h1>
                </div>
                <form onSubmit={handleLogin} className="space-y-12">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
                            <input type="email" name="email" id="email" placeholder="johndoe@gmail.com" className="w-full px-3 py-2 rounded-md bg-gray-300 text-gray-900 focus:outline-none" />
                        </div>
                        <div className='relative'>
                            <div className="flex justify-between mb-2">
                                <label htmlFor="password" className="text-sm">Password</label>
                                <Link href="/login" className="text-md hover:text-primary">Forgot password?</Link>
                            </div>
                            <input type={`${isShowPassword ? 'password' : 'text'}`} name="password" id="password" placeholder="***********" className="w-full px-3 py-2 rounded-md bg-gray-300 text-gray-900 focus:outline-none" />
                            <div onClick={() => dispatch(setIsShowPassword())} className='cursor-pointer absolute top-11 right-2'>
                                {isShowPassword ? <FaEye /> : <FaEyeSlash />}
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div>
                            <button type="submit" className="w-full flex items-center justify-center px-8 py-3 font-semibold rounded-md bg-primary text-white">
                                {loading ? <Processing title={'Processing'} /> : 'Login'}
                            </button>
                        </div>
                    </div>
                </form>
                <p className="px-6 text-sm text-center text-gray-400">New to this site?
                    <Link href="/register" className="text-primary hover:text-secondary ml-2 text-lg font-semibold">Register</Link>.
                </p>
            </div>
        </div>
    )
}

const LoginPageWrapper = () => (
    <Suspense fallback={<LoadingSpinner />}>
        <LoginPage />
    </Suspense>
);

export default LoginPageWrapper;