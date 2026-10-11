import { Link } from '@inertiajs/react';
import Flash from '@/Components/ui/Flash';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <Flash />
            <Link href="/" className="mb-6 border-4 border-black bg-nb-yellow px-4 py-2 text-2xl font-bold uppercase shadow-nb">
                HelpDesk
            </Link>
            <div className="w-full max-w-md border-4 border-black bg-white p-6 shadow-nb">{children}</div>
        </div>
    );
}
