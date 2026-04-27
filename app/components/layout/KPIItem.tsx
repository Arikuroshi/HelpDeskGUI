export default function KPIItem({ label = "Open", value, highlight = false }) {
  return (
    <div className="bg-white/70 border border-gray-200 rounded-2xl p-5">
      <p className="text-xs text-black/50 mb-2">{label}</p>
      <p
        className={`text-2xl font-medium tracking-tight ${
          highlight ? "text-red-700" : "text-black/90"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
