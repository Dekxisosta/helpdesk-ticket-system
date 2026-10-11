import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import Button from '@/Components/ui/Button';
import { Field, Input } from '@/Components/ui/Field';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({ name: '', email: '', password: '', password_confirmation: '' });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), { onFinish: () => reset('password', 'password_confirmation') });
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <h1 className="mb-4 text-2xl font-bold uppercase">Register</h1>
            <form onSubmit={submit} className="space-y-4" noValidate>
                <Field label="Name" htmlFor="name" error={errors.name}>
                    <Input id="name" autoComplete="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                </Field>
                <Field label="Email" htmlFor="email" error={errors.email}>
                    <Input id="email" type="email" autoComplete="username" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                </Field>
                <Field label="Password" htmlFor="password" error={errors.password}>
                    <Input id="password" type="password" autoComplete="new-password" value={data.password} onChange={(e) => setData('password', e.target.value)} />
                </Field>
                <Field label="Confirm password" htmlFor="password_confirmation" error={errors.password_confirmation}>
                    <Input id="password_confirmation" type="password" autoComplete="new-password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} />
                </Field>
                <Button type="submit" className="w-full" disabled={processing}>{processing ? 'Creating…' : 'Register'}</Button>
            </form>
            <p className="mt-4 text-sm font-bold underline"><Link href={route('login')}>Already registered? Log in</Link></p>
        </GuestLayout>
    );
}
