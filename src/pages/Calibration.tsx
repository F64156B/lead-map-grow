import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, GraduationCap, Briefcase, ClipboardList, RotateCcw } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { getLider, getCompetencias, saveLider, isLiderAvaliado, resetCalibracaoLider, registrarMudanca, getAreaColor } from "@/data/store";
import { toast } from "@/hooks/use-toast";

const NOTA_LABELS: Record<number, { label: string; emoji: string; color: string }> = {
  1: { label: "Abaixo do Esperado", emoji: "🔴", color: "border-destructive bg-destructive/10 text-destructive" },
  2: { label: "Atende", emoji: "🟡", color: "border-warning bg-warning/10 text-warning-foreground" },
  3: { label: "Supera", emoji: "🟢", color: "border-success bg-success/10 text-success" },
};

export default function Calibration() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const lider = getLider(id || "");
  const competencias = getCompetencias();

  const [avaliacoes, setAvaliacoes] = useState<Record<string, number>>(
    () => lider?.avaliacoes || {}
  );

  if (!lider) {
    return (
      <Layout>
        <div className="py-20 text-center text-muted-foreground">Líder não encontrado.</div>
      </Layout>
    );
  }

  const handleSave = () => {
    saveLider({ ...lider, avaliacoes });
    const descricao = competencias.map(c => `${c.nome}: ${avaliacoes[c.id] || '-'}`).join(', ');
    registrarMudanca("calibracao", lider.id, lider.nome, `Calibração salva — ${descricao}`);
    toast({ title: "Avaliação salva!", description: `Calibração de ${lider.nome} salva com sucesso.` });
    navigate("/");
  };

  const handleReset = () => {
    resetCalibracaoLider(lider.id);
    setAvaliacoes({});
    toast({ title: "Calibração resetada", description: `Avaliação de ${lider.nome} foi limpa.` });
  };

  const setNota = (compId: string, nota: number) => {
    setAvaliacoes((prev) => ({ ...prev, [compId]: nota }));
  };

  const filledCount = competencias.filter(c => avaliacoes[c.id] !== undefined).length;
  const allFilled = filledCount === competencias.length;
  const jaAvaliado = isLiderAvaliado(lider, competencias);
  const progressPercent = competencias.length > 0 ? (filledCount / competencias.length) * 100 : 0;
  const areaColor = getAreaColor(lider.area);

  return (
    <Layout>
      <div className="mx-auto max-w-2xl space-y-6">
        <Button variant="ghost" onClick={() => navigate("/")} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Button>

        {jaAvaliado && (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate(`/pdi/${lider.id}`)} className="gap-2">
              <ClipboardList className="h-4 w-4" /> Definir PDI
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="gap-2">
                  <RotateCcw className="h-4 w-4" /> Resetar Calibração
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Resetar calibração?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Todas as avaliações de {lider.nome} serão removidas. Esta ação será registrada no log.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleReset}>Confirmar Reset</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}

        {/* Leader Profile */}
        <Card className="overflow-hidden card-elevated border-0">
          {/* Area color strip */}
          <div className="h-1.5 w-full" style={{ backgroundColor: areaColor }} />
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{lider.nome}</CardTitle>
              <Badge variant="outline" className="text-xs font-semibold" style={{ borderColor: areaColor, color: areaColor }}>
                {lider.area}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-muted-foreground">Área:</span> {lider.area}</div>
              <div><span className="text-muted-foreground">Idade:</span> {lider.idade}</div>
            </div>

            {/* Formação Acadêmica */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <GraduationCap className="h-4 w-4 text-primary" />
                Formação Acadêmica
              </div>
              <div className="rounded-lg border bg-muted/30 p-3 text-sm space-y-1">
                <div>
                  <span className="font-medium">{lider.formacao.graduacao}</span>
                  {lider.formacao.instituicao && (
                    <span className="text-muted-foreground"> — {lider.formacao.instituicao}</span>
                  )}
                </div>
                {lider.formacao.posGraduacao && (
                  <div>
                    <span className="font-medium">{lider.formacao.posGraduacao}</span>
                    {lider.formacao.instituicaoPg && (
                      <span className="text-muted-foreground"> — {lider.formacao.instituicaoPg}</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Experiência Profissional */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Briefcase className="h-4 w-4 text-primary" />
                Experiência Profissional
              </div>
              <div className="space-y-0 rounded-lg border bg-muted/30 p-3">
                {lider.experiencia.map((exp, i) => (
                  <div key={i} className="relative flex gap-3 pb-3 last:pb-0">
                    <div className="flex flex-col items-center">
                      <div className={`h-2.5 w-2.5 rounded-full ${i === 0 ? "bg-primary" : "bg-muted-foreground/40"}`} />
                      {i < lider.experiencia.length - 1 && (
                        <div className="w-px flex-1 bg-border" />
                      )}
                    </div>
                    <div className="text-sm pb-2">
                      <div className="font-medium">{exp.cargo}</div>
                      <div className="text-muted-foreground">
                        {exp.empresa}{exp.periodo && ` · ${exp.periodo}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <h3 className="text-lg font-semibold">Avaliação de Competências</h3>
            <span className="text-muted-foreground font-medium">{filledCount}/{competencias.length} avaliadas</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        {/* Competencies */}
        <div className="space-y-4">
          {competencias.map((comp) => {
            const selected = avaliacoes[comp.id];
            return (
              <Card key={comp.id} className="card-elevated border-0">
                <CardContent className="pt-6">
                  <div className="mb-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{comp.nome}</span>
                      <Badge variant="outline" className="text-xs capitalize">
                        {comp.eixo}
                      </Badge>
                    </div>
                    {comp.descricao && (
                      <p className="text-xs text-muted-foreground mt-1">{comp.descricao}</p>
                    )}
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((nota) => {
                      const info = NOTA_LABELS[nota];
                      const isSelected = selected === nota;
                      return (
                        <button
                          key={nota}
                          onClick={() => setNota(comp.id, nota)}
                          className={`rounded-xl border-2 p-3 text-center text-sm font-medium transition-all hover:scale-[1.03] ${
                            isSelected
                              ? info.color + " ring-2 ring-ring shadow-md scale-[1.03]"
                              : "border-border bg-card hover:border-primary/40 hover:shadow-sm"
                          }`}
                        >
                          <div className="text-lg">{info.emoji}</div>
                          <div className="mt-1">{info.label}</div>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSave} disabled={!allFilled} className="flex-1 gap-2 shadow-md hover:shadow-lg" size="lg">
            <Save className="h-4 w-4" /> Salvar Avaliação
          </Button>
          {allFilled && (
            <Button variant="outline" onClick={() => { handleSave(); navigate(`/pdi/${lider.id}`); }} size="lg" className="gap-2">
              <ClipboardList className="h-4 w-4" /> Salvar & Definir PDI
            </Button>
          )}
        </div>
      </div>
    </Layout>
  );
}
