import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Lider, Competencia, AcaoPDI, LogMudanca, FormacaoAcademica, ExperienciaProfissional } from "@/data/store";

interface DataContextType {
  lideres: Lider[];
  competencias: Competencia[];
  logMudancas: LogMudanca[];
  loading: boolean;
  saveLider: (lider: Lider) => Promise<void>;
  saveLideres: (lideres: Lider[]) => Promise<void>;
  saveCompetencias: (comps: Competencia[]) => Promise<void>;
  savePDI: (liderId: string, acoes: AcaoPDI[]) => Promise<void>;
  resetCalibracaoLider: (liderId: string) => Promise<void>;
  registrarMudanca: (tipo: LogMudanca["tipo"], liderId: string, liderNome: string, descricao: string, usuarioEmail?: string) => Promise<void>;
  refresh: () => Promise<void>;
}

const DataContext = createContext<DataContextType | null>(null);

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [lideres, setLideres] = useState<Lider[]>([]);
  const [competencias, setCompetencias] = useState<Competencia[]>([]);
  const [logMudancas, setLogMudancas] = useState<LogMudanca[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    try {
      // Fetch competencias
      const { data: compsData } = await supabase
        .from("competencias")
        .select("*")
        .order("ordem");
      
      const comps: Competencia[] = (compsData || []).map((c: any) => ({
        id: c.id,
        nome: c.nome,
        eixo: c.eixo as "desempenho" | "comportamento",
        ordem: c.ordem,
        descricao: c.descricao || undefined,
      }));
      setCompetencias(comps);

      // Fetch lideres
      const { data: lideresData } = await supabase
        .from("lideres")
        .select("*")
        .order("nome");

      // Fetch all avaliacoes
      const { data: avalData } = await supabase
        .from("avaliacoes")
        .select("*");

      // Fetch all PDI acoes
      const { data: pdiData } = await supabase
        .from("pdi_acoes")
        .select("*")
        .order("created_at");

      // Build avaliacoes map: { liderId: { compId: nota } }
      const avalMap: Record<string, Record<string, number>> = {};
      (avalData || []).forEach((a: any) => {
        if (!avalMap[a.lider_id]) avalMap[a.lider_id] = {};
        avalMap[a.lider_id][a.competencia_id] = a.nota;
      });

      // Build PDI map: { liderId: AcaoPDI[] }
      const pdiMap: Record<string, AcaoPDI[]> = {};
      (pdiData || []).forEach((p: any) => {
        if (!pdiMap[p.lider_id]) pdiMap[p.lider_id] = [];
        pdiMap[p.lider_id].push({
          id: p.id,
          competenciaId: p.competencia_id,
          conhecimento: p.conhecimento,
          habilidade: p.habilidade,
          atitude: p.atitude,
          metodologia: p.metodologia,
          indicadores: p.indicadores,
          prazo: p.prazo,
          responsavel: p.responsavel,
          status: p.status as AcaoPDI["status"],
        });
      });

      const lids: Lider[] = (lideresData || []).map((l: any) => ({
        id: l.id,
        nome: l.nome,
        area: l.area,
        idade: l.idade,
        formacao: l.formacao as FormacaoAcademica,
        experiencia: l.experiencia as ExperienciaProfissional[],
        avaliacoes: avalMap[l.id] || {},
        pdi: pdiMap[l.id] || [],
      }));
      setLideres(lids);

      // Fetch logs
      const { data: logsData } = await supabase
        .from("log_mudancas")
        .select("*")
        .order("timestamp", { ascending: false });

      const logs: LogMudanca[] = (logsData || []).map((lg: any) => ({
        id: lg.id,
        timestamp: lg.timestamp,
        usuario: lg.usuario,
        tipo: lg.tipo as LogMudanca["tipo"],
        liderId: lg.lider_id,
        liderNome: lg.lider_nome,
        descricao: lg.descricao,
      }));
      setLogMudancas(logs);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const saveLider = useCallback(async (lider: Lider) => {
    // Update lider basic info
    await supabase.from("lideres").upsert({
      id: lider.id,
      nome: lider.nome,
      area: lider.area,
      idade: lider.idade,
      formacao: lider.formacao as any,
      experiencia: lider.experiencia as any,
    });

    // Upsert avaliacoes
    const avalEntries = Object.entries(lider.avaliacoes);
    if (avalEntries.length > 0) {
      const rows = avalEntries.map(([compId, nota]) => ({
        lider_id: lider.id,
        competencia_id: compId,
        nota,
        updated_at: new Date().toISOString(),
      }));
      await supabase.from("avaliacoes").upsert(rows, { onConflict: "lider_id,competencia_id" });
    }

    // Update local state
    setLideres((prev) => {
      const idx = prev.findIndex((l) => l.id === lider.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = lider;
        return next;
      }
      return [...prev, lider];
    });
  }, []);

  const saveLideres = useCallback(async (newLideres: Lider[]) => {
    for (const lider of newLideres) {
      await saveLider(lider);
    }
  }, [saveLider]);

  const saveCompetencias = useCallback(async (comps: Competencia[]) => {
    // Delete all, then re-insert
    await supabase.from("competencias").delete().neq("id", "___none___");
    const rows = comps.map((c) => ({
      id: c.id,
      nome: c.nome,
      eixo: c.eixo,
      ordem: c.ordem,
      descricao: c.descricao || null,
    }));
    if (rows.length > 0) {
      await supabase.from("competencias").insert(rows);
    }
    setCompetencias(comps);
  }, []);

  const savePDI = useCallback(async (liderId: string, acoes: AcaoPDI[]) => {
    // Delete existing PDI for this lider
    await supabase.from("pdi_acoes").delete().eq("lider_id", liderId);

    // Insert new ones
    if (acoes.length > 0) {
      const rows = acoes.map((a) => ({
        id: a.id,
        lider_id: liderId,
        competencia_id: a.competenciaId,
        conhecimento: a.conhecimento,
        habilidade: a.habilidade,
        atitude: a.atitude,
        metodologia: a.metodologia,
        indicadores: a.indicadores,
        prazo: a.prazo,
        responsavel: a.responsavel,
        status: a.status,
      }));
      await supabase.from("pdi_acoes").insert(rows);
    }

    // Update local state
    setLideres((prev) =>
      prev.map((l) => (l.id === liderId ? { ...l, pdi: acoes } : l))
    );
  }, []);

  const resetCalibracaoLider = useCallback(async (liderId: string) => {
    await supabase.from("avaliacoes").delete().eq("lider_id", liderId);
    
    setLideres((prev) =>
      prev.map((l) => (l.id === liderId ? { ...l, avaliacoes: {} } : l))
    );
  }, []);

  const registrarMudanca = useCallback(async (
    tipo: LogMudanca["tipo"],
    liderId: string,
    liderNome: string,
    descricao: string,
    usuarioEmail?: string
  ) => {
    const email = usuarioEmail || "desconhecido";
    const log = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
      timestamp: new Date().toISOString(),
      usuario: email,
      tipo,
      lider_id: liderId,
      lider_nome: liderNome,
      descricao,
    };
    await supabase.from("log_mudancas").insert(log);

    const newLog: LogMudanca = {
      id: log.id,
      timestamp: log.timestamp,
      usuario: log.usuario,
      tipo: tipo,
      liderId,
      liderNome,
      descricao,
    };
    setLogMudancas((prev) => [newLog, ...prev]);
  }, []);

  return (
    <DataContext.Provider
      value={{
        lideres,
        competencias,
        logMudancas,
        loading,
        saveLider,
        saveLideres,
        saveCompetencias,
        savePDI,
        resetCalibracaoLider,
        registrarMudanca,
        refresh: fetchAll,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
