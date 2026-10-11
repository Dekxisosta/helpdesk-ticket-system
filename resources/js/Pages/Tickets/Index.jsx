import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import Button, { btn } from '@/Components/ui/Button';
import Pagination from '@/Components/ui/Pagination';
import ConfirmModal from '@/Components/ui/ConfirmModal';
import { Input, Select } from '@/Components/ui/Field';

export default function Index({ tickets, filters, options }) {
    const [f, setF] = useState({
        search: filters.search ?? '',
        status: filters.status ?? '',
        priority: filters.priority ?? '',
        category: filters.category ?? '',
    });
    const [target, setTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const hasFilters = Object.values(filters).some(Boolean);

    const apply = (e) => {
        e?.preventDefault();
        router.get(route('tickets.index'), Object.fromEntries(Object.entries(f).filter(([, v]) => v)), {
            preserveState: true,
            replace: true,
        });
    };

    const clear = () => {
        setF({ search: '', status: '', priority: '', category: '' });
        router.get(route('tickets.index'), {}, { preserveState: true, replace: true });
    };

    const confirmDelete = () =>
        router.delete(route('tickets.destroy', target.id), {
            preserveScroll: true,
            onStart: () => setDeleting(true),
            onFinish: () => {
                setDeleting(false);
                setTarget(null);
            },
        });

    const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

    return (
        <AuthenticatedLayout header="My tickets">
            <Head title="Tickets" />

            <form onSubmit={apply} className="mb-6 grid gap-3 border-4 border-black bg-white p-4 shadow-nb sm:grid-cols-2 lg:grid-cols-5">
                <Input type="search" placeholder="Search title…" value={f.search} onChange={set('search')} aria-label="Search" className="lg:col-span-2" />
                <Select value={f.status} onChange={set('status')} aria-label="Status">
                    <option value="">All statuses</option>
                    {options.statuses.map((o) => <option key={o}>{o}</option>)}
                </Select>
                <Select value={f.priority} onChange={set('priority')} aria-label="Priority">
                    <option value="">All priorities</option>
                    {options.priorities.map((o) => <option key={o}>{o}</option>)}
                </Select>
                <Select value={f.category} onChange={set('category')} aria-label="Category">
                    <option value="">All categories</option>
                    {options.categories.map((o) => <option key={o}>{o}</option>)}
                </Select>
                <div className="flex gap-3 sm:col-span-2 lg:col-span-5">
                    <Button type="submit" variant="info">Filter</Button>
                    {hasFilters && <Button variant="ghost" onClick={clear}>Clear</Button>}
                    <Link href={route('tickets.create')} className={btn('success', 'ml-auto')}>+ New Ticket</Link>
                </div>
            </form>

            {tickets.data.length === 0 ? (
                <Card className="py-10 text-center">
                    <p className="text-2xl font-bold uppercase">{hasFilters ? 'No matching tickets' : 'No tickets yet'}</p>
                    <p className="mb-6 mt-2">{hasFilters ? 'Try different filters.' : 'File your first ticket to get started.'}</p>
                    {!hasFilters && <Link href={route('tickets.create')} className={btn('success')}>+ New Ticket</Link>}
                </Card>
            ) : (
                <>
                    {/* Desktop table */}
                    <div className="hidden overflow-hidden border-4 border-black bg-white shadow-nb md:block">
                        <table className="w-full text-left">
                            <thead className="border-b-4 border-black bg-nb-yellow text-sm uppercase">
                                <tr>
                                    <th className="p-3">Title</th>
                                    <th className="p-3">Category</th>
                                    <th className="p-3">Priority</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets.data.map((t) => (
                                    <tr key={t.id} className="border-b-2 border-black last:border-b-0">
                                        <td className="p-3 font-bold">
                                            <Link href={route('tickets.show', t.id)} className="underline decoration-2 underline-offset-2">{t.title}</Link>
                                        </td>
                                        <td className="p-3">{t.category}</td>
                                        <td className="p-3"><Badge type="priority" value={t.priority} /></td>
                                        <td className="p-3"><Badge type="status" value={t.status} /></td>
                                        <td className="p-3">
                                            <div className="flex justify-end gap-2">
                                                <Link href={route('tickets.edit', t.id)} className={btn('info', '!px-3 !py-1')}>Edit</Link>
                                                <Button variant="danger" className="!px-3 !py-1" onClick={() => setTarget(t)}>Delete</Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile stacked cards */}
                    <div className="space-y-4 md:hidden">
                        {tickets.data.map((t) => (
                            <Card key={t.id}>
                                <Link href={route('tickets.show', t.id)} className="text-lg font-bold underline decoration-2">{t.title}</Link>
                                <p className="mt-1 text-sm">{t.category}</p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <Badge type="priority" value={t.priority} />
                                    <Badge type="status" value={t.status} />
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <Link href={route('tickets.edit', t.id)} className={btn('info', 'flex-1')}>Edit</Link>
                                    <Button variant="danger" className="flex-1" onClick={() => setTarget(t)}>Delete</Button>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <Pagination links={tickets.links} />
                </>
            )}

            <ConfirmModal
                open={!!target}
                title="Delete ticket?"
                message={target ? `"${target.title}" will be permanently removed.` : ''}
                processing={deleting}
                onConfirm={confirmDelete}
                onCancel={() => setTarget(null)}
            />
        </AuthenticatedLayout>
    );
}
