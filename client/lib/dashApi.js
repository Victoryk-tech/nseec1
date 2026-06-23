import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

const dashApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

let accessToken = null;

export const setAccessToken = (token) => { accessToken = token; };
export const clearAccessToken = () => { accessToken = null; };

dashApi.interceptors.request.use((config) => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  if (process.env.NODE_ENV === "development") {
    console.log(`[API] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`, {
      hasToken: !!accessToken,
      data: config.data,
    });
  }
  return config;
});

dashApi.interceptors.response.use(
  (res) => {
    if (process.env.NODE_ENV === "development") {
      console.log(`[API] ← ${res.status} ${res.config.url}`, res.data);
    }
    return res;
  },
  async (err) => {
    if (process.env.NODE_ENV === "development") {
      console.error(`[API] ← ${err.response?.status} ${err.config?.url}`, err.response?.data);
    }
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const { data } = await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        setAccessToken(data.data.accessToken);
        original.headers.Authorization = `Bearer ${data.data.accessToken}`;
        return dashApi(original);
      } catch {
        clearAccessToken();
        if (typeof window !== "undefined") {
          window.location.href = "/staff-portal/login";
        }
      }
    }
    return Promise.reject(err);
  }
);

export default dashApi;
