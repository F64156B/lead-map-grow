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
import { isLiderAvaliado } from "@/data/store";
import { useData } from "@/contexts/DataContext";
import type { AcaoPDI } from "@/data/store";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  pendente: { label: "Pendente", className: "bg-muted text-muted-foreground" },
  em_andamento: { label: "Em Andamento", className: "bg-warning/20 text-warning-foreground border-warning" },
  concluida: { label: "Concluída", className: "bg-success/20 text-success border-success" },
};

const NOTA_LABELS: Record<number, string> = {
  1: "Necessita Conhecer",
  2: "Apto com Acompanhamento",
  3: "Apto com Autonomia",
  4: "Apto a Multiplicar",
};

function PDIList() {
  const { lideres, competencias, loading } = useData();

  if (loading) {
    return (
      <Layout>
        <div className="py-20 text-center text-muted-foreground">Carregando...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto max-w-3xl space-y-6">
        <h2 className="text-2xl font-bold">Planos de Desenvolvimento Individual</h2>
        <p className="text-muted-foreground">Selecione um líder para visualizar ou definir seu PDI.</p>
        <div className="space-y-2">
          {lideres.map((lider) => {
            const avaliado = isLiderAvaliado(lider, competencias);
            const pdiCount = lider.pdi?.length || 0;
            return (
              <Link
                key={lider.id}
                to={`/pdi/${lider.id}`}
                className="flex items-center justify-between rounded-lg border bg-card p-4 transition-colors hover:bg-accent"
              >
                <div>
                  <p className="font-medium">{lider.nome}</p>
                  <p className="text-sm text-muted-foreground">{lider.area}</p>
                </div>
                <div className="flex items-center gap-2">
                  {pdiCount > 0 && (
                    <Badge variant="secondary">{pdiCount} ação(ões)</Badge>
                  )}
                  {!avaliado && (
                    <Badge variant="outline" className="text-xs text-destructive border-destructive">Não calibrado</Badge>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

function PDIDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { lideres, competencias, savePDI, registrarMudanca, loading } = useData();
  const lider = lideres.find((l) => l.id === id);

  const [acoes, setAcoes] = useState<AcaoPDI[]>(() => lider?.pdi || []);

  if (loading) {
    return (
      <Layout>
        <div className="py-20 text-center text-muted-foreground">Carregando...</div>
      </Layout>
    );
  }

  if (!lider) {
    return (
      <Layout>
        <div className="py-20 text-center text-muted-foreground">Líder não encontrado.</div>
      </Layout>
    );
  }

  const avaliado = isLiderAvaliado(lider, competencias);

  const prioridade = competencias.filter((c) => {
    const nota = lider.avaliacoes[c.id];
    return nota !== undefined && nota <= 2;
  });
  const pontosFortes = competencias.filter((c) => {
    const nota = lider.avaliacoes[c.id];
    return nota !== undefined && nota >= 3;
  });
  const naoAvaliadas = competencias.filter((c) => lider.avaliacoes[c.id] === undefined);

  const addAcao = (competenciaId: string) => {
    const nova: AcaoPDI = {
      id: crypto.randomUUID(),
      competenciaId,
      conhecimento: "",
      habilidade: "",
      atitude: "",
      metodologia: "",
      indicadores: "",
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

  const handleSave = async () => {
    await savePDI(lider.id, acoes);
    await registrarMudanca("pdi", lider.id, lider.nome, `PDI atualizado — ${acoes.length} ação(ões)`);
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
        <CardContent className="space-y-4">
          {compAcoes.map((acao) => (
            <div key={acao.id} className="space-y-3 rounded-lg border bg-muted/20 p-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Conhecimento</label>
                  <Textarea
                    placeholder="O que precisa aprender (teoria, conceitos)..."
                    value={acao.conhecimento}
                    onChange={(e) => updateAcao(acao.id, "conhecimento", e.target.value)}
                    className="min-h-[60px] resize-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Habilidade</label>
                  <Textarea
                    placeholder="O que precisa praticar (skills)..."
                    value={acao.habilidade}
                    onChange={(e) => updateAcao(acao.id, "habilidade", e.target.value)}
                    className="min-h-[60px] resize-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Atitude</label>
                  <Textarea
                    placeholder="Comportamentos a desenvolver..."
                    value={acao.atitude}
                    onChange={(e) => updateAcao(acao.id, "atitude", e.target.value)}
                    className="min-h-[60px] resize-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Metodologia</label>
                <Textarea
                  placeholder="Como será desenvolvido (mentoria, shadowing, cursos, encontros)..."
                  value={acao.metodologia}
                  onChange={(e) => updateAcao(acao.id, "metodologia", e.target.value)}
                  className="min-h-[50px] resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Indicadores Avaliados</label>
                <Textarea
                  placeholder="Como medir o progresso e sucesso..."
                  value={acao.indicadores}
                  onChange={(e) => updateAcao(acao.id, "indicadores", e.target.value)}
                  className="min-h-[50px] resize-none"
                />
              </div>

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
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate(`/calibrar/${lider.id}`)} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" /> Salvar PDI
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold">{lider.nome}</h2>
            <p className="text-sm text-muted-foreground">{lider.area} · {lider.idade} anos</p>
            {!avaliado && (
              <p className="mt-2 text-sm text-destructive">⚠ Este líder ainda não foi calibrado. Realize a calibração antes de definir o PDI.</p>
            )}
          </CardContent>
        </Card>

        {prioridade.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-destructive" />
              <h3 className="text-lg font-semibold">Prioridades de Desenvolvimento</h3>
            </div>
            {prioridade.map(renderCompetencySection)}
          </div>
        )}

        {naoAvaliadas.length > 0 && avaliado === false && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-muted-foreground">Competências não avaliadas</h3>
            {naoAvaliadas.map(renderCompetencySection)}
          </div>
        )}

        {pontosFortes.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-success" />
              <h3 className="text-lg font-semibold">Pontos Fortes</h3>
            </div>
            {pontosFortes.map(renderCompetencySection)}
          </div>
        )}

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

export default function PDI() {
  const { id } = useParams<{ id: string }>();
  return id ? <PDIDetail /> : <PDIList />;
}
