import { useState, useMemo } from "react";
import { Filter, AlertTriangle } from "lucide-react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { calcMedia, getAreas, getAreaColor, isLiderAvaliado } from "@/data/store";
import { useData } from "@/contexts/DataContext";
import type { Lider, Competencia } from "@/data/store";
import NineBoxChart from "@/components/NineBoxChart";
import CompetencyRadar from "@/components/CompetencyRadar";

interface GapItem {
  competencia: Competencia;
  media: number;
}

function getGapColor(media: number): string {
  if (media <= 1.5) return "bg-red-500";
  if (media <= 2.5) return "bg-orange-500";
  if (media <= 3.5) return "bg-blue-500";
  return "bg-green-500";
}

function getGapLabel(media: number): string {
  if (media <= 1.5) return "Crítico";
  if (media <= 2.5) return "Atenção";
  if (media <= 3.5) return "Moderado";
  return "Bom";
}

export default function Dashboard() {
  const { lideres, competencias, loading } = useData();
  const areas = useMemo(() => getAreas(lideres), [lideres]);
  const [areaFiltro, setAreaFiltro] = useState("todas");
  const [selectedLider, setSelectedLider] = useState<string | null>(null);
  const [radarView, setRadarView] = useState<"individual" | "area">("individual");

  const avaliados = useMemo(() => {
    return lideres
      .filter((l) => isLiderAvaliado(l, competencias))
      .filter((l) => areaFiltro === "todas" || l.area === areaFiltro);
  }, [lideres, competencias, areaFiltro]);

  const gaps = useMemo((): GapItem[] => {
    if (avaliados.length === 0) return [];
    return competencias
      .map((c) => {
        const media = avaliados.reduce((sum, l) => sum + (l.avaliacoes[c.id] || 0), 0) / avaliados.length;
        return { competencia: c, media: Math.round(media * 100) / 100 };
      })
      .sort((a, b) => a.media - b.media);
  }, [avaliados, competencias]);

  const priorityGaps = gaps.filter((g) => g.media <= 2);

  if (loading) {
    return (
      <Layout>
        <div className="py-20 text-center text-muted-foreground">Carregando dados...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <p className="text-muted-foreground">
              {avaliados.length} líder(es) avaliado(s) de {lideres.length}
            </p>
          </div>
          <Select value={areaFiltro} onValueChange={setAreaFiltro}>
            <SelectTrigger className="w-[220px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filtrar por área" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas as áreas</SelectItem>
              {areas.map((a) => (
                <SelectItem key={a} value={a}>{a}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {avaliados.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center text-muted-foreground">
              Nenhum líder avaliado ainda. Calibre os líderes primeiro na tela de Líderes.
            </CardContent>
          </Card>
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Matriz 9-Box</CardTitle>
              </CardHeader>
              <CardContent>
                <NineBoxChart
                  lideres={avaliados}
                  competencias={competencias}
                  onSelect={(id) => setSelectedLider(id)}
                  selectedId={selectedLider}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Radar de Competências</CardTitle>
                <Tabs value={radarView} onValueChange={(v) => setRadarView(v as "individual" | "area")}>
                  <TabsList>
                    <TabsTrigger value="individual">Individual</TabsTrigger>
                    <TabsTrigger value="area">Por Área</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                {radarView === "individual" ? (
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {avaliados.map((l) => (
                        <button
                          key={l.id}
                          onClick={() => setSelectedLider(l.id === selectedLider ? null : l.id)}
                          className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                            l.id === selectedLider
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border hover:border-primary/40"
                          }`}
                        >
                          {l.nome}
                        </button>
                      ))}
                    </div>
                    <CompetencyRadar
                      lideres={selectedLider ? avaliados.filter((l) => l.id === selectedLider) : avaliados}
                      competencias={competencias}
                      showAverage={!selectedLider}
                    />
                  </div>
                ) : (
                  <CompetencyRadar
                    lideres={avaliados}
                    competencias={competencias}
                    groupByArea
                  />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  Principais GAPs
                  {priorityGaps.length > 0 && (
                    <Badge variant="destructive" className="ml-2">
                      {priorityGaps.length} prioritário(s)
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {gaps.map((g) => (
                    <div
                      key={g.competencia.id}
                      className={`flex items-center justify-between rounded-lg border p-3 ${
                        g.media <= 2 ? "border-destructive/30 bg-destructive/5" : ""
                      }`}
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">{g.competencia.nome}</p>
                        <p className="text-xs text-muted-foreground capitalize">{g.competencia.eixo}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold">{g.media.toFixed(2)}</span>
                        <Badge className={`${getGapColor(g.media)} text-white border-0 text-xs`}>
                          {getGapLabel(g.media)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {gaps.length === 0 && (
                    <p className="text-center text-muted-foreground py-4">
                      Nenhuma avaliação disponível para análise de GAPs.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </Layout>
  );
}
