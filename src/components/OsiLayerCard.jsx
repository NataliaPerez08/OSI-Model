export default function OsiLayerCard({ layer, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={
        "block w-full p-3 mb-2 rounded border text-left transition " +
        (isActive
          ? "border-sky-400 bg-sky-900/40"
          : "border-slate-700 hover:border-sky-500 hover:bg-slate-900")
      }
    >
      <p className="font-semibold text-sm">{layer.name}</p>
      <p className="text-xs text-slate-400">{layer.shortName}</p>
    </button>
  );
}
