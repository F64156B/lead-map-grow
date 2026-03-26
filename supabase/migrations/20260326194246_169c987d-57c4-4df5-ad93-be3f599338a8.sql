
-- Competências table
CREATE TABLE public.competencias (
  id TEXT PRIMARY KEY,
  nome TEXT NOT NULL,
  eixo TEXT NOT NULL CHECK (eixo IN ('desempenho', 'comportamento')),
  ordem INTEGER NOT NULL DEFAULT 0,
  descricao TEXT
);

ALTER TABLE public.competencias ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view competencias"
  ON public.competencias FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins can manage competencias"
  ON public.competencias FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Líderes table
CREATE TABLE public.lideres (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  nome TEXT NOT NULL,
  area TEXT NOT NULL,
  idade INTEGER NOT NULL DEFAULT 0,
  formacao JSONB NOT NULL DEFAULT '{}'::jsonb,
  experiencia JSONB NOT NULL DEFAULT '[]'::jsonb
);

ALTER TABLE public.lideres ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view lideres"
  ON public.lideres FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins can manage lideres"
  ON public.lideres FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Avaliações table (calibration scores)
CREATE TABLE public.avaliacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lider_id TEXT NOT NULL REFERENCES public.lideres(id) ON DELETE CASCADE,
  competencia_id TEXT NOT NULL REFERENCES public.competencias(id) ON DELETE CASCADE,
  nota INTEGER NOT NULL CHECK (nota >= 1 AND nota <= 4),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (lider_id, competencia_id)
);

ALTER TABLE public.avaliacoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view avaliacoes"
  ON public.avaliacoes FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins can manage avaliacoes"
  ON public.avaliacoes FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- PDI Actions table
CREATE TABLE public.pdi_acoes (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  lider_id TEXT NOT NULL REFERENCES public.lideres(id) ON DELETE CASCADE,
  competencia_id TEXT NOT NULL,
  conhecimento TEXT NOT NULL DEFAULT '',
  habilidade TEXT NOT NULL DEFAULT '',
  atitude TEXT NOT NULL DEFAULT '',
  metodologia TEXT NOT NULL DEFAULT '',
  indicadores TEXT NOT NULL DEFAULT '',
  prazo TEXT NOT NULL DEFAULT '',
  responsavel TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'em_andamento', 'concluida')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.pdi_acoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view pdi_acoes"
  ON public.pdi_acoes FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins can manage pdi_acoes"
  ON public.pdi_acoes FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Log de mudanças table
CREATE TABLE public.log_mudancas (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  usuario TEXT NOT NULL DEFAULT 'desconhecido',
  tipo TEXT NOT NULL CHECK (tipo IN ('calibracao', 'pdi', 'reset')),
  lider_id TEXT NOT NULL,
  lider_nome TEXT NOT NULL,
  descricao TEXT NOT NULL
);

ALTER TABLE public.log_mudancas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view log_mudancas"
  ON public.log_mudancas FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admins can manage log_mudancas"
  ON public.log_mudancas FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
