const variants = {
    primary: 'bg-nb-yellow',
    danger: 'bg-nb-pink',
    info: 'bg-nb-blue',
    success: 'bg-nb-green',
    ghost: 'bg-white',
};

export const btn = (variant = 'primary', extra = '') =>
    `inline-flex items-center justify-center gap-2 border-4 border-black px-4 py-2 text-sm font-bold uppercase tracking-wide text-black shadow-nb transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-nb-sm active:translate-x-[6px] active:translate-y-[6px] active:shadow-none ${variants[variant]} ${extra}`;

export default function Button({ variant = 'primary', className = '', type = 'button', ...props }) {
    return (
        <button
            type={type}
            {...props}
            className={`${btn(variant, className)} disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-nb`}
        />
    );
}
