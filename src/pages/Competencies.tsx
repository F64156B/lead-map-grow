import { useState } from "react";
import { Plus, Trash2, Pencil, Info } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useData } from "@/contexts/DataContext";
import type { Competencia } from "@/data/store";
import { toast } from "@/hooks/use-toast";

export default function Competencies() {
  const { competencias, saveCompetencias, loading } = useData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Competencia | null>(null);
  const [nome, setNome] = useState("");
  const [eixo, setEixo] = useState<"desempenho" | "comportamento">("desempenho");
  const [descricao, setDescricao] = useState("");

  const persist = async (next: Competencia[]) => {
    await saveCompetencias(next);
  };

  const openNew = () => {
    setEditing(null);
    setNome("");
    setEixo("desempenho");
    setDescricao("");
    setDialogOpen(true);
  };

  const openEdit = (c: Competencia) => {
    setEditing(c);
    setNome(c.nome);
    setEixo(c.eixo);
    setDescricao(c.descricao || "");
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!nome.trim()) return;
    if (editing) {
      await persist(competencias.map((c) => (c.id === editing.id ? { ...c, nome, eixo, descricao: descricao || undefined } : c)));
      toast({ title: "Competência atualizada" });
    } else {
      const newComp: Competencia = {
        id: `comp-${Date.now()}`,
        nome,
        eixo,
        ordem: competencias.length + 1,
        descricao: descricao || undefined,
      };
      await persist([...competencias, newComp]);
      toast({ title: "Competência adicionada" });
    }
    setDialogOpen(false);
  };

  const handleDelete = async (id: string) => {
    await persist(competencias.filter((c) => c.id !== id));
    toast({ title: "Competência removida" });
  };

  if (loading) {
    return (
      <Layout>
        <div className="py-20 text-center text-muted-foreground">Carregando...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Competências</h2>
            <p className="text-muted-foreground">Gerencie as competências de avaliação</p>
          </div>
          <Button onClick={openNew} className="gap-2">
            <Plus className="h-4 w-4" /> Adicionar
          </Button>
        </div>

        <div className="space-y-3">
          {competencias.map((c) => (
            <Card key={c.id}>
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{c.nome}</span>
                    <Badge variant="outline" className="text-xs capitalize shrink-0">
                      {c.eixo}
                    </Badge>
                    {c.descricao && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground shrink-0 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="text-sm"><strong>O que avaliar:</strong> {c.descricao}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                  {c.descricao && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{c.descricao}</p>
                  )}
                </div>
                <div className="flex gap-1 shrink-0 ml-2">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(c)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(c.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {competencias.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              Nenhuma competência cadastrada.
            </div>
          )}
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "Editar" : "Nova"} Competência</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Nome</Label>
                <Input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex: Inovação" />
              </div>
              <div>
                <Label>Eixo</Label>
                <Select value={eixo} onValueChange={(v) => setEixo(v as "desempenho" | "comportamento")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desempenho">Desempenho</SelectItem>
                    <SelectItem value="comportamento">Comportamento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>O que avaliar (texto de auxílio)</Label>
                <Textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descreva o que deve ser avaliado nesta competência..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSave} disabled={!nome.trim()}>
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
