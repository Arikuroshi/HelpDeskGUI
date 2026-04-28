interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export default function Card({ className = "", children }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] ${className}`}
    >
      {children}
    </div>
  );
}
