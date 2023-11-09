import 'tailwindcss/tailwind.css';

import useAuth from '@/hooks/useAuth';
import useInput from '@/hooks/useInput';
import { API_BASE_URL } from '@/utils/utils';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function login() {
    const { isAuthenticated } = useAuth();

    const router = useRouter();

    const usernameOrEmailInput = useInput();
    const passwordInput = useInput();

    const onLoginHandler = async (e: any) => {
        e.preventDefault();

        try {
            const res = await fetch(`${API_BASE_URL}/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username_or_email: usernameOrEmailInput.value,
                    password: passwordInput.value,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('token', data.token);

                router.push('/home');
            } else {
                toast.error(`Your username or password doesn't match!`);
            }
        } catch (error) {
            console.error('Error', error);
        }
    };

    if (isAuthenticated) {
        router.push('/home');
    }

    return (
        <div>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Login to your <span className="underline">Doer</span>{' '}
                        account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={onLoginHandler}>
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Username or Email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username_or_email"
                                    name="username_or_email"
                                    type="text"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={usernameOrEmailInput.value}
                                    onChange={usernameOrEmailInput.onChange}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
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
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={passwordInput.value}
                                    onChange={passwordInput.onChange}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Log in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <p className="text-center text-sm text-gray-500">
                Don&apos;t have an account?{' '}
                <Link
                    href="/register"
                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                    Register here
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
    );
}
