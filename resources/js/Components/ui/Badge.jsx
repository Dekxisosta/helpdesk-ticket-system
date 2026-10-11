const priority = { Low: 'bg-nb-green', Medium: 'bg-nb-blue', High: 'bg-nb-yellow', Urgent: 'bg-nb-pink' };
const status = { Open: 'bg-nb-blue', 'In Progress': 'bg-nb-yellow', Resolved: 'bg-nb-green', Closed: 'bg-gray-300' };

export default function Badge({ type, value }) {
    const map = type === 'priority' ? priority : status;
    return (
        <span className={`inline-block whitespace-nowrap border-2 border-black px-2 py-0.5 text-xs font-bold uppercase ${map[value] ?? 'bg-white'}`}>
            {value}
        </span>
    );
}
