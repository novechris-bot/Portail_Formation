export type UserRole = 'admin' | 'responsable' | 'formateur';

export interface UserSession {
  id: string;
  username: string;
  nomComplet: string;
  role: UserRole;
  formateurId?: string;
  expiresAt: number;
}

export interface AuthResponse {
  success: boolean;
  user?: UserSession;
  token?: string;
  error?: string;
}
