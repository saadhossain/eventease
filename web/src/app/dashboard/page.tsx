'use client'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import SubHeading from '../components/shared/headings/SubHeading';

const Dashboard = () => {
  const { data: session } = useSession();
  return (
    <div>
      <SubHeading heading='Profile' />
      <div className='flex gap-2 items-center p-6 rounded-md bg-gray-200 w-2/5'>
        <Image
          src={session?.user.image}
          alt={session?.user.name}
          height={80} width={80}
          className='rounded-full max-h-20 max-w-20 border-2 border-primary'
        />
        <div className='font-semibold'>
          <h2 className='text-2xl text-primary'>{session?.user.name}</h2>
          <h4>{session?.user.email}</h4>
        </div>
      </div>
    </div>
  )
}

export default Dashboard