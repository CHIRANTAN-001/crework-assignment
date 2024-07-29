"use client"
import React, { useState } from 'react'
import '../../styles/style.css'
import Input from '../InputField/Input'
import AuthButton from '../AuthButton/AuthButton'
import Link from 'next/link'
import { Signup } from '@/apis/authApi'
import Cookies from 'js-cookie' 
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const SignupComponent = () => {

    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    const router = useRouter();

    const handleSignup = async () => {
        setError(null);

        if (!fullName ||!email || !password) {
            setError('Please fill all fields');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setLoading(true);
        try {
            const res = await Signup({ name: fullName, email, password });
            console.log(res.data)
            Cookies.set('token', res.data.token, { expires: 7 })
            router.push('/dashboard')
        } catch (error) {
            console.log(error)
            setError('Login failed. Please check your credentials and try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='formBg h-screen'>
            <div className='flex justify-center items-center pt-16'>
                <div className='border-2 w-1/3 h-96 formBg1 rounded-xl'>
                    <div className='flex flex-col justify-center items-center gap-y-4'>
                        <span className='font-bold text-3xl pt-5 pb-4'>Welcome to <span className='text-violet-900'>Workflo</span>!</span>
                        <Input
                            type='text'
                            placeholder='Full name'
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        <Input
                            type='email'
                            placeholder='Your email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            type='password'
                            placeholder='Passoword'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <AuthButton
                            placeholder='Sign up'
                            onClick={handleSignup}
                            disabled={loading}
                        />
                    </div>
                    {error && (
                        <div className='text-red-500 text-sm pl-16 pt-2 font-medium'>
                            {error}
                        </div>
                    )}
                    <div className='pt-2 pb-5 flex justify-center items-center'>
                        <span className='text-sm text-gray-600'>Already have an account? <Link href='/login' className='text-blue-700 cursor-pointer'>Log in</Link>.</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupComponent