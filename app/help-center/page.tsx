import Link from "next/link";
import Card from "../components/ui/Card";

const articles = [
  {
    href: "/help-center/getting-started",
    title: "Getting started",
    summary: "Set up your account and submit your first support ticket.",
  },
  {
    href: "/help-center/managing-tickets",
    title: "Managing tickets",
    summary: "How to view, update, and track the progress of your tickets.",
  },
  {
    href: "/help-center/sla-and-priority",
    title: "Priority & SLA definitions",
    summary: "Understand P1–P4 priorities and response / resolution targets.",
  },
  {
    href: "/help-center/faq",
    title: "FAQs",
    summary: "Frequently asked questions about the helpdesk system.",
  },
];

export default function HelpCentrePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <p className="font-mono text-xs text-ink-faint uppercase tracking-widest mb-2">
        Help centre
      </p>
      <h1 className="text-2xl font-semibold tracking-tight mb-8">
        How can we help?
      </h1>

      <div className="space-y-3">
        {articles.map((a) => (
          <Link key={a.href} href={a.href}>
            <Card className="p-5 hover:bg-surface-3 transition-colors cursor-pointer">
              <h2 className="text-sm font-medium text-ink mb-1">{a.title}</h2>
              <p className="text-sm text-ink-muted">{a.summary}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
