import axios from "axios"

// Environment-driven baseURL selection:
// - If VITE_API_URL is set at build time, that will be used (recommended for production)
// - Otherwise, if VITE_USE_DEPLOYED === 'true' (dev-only), we'll point at the deployed Render API
// - Otherwise default to localhost:5000 for local backend development
const DEPLOYED_BACKEND = "https://bookreviewer-l1d4.onrender.com"
const baseURL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.VITE_USE_DEPLOYED === "true" ? DEPLOYED_BACKEND : "http://localhost:5000")

const api = axios.create({ baseURL })

// Dev-time debug: print the effective baseURL so it's easy to verify env parsing
if (import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.debug(`[api] axios baseURL -> "${baseURL}" (import.meta.env.VITE_API_URL="${import.meta.env.VITE_API_URL}")`)
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
