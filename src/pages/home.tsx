import 'tailwindcss/tailwind.css';

import { useEffect, useState } from 'react';
import Navigation from "@/components/Navigation";
import useAuth from '@/hooks/useAuth';
import LoginPage from './login';
import CardList from '@/components/CardList';
import { useRouter } from 'next/navigation';
import { API_BASE_URL, onDelete } from '@/utils/utils';

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
    const { isAuthenticated } = useAuth();

    const router = useRouter();
    const [taskList, setTaskList] = useState();

    const fetchList = async () => {
        const token = localStorage.getItem('token');

        try {
            const res = await fetch(`${API_BASE_URL}/task`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })

            const data = await res.json();
            if (res.ok) {
                setTaskList(data.data);
            }
        } catch (error) {
            console.log('Error', error);
        }
    }

    const onDeleteHandler = async (taskID: any) => {
        try {
            const res = await onDelete(taskID);
            if (res !== undefined) {
                if (res.ok) {
                    toast.success('Task deleted successfully!', {
                        onClose: () => {
                            router.refresh();
                        }
                    })

                }
            }
            return null;
        } catch (error) {
            console.log('Error', error);
        }
    }

    useEffect(() => {
        fetchList();
    }, [])

    if (isAuthenticated) {
        return (
            <>
                <Navigation />
                <main className="flex flex-col p-6">
                    <h2 className="text-center text-xl">Your List</h2>
                    <div className='divider' />
                    <div>
                        <CardList taskList={taskList} onDelete={onDeleteHandler} />
                    </div>
                    <div className='fixed z-90 bottom-10 right-8'>
                        <button
                            className='btn rounded-full text-xl w-[64px] h-[64px] btn-primary font-bold'
                            onClick={() => router.push('/addTask')}
                        >
                            +
                        </button>
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

    if (taskList === undefined) {
        return null;
    }
    return (
        <main className="flex min-h-screen flex-col p-6">
            <LoginPage />
        </main>
    )
}