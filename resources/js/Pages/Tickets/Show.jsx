import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import Button, { btn } from '@/Components/ui/Button';
import ConfirmModal from '@/Components/ui/ConfirmModal';

export default function Show({ ticket }) {
    const [confirm, setConfirm] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const destroy = () =>
        router.delete(route('tickets.destroy', ticket.id), {
            onStart: () => setDeleting(true),
            onFinish: () => setDeleting(false),
        });

    return (
        <AuthenticatedLayout header="Ticket details">
            <Head title={ticket.title} />
            <Card className="max-w-3xl">
                <div className="flex flex-wrap gap-2">
                    <Badge type="priority" value={ticket.priority} />
                    <Badge type="status" value={ticket.status} />
                    <span className="border-2 border-black bg-white px-2 py-0.5 text-xs font-bold uppercase">{ticket.category}</span>
                </div>
                <h2 className="mt-4 break-words text-2xl font-bold">{ticket.title}</h2>
                <p className="mt-4 whitespace-pre-wrap break-words">{ticket.description}</p>
                <dl className="mt-6 grid gap-2 border-t-4 border-black pt-4 text-sm sm:grid-cols-2">
                    <div><dt className="font-bold uppercase">Created</dt><dd>{new Date(ticket.created_at).toLocaleString()}</dd></div>
                    <div><dt className="font-bold uppercase">Updated</dt><dd>{new Date(ticket.updated_at).toLocaleString()}</dd></div>
                </dl>
                <div className="mt-6 flex flex-wrap gap-3">
                    <Link href={route('tickets.edit', ticket.id)} className={btn('info')}>Edit</Link>
                    <Button variant="danger" onClick={() => setConfirm(true)}>Delete</Button>
                    <Link href={route('tickets.index')} className={btn('ghost')}>Back</Link>
                </div>
            </Card>

            <ConfirmModal
                open={confirm}
                title="Delete ticket?"
                message="This ticket will be permanently removed."
                processing={deleting}
                onConfirm={destroy}
                onCancel={() => setConfirm(false)}
            />
        </AuthenticatedLayout>
    );
}
