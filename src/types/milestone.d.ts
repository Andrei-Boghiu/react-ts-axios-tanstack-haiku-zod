export interface Milestone {
  id: string;
  name: string;
  description: string | null;
  supervisorId: string | null;
  status: "PLANNING" | "IN_PROGRESS" | "COMPLETED" | "ON_HOLD" | "CANCELLED";
  startDate: string | null;
  endDate: string | null;
  projectId: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  deletedAt: string | null;
  deletedBy: string | null;
}
