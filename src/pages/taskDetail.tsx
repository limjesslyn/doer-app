import 'tailwindcss/tailwind.css';

import Navigation from "@/components/Navigation"
import { useRouter } from 'next/router';
import { onDelete, showFormattedDate } from '@/utils/utils';

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function taskDetail() {
    const router = useRouter();

    const taskID = router.query.taskID;
    const taskName = router.query.name;
    const taskDesc = router.query.description;
    const taskCreatedAt = router.query.createdAt;

    const onEditHandler = () => {
        router.push({
            pathname: '/editTask',
            query: {
                taskID: `${taskID}`,
                name: `${taskName}`,
                description: `${taskDesc}`
            }
        })
    }

    const onDeleteHandler = async (taskID: any) => {
        try {
            const res = await onDelete(taskID);

            if (res !== undefined) {
                if (res.ok) {
                    toast.success('Task deleted successfully!', {
                        onClose: () => {
                            router.push('/home');
                        }
                    })
                }
            }
            return null;
        } catch (error) {
            console.log('Error', error);
        }
    }

    return (
        <>
            <Navigation />
            <main className="flex flex-col p-6">
                <h2 className="text-center text-xl">
                    <span className='font-semibold'>{taskName}</span>
                    {' '}Task Detail
                </h2>
                <div className='divider' />
                <div className="sm:mx-auto w-full md:w-2/3">
                    <div className='w-full h-full'>
                        <div className="card-body">
                            <p className="text-gray-400 text-sm text-end">{showFormattedDate(taskCreatedAt)}</p>
                            <h2 className="card-title">{taskName}</h2>
                            <p className='px-4'>{taskDesc}</p>
                            <div className="card-actions justify-center flex flex-row flex-nowrap gap-4 mt-4">
                                <button
                                    className="btn btn-info hover:bg-sky-600 hover:border-sky-600 text-white md:w-1/4 sm:w-1/2"
                                    onClick={onEditHandler}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-error hover:bg-red-500 hover:border-red-500 md:w-1/4 sm:w-1/2 text-white"
                                    onClick={() => onDeleteHandler(taskID)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
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