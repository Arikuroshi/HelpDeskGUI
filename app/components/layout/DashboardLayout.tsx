import ActivityFeed from "./ActivityFeed";
import KPIGrid from "./KPIGrid";
import QuickActions from "./QuickActions";
import TicketList from "./TicketList";
import type { Ticket, Activity } from "../../../types";

// components/DashboardLayout.tsx
interface DashboardLayoutProps {
  data: {
    myTickets: Ticket[];
    recentActivity: Activity[];
    openTickets: number;
    unassignedTickets: number;
  };
}
export default function DashboardLayout({ data }: DashboardLayoutProps) {
  return (
    <div className="p-8 bg-[#F7F7F5] min-h-screen">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-medium tracking-tight text-black/90">
          Dashboard
        </h1>
        <p className="text-sm text-black/50">
          Overview of current service state
        </p>
      </div>

      {/* KPI Row */}
      <KPIGrid data={data} />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Left: Priority + My Work */}
        <div className="lg:col-span-2 space-y-6">
          <TicketList title="My Tickets" tickets={data.myTickets} />
          <TicketList title="Needs Attention" variant="priority" />
        </div>

        {/* Right: Activity + Actions */}
        <div className="space-y-6">
          <QuickActions />
          <ActivityFeed items={data.recentActivity} />
        </div>
      </div>
    </div>
  );
}
