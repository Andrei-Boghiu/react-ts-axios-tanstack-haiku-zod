export type Project = {
  id: string;
  name: string;
  description: string | null;
  priority: Priority;
  status: Status;
  visibility: "PRIVATE" | "PUBLIC";
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  deletedAt: string | null;
  deletedBy: string | null;
  Memberships: {
    role: MembershipRole;
    hasAccepted: boolean;
  }[];
};
