const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export async function analyzeCalculatorScreenshot(file) {
  const formData = new FormData();
  formData.append("screenshot", file);

  const endpoint = API_BASE_URL
    ? `${API_BASE_URL}/screenshot-calculator`
    : "/api/screenshot-calculator";
  const response = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const details = data.details || data.provider_output;
    throw new Error(
      details ? `${data.error || "Could not analyze this screenshot."} (${details})` : data.error || "Could not analyze this screenshot.",
    );
  }

  return data;
}
