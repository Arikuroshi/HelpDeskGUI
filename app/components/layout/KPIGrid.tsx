import KPIItem from "./KPIItem";
import type { Ticket } from "../../../types";

interface KPIGridProps {
  data: {
    myTickets: Ticket[];
    overdueTickets: number;
    openTickets: number;
    unassignedTickets: number;
  };
}

export default function KPIGrid({ data }: KPIGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <KPIItem label="Open" value={data.openTickets} />
      <KPIItem label="Overdue" value={data.overdueTickets} highlight />
      <KPIItem label="Unassigned" value={data.unassignedTickets} />
      <KPIItem label="Mine" value={data.myTickets.length} />
    </div>
  );
}
