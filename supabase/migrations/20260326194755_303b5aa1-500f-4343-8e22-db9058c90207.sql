
-- Allow authenticated users (not just admins) to insert/update/delete avaliacoes
CREATE POLICY "Authenticated users can insert avaliacoes"
  ON public.avaliacoes FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update avaliacoes"
  ON public.avaliacoes FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete avaliacoes"
  ON public.avaliacoes FOR DELETE TO authenticated
  USING (true);

-- Allow authenticated users to manage pdi_acoes
CREATE POLICY "Authenticated users can insert pdi_acoes"
  ON public.pdi_acoes FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update pdi_acoes"
  ON public.pdi_acoes FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete pdi_acoes"
  ON public.pdi_acoes FOR DELETE TO authenticated
  USING (true);

-- Allow authenticated users to insert log_mudancas
CREATE POLICY "Authenticated users can insert log_mudancas"
  ON public.log_mudancas FOR INSERT TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to manage competencias (insert/update/delete)
CREATE POLICY "Authenticated users can insert competencias"
  ON public.competencias FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update competencias"
  ON public.competencias FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete competencias"
  ON public.competencias FOR DELETE TO authenticated
  USING (true);

-- Allow authenticated users to upsert lideres
CREATE POLICY "Authenticated users can insert lideres"
  ON public.lideres FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update lideres"
  ON public.lideres FOR UPDATE TO authenticated
  USING (true);
