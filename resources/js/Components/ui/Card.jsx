export default function Card({ className = '', children }) {
    return <div className={`border-4 border-black bg-white p-4 shadow-nb ${className}`}>{children}</div>;
}
