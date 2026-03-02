import { useState, useMemo } from "react";
import { Filter } from "lucide-react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getLideres, getCompetencias, calcMedia, getAreas, getAreaColor, isLiderAvaliado } from "@/data/store";
import type { Lider, Competencia } from "@/data/store";
import NineBoxChart from "@/components/NineBoxChart";
import CompetencyRadar from "@/components/CompetencyRadar";

export default function Dashboard() {
  const lideres = getLideres();
  const competencias = getCompetencias();
  const areas = useMemo(() => getAreas(lideres), [lideres]);
  const [areaFiltro, setAreaFiltro] = useState("todas");
  const [selectedLider, setSelectedLider] = useState<string | null>(null);
  const [radarView, setRadarView] = useState<"individual" | "area">("individual");

  const avaliados = useMemo(() => {
    return lideres
      .filter((l) => isLiderAvaliado(l, competencias))
      .filter((l) => areaFiltro === "todas" || l.area === areaFiltro);
  }, [lideres, competencias, areaFiltro]);

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
            {/* 9-Box */}
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

            {/* Radar Chart */}
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
          </>
        )}
      </div>
    </Layout>
  );
}
