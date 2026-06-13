import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

interface CalculateEfficiencyRequestBody {
  score: number;
  durationMinutes: number;
}

type EfficiencyClassification = "Alta" | "Média" | "Baixa";

function calculateEfficiencyIndex(score: number, durationMinutes: number): number {
  const durationHours = durationMinutes / 60;
  return Number((score / durationHours).toFixed(2));
}

function classifyEfficiency(efficiencyIndex: number): EfficiencyClassification {
  if (efficiencyIndex > 8) {
    return "Alta";
  }

  if (efficiencyIndex > 5) {
    return "Média";
  }

  return "Baixa";
}

export async function calculateEfficiency(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  let body: Partial<CalculateEfficiencyRequestBody>;

  try {
    body = (await request.json()) as Partial<CalculateEfficiencyRequestBody>;
  } catch {
    return { status: 400, jsonBody: { error: "Corpo da requisicao invalido" } };
  }

  const { score, durationMinutes } = body;

  if (typeof score !== "number" || typeof durationMinutes !== "number" || durationMinutes <= 0) {
    return {
      status: 400,
      jsonBody: { error: "score e durationMinutes devem ser numeros e durationMinutes deve ser maior que zero" }
    };
  }

  const efficiencyIndex = calculateEfficiencyIndex(score, durationMinutes);
  const classification = classifyEfficiency(efficiencyIndex);

  context.log(`efficiencyIndex=${efficiencyIndex} classification=${classification}`);

  return {
    status: 200,
    jsonBody: { efficiencyIndex, classification }
  };
}

app.http("calculate-efficiency", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "calculate-efficiency",
  handler: calculateEfficiency
});
