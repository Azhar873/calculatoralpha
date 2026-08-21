const API_BASE_URL = import.meta.env.VITE_API_URL || "";

/**
 * Helper to fetch from API
 */
async function fetchData(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

/**
 * Get all categories with their calculators
 */
export async function getCategoriesWithCalculators() {
  try {
    const data = await fetchData("/categories?include=calculators");

    if (Array.isArray(data)) {
      return data.map((category) => ({
        ...category,
        calculators: (category.calculators || []).map((calculator) => ({
          ...calculator,
          path:
            calculator.path ||
            `/${calculator.slug || ""}`.replace(/\/{2,}/g, "/"),
        })),
      }));
    }

    return data && Array.isArray(data) ? data : fallbackCategories;
  } catch (error) {
    console.warn("Using fallback calculator data because the API is unavailable:", error);
    return fallbackCategories;
  }
}

/**
 * Get all calculators
 */
export async function getAllCalculators() {
  return await fetchData("/calculators");
}

export async function getSiteSettings() {
  return await fetchData("/settings");
}

export async function getPageBySlug(slug) {
  return await fetchData(`/pages/${slug}`);
}

export async function getCategoryBySlug(slug) {
  return await fetchData(`/categories/${slug}`);
}

export async function getAllPages() {
  const data = await fetchData("/pages");
  // API may return an object wrapper (e.g., { value: [...], Count: N })
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.value)) return data.value;
  return [];
}

export async function submitContactForm(payload) {
  return await fetchData("/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

/**
 * Get calculator by slug
 */
export async function getCalculatorBySlug(catSlug, calcSlug) {
  return await fetchData(`/calculators/${catSlug}/${calcSlug}`);
}
