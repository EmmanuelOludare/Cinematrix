import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../assets/cinematrix.svg'
import Cookies from 'js-cookie';

export default function Signup() {
    Cookies.set('cookieName', 'cookieValue', { sameSite: 'none' });
    const cookieValue = Cookies.get('cookieName');
    const router = useRouter();
    const { signup } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        repeatPassword: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.repeatPassword) {
            return setError('Passwords do not match!')
        }
        try {
            setLoading(true);
            setError('');
            await signup(formData.email, formData.password);
        } catch {
            setError('Failed to create an account');
            setLoading(false);
        }
    }

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
                    <p className='text-[32px] pb-4'>Sign Up</p>
                    {error && <p className='text-red'>{error}</p>}
                    <form className='flex flex-col gap-6' onSubmit={handleSubmit} >
                        <input onChange={handleChange} name="email" value={formData.email} type='text' placeholder='Email Address' className='outline-none border-b-2 border-b-grayish-blue bg-transparent font-light indent-3 text-sm pb-1 caret-red focus:border-b-white' />
                        <input onChange={handleChange} name="password" autoComplete="true" value={formData.password} type='password' placeholder='Password' className='outline-none border-b-2 border-b-grayish-blue bg-transparent font-light indent-3 text-sm pb-1 caret-red focus:border-b-white' />
                        <input onChange={handleChange} name="repeatPassword" autoComplete="true" value={formData.repeatPassword} type='password' placeholder='Repeat Password' className='outline-none border-b-2 border-b-grayish-blue bg-transparent font-light indent-3 text-sm pb-1 caret-red focus:border-b-white' />
                        <button type="submit" disabled={loading} className='rounded-md bg-red py-2 font-light'>Craete an account</button>
                    </form>
                    <div className='text-sm text-center font-light flex gap-2 justify-center'>
                        <p className=''>Already have an account?</p>
                        <Link href="/login" className='text-red'>Login</Link>
                    </div>
                </div>
            </div>
        </div >
    )
}
