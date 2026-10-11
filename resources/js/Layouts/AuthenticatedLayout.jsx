import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Flash from '@/Components/ui/Flash';
import { btn } from '@/Components/ui/Button';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);

    const navLink = (name, label) => (
        <Link
            href={route(name)}
            className={`border-4 border-black px-3 py-1 text-sm font-bold uppercase ${route().current(name + '*') ? 'bg-nb-yellow' : 'bg-white'}`}
        >
            {label}
        </Link>
    );

    return (
        <div className="min-h-screen">
            <Flash />
            <header className="sticky top-0 z-40 border-b-4 border-black bg-nb-blue">
                <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 p-3 sm:px-6">
                    <Link href={route('dashboard')} className="border-4 border-black bg-nb-yellow px-3 py-1 text-xl font-bold uppercase shadow-nb-sm">
                        HelpDesk
                    </Link>

                    <nav className="hidden items-center gap-3 md:flex">
                        {navLink('dashboard', 'Dashboard')}
                        {navLink('tickets.index', 'Tickets')}
                        <Link href={route('tickets.create')} className={btn('success', '!py-1')}>+ New Ticket</Link>
                        <Link href={route('profile.edit')} className="border-4 border-black bg-white px-3 py-1 text-sm font-bold">
                            {auth.user.name}
                        </Link>
                        <Link href={route('logout')} method="post" as="button" className={btn('danger', '!py-1')}>Logout</Link>
                    </nav>

                    <button
                        type="button"
                        onClick={() => setOpen(!open)}
                        aria-label="Toggle menu"
                        aria-expanded={open}
                        className="border-4 border-black bg-white px-3 py-1 text-xl font-bold md:hidden"
                    >
                        {open ? '×' : '≡'}
                    </button>
                </div>

                {open && (
                    <nav className="flex flex-col gap-3 border-t-4 border-black bg-nb-paper p-4 md:hidden">
                        <p className="font-bold uppercase">Hi, {auth.user.name}</p>
                        {navLink('dashboard', 'Dashboard')}
                        {navLink('tickets.index', 'Tickets')}
                        <Link href={route('tickets.create')} className={btn('success')}>+ New Ticket</Link>
                        <Link href={route('profile.edit')} className={btn('ghost')}>Profile</Link>
                        <Link href={route('logout')} method="post" as="button" className={btn('danger')}>Logout</Link>
                    </nav>
                )}
            </header>

            <main className="mx-auto max-w-6xl p-4 sm:p-6">
                {header && (typeof header === 'string' ? <h1 className="mb-6 text-3xl font-bold uppercase">{header}</h1> : <div className="mb-6">{header}</div>)}
                {children}
            </main>
        </div>
    );
}
