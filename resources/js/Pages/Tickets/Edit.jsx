import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/Components/ui/Card';
import TicketForm from './Form';

export default function Edit({ ticket, options }) {
    const form = useForm({
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        status: ticket.status,
        category: ticket.category,
    });
    const submit = (e) => {
        e.preventDefault();
        form.put(route('tickets.update', ticket.id));
    };

    return (
        <AuthenticatedLayout header="Edit ticket">
            <Head title="Edit ticket" />
            <Card className="max-w-3xl">
                <TicketForm form={form} options={options} onSubmit={submit} submitLabel="Save changes" cancelHref={route('tickets.show', ticket.id)} />
            </Card>
        </AuthenticatedLayout>
    );
}
