import TicketCard from "../../components/TicketCard";

interface Ticket {
  id: number;
  title: string;
  status: "Open" | "In-Progress" | "Closed";
  priority: "Low" | "Medium" | "High";
}

interface Props {
  params: { id: string };
}

const TicketPage = ({ params }: Props) => {
  //TODO: Implement data fetching
  const ticket: Ticket = {
    id: Number(params.id),
    title: "Example ticket",
    status: "Open",
    priority: "High",
  };

  return (
    <div className="p-4">
      <TicketCard
        title={ticket.title}
        status={ticket.status}
        priority={ticket.priority}
      />
    </div>
  );
};

export default TicketPage;
