import 'tailwindcss/tailwind.css';

import Navigation from "@/components/Navigation"
import { API_BASE_URL, ProfileProps } from '@/utils/const';
import { useEffect, useState } from 'react';
import useInput from '@/hooks/useInput';
import { useRouter } from 'next/navigation';

export default function Profile() {

    const [userProfileData, setUserProfileData] = useState<ProfileProps>();

    const router = useRouter();

    const emailInput = useInput();
    const nameInput = useInput();
    const oldPasswordInput = useInput();
    const newPasswordInput = useInput();

    const onUpdateHandler = async (e: any) => {
        e.preventDefault();

        if (newPasswordInput.value.length < 8) {
            alert('password must be longer than 8 character')
        } else if (oldPasswordInput.value === newPasswordInput.value) {
            alert('new password is same with old one')
        } else {
            try {
                const token = localStorage.getItem('token');

                const res = await fetch(`${API_BASE_URL}/user`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: emailInput.value,
                        name: nameInput.value,
                        old_password: oldPasswordInput.value,
                        new_password: newPasswordInput.value
                    })
                })

                if (res.ok) {
                    alert('Update success!');
                    router.push('/home');
                }
            } catch (error) {
                console.log('Error', error);
            }
        }
    }

    const fetchUserInfo = async () => {
        const token = localStorage.getItem('token');

        try {
            const res = await fetch(`${API_BASE_URL}/user`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })

            const data = await res.json();
            if (res.ok) {
                setUserProfileData(data);
            }
        } catch (error) {
            console.log('Error', error);
        }
    }

    useEffect(() => {
        fetchUserInfo();
    }, [])

    if (userProfileData === undefined) {
        return null;
    }

    return (
        <>
            <Navigation />
            <main className="flex min-h-screen flex-col max-w-xl mx-auto p-6">
                <h2 className="font-semibold text-lg">Your Profile</h2>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
                    <form className="space-y-6" onSubmit={onUpdateHandler}>
                        <div className='md:flex md:items-center mb-6 justify-between'>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Email
                            </label>
                            <div className="mt-2 md:w-2/3">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder={userProfileData.email}
                                    value={emailInput.value}
                                    onChange={emailInput.onChange}
                                />
                            </div>
                        </div>

                        <div className='md:flex md:items-center mb-6 justify-between'>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Name
                            </label>
                            <div className="mt-2 md:w-2/3">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder={userProfileData.name}
                                    value={nameInput.value}
                                    onChange={nameInput.onChange}
                                />
                            </div>
                        </div>

                        <div className='md:flex md:items-center mb-6 justify-between'>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Old Password
                            </label>
                            <div className="mt-2 md:w-2/3">
                                <input
                                    id="old_password"
                                    name="old_password"
                                    type="password"
                                    autoComplete="password"
                                    required
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={oldPasswordInput.value}
                                    onChange={oldPasswordInput.onChange}
                                />
                            </div>
                        </div>

                        <div className='md:flex md:items-center mb-6 justify-between'>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                New Password
                            </label>
                            <div className="mt-2 md:w-2/3">
                                <input
                                    id="new_password"
                                    name="new_password"
                                    type="password"
                                    autoComplete="password"
                                    required
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={newPasswordInput.value}
                                    onChange={newPasswordInput.onChange}
                                />
                            </div>
                        </div>

                        <div className='flex justify-center pt-5'>
                            <button
                                type="submit"
                                className="flex w-2/3 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Update
                            </button>
                        </div>
                    </form>

                </div>

            </main>
        </>
    )
}