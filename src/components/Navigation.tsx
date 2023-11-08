import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navigation() {
    const router = useRouter();

    const onSignOutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        router.push('/login');
    }

    return (
        <div className="navbar border-b-2">
            <div className="flex-1">
                <Link href="/home" className="btn btn-ghost normal-case text-xl">doer</Link>
            </div>
            <div className="flex-none ">
                <ul className="menu menu-horizontal px-1 gap-2">
                    <li>
                        <details>
                            <summary>
                                Parent
                            </summary>
                            <ul className="p-2 bg-base-100">
                                <li><a>Link 1</a></li>
                                <li><a>Link 2</a></li>
                            </ul>
                        </details>
                    </li>

                    <li>
                        <button 
                            type="button"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={onSignOutHandler}
                        >
                            Sign Out
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}