import { Formateur, DiscrepancyReport } from '../types/formateur';
import { UserSession, AuthResponse } from '../types/auth';
import { AppConfig } from '../types/modules';

const TOKEN_KEY = 'tpg_auth_token';
const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string | null) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {

    ...options,
    headers
  });

  if (!response.ok) {
    let errorMsg = `Erreur HTTP ${response.status}`;
    try {
      const errData = await response.json();
      if (errData && errData.error) {
        errorMsg = errData.error;
      }
    } catch {
      // ignore
    }
    throw new Error(errorMsg);
  }

  return response.json() as Promise<T>;
}

export const api = {
  auth: {
    login: async (identifier: string, password: string): Promise<AuthResponse> => {
      const data = await request<AuthResponse>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ identifier, password })
      });
      if (data.token) {
        setStoredToken(data.token);
      }
      return data;
    },
    logout: async () => {
      try {
        await request('/api/auth/logout', { method: 'POST' });
      } finally {
        setStoredToken(null);
      }
    },
    getSession: async (): Promise<{ authenticated: boolean; user: UserSession }> => {
      return request<{ authenticated: boolean; user: UserSession }>('/api/auth/session');
    },
    changePassword: async (currentPassword: string, newPassword: string) => {
      return request<{ success: boolean; message: string }>('/api/auth/change-password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword })
      });
    }
  },

  formateurs: {
    getAll: async (params?: { q?: string; type?: string; sort?: 'asc' | 'desc' }): Promise<{ total: number; formateurs: Formateur[] }> => {
      const sp = new URLSearchParams();
      if (params?.q) sp.set('q', params.q);
      if (params?.type) sp.set('type', params.type);
      if (params?.sort) sp.set('sort', params.sort);
      const qStr = sp.toString() ? `?${sp.toString()}` : '';
      return request<{ total: number; formateurs: Formateur[] }>(`/api/formateurs${qStr}`);
    },
    getById: async (id: string): Promise<Formateur> => {
      return request<Formateur>(`/api/formateurs/${id}`);
    },
    create: async (data: Partial<Formateur>): Promise<{ success: boolean; formateur: Formateur; message: string }> => {
      return request<{ success: boolean; formateur: Formateur; message: string }>('/api/formateurs', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    },
    update: async (id: string, data: Partial<Formateur>): Promise<{ success: boolean; formateur: Formateur; message: string }> => {
      return request<{ success: boolean; formateur: Formateur; message: string }>(`/api/formateurs/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
    },
    delete: async (id: string): Promise<{ success: boolean; message: string }> => {
      return request<{ success: boolean; message: string }>(`/api/formateurs/${id}`, {
        method: 'DELETE'
      });
    },
    resetDefault: async (): Promise<{ success: boolean; total: number; message: string }> => {
      return request<{ success: boolean; total: number; message: string }>('/api/formateurs/reset-default', {
        method: 'POST'
      });
    },
    getAudit: async (): Promise<DiscrepancyReport> => {
      return request<DiscrepancyReport>('/api/formateurs/audit');
    }
  },

  config: {
    get: async (): Promise<AppConfig> => {
      return request<AppConfig>('/api/config');
    },
    update: async (data: Partial<AppConfig>): Promise<{ success: boolean; config: AppConfig }> => {
      return request<{ success: boolean; config: AppConfig }>('/api/config', {
        method: 'PUT',
        body: JSON.stringify(data)
      });
    }
  }
};
