'use client'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import toast from 'react-hot-toast';
import DashboardNav from '../components/shared/DashboardNav';
import LoadingSpinner from '../components/spinner/LoadingSpinner';

const layout = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  //If user is not authorized return error and redirect to login page.
  useEffect(() => {
    if (!session) {
      toast.error('You are not authorized to access this page.');
      redirect('/login');
    }
  }, [session]);
  if (!session) {
    return <LoadingSpinner />
  }
  return (
    <div className='w-11/12 md:10/12 flex gap-5 mx-auto my-5'>
      <div className='w-1/5'>
        <DashboardNav />
      </div>
      <div className='w-4/5'>
        {children}
      </div>
    </div>
  )
}

export default layout
