"use client"
import React, { useState } from 'react'
import '../../styles/style.css'
import Input from '../InputField/Input'
import AuthButton from '../AuthButton/AuthButton'
import Link from 'next/link'
import { Login } from '@/apis/authApi'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'

const LoginComponent = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    const handleLogin = async () => { 
        setLoading(true);
        try {
            const res = await Login({ email, password });
            console.log(res)
            Cookies.set('token', res.data.token, { expires: 7 })
            router.push('/')
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='formBg h-screen'>
            <div className='flex justify-center items-center pt-16'>
                <div className='border-2 w-1/3 h-80 formBg1 rounded-xl'>
                    <div className='flex flex-col justify-center items-center gap-y-4'>
                        <span className='font-bold text-3xl pt-5 pb-4'>Welcome to <span className='text-violet-900'>Workflo</span>!</span>
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
                            placeholder='Login'
                            onClick={handleLogin}
                            disabled={loading}
                        />
                        <div className='pt-2 pb-5'>
                            <span className='text-sm text-gray-600'>Don't have an account? Create a <Link href='/signup' className='text-blue-700 cursor-pointer'>new account</Link>.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent;