import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, ClipboardList, RotateCcw, Users, CheckCircle2, Clock, UserCheck } from "lucide-react";
import Layout from "@/components/Layout";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { getLideres, getCompetencias, isLiderAvaliado, getAreas, resetCalibracaoLider, getUsuarioLogado } from "@/data/store";
import { toast } from "@/hooks/use-toast";
import dpaLogo from "@/assets/DPA.png";

export default function Index() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [areaFiltro, setAreaFiltro] = useState("todas");
  const [refreshKey, setRefreshKey] = useState(0);

  const lideres = useMemo(() => getLideres(), [refreshKey]);
  const competencias = getCompetencias();
  const areas = useMemo(() => getAreas(lideres), [lideres]);
  const usuario = getUsuarioLogado();

  const avaliados = useMemo(() => lideres.filter(l => isLiderAvaliado(l, competencias)).length, [lideres, competencias]);
  const pendentes = lideres.length - avaliados;

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
        {/* Welcome Banner */}
        <div className="rounded-2xl p-6 flex items-center justify-between"
          style={{ background: "linear-gradient(135deg, hsl(33 100% 47% / 0.08) 0%, hsl(33 100% 47% / 0.02) 100%)" }}
        >
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">
              Olá, {usuario?.nome?.split(" ")[0] || "Bem-vindo"}! 👋
            </h2>
            <p className="text-muted-foreground">Selecione um líder para iniciar a calibração</p>
          </div>
          <img src={dpaLogo} alt="DPA" className="h-12 w-auto opacity-40 hidden sm:block" />
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="card-elevated border-0">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{lideres.length}</p>
                <p className="text-xs text-muted-foreground">Total Líderes</p>
              </div>
            </CardContent>
          </Card>
          <Card className="card-elevated border-0">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10">
                <UserCheck className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{avaliados}</p>
                <p className="text-xs text-muted-foreground">Avaliados</p>
              </div>
            </CardContent>
          </Card>
          <Card className="card-elevated border-0">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/10">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendentes}</p>
                <p className="text-xs text-muted-foreground">Pendentes</p>
              </div>
            </CardContent>
          </Card>
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
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead>Nome</TableHead>
                <TableHead>Área</TableHead>
                <TableHead className="hidden md:table-cell">Idade</TableHead>
                <TableHead className="hidden md:table-cell">Formação</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((lider, index) => {
                const avaliado = isLiderAvaliado(lider, competencias);
                return (
                  <TableRow key={lider.id} className={cn(
                    "hover:bg-accent/50 transition-colors",
                    index % 2 === 1 && "bg-muted/20"
                  )}>
                    <TableCell className="font-medium">{lider.nome}</TableCell>
                    <TableCell>{lider.area}</TableCell>
                    <TableCell className="hidden md:table-cell">{lider.idade}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {typeof lider.formacao === "string" ? lider.formacao : lider.formacao.graduacao}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        {avaliado ? (
                          <Badge className="bg-success text-success-foreground gap-1">
                            <CheckCircle2 className="h-3 w-3" /> Avaliado
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="gap-1">
                            <Clock className="h-3 w-3" /> Pendente
                          </Badge>
                        )}
                        {lider.pdi && lider.pdi.length > 0 && (
                          <Badge variant="outline" className="gap-1 text-xs">
                            <ClipboardList className="h-3 w-3" /> PDI
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button size="sm" onClick={() => navigate(`/calibrar/${lider.id}`)}>
                          Calibrar
                        </Button>
                        {avaliado && (
                          <>
                            <Button size="sm" variant="outline" onClick={() => navigate(`/pdi/${lider.id}`)}>
                              PDI
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="ghost" title="Resetar Calibração">
                                  <RotateCcw className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Resetar calibração?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Todas as avaliações de {lider.nome} serão removidas.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => {
                                    resetCalibracaoLider(lider.id);
                                    setRefreshKey(k => k + 1);
                                    toast({ title: "Calibração resetada", description: `${lider.nome} foi limpo.` });
                                  }}>Confirmar</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </>
                        )}
                      </div>
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
