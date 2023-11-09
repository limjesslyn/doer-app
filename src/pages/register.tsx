import 'tailwindcss/tailwind.css';

import useAuth from '@/hooks/useAuth';
import useInput from '@/hooks/useInput';
import { API_BASE_URL } from '@/utils/utils';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function register() {
    const { isAuthenticated } = useAuth();

    const emailInput = useInput();
    const nameInput = useInput();
    const usernameInput = useInput();
    const passwordInput = useInput();
    const confirmPasswordInput = useInput();

    const router = useRouter();

    const onRegisterHandler = async (e: any) => {
        e.preventDefault();

        if (usernameInput.value.length < 6) {
            toast.error('Username must be longer than 6 character')
        } else if (passwordInput.value.length < 8) {
            toast.error('Password must be longer than 8 character')
        } else if (passwordInput.value !== confirmPasswordInput.value) {
            toast.error('Password and confirm password mismatch')
        } else {
            try {
                const res = await fetch(`${API_BASE_URL}/auth/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: usernameInput.value,
                        email: emailInput.value,
                        name: nameInput.value,
                        password: passwordInput.value
                    })
                })

                if (res.ok) {
                    router.push('/login');
                }
            } catch (error) {
                console.error('Error', error);
            }
        }
    }

    if (isAuthenticated) {
        router.push('/home');
    }

    return (
        <div>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Register your
                        {' '}
                        <span className='underline'>Doer</span>
                        {' '}
                        account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={onRegisterHandler}>
                        <div>
                            <label htmlFor='email' className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder='johndoe@mail.com'
                                    className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={emailInput.value}
                                    onChange={emailInput.onChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor='name' className="block text-sm font-medium leading-6 text-gray-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    placeholder='John Doe'
                                    className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={nameInput.value}
                                    onChange={nameInput.onChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor='username' className="block text-sm font-medium leading-6 text-gray-900">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="text"
                                    required
                                    placeholder='jdoe'
                                    className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={usernameInput.value}
                                    onChange={usernameInput.onChange}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor='password' className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={passwordInput.value}
                                    onChange={passwordInput.onChange}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor='confirmPassword' className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirm Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={confirmPasswordInput.value}
                                    onChange={confirmPasswordInput.onChange}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Register
                            </button>
                        </div>
                    </form>

                </div>
            </div>
            <p className="text-center text-sm text-gray-500">
                Already have an account? {' '}
                <Link
                    href="/login"
                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                    Login here
                </Link>
            </p>

            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
}