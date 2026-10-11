import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import Button from '@/Components/ui/Button';
import { Field, Input } from '@/Components/ui/Field';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({ email: '', password: '', remember: false });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), { onFinish: () => reset('password') });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <h1 className="mb-4 text-2xl font-bold uppercase">Log in</h1>
            {status && <p className="mb-4 border-2 border-black bg-nb-green px-2 py-1 font-bold">{status}</p>}
            <form onSubmit={submit} className="space-y-4" noValidate>
                <Field label="Email" htmlFor="email" error={errors.email}>
                    <Input id="email" type="email" autoComplete="username" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                </Field>
                <Field label="Password" htmlFor="password" error={errors.password}>
                    <Input id="password" type="password" autoComplete="current-password" value={data.password} onChange={(e) => setData('password', e.target.value)} />
                </Field>
                <label className="flex items-center gap-2 font-bold">
                    <input type="checkbox" checked={data.remember} onChange={(e) => setData('remember', e.target.checked)} className="h-5 w-5 border-4 border-black text-black focus:ring-0" />
                    Remember me
                </label>
                <Button type="submit" className="w-full" disabled={processing}>{processing ? 'Logging in…' : 'Log in'}</Button>
            </form>
            <div className="mt-4 flex flex-wrap justify-between gap-2 text-sm font-bold underline">
                <Link href={route('register')}>Create an account</Link>
                {canResetPassword && <Link href={route('password.request')}>Forgot password?</Link>}
            </div>
        </GuestLayout>
    );
}
