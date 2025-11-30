import { useState, useMemo, useEffect } from "react";
import { osiLayers } from "../data/osiLayers";
import OsiLayerCard from "./OsiLayerCard";

export default function OsiAnimation() {
  const [idx, setIdx] = useState(0); // índice en osiLayers (0 = capa 7, última = capa 1)
  const [autoDemo, setAutoDemo] = useState(false);
  const [mode, setMode] = useState("encap"); // 'encap' ó 'decap'
  const [theme, setTheme] = useState("night"); // night | day


  const active = osiLayers[idx];

  // Ordenamos de capa 7 (arriba) a capa 1 (abajo)
  const orderedLayers = useMemo(
    () => [...osiLayers].sort((a, b) => b.id - a.id),
    []
  );

  // Capas procesadas según el modo
  const processedLayers = useMemo(
    () =>
      orderedLayers.filter((layer) =>
        mode === "encap"
          ? layer.id >= active.id // de App hacia abajo
          : layer.id <= active.id // de Física hacia arriba
      ),
    [orderedLayers, active.id, mode]
  );

  // Demo automática
  useEffect(() => {
    if (!autoDemo) return;

    const id = setInterval(() => {
      setIdx((prev) => {
        const len = osiLayers.length;
        if (mode === "encap") {
          // Aplicación -> Física
          return (prev + 1) % len;
        } else {
          // Física -> Aplicación
          return (prev - 1 + len) % len;
        }
      });
    }, 1600);

    return () => clearInterval(id);
  }, [autoDemo, mode]);

  const handleClickLayer = (i) => {
    setIdx(i);
    setAutoDemo(false); // si el usuario hace clic, pausamos demo
  };

  const toggleDemo = () => {
    setAutoDemo((v) => !v);
  };

  const setModeEncap = () => {
    setMode("encap");
    setAutoDemo(false);
    setIdx(0); // empezamos en Aplicación
  };

  const setModeDecap = () => {
    setMode("decap");
    setAutoDemo(false);
    setIdx(osiLayers.length - 1); // empezamos en Física
  };

  return (
    <div className="space-y-4">
      {/* Controles superiores */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-100">
            Modelo OSI · Encapsulamiento y Desencapsulamiento
          </h2>
          <p className="text-xs text-slate-400">
            Visualiza cómo las capas envuelven y luego quitan las cabeceras de
            los datos.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-end">
          <div className="inline-flex rounded-full border border-slate-700 bg-slate-900/70 p-1">
            <button
              onClick={setModeEncap}
              className={
                "text-xs px-3 py-1.5 rounded-full transition " +
                (mode === "encap"
                  ? "bg-sky-500 text-slate-950 font-semibold"
                  : "text-slate-300 hover:text-sky-300")
              }
            >
              Encapsular (Tx)
            </button>
            <button
              onClick={setModeDecap}
              className={
                "text-xs px-3 py-1.5 rounded-full transition " +
                (mode === "decap"
                  ? "bg-emerald-500 text-slate-950 font-semibold"
                  : "text-slate-300 hover:text-emerald-300")
              }
            >
              Desencapsular (Rx)
            </button>
            <div className="flex gap-2 mb-4">
            <button
              onClick={() => setTheme("night")}
              className="px-3 py-1.5 rounded border text-xs bg-night-panel text-night-text border-night-border"
            >
              🌙 Noche
            </button>

            <button
              onClick={() => setTheme("day")}
              className="px-3 py-1.5 rounded border text-xs bg-day-accent text-white border-day-accent"
            >
              ☀️ Día
            </button>
          </div>
          </div>

          <button
            onClick={() =>
              setIdx((prev) => {
                const len = osiLayers.length;
                return mode === "encap"
                  ? (prev + 1) % len
                  : (prev - 1 + len) % len;
              })
            }
            className="text-xs px-3 py-1.5 rounded-full border border-slate-700 hover:border-sky-400 hover:text-sky-300 transition"
          >
            Paso siguiente
          </button>

          <button
            onClick={toggleDemo}
            className={
              "text-xs px-3 py-1.5 rounded-full border transition " +
              (autoDemo
                ? "border-sky-400 text-sky-300 bg-sky-900/30"
                : "border-slate-700 hover:border-sky-400 hover:text-sky-300")
            }
          >
            {autoDemo ? "Pausar demo" : "Reproducir demo"}
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Lista de capas */}
        <div>
          {osiLayers.map((l, i) => (
            <OsiLayerCard
              key={l.id}
              layer={l}
              isActive={i === idx}
              onClick={() => handleClickLayer(i)}
            />
          ))}
        </div>

        {/* Detalle + Encapsulamiento / Desencapsulamiento */}
        <div className="space-y-4">
          {/* Detalle capa activa */}
          <div className="p-4 border border-slate-700 rounded-lg bg-slate-900/60">
            <p className="text-xs uppercase tracking-wide text-sky-400 mb-1">
              Capa activa ({mode === "encap" ? "Transmisor" : "Receptor"})
            </p>
            <h2 className="text-lg font-semibold mb-1">{active.name}</h2>
            <p className="text-sm text-slate-300 mb-3">{active.description}</p>

            <p className="text-xs text-slate-400 mb-1">Ejemplos de protocolos:</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {active.examples.map((ex) => (
                <span
                  key={ex}
                  className="text-[0.7rem] px-2 py-1 rounded-full bg-slate-800 border border-slate-600"
                >
                  {ex}
                </span>
              ))}
            </div>

            <p className="text-xs text-slate-400">
              Unidad de datos en esta capa:{" "}
              <span className="font-semibold text-sky-300">
                {active.pdu}
              </span>
            </p>
          </div>

          {/* Visual de proceso */}
          <div className="p-4 border border-slate-700 rounded-lg bg-slate-900/80">
            <h3 className="text-sm font-semibold mb-2">
              {mode === "encap"
                ? "Encapsulamiento capa por capa (Transmisor)"
                : "Desencapsulamiento capa por capa (Receptor)"}
            </h3>

            <p className="text-xs text-slate-400 mb-3">
              {mode === "encap" ? (
                <>
                  En el transmisor, cada capa{" "}
                  <span className="font-semibold">agrega</span> su cabecera
                  alrededor de los datos que vienen de arriba.
                </>
              ) : (
                <>
                  En el receptor, cada capa{" "}
                  <span className="font-semibold">quita</span> su cabecera y
                  entrega los datos hacia arriba.
                </>
              )}
            </p>

            <div className="flex flex-col items-stretch gap-1">
              {orderedLayers.map((layer) => {
                const isActiveLayer = layer.id === active.id;
                const isProcessed = processedLayers.some(
                  (pl) => pl.id === layer.id
                );

                // texto según modo
                let statusLabel = "";
                let bodyText = "";

                if (mode === "encap") {
                  if (!isProcessed) {
                    statusLabel = "Aún no participa";
                    bodyText =
                      "Esta capa todavía no ha agregado su cabecera en este punto del envío.";
                  } else if (isActiveLayer) {
                    statusLabel = "PDU actual";
                    bodyText = `Aquí hablamos de: ${layer.pdu}. La cabecera de esta capa se aplica alrededor de lo que viene de arriba.`;
                  } else {
                    statusLabel = "Cabecera aplicada";
                    bodyText =
                      "La cabecera de esta capa ya envuelve a los datos que van hacia abajo.";
                  }
                } else {
                  // decap
                  if (!isProcessed) {
                    statusLabel = "Aún no procesada";
                    bodyText =
                      "Esta capa todavía no ha retirado su cabecera en este punto del recorrido.";
                  } else if (isActiveLayer) {
                    statusLabel = "PDU actual";
                    bodyText = `En el receptor, tras quitar cabeceras de capas inferiores, aquí se interpreta como: ${layer.pdu}.`;
                  } else if (layer.id < active.id) {
                    statusLabel = "Cabecera ya removida";
                    bodyText =
                      "La cabecera de esta capa ya fue retirada y sus datos pasaron hacia arriba.";
                  } else {
                    statusLabel = "Cabecera aún presente";
                    bodyText =
                      "La cabecera de esta capa sigue formando parte de la unidad de datos que se está procesando.";
                  }
                }

                return (
                  <div
                    key={layer.id}
                    className={
                      "rounded-md border px-3 py-2 text-xs transition-all duration-500 " +
                      (isProcessed
                        ? isActiveLayer
                          ? "border-sky-400 bg-sky-900/70 translate-x-0 opacity-100"
                          : "border-slate-600 bg-slate-900 translate-x-0 opacity-90"
                        : "border-slate-800 bg-slate-950/40 translate-x-4 opacity-35")
                    }
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">
                        Capa {layer.id} – {layer.shortName}
                      </span>
                      <span className="text-[0.65rem] text-slate-400">
                        {statusLabel}
                      </span>
                    </div>
                    <p className="mt-1 text-[0.7rem] text-slate-200">
                      {bodyText}
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="mt-3 text-[0.7rem] text-slate-400">
              Resumen clásico: en las capas 7–5 hablamos de{" "}
              <span className="font-semibold">datos</span>, en capa 4 de{" "}
              <span className="font-semibold">segmentos/datagramas</span>, en
              capa 3 de <span className="font-semibold">paquetes</span>, en capa
              2 de <span className="font-semibold">tramas</span> y en capa 1 de{" "}
              <span className="font-semibold">bits</span>. El lado Tx envuelve;
              el lado Rx desenvuelve.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}