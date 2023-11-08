import 'tailwindcss/tailwind.css';

import Navigation from "@/components/Navigation";
import Link from "next/link";
import useAuth from '@/hooks/useAuth';
import LoginPage from './login';


export default function Home() {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return (
            <>
                <Navigation />
                <main className="flex min-h-screen flex-col p-6">
                    <h2 className="text-center">To Do List</h2>
                    <div>
                        <ul>
                            <li>
                                <Link href={"/other"}>Other</Link>
                            </li>
                        </ul>
                    </div>
                </main>
            </>
        )
    }

    return (
        <main className="flex min-h-screen flex-col p-6">
            <LoginPage />
        </main>
    )
}