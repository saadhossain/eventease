'use client';
import Image from 'next/image';
import Link from 'next/link';
import EventEase from '/public/eventease-logo.png';
import { usePathname } from 'next/navigation';
const HeaderNav = () => {
    const activePath = usePathname();
    const navStyle = `hover:text-secondary duration-300 ease-in-out}`;
    return (
        <header className='w-full bg-gray-100 sticky top-0 z-50 py-2'>
            <div className='w-11/12 md:w-10/12 mx-auto flex justify-between items-center'>
                <Link href='/'><Image src={EventEase} alt='EventEase' width={160} height={60} /></Link>
                <div className='flex items-center gap-4'>
                    <Link href='/login' className='bg-primary text-white py-2 px-4 md:px-8 rounded-3xl hover:bg-secondary duration-200 ease-in'>Login</Link>
                </div>
            </div>
        </header>
    );
};

export default HeaderNav;