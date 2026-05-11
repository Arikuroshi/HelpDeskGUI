"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "./ui/Card";
import { useToast } from "@/context/ToastContext";

export default function CommentForm({ ticketId }: { ticketId: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    setError(null);

    const res = await fetch(`/api/tickets/${ticketId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      toast(data.error ?? "Failed to post comment.", "error");
      setLoading(false);
      return;
    }

    setContent("");
    setLoading(false);
    toast("Comment posted", "success");
    router.refresh();
  }

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          placeholder="Add a comment…"
          className="input resize-none"
        />
        {error && <p className="text-xs text-(--p1)">{error}</p>}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading || !content.trim()}
            className="px-4 py-2 rounded-xl bg-ink text-surface text-sm font-medium hover:opacity-80 transition-opacity disabled:opacity-40"
          >
            {loading ? "Posting…" : "Post comment"}
          </button>
        </div>
      </form>
    </Card>
  );
}
