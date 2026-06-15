# estudamais-function

Azure Function HTTP Trigger do Estuda+. Calcula o índice de eficiência cognitiva: **E = Nota ÷ Horas**.

## Stack

- Node.js 20 + TypeScript
- Azure Functions v4 (HTTP Trigger, authLevel anonymous)
- `@azure/functions` SDK

## Endpoint

### `POST /api/calculate-efficiency`

Calcula eficiência e classifica como Alta / Média / Baixa.

**Body:**
```json
{ "score": 8, "durationMinutes": 60 }
```

**Response 200:**
```json
{ "efficiencyIndex": 8, "classification": "Média" }
```

**Classificação:**
| efficiencyIndex | classification |
|-----------------|---------------|
| > 8             | Alta           |
| 5 a 8           | Média          |
| < 5             | Baixa          |

**Erros:**
- `400` — body inválido ou `durationMinutes <= 0`

## Estrutura

```
src/
├── index.ts                    ponto de entrada — importa todas as funções
└── functions/
    └── calculateEfficiency.ts  handler HTTP + lógica de domínio
```

## Rodar localmente

```bash
npm install
npm run build
cp local.settings.json.example local.settings.json
func start
# disponível em http://localhost:7071/api/calculate-efficiency
```

> Requer [Azure Functions Core Tools v4](https://learn.microsoft.com/azure/azure-functions/functions-run-local).

## Deploy em produção

URL ativa: `https://estudamais-bxamfjdkcteqhrfs.eastus-01.azurewebsites.net/api/calculate-efficiency`

Deploy via Azure Portal ou `func azure functionapp publish <nome>`.

## Equipe

Fernando Chociai  
Gabriel Coltre  
João Marcelo  
João Vitor Franzedo Carmo  
Leander Hallu  

PUCPR — Projeto PJBL 2026
