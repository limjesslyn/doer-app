import 'tailwindcss/tailwind.css';

import Navigation from "@/components/Navigation";
import Link from "next/link";
import useAuth from '@/hooks/useAuth';
import LoginPage from './login';
import CardList from '@/components/CardList';
import Footer from '@/components/Footer';

export default function Home() {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return (
            <>
                <Navigation />
                <main className="flex min-h-screen flex-col p-6">
                    <h2 className="text-center text-xl underline">Your List</h2>
                    <div className='mt-4'>
                        <CardList />
                    </div>
                </main>
                <Footer />
            </>
        )
    }

    return (
        <main className="flex min-h-screen flex-col p-6">
            <LoginPage />
        </main>
    )
}