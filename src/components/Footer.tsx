import Link from "next/link";

export default function Footer() {
    return (
        <footer className="footer footer-center p-4 bg-base-300 text-base-content">
            <aside>
                <p>Copyright © 2023 - All right reserved by {' '}
                    <Link 
                        href={'https://github.com/limjesslyn'} 
                        target="_blank" 
                        className="link"
                    >
                        limjesslyn
                    </Link>
                </p>
            </aside>
        </footer>
    )
}