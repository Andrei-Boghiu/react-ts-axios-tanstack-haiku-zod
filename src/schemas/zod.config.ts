import z from "zod";

export const priorityEnum = z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]);
export const statusEnum = z.enum(["PLANNING", "IN_PROGRESS", "COMPLETED", "ON_HOLD", "CANCELLED"]);
export const projectStatusEnum = z.enum(["PLANNING", "IN_PROGRESS", "COMPLETED", "ON_HOLD", "CANCELLED", "ARCHIVED"]);
export const membershipRoleEnum = z.enum(["OWNER", "MANAGER", "CONTRIBUTOR", "VIEWER"]);

export const description = z.string().trim().optional().nullable();

export const optionalDatetime = z.iso.datetime().optional().nullable();
