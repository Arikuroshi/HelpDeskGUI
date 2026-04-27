import TicketCard from "@/components/TicketCard";

const tickets = [
  {
    id: 1,
    title: "Issue with login",
    status: "Open",
    priority: "High",
  },
  {
    id: 2,
    title: "Payment not processed",
    status: "Pending",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Feature request: Dark mode",
    status: "Closed",
    priority: "Low",
  },
];

const TicketList = () => {
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-xl font-semibold">Your Tickets</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} {...ticket} />
        ))}
      </div>
    </div>
  );
};

export default TicketList;
