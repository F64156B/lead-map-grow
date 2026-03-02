import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getLider, getCompetencias, saveLider } from "@/data/store";
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
    toast({ title: "Avaliação salva!", description: `Calibração de ${lider.nome} salva com sucesso.` });
    navigate("/");
  };

  const setNota = (compId: string, nota: number) => {
    setAvaliacoes((prev) => ({ ...prev, [compId]: nota }));
  };

  const allFilled = competencias.every((c) => avaliacoes[c.id] !== undefined);

  return (
    <Layout>
      <div className="mx-auto max-w-2xl space-y-6">
        <Button variant="ghost" onClick={() => navigate("/")} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Button>

        {/* Leader Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{lider.nome}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-muted-foreground">Área:</span> {lider.area}</div>
              <div><span className="text-muted-foreground">Idade:</span> {lider.idade}</div>
              <div><span className="text-muted-foreground">Formação:</span> {lider.formacao}</div>
              <div><span className="text-muted-foreground">Experiência:</span> {lider.experiencia}</div>
            </div>
          </CardContent>
        </Card>

        {/* Competencies */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Avaliação de Competências</h3>
          {competencias.map((comp) => {
            const selected = avaliacoes[comp.id];
            return (
              <Card key={comp.id}>
                <CardContent className="pt-6">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-medium">{comp.nome}</span>
                    <Badge variant="outline" className="text-xs capitalize">
                      {comp.eixo}
                    </Badge>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((nota) => {
                      const info = NOTA_LABELS[nota];
                      const isSelected = selected === nota;
                      return (
                        <button
                          key={nota}
                          onClick={() => setNota(comp.id, nota)}
                          className={`rounded-lg border-2 p-3 text-center text-sm font-medium transition-all ${
                            isSelected
                              ? info.color + " ring-2 ring-ring"
                              : "border-border bg-card hover:border-primary/40"
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

        <Button onClick={handleSave} disabled={!allFilled} className="w-full gap-2" size="lg">
          <Save className="h-4 w-4" /> Salvar Avaliação
        </Button>
      </div>
    </Layout>
  );
}
