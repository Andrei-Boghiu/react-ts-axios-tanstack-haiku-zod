export type UserRole = "USER" | "ADMIN" | "DEV";

export type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type Status = "PLANNING" | "IN_PROGRESS" | "COMPLETED" | "ON_HOLD" | "CANCELLED";

export type ProjectStatus = "PLANNING" | "IN_PROGRESS" | "COMPLETED" | "ON_HOLD" | "CANCELLED" | "ARCHIVED";

export type MembershipRole = "OWNER" | "MANAGER" | "CONTRIBUTOR" | "VIEWER";

export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};
