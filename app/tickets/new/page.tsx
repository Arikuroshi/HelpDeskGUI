import NewTicketForm from "../../components/NewTicketForm";

export default function NewTicketPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <a
        href="/tickets"
        className="text-xs font-mono text-[var(--ink-faint)] hover:text-[var(--ink)] transition-colors mb-6 inline-block"
      >
        ← Back
      </a>
      <h1 className="text-2xl font-semibold tracking-tight mb-6">New ticket</h1>
      <NewTicketForm />
    </div>
  );
}
