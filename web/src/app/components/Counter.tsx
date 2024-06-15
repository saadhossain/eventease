'use client'
import { decrementCount, increaseCount } from '../lib/features/counterSlice';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import SubHeading from './shared/headings/SubHeading';


const Counter = () => {
    const { count } = useAppSelector((state) => state.counter)
    const dispatch = useAppDispatch();
    return (
        <div>
            <SubHeading heading='Counter' />
            <div className='flex gap-2 items-center mt-5'>
                <p onClick={() => dispatch(decrementCount())} className='py-2 px-6 rounded bg-red-600 text-white text-2xl font-semibold cursor-pointer hover:bg-red-700'>-</p>
                <p>{count}</p>
                <p onClick={() => dispatch(increaseCount())} className='py-2 px-6 rounded bg-green-600 text-white text-2xl font-semibold cursor-pointer hover:bg-green-700'>+</p>
            </div>
        </div>
    )
}

export default Counter