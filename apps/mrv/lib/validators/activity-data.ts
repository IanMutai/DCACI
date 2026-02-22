import { z } from "zod";

/**
 * Zod validation schemas for Activity Data
 */

export const ActivityDataStatusEnum = z.enum([
  "draft",
  "pending",
  "verified",
  "rejected",
]);

export type ActivityDataStatus = z.infer<typeof ActivityDataStatusEnum>;

export const DataCollectionMethodEnum = z.enum([
  "measured",
  "estimated",
  "modeled",
  "expert_judgment",
  "default",
]);

export const CreateActivityDataSchema = z.object({
  categoryCode: z
    .string()
    .min(1, "Category code is required")
    .max(20)
    .regex(/^[1-5](\.[A-Z](\.\d+)?)?$/, "Invalid IPCC category code"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500),
  value: z
    .number()
    .nonnegative("Value must be non-negative"),
  unit: z
    .string()
    .min(1, "Unit is required")
    .max(50),
  year: z
    .number()
    .int()
    .min(1990, "Year must be 1990 or later")
    .max(2100, "Year must be 2100 or earlier"),
  source: z
    .string()
    .max(300)
    .optional(),
  methodology: DataCollectionMethodEnum.default("measured"),
  uncertainty: z
    .number()
    .min(0)
    .max(100)
    .optional()
    .describe("Uncertainty as percentage (+/-)"),
  notes: z
    .string()
    .max(2000)
    .optional(),
});

export type CreateActivityDataInput = z.infer<typeof CreateActivityDataSchema>;

export const UpdateActivityDataSchema = z.object({
  description: z.string().min(1).max(500).optional(),
  value: z.number().nonnegative().optional(),
  unit: z.string().min(1).max(50).optional(),
  source: z.string().max(300).optional(),
  methodology: DataCollectionMethodEnum.optional(),
  uncertainty: z.number().min(0).max(100).optional(),
  status: ActivityDataStatusEnum.optional(),
  notes: z.string().max(2000).optional(),
});

export type UpdateActivityDataInput = z.infer<typeof UpdateActivityDataSchema>;

export const ActivityDataQuerySchema = z.object({
  categoryCode: z.string().optional(),
  year: z.coerce.number().int().min(1990).max(2100).optional(),
  status: ActivityDataStatusEnum.optional(),
  sector: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type ActivityDataQuery = z.infer<typeof ActivityDataQuerySchema>;

export const EmissionFactorSchema = z.object({
  gas: z.enum(["CO2", "CH4", "N2O", "HFCs", "PFCs", "SF6", "NF3"]),
  source: z.string().min(1).max(300),
  factor: z.number().nonnegative("Emission factor must be non-negative"),
  unit: z.string().min(1).max(100),
  categoryCode: z.string().min(1).max(20),
  origin: z.string().max(200).optional().default("Custom"),
  tier: z.enum(["Tier 1", "Tier 2", "Tier 3"]).default("Tier 1"),
  uncertaintyLower: z.number().optional(),
  uncertaintyUpper: z.number().optional(),
  notes: z.string().max(2000).optional(),
});

export type EmissionFactorInput = z.infer<typeof EmissionFactorSchema>;

export const BulkActivityDataSchema = z.object({
  records: z.array(CreateActivityDataSchema).min(1).max(500),
  year: z.number().int().min(1990).max(2100),
  overwrite: z.boolean().default(false),
});

export type BulkActivityDataInput = z.infer<typeof BulkActivityDataSchema>;
