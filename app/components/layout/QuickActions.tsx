import Section from "./Section";
import Link from "next/link";

export default function QuickActions() {
  return (
    <Section title="Actions">
      <div className="flex flex-col gap-2">
        <Link
          href="/tickets/new"
          className="bg-black text-white text-sm px-4 py-2 rounded-xl text-center"
        >
          Create Ticket
        </Link>

        <Link
          href="/tickets?filter=unassigned"
          className="text-sm px-4 py-2 border border-gray-200 rounded-xl text-center hover:bg-black/5"
        >
          View Unassigned
        </Link>
      </div>
    </Section>
  );
}
