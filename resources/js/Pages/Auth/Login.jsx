import { useEffect, useRef } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import gsap from 'gsap';

export default function Login({ status, canResetPassword }) {
    const formRef = useRef(null);
    const logoRef = useRef(null);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        // Animation for the login form
        const tl = gsap.timeline();
        
        tl.from(logoRef.current, {
            y: -50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
        
        tl.from(formRef.current.children, {
            y: 30,
            opacity: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.4");
    }, []);

    const submit = (e) => {
        e.preventDefault();
        
        // Animation on submit
        gsap.to(formRef.current, {
            y: 5,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            onComplete: () => {
                post(route('login'), {
                    onFinish: () => reset('password'),
                });
            }
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8">
                        
                        {/* Logo */}
                        <div ref={logoRef} className="flex justify-center mb-8">
                            <div className="flex items-center space-x-2 group">
                                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    ProjectManager
                                </span>
                            </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">Sign in to your account</h2>
                        
                        {status && (
                            <div className="mb-4 bg-green-50 p-3 rounded-lg border border-green-200">
                                <p className="text-sm font-medium text-green-600">{status}</p>
                            </div>
                        )}
                        
                        <form ref={formRef} onSubmit={submit} className="space-y-6">
                            <div>
                                <InputLabel htmlFor="email" value="Email" className="text-gray-700 font-medium" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    autoComplete="username"
                                    isFocused={true}
                                    placeholder="your@email.com"
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>
                            
                            <div>
                                <div className="flex items-center justify-between">
                                    <InputLabel htmlFor="password" value="Password" className="text-gray-700 font-medium" />
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium hover:underline"
                                        >
                                            Forgot your password?
                                        </Link>
                                    )}
                                </div>
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>
                            
                            <div className="flex items-center">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        onChange={(e) =>
                                            setData('remember', e.target.checked)
                                        }
                                    />
                                    <span className="ml-2 text-sm text-gray-600">
                                        Remember me
                                    </span>
                                </label>
                            </div>
                            
                            <div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition transform hover:-translate-y-0.5"
                                >
                                    {processing ? (
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : null}
                                    Sign in
                                </button>
                            </div>
                            
                            <div className="text-center mt-4">
                                <span className="text-sm text-gray-600">
                                    Don't have an account?{' '}
                                    <Link href={route('register')} className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline">
                                        Sign up
                                    </Link>
                                </span>
                            </div>
                        </form>
                    </div>
                    
                    <div className="text-center mt-8">
                        <p className="text-xs text-gray-500">
                            &copy; {new Date().getFullYear()} ProjectManager. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}