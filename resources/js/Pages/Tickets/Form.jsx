import { Link } from '@inertiajs/react';
import Button, { btn } from '@/Components/ui/Button';
import { Field, Input, Select, Textarea } from '@/Components/ui/Field';

export default function TicketForm({ form, options, onSubmit, submitLabel, cancelHref }) {
    const { data, setData, errors, processing } = form;
    const bind = (k) => ({ id: k, name: k, value: data[k], onChange: (e) => setData(k, e.target.value) });

    return (
        <form onSubmit={onSubmit} className="space-y-5" noValidate>
            <Field label="Title" htmlFor="title" error={errors.title}>
                <Input type="text" maxLength={255} {...bind('title')} />
            </Field>
            <Field label="Description" htmlFor="description" error={errors.description}>
                <Textarea rows={5} {...bind('description')} />
            </Field>
            <div className="grid gap-5 sm:grid-cols-3">
                <Field label="Priority" htmlFor="priority" error={errors.priority}>
                    <Select {...bind('priority')}>{options.priorities.map((o) => <option key={o}>{o}</option>)}</Select>
                </Field>
                <Field label="Status" htmlFor="status" error={errors.status}>
                    <Select {...bind('status')}>{options.statuses.map((o) => <option key={o}>{o}</option>)}</Select>
                </Field>
                <Field label="Category" htmlFor="category" error={errors.category}>
                    <Select {...bind('category')}>{options.categories.map((o) => <option key={o}>{o}</option>)}</Select>
                </Field>
            </div>
            <div className="flex flex-wrap gap-3">
                <Button type="submit" variant="success" disabled={processing}>{processing ? 'Saving…' : submitLabel}</Button>
                <Link href={cancelHref} className={btn('ghost')}>Cancel</Link>
            </div>
        </form>
    );
}
