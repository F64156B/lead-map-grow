import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getAreaColor } from "@/data/store";
import type { Lider, Competencia } from "@/data/store";

interface Props {
  lideres: Lider[];
  competencias: Competencia[];
  groupByArea?: boolean;
}

export default function CompetencyRadar({ lideres, competencias, groupByArea }: Props) {
  if (competencias.length === 0) {
    return <div className="py-8 text-center text-muted-foreground">Nenhuma competência cadastrada.</div>;
  }

  if (groupByArea) {
    // Group leaders by area and average their scores
    const areaMap = new Map<string, Lider[]>();
    lideres.forEach((l) => {
      const list = areaMap.get(l.area) || [];
      list.push(l);
      areaMap.set(l.area, list);
    });

    const areas = [...areaMap.keys()].sort();

    const data = competencias.map((c) => {
      const point: Record<string, string | number> = { competencia: c.nome };
      areas.forEach((area) => {
        const group = areaMap.get(area)!;
        const avg = group.reduce((sum, l) => sum + (l.avaliacoes[c.id] || 0), 0) / group.length;
        point[area] = Math.round(avg * 100) / 100;
      });
      return point;
    });

    return (
      <ResponsiveContainer width="100%" height={350}>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="competencia" tick={{ fontSize: 11 }} />
          <PolarRadiusAxis domain={[0, 4]} tickCount={5} />
          {areas.map((area) => (
            <Radar
              key={area}
              name={area}
              dataKey={area}
              stroke={getAreaColor(area)}
              fill={getAreaColor(area)}
              fillOpacity={0.15}
            />
          ))}
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    );
  }

  // Individual view
  const data = competencias.map((c) => {
    const point: Record<string, string | number> = { competencia: c.nome };
    lideres.forEach((l) => {
      point[l.nome] = l.avaliacoes[c.id] || 0;
    });
    return point;
  });

  const COLORS = ["#F28C00", "#2563EB", "#16A34A", "#9333EA", "#DC2626", "#CA8A04", "#0891B2", "#6D28D9"];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="competencia" tick={{ fontSize: 11 }} />
        <PolarRadiusAxis domain={[0, 4]} tickCount={5} />
        {lideres.map((l, i) => (
          <Radar
            key={l.id}
            name={l.nome}
            dataKey={l.nome}
            stroke={getAreaColor(l.area)}
            fill={getAreaColor(l.area)}
            fillOpacity={0.2}
          />
        ))}
        {lideres.length > 1 && <Legend />}
      </RadarChart>
    </ResponsiveContainer>
  );
}
