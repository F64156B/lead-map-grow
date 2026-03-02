

# Expandir Formacao e Experiencia Profissional dos Lideres

## O que muda

Atualmente, cada lider tem apenas uma string simples para "Formacao" (ex: "Engenharia de Producao") e "Experiencia" (ex: "10 anos"). O objetivo e enriquecer esses campos com informacoes completas.

---

## Mudancas na Base de Dados (`src/data/store.ts`)

### Novo modelo de dados

O campo `formacao` passa de `string` para um objeto com detalhes academicos:

```text
formacao: {
  graduacao: string        // Ex: "Engenharia de Producao"
  instituicao: string      // Ex: "USP"
  posGraduacao?: string    // Ex: "MBA em Gestao Industrial"
  instituicaoPg?: string   // Ex: "FGV"
}
```

O campo `experiencia` passa de `string` para um array com os 3 ultimos cargos/empregos:

```text
experiencia: [
  { cargo: string, empresa: string, periodo: string },
  { cargo: string, empresa: string, periodo: string },
  { cargo: string, empresa: string, periodo: string }
]
```

### Dados pre-carregados

Os 15 lideres serao atualizados com dados ficticios mas realistas para cada um, baseados na area de atuacao. Exemplo para Camila Machado:

- Formacao: Engenharia de Producao (UFMG), MBA em Gestao Industrial (FGV)
- Experiencia:
  1. Gerente Industrial - Adimax (2019-atual)
  2. Coordenadora de Producao - Adimax (2016-2019)
  3. Analista de Processos - Nestle Purina (2013-2016)

### Compatibilidade

Uma funcao de migracao verificara se os dados no localStorage estao no formato antigo (string) e os convertera automaticamente para o novo formato, evitando perda de dados.

---

## Mudancas na Tela de Calibracao (`src/pages/Calibration.tsx`)

O card de perfil do lider sera expandido para exibir:

1. **Secao "Formacao Academica"** - com graduacao, instituicao, e pos-graduacao (quando houver)
2. **Secao "Experiencia Profissional"** - lista dos 3 ultimos cargos com cargo, empresa e periodo, apresentados em formato de timeline visual

---

## Mudancas na Lista de Lideres (`src/pages/Index.tsx`)

Atualizar a exibicao na tabela/lista para mostrar a graduacao principal (nao o objeto completo).

---

## Arquivos afetados

1. **`src/data/store.ts`** - Novos tipos (`FormacaoAcademica`, `ExperienciaProfissional`), dados expandidos dos 15 lideres, funcao de migracao
2. **`src/pages/Calibration.tsx`** - Card de perfil expandido com secoes de formacao e experiencia
3. **`src/pages/Index.tsx`** - Ajustar exibicao da formacao na lista

