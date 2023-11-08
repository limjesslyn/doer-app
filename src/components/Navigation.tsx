import Link from "next/link";

export default function Navigation() {
    return (
        <div className="navbar border-b-2">
            <div className="flex-1">
                <Link href="/home" className="btn btn-ghost normal-case text-xl">doer</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><a>Profile</a></li>
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
                </ul>
            </div>
        </div>
    )
}