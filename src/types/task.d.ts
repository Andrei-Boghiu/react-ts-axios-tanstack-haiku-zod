export interface Task {
  id: string;
  title: string;
  description?: string | null;
  priority: Priority;
  status: Status;
  dueDate?: string | null;
  assigneeId?: string | null;
  milestoneId: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  deletedAt?: string | null;
  deletedBy?: string | null;
}
