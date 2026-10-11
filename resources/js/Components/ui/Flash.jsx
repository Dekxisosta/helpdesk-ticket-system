import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Flash() {
    const { flash, errors } = usePage().props;
    const [toast, setToast] = useState(null);

    useEffect(() => {
        let t = null;
        if (flash?.success) t = { type: 'success', text: flash.success };
        else if (flash?.error) t = { type: 'error', text: flash.error };
        else if (errors && Object.keys(errors).length) t = { type: 'error', text: 'Please fix the highlighted fields.' };
        setToast(t);
        if (!t) return;
        const id = setTimeout(() => setToast(null), 4000);
        return () => clearTimeout(id);
    }, [flash, errors]);

    if (!toast) return null;

    return (
        <div role="status" aria-live="polite" className="fixed right-4 top-20 z-50 w-[calc(100%-2rem)] max-w-sm">
            <div className={`flex items-start justify-between gap-3 border-4 border-black p-3 font-bold shadow-nb ${toast.type === 'success' ? 'bg-nb-green' : 'bg-nb-pink'}`}>
                <span>{toast.text}</span>
                <button type="button" onClick={() => setToast(null)} aria-label="Dismiss" className="border-2 border-black bg-white px-2 leading-none">×</button>
            </div>
        </div>
    );
}
