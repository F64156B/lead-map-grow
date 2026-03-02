import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getLideres, getCompetencias, isLiderAvaliado, getAreas } from "@/data/store";

export default function Index() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [areaFiltro, setAreaFiltro] = useState("todas");

  const lideres = getLideres();
  const competencias = getCompetencias();
  const areas = useMemo(() => getAreas(lideres), [lideres]);

  const filtered = useMemo(() => {
    return lideres.filter((l) => {
      const matchBusca =
        busca === "" ||
        l.nome.toLowerCase().includes(busca.toLowerCase()) ||
        l.area.toLowerCase().includes(busca.toLowerCase());
      const matchArea = areaFiltro === "todas" || l.area === areaFiltro;
      return matchBusca && matchArea;
    });
  }, [lideres, busca, areaFiltro]);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Líderes</h2>
          <p className="text-muted-foreground">Selecione um líder para iniciar a calibração</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou área..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={areaFiltro} onValueChange={setAreaFiltro}>
            <SelectTrigger className="w-full sm:w-[220px]">
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

        {/* Table */}
        <div className="rounded-lg border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Área</TableHead>
                <TableHead className="hidden md:table-cell">Idade</TableHead>
                <TableHead className="hidden md:table-cell">Formação</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((lider) => {
                const avaliado = isLiderAvaliado(lider, competencias);
                return (
                  <TableRow key={lider.id}>
                    <TableCell className="font-medium">{lider.nome}</TableCell>
                    <TableCell>{lider.area}</TableCell>
                    <TableCell className="hidden md:table-cell">{lider.idade}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {typeof lider.formacao === "string" ? lider.formacao : lider.formacao.graduacao}
                    </TableCell>
                    <TableCell className="text-center">
                      {avaliado ? (
                        <Badge className="bg-success text-success-foreground">✅ Avaliado</Badge>
                      ) : (
                        <Badge variant="secondary">⏳ Pendente</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" onClick={() => navigate(`/calibrar/${lider.id}`)}>
                        Calibrar
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                    Nenhum líder encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
}
