import Button from './Button';

export default function ConfirmModal({ open, title, message, confirmLabel = 'Delete', processing = false, onConfirm, onCancel }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true">
            <div className="w-full max-w-md border-4 border-black bg-white p-6 shadow-nb">
                <h2 className="text-xl font-bold uppercase">{title}</h2>
                <p className="mt-2">{message}</p>
                <div className="mt-6 flex justify-end gap-3">
                    <Button variant="ghost" onClick={onCancel} disabled={processing}>Cancel</Button>
                    <Button variant="danger" onClick={onConfirm} disabled={processing}>
                        {processing ? 'Deleting…' : confirmLabel}
                    </Button>
                </div>
            </div>
        </div>
    );
}
