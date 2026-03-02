import { calcMedia, getAreaColor } from "@/data/store";
import type { Lider, Competencia } from "@/data/store";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Props {
  lideres: Lider[];
  competencias: Competencia[];
  onSelect: (id: string) => void;
  selectedId: string | null;
}

const BOX_LABELS = [
  ["Enigma", "Potencial Crescimento", "Alto Potencial"],
  ["Questionável", "Mantenedor", "Forte Desempenho"],
  ["Insuficiente", "Eficaz", "Comprometido"],
];

export default function NineBoxChart({ lideres, competencias, onSelect, selectedId }: Props) {
  // Map each leader to x (0-1) and y (0-1) based on desempenho/potencial means
  const plotData = lideres.map((l) => {
    const desemp = calcMedia(l, competencias, "desempenho");
    const potenc = calcMedia(l, competencias, "potencial");
    // Scale from 1-3 to 0-1
    const x = (desemp - 1) / 2;
    const y = (potenc - 1) / 2;
    return { lider: l, x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) };
  });

  return (
    <div className="space-y-2">
      {/* Grid */}
      <div className="relative aspect-square max-h-[500px] w-full">
        {/* Background grid */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
          {BOX_LABELS.map((row, ri) =>
            row.map((label, ci) => (
              <div
                key={`${ri}-${ci}`}
                className="flex items-center justify-center border border-border/50 text-[10px] font-medium text-muted-foreground/60 sm:text-xs"
                style={{
                  backgroundColor:
                    ri + ci >= 3
                      ? "hsl(142 71% 45% / 0.08)"
                      : ri + ci <= 1
                      ? "hsl(0 84% 60% / 0.06)"
                      : "hsl(45 93% 47% / 0.06)",
                }}
              >
                {label}
              </div>
            ))
          )}
        </div>

        {/* Dots */}
        {plotData.map(({ lider, x, y }) => (
          <Tooltip key={lider.id}>
            <TooltipTrigger asChild>
              <button
                onClick={() => onSelect(lider.id)}
                className={`absolute z-10 flex h-7 w-7 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full text-[9px] font-bold text-white shadow-md transition-transform hover:scale-125 ${
                  lider.id === selectedId ? "ring-2 ring-foreground ring-offset-2" : ""
                }`}
                style={{
                  left: `${x * 100}%`,
                  bottom: `${y * 100}%`,
                  backgroundColor: getAreaColor(lider.area),
                }}
              >
                {lider.nome.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-medium">{lider.nome}</p>
              <p className="text-xs text-muted-foreground">{lider.area}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      {/* Axes labels */}
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>← Baixo Desempenho</span>
        <span className="font-medium">Desempenho →</span>
      </div>
      <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
        <span>↑ Potencial</span>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 pt-2">
        {[...new Set(lideres.map((l) => l.area))].sort().map((area) => (
          <div key={area} className="flex items-center gap-1.5 text-xs">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: getAreaColor(area) }} />
            {area}
          </div>
        ))}
      </div>
    </div>
  );
}
