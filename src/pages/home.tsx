import 'tailwindcss/tailwind.css';

import Navigation from "@/components/Navigation";
import Link from "next/link";

export default function Home() {
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