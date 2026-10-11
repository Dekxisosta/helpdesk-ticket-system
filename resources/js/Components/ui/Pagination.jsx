import { Link } from '@inertiajs/react';

const clean = (label) => label.replace('&laquo; Previous', '‹ Prev').replace('Next &raquo;', 'Next ›');

export default function Pagination({ links }) {
    if (!links || links.length <= 3) return null;
    return (
        <nav className="mt-6 flex flex-wrap gap-2" aria-label="Pagination">
            {links.map((l, i) =>
                l.url ? (
                    <Link
                        key={i}
                        href={l.url}
                        preserveScroll
                        className={`border-4 border-black px-3 py-1 font-bold shadow-nb-sm ${l.active ? 'bg-nb-yellow' : 'bg-white'}`}
                    >
                        {clean(l.label)}
                    </Link>
                ) : (
                    <span key={i} className="border-4 border-black bg-gray-200 px-3 py-1 font-bold opacity-50">
                        {clean(l.label)}
                    </span>
                ),
            )}
        </nav>
    );
}
