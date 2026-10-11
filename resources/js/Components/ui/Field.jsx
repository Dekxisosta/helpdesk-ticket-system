const base =
    'w-full border-4 border-black bg-white px-3 py-2 font-medium shadow-nb-sm focus:border-black focus:bg-nb-yellow/20 focus:outline-none focus:ring-0';

export function Field({ label, error, htmlFor, children }) {
    return (
        <div>
            <label htmlFor={htmlFor} className="mb-1 block text-sm font-bold uppercase">{label}</label>
            {children}
            {error && (
                <p role="alert" className="mt-2 border-2 border-black bg-nb-pink px-2 py-1 text-sm font-bold">{error}</p>
            )}
        </div>
    );
}

export function Input({ className = '', ...props }) {
    return <input {...props} className={`${base} ${className}`} />;
}

export function Textarea({ className = '', ...props }) {
    return <textarea {...props} className={`${base} ${className}`} />;
}

export function Select({ className = '', children, ...props }) {
    return <select {...props} className={`${base} ${className}`}>{children}</select>;
}
