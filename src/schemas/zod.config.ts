import z from "zod";

export const visibilityEnum = z.enum(["PRIVATE", "PUBLIC"]);
export const priorityEnum = z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]);
export const statusEnum = z.enum(["PLANNING", "IN_PROGRESS", "COMPLETED", "ON_HOLD", "CANCELLED"]);
export const projectStatusEnum = z.enum(["PLANNING", "IN_PROGRESS", "COMPLETED", "ON_HOLD", "CANCELLED", "ARCHIVED"]);
export const membershipRoleEnum = z.enum(["OWNER", "MANAGER", "CONTRIBUTOR", "VIEWER"]);

export const description = z.string().trim().optional().nullable();

export const optionalDatetime = z
  .optional(
    z.string().transform((val) => {
      if (!val || val.trim() === "") return undefined; // allow empty strings
      const date = new Date(val);
      if (isNaN(date.getTime())) throw new Error("Invalid datetime");
      return date.toISOString(); // convert to proper ISO string
    })
  )
  .or(z.literal(""));
