'use client';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FaSignOutAlt } from "react-icons/fa";

const DashboardNav = () => {
    const route = useRouter();
    const handleSignout = async () => {
        await signOut();
        toast.success('You are logged out.');
        route.push('/');
    };
    const currentPath = usePathname();

    const getLinkClasses = (path: string) => (
        `hover:bg-primary hover:text-white py-1 px-2 rounded ${currentPath === path && 'bg-primary text-white'}`
    );

    return (
        <aside className='min-h-[62vh] bg-gray-100 py-6 px-4 rounded-md flex flex-col justify-between sticky top-20'>
            <nav>
                <ul className='flex flex-col gap-1'>
                    <li className={getLinkClasses('/dashboard')}>
                        <Link href='/dashboard'>Dashboard</Link>
                    </li>
                    <li className={getLinkClasses('/dashboard/orders')}>
                        <Link href='/dashboard/events'>Events</Link>
                    </li>
                    <li className={getLinkClasses('/dashboard/users')}>
                        <Link href='/dashboard/users'>Users</Link>
                    </li>
                    <li className={getLinkClasses('/dashboard/support')}>
                        <Link href='/dashboard/support'>Support</Link>
                    </li>
                </ul>
            </nav>
            <div
                onClick={handleSignout}
                className='flex items-center mt-3 gap-2 font-semibold text-lg cursor-pointer hover:text-primary'>
                <FaSignOutAlt className='w-6 h-6' />
                <h4>Logout</h4>
            </div>
        </aside>
    );
};

export default DashboardNav;
