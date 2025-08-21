export type AuthUser = {
  id: string;
  email: string;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  organization?: string | null;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
