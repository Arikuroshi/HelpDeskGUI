"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useApp } from "./context/AppContext";

const HexGraphic = dynamic(() => import("./components/HexGraphic"), {
  ssr: false,
  loading: () => <div className="w-50 h-45" />,
});

export default function HomePage() {
  const { role } = useApp();

  if (role === "supporter") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <p className="font-mono text-accent text-sm mb-4 tracking-widest uppercase">
          Supporter view
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-ink leading-tight mb-6">
          Welcome back
        </h1>
        <p className="text-ink-muted text-lg mb-10 leading-relaxed">
          {"Manage tickets, track SLAs, and keep your users happy."}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-xl bg-ink text-surface text-sm font-medium hover:opacity-80 transition-opacity"
          >
            Go to dashboard
          </Link>
          <Link
            href="/tickets"
            className="px-6 py-3 rounded-xl border border-border text-ink-muted text-sm hover:text-ink hover:bg-surface-2 transition-colors"
          >
            All tickets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-center justify-between gap-8 mb-10">
        <div className="flex-1">
          <p className="font-mono text-xs text-accent uppercase tracking-widest mb-3">
            ITIL Helpdesk
          </p>
          <h1 className="text-4xl font-semibold tracking-tight leading-tight mb-4">
            How can we
            <br />
            help you today?
          </h1>
          <p className="text-ink-muted text-base leading-relaxed mb-7 max-w-sm">
            {
              "Run into an issue? Raise a ticket and our support team will get back to you based on priority."
            }
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link
              href="/tickets/new"
              className="px-5 py-2.5 rounded-xl bg-ink text-surface text-sm font-medium hover:opacity-80 transition-opacity"
            >
              Raise a ticket
            </Link>
            <Link
              href="/tickets"
              className="px-5 py-2.5 rounded-xl border border-border text-ink-muted text-sm hover:text-ink hover:bg-surface-2 transition-colors"
            >
              My tickets
            </Link>
            <Link
              href="/help-center"
              className="px-5 py-2.5 rounded-xl border border-border text-ink-muted text-sm hover:text-ink hover:bg-surface-2 transition-colors"
            >
              Help centre
            </Link>
          </div>
        </div>

        <div className="hidden md:block shrink-0">
          <HexGraphic />
        </div>
      </div>

      <div className="border-t border-border mb-8" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            title: "Raise a ticket",
            desc: "Submit a support request and get a response within your SLA window.",
            icon: "🎫",
            href: "/tickets/new",
          },
          {
            title: "Track progress",
            desc: "Follow your ticket from open to resolved with real-time status updates.",
            icon: "📊",
            href: "/tickets",
          },
          {
            title: "SLA guaranteed",
            desc: "Every ticket is prioritised by impact and urgency so critical issues are handled first.",
            icon: "🛡️",
            href: "/help-center/sla-and-priority",
          },
        ].map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="rounded-2xl border border-border bg-surface-2 p-5 hover:bg-surface-3 transition-colors"
          >
            <div className="text-2xl mb-3">{card.icon}</div>
            <p className="text-sm font-medium text-ink mb-1">{card.title}</p>
            <p className="text-xs text-ink-muted leading-relaxed">
              {card.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
