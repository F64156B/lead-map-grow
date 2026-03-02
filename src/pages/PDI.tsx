import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Plus, Trash2, Target, Star } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getLider, getCompetencias, savePDI, isLiderAvaliado } from "@/data/store";
import type { AcaoPDI } from "@/data/store";
import { toast } from "@/hooks/use-toast";

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  pendente: { label: "Pendente", className: "bg-muted text-muted-foreground" },
  em_andamento: { label: "Em Andamento", className: "bg-warning/20 text-warning-foreground border-warning" },
  concluida: { label: "Concluída", className: "bg-success/20 text-success border-success" },
};

const NOTA_LABELS: Record<number, string> = {
  1: "Abaixo do Esperado",
  2: "Atende",
  3: "Supera",
};

export default function PDI() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const lider = getLider(id || "");
  const competencias = getCompetencias();

  const [acoes, setAcoes] = useState<AcaoPDI[]>(() => lider?.pdi || []);

  if (!lider) {
    return (
      <Layout>
        <div className="py-20 text-center text-muted-foreground">Líder não encontrado.</div>
      </Layout>
    );
  }

  const avaliado = isLiderAvaliado(lider, competencias);

  // Separate competencies by priority
  const prioridade = competencias.filter((c) => {
    const nota = lider.avaliacoes[c.id];
    return nota !== undefined && nota <= 2;
  });
  const pontosFortes = competencias.filter((c) => {
    const nota = lider.avaliacoes[c.id];
    return nota === 3;
  });
  const naoAvaliadas = competencias.filter((c) => lider.avaliacoes[c.id] === undefined);

  const addAcao = (competenciaId: string) => {
    const nova: AcaoPDI = {
      id: crypto.randomUUID(),
      competenciaId,
      acao: "",
      prazo: "",
      responsavel: "",
      status: "pendente",
    };
    setAcoes((prev) => [...prev, nova]);
  };

  const updateAcao = (acaoId: string, field: keyof AcaoPDI, value: string) => {
    setAcoes((prev) =>
      prev.map((a) => (a.id === acaoId ? { ...a, [field]: value } : a))
    );
  };

  const removeAcao = (acaoId: string) => {
    setAcoes((prev) => prev.filter((a) => a.id !== acaoId));
  };

  const handleSave = () => {
    savePDI(lider.id, acoes);
    toast({ title: "PDI salvo!", description: `Plano de desenvolvimento de ${lider.nome} salvo com sucesso.` });
  };

  const renderCompetencySection = (comp: typeof competencias[0]) => {
    const nota = lider.avaliacoes[comp.id];
    const compAcoes = acoes.filter((a) => a.competenciaId === comp.id);

    return (
      <Card key={comp.id}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{comp.nome}</CardTitle>
            {nota !== undefined && (
              <Badge variant="outline" className="text-xs">
                {nota === 1 ? "🔴" : nota === 2 ? "🟡" : "🟢"} {NOTA_LABELS[nota]}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {compAcoes.map((acao) => (
            <div key={acao.id} className="space-y-2 rounded-lg border bg-muted/20 p-3">
              <Textarea
                placeholder="Descreva a ação de desenvolvimento..."
                value={acao.acao}
                onChange={(e) => updateAcao(acao.id, "acao", e.target.value)}
                className="min-h-[60px] resize-none"
              />
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <Input
                  placeholder="Prazo (ex: Jun/2026)"
                  value={acao.prazo}
                  onChange={(e) => updateAcao(acao.id, "prazo", e.target.value)}
                />
                <Input
                  placeholder="Responsável"
                  value={acao.responsavel}
                  onChange={(e) => updateAcao(acao.id, "responsavel", e.target.value)}
                />
                <div className="flex gap-2">
                  <Select
                    value={acao.status}
                    onValueChange={(v) => updateAcao(acao.id, "status", v)}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                        <SelectItem key={key} value={key}>{cfg.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="icon" onClick={() => removeAcao(acao.id)} className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => addAcao(comp.id)} className="gap-1">
            <Plus className="h-3 w-3" /> Adicionar Ação
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <Layout>
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate(`/calibrar/${lider.id}`)} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" /> Salvar PDI
          </Button>
        </div>

        {/* Header */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold">{lider.nome}</h2>
            <p className="text-sm text-muted-foreground">{lider.area} · {lider.idade} anos</p>
            {!avaliado && (
              <p className="mt-2 text-sm text-destructive">⚠ Este líder ainda não foi calibrado. Realize a calibração antes de definir o PDI.</p>
            )}
          </CardContent>
        </Card>

        {/* Priority: Low-scoring competencies */}
        {prioridade.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-destructive" />
              <h3 className="text-lg font-semibold">Prioridades de Desenvolvimento</h3>
            </div>
            {prioridade.map(renderCompetencySection)}
          </div>
        )}

        {/* Non-evaluated competencies */}
        {naoAvaliadas.length > 0 && avaliado === false && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-muted-foreground">Competências não avaliadas</h3>
            {naoAvaliadas.map(renderCompetencySection)}
          </div>
        )}

        {/* Strong points */}
        {pontosFortes.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-success" />
              <h3 className="text-lg font-semibold">Pontos Fortes</h3>
            </div>
            {pontosFortes.map(renderCompetencySection)}
          </div>
        )}

        {/* All competencies if no evaluation */}
        {!avaliado && prioridade.length === 0 && pontosFortes.length === 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Competências</h3>
            {competencias.map(renderCompetencySection)}
          </div>
        )}

        <Button onClick={handleSave} className="w-full gap-2" size="lg">
          <Save className="h-4 w-4" /> Salvar PDI
        </Button>
      </div>
    </Layout>
  );
}
