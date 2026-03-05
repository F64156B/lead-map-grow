

# Exibir texto de auxílio na Calibração

## Mudança

No `src/pages/Calibration.tsx`, exibir o campo `descricao` (texto "O que avaliar") de cada competência abaixo do nome, dentro do card de avaliação.

### Alteração (linha ~182-186)
Após o nome da competência e o badge do eixo, adicionar um parágrafo com `comp.descricao` em texto menor e cor `text-muted-foreground`, caso exista:

```tsx
<span className="font-medium">{comp.nome}</span>
...
{comp.descricao && (
  <p className="text-xs text-muted-foreground mt-1">{comp.descricao}</p>
)}
```

Apenas 1 arquivo afetado, sem mudanças de lógica.

