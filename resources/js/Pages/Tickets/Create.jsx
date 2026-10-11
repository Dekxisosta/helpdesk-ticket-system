import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Card from '@/Components/ui/Card';
import TicketForm from './Form';

export default function Create({ options }) {
    const form = useForm({ title: '', description: '', priority: 'Medium', status: 'Open', category: options.categories[0] });
    const submit = (e) => {
        e.preventDefault();
        form.post(route('tickets.store'));
    };

    return (
        <AuthenticatedLayout header="New ticket">
            <Head title="New ticket" />
            <Card className="max-w-3xl">
                <TicketForm form={form} options={options} onSubmit={submit} submitLabel="Create ticket" cancelHref={route('tickets.index')} />
            </Card>
        </AuthenticatedLayout>
    );
}
