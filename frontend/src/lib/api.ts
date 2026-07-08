export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1338";

export function getStrapiMedia(url: string | null) {
  if (url == null) return null;
  // Return the full URL if it's already an absolute URL
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${STRAPI_URL}${url}`;
}

export async function fetchAPI(path: string, urlParamsObject = {}, options = {}) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  // Build request URL
  const queryString = new URLSearchParams(urlParamsObject).toString();
  const requestUrl = `${STRAPI_URL}/api${path}${queryString ? `?${queryString}` : ""}`;

  try {
    const response = await fetch(requestUrl, mergedOptions);
    if (!response.ok) {
      // 404 is expected for Single Types when they haven't been created in Strapi Admin yet
      if (response.status !== 404) {
        console.error(`Strapi API Error: ${response.status} ${response.statusText}`);
      }
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching from Strapi:", error);
    return null;
  }
}

export async function getHeroData() {
  const res = await fetchAPI("/hero", { populate: "*" }, { cache: "no-store" });
  return res?.data || null;
}

export async function getServicesData() {
  const res = await fetchAPI("/services", { populate: "*" }, { cache: "no-store" });
  return res?.data || [];
}

export async function getContactData() {
  const res = await fetchAPI("/contact", { populate: "*" }, { cache: "no-store" });
  return res?.data || null;
}

export async function getProcessStepsData() {
  const res = await fetchAPI("/process-steps", { populate: "*", sort: "order:asc" }, { cache: "no-store" });
  return res?.data || [];
}
