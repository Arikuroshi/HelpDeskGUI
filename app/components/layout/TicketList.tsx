import Section from "./Section";
interface TicketListProps {
  title: string;
  tickets?: Ticket[];
  variant?: "priority" | "default";
}
export default function TicketList({
  title,
  tickets = [],
  variant,
}: TicketListProps) {
  return (
    <Section title={title}>
      <div className="divide-y divide-gray-200">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="py-3 flex justify-between items-center hover:bg-black/5 px-2 rounded-lg transition"
          >
            <div>
              <p className="text-sm text-black/90">{ticket.title}</p>
              <p className="text-xs text-black/50">
                {ticket.status} · {ticket.priority}
              </p>
            </div>
            <span className="text-xs text-black/40">
              {new Date(ticket.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}
