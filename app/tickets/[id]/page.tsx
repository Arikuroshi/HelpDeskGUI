import React from "react";

interface TicketCardProps {
  title: string;
  status: "open" | "in-progress" | "closed";
  priority: "low" | "medium" | "high";
  onClick: () => void;
}

const TicketCard: React.FC<TicketCardProps> = ({
  title,
  status,
  priority,
  onClick,
}) => {
  const statusColors = {
    open: "bg-green-100 text-green-800",
    "in-progress": "bg-yellow-100 text-yellow-800",
    closed: "bg-red-100 text-red-800",
  };

  const priorityColors = {
    low: "border-green-500",
    medium: "border-yellow-500",
    high: "border-red-500",
  };

  return (
    <div
      className={`flex flex-col p-4 border rounded-lg shadow-md cursor-pointer ${statusColors[status]} ${priorityColors[priority]}`}
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2">Status: {status}</p>
      <p className="mt-1">Priority: {priority}</p>
    </div>
  );
};

export default TicketCard;
