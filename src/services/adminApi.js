const API_BASE_URL = import.meta.env.VITE_API_URL || "";

/**
 * Helper to fetch from API with auth token
 */
async function fetchAdminData(endpoint, options = {}) {
  const token = localStorage.getItem("adminToken");

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    // console.log(`API Request: ${options.method || 'GET'} ${API_BASE_URL}${endpoint}`, options.body);
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMsg = data.error || data.message || `API error: ${response.status}`;
      const fullError = {
        status: response.status,
        message: errorMsg,
        data: data,
        url: `${API_BASE_URL}${endpoint}`
      };
      
      console.error("API Error Response:", fullError);
      
      if (response.status === 401 || response.status === 403) {
        // Clear token and potentially redirect, handled in AuthContext or App.jsx
        throw new Error(errorMsg);
      }
      
      // For 500 errors, provide detailed error information
      if (response.status === 500) {
        throw new Error(`Server Error: ${errorMsg}\n${data.details || ''}`);
      }
      
      throw new Error(errorMsg);
    }

    // console.log(`API Success: ${endpoint}`, data);
    return data;
  } catch (error) {
    console.error("Fetch Admin Data Error:", error);
    throw error;
  }
}

// -- Auth API --

export async function login(email, password) {
  return await fetchAdminData("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function getMe() {
  return await fetchAdminData("/me");
}

export async function logout() {
  return await fetchAdminData("/logout", { method: "POST" });
}

// -- Admin Dashboard Stats --

export async function getStats() {
  return await fetchAdminData("/admin/stats");
}

// -- Admin Calculators --

export async function getAdminCalculators() {
  return await fetchAdminData("/admin/calculators");
}

export async function getAdminCalculatorById(id) {
  return await fetchAdminData(`/admin/calculators/${id}`);
}

export async function createAdminCalculator(data) {
  return await fetchAdminData("/admin/calculators", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateAdminCalculator(id, data) {
  return await fetchAdminData(`/admin/calculators/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteAdminCalculator(id) {
  return await fetchAdminData(`/admin/calculators/${id}`, {
    method: "DELETE",
  });
}

// -- Admin Categories --

export async function getAdminCategories() {
  return await fetchAdminData("/admin/categories");
}

export async function getAdminCategoryById(id) {
  return await fetchAdminData(`/admin/categories/${id}`);
}

export async function createAdminCategory(data) {
  return await fetchAdminData("/admin/categories", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateAdminCategory(id, data) {
  return await fetchAdminData(`/admin/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteAdminCategory(id) {
  return await fetchAdminData(`/admin/categories/${id}`, {
    method: "DELETE",
  });
}

// -- Admin Pages --

export async function getAdminPages() {
  return await fetchAdminData("/admin/pages");
}

export async function getAdminPageById(id) {
  return await fetchAdminData(`/admin/pages/${id}`);
}

export async function createAdminPage(data) {
  return await fetchAdminData("/admin/pages", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateAdminPage(id, data) {
  return await fetchAdminData(`/admin/pages/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteAdminPage(id) {
  return await fetchAdminData(`/admin/pages/${id}`, {
    method: "DELETE",
  });
}

// -- Admin Contact Inquiries --

export async function getAdminContacts() {
  return await fetchAdminData("/admin/contacts");
}

export async function getAdminContactById(id) {
  return await fetchAdminData(`/admin/contacts/${id}`);
}

export async function deleteAdminContact(id) {
  return await fetchAdminData(`/admin/contacts/${id}`, {
    method: "DELETE",
  });
}

export async function uploadAdminFile(file) {
  return await uploadCategoryIcon(file);
}

export async function deleteAdminFile(path) {
  const base = API_BASE_URL ? API_BASE_URL.replace(/\/$/, "") : "";
  const url = base
    ? `${base}/upload/icon?path=${encodeURIComponent(path)}`
    : `/api/upload/icon?path=${encodeURIComponent(path)}`;

  const token = localStorage.getItem("adminToken");
  const config = {
    method: "DELETE",
    headers: {},
  };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, config);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || `Delete failed: ${response.status}`);
  }
  return data;
}

// -- Admin Settings --

export async function getAdminSettings() {
  return await fetchAdminData("/admin/settings");
}

export async function updateAdminSettings(data) {
  return await fetchAdminData("/admin/settings", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// -- File Upload --

export async function uploadCategoryIcon(file) {
  const formData = new FormData();
  formData.append("icon", file);
  const config = {
    method: "POST",
    body: formData,
    // Do not set Content-Type header; browser will set multipart/form-data boundary
  };

  try {
    // Build upload URL reliably and include auth token if available
    const base = API_BASE_URL ? API_BASE_URL.replace(/\/$/, "") : "";
    const url = base ? `${base}/upload/icon` : `/api/upload/icon`;

    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    let response = await fetch(url, config).catch(e => ({ error: e }));

    // If Laravel API route isn't available (404) or network error, fall back to plain PHP upload
    if (!response || response.error || (response.status && response.status === 404)) {
      const baseNoApi = API_BASE_URL ? API_BASE_URL.replace(/\/?api\/?$/, "") : "";
      const fallbackUrl = baseNoApi ? `${baseNoApi}/public/upload.php` : `/public/upload.php`;
      console.warn(`Primary upload URL failed, falling back to ${fallbackUrl}`);
      response = await fetch(fallbackUrl, config);
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || `Upload failed: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("File Upload Error:", error);
    throw error;
  }
}
