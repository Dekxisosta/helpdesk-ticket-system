import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import { btn } from '@/Components/ui/Button';

const tone = { Open: 'bg-nb-blue', 'In Progress': 'bg-nb-yellow', Resolved: 'bg-nb-green', Closed: 'bg-gray-300' };

export default function Dashboard({ stats, recent }) {
    const { total, ...byStatus } = stats;
    return (
        <AuthenticatedLayout header="Dashboard">
            <Head title="Dashboard" />

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
                <Card className="bg-nb-pink">
                    <p className="text-sm font-bold uppercase">Total</p>
                    <p className="text-4xl font-bold">{total}</p>
                </Card>
                {Object.entries(byStatus).map(([name, count]) => (
                    <Card key={name} className={tone[name]}>
                        <p className="text-sm font-bold uppercase">{name}</p>
                        <p className="text-4xl font-bold">{count}</p>
                    </Card>
                ))}
            </div>

            <h2 className="mb-4 mt-10 text-2xl font-bold uppercase">Recent tickets</h2>
            {recent.length === 0 ? (
                <Card className="text-center">
                    <p className="mb-4 font-bold">No tickets yet. File your first one.</p>
                    <Link href={route('tickets.create')} className={btn('success')}>+ New Ticket</Link>
                </Card>
            ) : (
                <div className="space-y-3">
                    {recent.map((t) => (
                        <Link key={t.id} href={route('tickets.show', t.id)} className="block">
                            <Card className="flex flex-wrap items-center justify-between gap-2 transition hover:bg-nb-yellow/30">
                                <span className="font-bold">{t.title}</span>
                                <span className="flex gap-2">
                                    <Badge type="priority" value={t.priority} />
                                    <Badge type="status" value={t.status} />
                                </span>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </AuthenticatedLayout>
    );
}
