import './globals.css';
import 'tailwindcss/tailwind.css';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" data-theme="light">
            <body>{children}</body>
        </html>
    );
}
