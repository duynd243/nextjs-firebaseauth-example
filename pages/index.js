import Link from 'next/link';

export default function Home() {

  return (
    <>
      <div className='flex flex-col justify-center items-center h-screen'>
        <Link href="/login">
          <a
            className='bg-violet-600 text-white px-4 py-3 rounded-md font-medium'>
            Go to Login
          </a>
        </Link>
      </div>
    </>
  )
}