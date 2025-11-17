import { useState } from "react";
import { osiLayers } from "../data/osiLayers";
import OsiLayerCard from "./OsiLayerCard";

export default function OsiAnimation() {
  const [idx, setIdx] = useState(0);
  const active = osiLayers[idx];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        {osiLayers.map((l, i) => (
          <OsiLayerCard
            key={l.id}
            layer={l}
            isActive={i === idx}
            onClick={() => setIdx(i)}
          />
        ))}
      </div>
      <div className="p-4 border border-slate-700 rounded-lg bg-slate-900/60">
        <h2 className="text-lg font-semibold mb-1">{active.name}</h2>
        <p className="text-sm text-slate-300 mb-3">{active.description}</p>
        <p className="text-xs text-slate-400 mb-1">Ejemplos de protocolos:</p>
        <div className="flex flex-wrap gap-2">
          {active.examples.map((ex) => (
            <span
              key={ex}
              className="text-[0.7rem] px-2 py-1 rounded-full bg-slate-800 border border-slate-600"
            >
              {ex}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
