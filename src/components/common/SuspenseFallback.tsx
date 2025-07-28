import { Spinner } from '../ui/spinner';

export function SuspenseFallback() {
    return (
        <div className='flex h-screen flex-col items-center justify-center'>
            <Spinner className='h-10 w-10' />
            <span className='mt-2 text-lg text-[#878787]'>Loading...</span>
        </div>
    );
}
