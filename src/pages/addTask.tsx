import 'tailwindcss/tailwind.css';

import { useState } from 'react';
import Navigation from "@/components/Navigation";
import useInput from '@/hooks/useInput';
import { API_BASE_URL } from '@/utils/utils';
import { useRouter } from 'next/navigation';

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function AddTask() {
    const router = useRouter();

    const taskNameInput = useInput();
    const [taskDesc, setTaskDesc] = useState();

    const onInputHandler = (e: any) => {
        let content = e.target.value;
        setTaskDesc(content);
    }

    const onAddTaskHandler = async (e: any) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        try {
            const res = await fetch(`${API_BASE_URL}/task`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: taskNameInput.value,
                    description: taskDesc
                })
            })

            if (res.ok) {
                toast.success('task added successfully!',{
                    onClose: () =>{
                        router.push('/home');
                    }
                })
            }
        } catch (error) {
            console.log('Error', error);
        }
    }

    return (
        <>
            <Navigation />
            <main className="flex flex-col p-6">
                <h2 className="text-center text-xl">Add New List</h2>
                <div className='divider' />
                <div className="mt-10 sm:mx-auto w-full md:w-2/3">
                    <form className="space-y-6" onSubmit={onAddTaskHandler}>
                        <div className='md:flex md:items-center mb-6 justify-between'>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Task Name
                            </label>
                            <div className="mt-2 md:w-2/3">
                                <input
                                    id="task_name"
                                    name="task_name"
                                    type="text"
                                    autoComplete="text"
                                    required
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder='name'
                                    value={taskNameInput.value}
                                    onChange={taskNameInput.onChange}
                                />
                            </div>
                        </div>

                        <div className='md:flex md:items-center mb-6 justify-between'>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Task Description
                            </label>
                            <div className="mt-2 md:w-2/3">
                                <textarea
                                    id="task_desc"
                                    name="task_desc"
                                    required
                                    className="textarea block w-full rounded-md  p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder='description'
                                    value={taskDesc}
                                    onInput={onInputHandler}
                                />
                            </div>
                        </div>

                        <div className='flex justify-center pt-5'>
                            <button
                                type="submit"
                                className="flex w-2/3 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 py-2"
                            >
                                Add Task
                            </button>
                        </div>
                    </form>
                </div>
            </main>

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
        </>
    )

}