import { z } from "zod";

/**
 * Zod validation schemas for GHG Inventory data
 */

export const InventoryStatusEnum = z.enum([
  "draft",
  "in_progress",
  "submitted",
  "under_review",
  "approved",
  "published",
]);

export type InventoryStatus = z.infer<typeof InventoryStatusEnum>;

export const CreateInventorySchema = z.object({
  year: z
    .number()
    .int()
    .min(1990, "Year must be 1990 or later")
    .max(2100, "Year must be 2100 or earlier"),
  baseYear: z
    .number()
    .int()
    .min(1990)
    .max(2100)
    .optional(),
  description: z.string().max(500).optional(),
});

export type CreateInventoryInput = z.infer<typeof CreateInventorySchema>;

export const UpdateInventorySchema = z.object({
  status: InventoryStatusEnum.optional(),
  description: z.string().max(500).optional(),
  methodology: z.string().max(200).optional(),
  notes: z.string().max(2000).optional(),
});

export type UpdateInventoryInput = z.infer<typeof UpdateInventorySchema>;

export const SectorDataSchema = z.object({
  code: z.string().regex(/^[1-5](\.[A-Z](\.\d+)?)?$/, "Invalid IPCC sector code"),
  name: z.string().min(1).max(200),
  emissions: z.number(),
  unit: z.string().default("Gg CO2 eq"),
  methodology: z.enum(["Tier 1", "Tier 2", "Tier 3"]).default("Tier 1"),
  status: z.enum(["pending", "in_progress", "complete"]).default("pending"),
  gases: z.record(z.string(), z.number()).optional(),
  notes: z.string().max(2000).optional(),
});

export type SectorData = z.infer<typeof SectorDataSchema>;

export const CategoryDataSchema = z.object({
  code: z.string().min(1).max(20),
  name: z.string().min(1).max(300),
  sectorCode: z.string(),
  emissions: z.number(),
  unit: z.string().default("Gg CO2 eq"),
  methodology: z.enum(["Tier 1", "Tier 2", "Tier 3"]).default("Tier 1"),
  gases: z.record(z.string(), z.number()).optional(),
  activityData: z.array(z.object({
    description: z.string(),
    value: z.number(),
    unit: z.string(),
    source: z.string().optional(),
  })).optional(),
  emissionFactors: z.array(z.object({
    gas: z.string(),
    factor: z.number(),
    unit: z.string(),
    origin: z.string().optional(),
  })).optional(),
});

export type CategoryData = z.infer<typeof CategoryDataSchema>;

export const InventoryQuerySchema = z.object({
  year: z.coerce.number().int().min(1990).max(2100).optional(),
  status: InventoryStatusEnum.optional(),
  sector: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type InventoryQuery = z.infer<typeof InventoryQuerySchema>;
