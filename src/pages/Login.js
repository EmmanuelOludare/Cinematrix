import Image from 'next/image';
import Link from 'next/link';
import logo from '../assets/cinematrix.svg'

export default function Login() {
    return (
        <div className='flex flex-col items-center h-screen bg-dark-blue pt-12'>
            <div className='flex flex-col justify-center items-center gap-14'>
                <Image
                    src={logo}
                    alt="Cinematrix Logo"
                    className=''
                    height={20}
                    width={50}
                    priority
                />
                <div className='w-[330px] md:w-[400px] bg-semi-dark-blue rounded-md p-8 flex flex-col text-white gap-6'>
                    <p className='text-[32px] pb-4'>Login</p>
                    <form className='flex flex-col gap-6'>
                        <input type='text' placeholder='Email Address' className='outline-none border-b-2 border-b-grayish-blue bg-transparent font-light indent-3 text-sm pb-1 caret-red focus:border-b-white' />
                        <input type='password' placeholder='Password' className='outline-none border-b-2 border-b-grayish-blue bg-transparent font-light indent-3 text-sm pb-1 caret-red focus:border-b-white' />
                        <button className='rounded-md bg-red py-2 font-light'>Login to your account</button>
                    </form>
                    <div className='text-sm text-center font-light flex gap-2 justify-center'>
                        <p className=''>Don't have an account?</p>
                        <Link href="/signup" className='text-red'>Sign up</Link>
                    </div>

                </div>
            </div>
        </div>
    )
}
