/* eslint-disable react-hooks/rules-of-hooks */
import 'tailwindcss/tailwind.css';

import { useState } from 'react';

import Navigation from "@/components/Navigation"
import useInput from '@/hooks/useInput';
import { API_BASE_URL } from '@/utils/utils';
import { useRouter } from 'next/router';

export default function editTask() {
    const router = useRouter();

    const taskID = router.query.taskID;
    const taskNameOld = router.query.name;
    const taskDescOld = router.query.description;

    const taskNameInput = useInput();
    const [taskDesc, setTaskDesc] = useState();
    const [isChecked, setIsChecked] = useState(false);

    const onInputHandler = (e: any) => {
        let content = e.target.value;
        setTaskDesc(content);
    }

    const onCheckChangeHandler = () => {
        setIsChecked(!isChecked);

    }

    const onEditHandler = async (e: any) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        try {
            const res = await fetch(`${API_BASE_URL}/task/${taskID}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: taskNameInput.value,
                    description: taskDesc,
                    is_complete: isChecked
                })
            })

            if (res.ok) {
                alert('task updated successfully!')
                router.push('/home');
            }
        } catch (error) {
            console.log('Error', error);

        }
    }

    return (
        <>
            <Navigation />
            <main className="flex flex-col p-6">
                <h2 className="text-center text-xl">
                    Editing {' '}
                    <span className='font-semibold'>{taskNameOld}</span>
                    {' '} Task
                </h2>
                <div className='divider' />
                <div className="mt-10 sm:mx-auto w-full md:w-2/3">
                    <form className="space-y-6" onSubmit={onEditHandler}>
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
                                    placeholder={taskNameOld?.toString()}
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
                                    placeholder={taskDescOld?.toString()}
                                    value={taskDesc}
                                    onInput={onInputHandler}
                                />
                            </div>
                        </div>

                        <div className="form-control items-start">
                            <label className="label cursor-pointer">
                                <span className="label-text mr-5">Completed</span>
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-primary"
                                    checked={isChecked}
                                    onChange={onCheckChangeHandler}
                                />
                            </label>
                        </div>

                        <div className='flex justify-center pt-5'>
                            <button
                                type="submit"
                                className="flex w-2/3 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 py-2"
                            >
                                Edit Task
                            </button>
                        </div>
                    </form>
                </div>

            </main>
        </>
    )
}