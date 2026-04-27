export default function Section({ title, children }) {
  return (
    <div className="bg-white/70 border border-gray-200 rounded-2xl p-6">
      <h2 className="text-sm font-medium text-black/70 mb-4">{title}</h2>
      {children}
    </div>
  );
}
