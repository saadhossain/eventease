'use client';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FormEvent, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import Processing from '../components/spinner/Processing';
import { DataContext } from '../context/DataContext';
import { useHandleInputChange } from '../hooks/useHandleInputChange';
import { DataContextType } from '../types/DataContextTypes';
import { saveToDatabase } from '../utils/saveToDatabase';
import { uploadImgToImgbb } from '../utils/uploadImgToDB';

const RegisterPage = () => {
    const { loading, setLoading, formData } = useContext(DataContext) as DataContextType;
    const { data: session } = useSession();
    const [error, setError] = useState('');
    //Get the useHandleInputChange hook to get all the input
    const handleInputChange = useHandleInputChange();
    //Save the User to the Database.
    const handleUserRegistration = async (e: FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        //Validations
        if (!formData.email || !formData.name || !formData.password) {
            setError('All fields are required.');
            setLoading(false);
            return;
        }

        if (formData.password.length < 10) {
            setError('Password must be at least 10 characters long');
            setLoading(false);
            return;
        }

        //Handle profile image and upload to Imgbb
        const imageInput = form.profileImage.files[0];
        //check if image uploaded
        if (!imageInput) {
            setError('Please upload the image, its required.');
            setLoading(false);
            return;
        }
        const imageFormData = new FormData();
        imageFormData.append('image', imageInput);
        const image = await uploadImgToImgbb(imageFormData);
        //Arrange User data
        const userData = {
            ...formData,
            image,
            isActive: true
        };
        try {
            //Save user data to database
            const data = await saveToDatabase('/users', userData);
            if (data.status) {
                form.reset();
                setLoading(false);
                toast.success('New User Added Successfully.');
                signIn('credentials', {
                    email: formData.email,
                    password: formData.password,
                    redirect: false
                });
                redirect('/dashboard');
            }
        } catch (error: any) {
            console.log(error.message);
            setLoading(false);
        }
    };
    //After registration redirect the user to dashboard page
    if (session) {
        redirect('/dashboard');
    };
    return (
        <div className='w-11/12 md:w-10/12 mx-auto my-5 md:my-10 flex justify-center'>
            <div className="w-full flex flex-col max-w-md p-4 md:p-6 rounded-r-md bg-gray-100 text-gray-900 shadow-2xl">
                <div className="mb-2 md:mb-8 text-center">
                    <h1 className="my-2 md:my-3 text-2xl md:text-4xl font-bold text-primary">Register</h1>
                </div>
                <form onSubmit={(e) => handleUserRegistration(e)} className="space-y-6">
                    <div className="space-y-2">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
                            <input type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none"
                                required
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm">Full Name</label>
                            <input type="text" name="name" id="name" placeholder="Leroy Jenkins" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none"
                                required
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='relative'>
                            <label htmlFor="password" className="text-sm">Password</label>
                            <input type='password' name="password" id="password" placeholder="***************" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none"
                                required
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="profileImage" className="text-sm">Select Profile Image</label>
                            <input type="file" name="profileImage" id="profileImage" className="w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none" />
                        </div>
                        <div className='flex gap-2 items-center'>
                            <label htmlFor="role" className="w-2/5 font-semibold mb-2 text-sm">Account Type</label>
                            <select
                                className='w-3/5 px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none'
                                onChange={handleInputChange}
                                name="role"
                                id="role"
                            >
                                <option value="">Select</option>
                                <option key='Attendee' value='Attendee'>Attendee</option>
                                <option key='Organizer' value='Organizer'>Organizer</option>
                            </select>
                        </div>
                    </div>
                    {
                        error &&
                        <div className="text-red-500 text-lg">
                            {error}
                        </div>
                    }
                    <div className="space-y-2">
                        <div>
                            <button type="submit" className="w-full flex items-center justify-center px-8 py-3 font-semibold rounded-md bg-primary text-white">{loading ? <Processing title={'Processing'} /> : 'Register'}</button>
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