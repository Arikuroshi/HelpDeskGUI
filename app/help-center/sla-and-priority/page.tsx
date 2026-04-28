import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import {
  PRIORITY_LABEL,
  PRIORITY_SLA,
  priorityBadgeClass,
} from "../../lib/ticketHelpers";
import type { Priority } from "../../../types";

const priorities: Priority[] = ["P1", "P2", "P3", "P4"];

const descriptions: Record<Priority, string> = {
  P1: "System outage or core feature unavailable — multiple users affected, no workaround.",
  P2: "Major functionality impaired — some workaround available but not ideal.",
  P3: "Non-critical functionality affected — limited user impact.",
  P4: "Cosmetic issues or informational requests — no functional impact.",
};

export default function SLAPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <a
        href="/help-center"
        className="text-xs font-mono text-[var(--ink-faint)] hover:text-[var(--ink)] transition-colors mb-6 inline-block"
      >
        ← Help centre
      </a>
      <h1 className="text-2xl font-semibold tracking-tight mb-2">
        Priority & SLA definitions
      </h1>
      <p className="text-[var(--ink-muted)] text-sm mb-8">
        Priority is derived automatically from Impact × Urgency and determines
        how quickly support must respond and resolve the ticket.
      </p>

      <div className="space-y-4">
        {priorities.map((p) => {
          const sla = PRIORITY_SLA[p];
          return (
            <Card key={p} className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <Badge className={`${priorityBadgeClass(p)} text-sm px-3 py-1`}>
                  {p}
                </Badge>
                <span className="font-medium text-sm">
                  {PRIORITY_LABEL[p].split("—")[1].trim()}
                </span>
              </div>
              <p className="text-sm text-[var(--ink-muted)] mb-4">
                {descriptions[p]}
              </p>
              <div className="flex gap-6 font-mono text-xs">
                <div>
                  <span className="text-[var(--ink-faint)]">Response </span>
                  <span className="text-[var(--ink)] font-medium">
                    {sla.response}
                  </span>
                </div>
                <div>
                  <span className="text-[var(--ink-faint)]">Resolution </span>
                  <span className="text-[var(--ink)] font-medium">
                    {sla.resolution}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
