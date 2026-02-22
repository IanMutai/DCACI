# NCTP Project Tracker

> **Last Updated:** 2026-02-02
> **Overall Progress:** Phase 1 scaffolding complete, entering implementation phase
> **Blocking Issue:** npm install not yet run, no database connections

---

## MASTER WORK BREAKDOWN STRUCTURE

### STREAM A: INFRASTRUCTURE & DEVOPS
Owner: DevOps | Priority: P0 (Blocks Everything)

#### A1. Monorepo Foundation [COMPLETE]
- [x] A1.1 Root package.json with workspaces
- [x] A1.2 Turborepo configuration (turbo.json)
- [x] A1.3 Directory structure (apps/, packages/)
- [x] A1.4 Shared TypeScript config (packages/config/typescript)
- [x] A1.5 Shared ESLint config (packages/config/eslint)
- [x] A1.6 Shared Tailwind preset (packages/config/tailwind)
- [x] A1.7 .gitignore for monorepo
- [x] A1.8 .env.example template

#### A2. Docker & Database Infrastructure [PARTIAL]
- [x] A2.1 docker-compose.yml (4 services + 4 databases)
- [x] A2.2 docker-compose.dev.yml (development overrides)
- [ ] A2.3 Dockerfile for Portal (apps/portal/Dockerfile)
- [ ] A2.4 Dockerfile for MRV (apps/mrv/Dockerfile)
- [ ] A2.5 Dockerfile for NDC (apps/ndc/Dockerfile)
- [ ] A2.6 Dockerfile for Registry (apps/registry/Dockerfile)
- [ ] A2.7 Database initialization scripts
- [ ] A2.8 Health check endpoints for all services

#### A3. Dependency Installation & Validation [NOT STARTED]
- [ ] A3.1 Run npm install at root (resolve workspace dependencies)
- [ ] A3.2 Verify all apps compile (turbo run build)
- [ ] A3.3 Verify all apps start individually
- [ ] A3.4 Fix any TypeScript compilation errors
- [ ] A3.5 Fix any missing dependency issues

#### A4. Database Setup [NOT STARTED]
- [ ] A4.1 Create .env.local with database URLs
- [ ] A4.2 Portal: npx prisma migrate dev --name init
- [ ] A4.3 MRV: npx prisma migrate dev --name init
- [ ] A4.4 NDC: npx prisma migrate dev --name init
- [ ] A4.5 Registry: Create/update prisma schema + migrate
- [ ] A4.6 Portal: Seed script (default tenant, admin user, module configs)
- [ ] A4.7 MRV: Seed script (default emission factors, IPCC categories)
- [ ] A4.8 NDC: Seed script (sample NDC, targets)
- [ ] A4.9 Registry: Seed script (sample projects, credits)

#### A5. CI/CD Pipeline [NOT STARTED]
- [ ] A5.1 GitHub Actions: lint + type-check on PR
- [ ] A5.2 GitHub Actions: build all apps
- [ ] A5.3 GitHub Actions: run tests
- [ ] A5.4 Docker build and push workflow
- [ ] A5.5 Database migration workflow

---

### STREAM B: PORTAL (Gateway & Auth)
Owner: Frontend + Auth | Priority: P0 (Blocks user access)

#### B1. Portal Scaffold [COMPLETE]
- [x] B1.1 Next.js app initialization
- [x] B1.2 Package.json with dependencies
- [x] B1.3 Layout and root page
- [x] B1.4 Tailwind CSS setup
- [x] B1.5 Prisma schema (Tenant, User, Session, ApiKey, Webhook, AuditLog, ModuleConfig)

#### B2. Authentication System [SCAFFOLD ONLY - NEEDS IMPLEMENTATION]
- [x] B2.1 NextAuth route handler (stub)
- [x] B2.2 Login page UI
- [x] B2.3 Registration page UI
- [x] B2.4 Forgot password page UI
- [ ] B2.5 Connect auth to Prisma (user lookup, password verify)
- [ ] B2.6 Password hashing (bcrypt)
- [ ] B2.7 Email verification flow
- [ ] B2.8 Password reset flow (with email)
- [ ] B2.9 Google OAuth provider (real credentials)
- [ ] B2.10 Microsoft OAuth provider (real credentials)
- [ ] B2.11 Session management (database sessions)
- [ ] B2.12 Role-based access control middleware
- [ ] B2.13 Tenant context middleware (extract tenant from session)
- [ ] B2.14 API key authentication for service-to-service calls

#### B3. Onboarding Wizard [SCAFFOLD ONLY - NEEDS IMPLEMENTATION]
- [x] B3.1 Onboarding layout with step indicator
- [x] B3.2 Welcome page
- [x] B3.3 Country profile page UI
- [x] B3.4 Module selection page UI
- [x] B3.5 MRV setup page UI
- [x] B3.6 NDC setup page UI
- [x] B3.7 Registry setup page UI
- [x] B3.8 Complete page UI
- [ ] B3.9 Persist onboarding state to database (Tenant model)
- [ ] B3.10 Module activation logic (create TenantConfig in each service)
- [ ] B3.11 Country profile → Tenant update API
- [ ] B3.12 Module selection → enable/disable services
- [ ] B3.13 MRV setup → create MRV TenantConfig via API
- [ ] B3.14 NDC setup → create NDC TenantConfig via API
- [ ] B3.15 Registry setup → create Registry TenantConfig via API
- [ ] B3.16 Step navigation with validation (can't skip required steps)

#### B4. Unified Dashboard [SCAFFOLD ONLY - NEEDS IMPLEMENTATION]
- [x] B4.1 Dashboard layout with sidebar
- [x] B4.2 Dashboard page UI (hardcoded data)
- [x] B4.3 MRV module wrapper page
- [x] B4.4 NDC module wrapper page
- [x] B4.5 Registry module wrapper page
- [x] B4.6 Integration page
- [x] B4.7 Reports page
- [x] B4.8 Settings page
- [ ] B4.9 Replace hardcoded data with API calls to services
- [ ] B4.10 MRV summary fetcher (total emissions, inventory status)
- [ ] B4.11 NDC summary fetcher (target progress, on-track status)
- [ ] B4.12 Registry summary fetcher (credits issued, projects active)
- [ ] B4.13 Real-time module status indicators
- [ ] B4.14 Recent activity feed (from webhook events)
- [ ] B4.15 Quick action buttons (connected to real flows)
- [ ] B4.16 Settings page: tenant management, user management, API keys

#### B5. API Gateway (Proxy & Webhooks) [SCAFFOLD ONLY - NEEDS IMPLEMENTATION]
- [x] B5.1 MRV proxy route stub
- [x] B5.2 NDC proxy route stub
- [x] B5.3 Registry proxy route stub
- [x] B5.4 MRV webhook receiver stub
- [x] B5.5 NDC webhook receiver stub
- [x] B5.6 Registry webhook receiver stub
- [ ] B5.7 Implement proxy with auth forwarding (inject tenant context)
- [ ] B5.8 Implement proxy error handling and retry
- [ ] B5.9 Implement webhook signature verification
- [ ] B5.10 Implement webhook event storage (AuditLog)
- [ ] B5.11 Implement webhook event processing (update dashboard cache)
- [ ] B5.12 Rate limiting on proxy routes

#### B6. Portal Components [PARTIAL]
- [x] B6.1 Step indicator component
- [x] B6.2 Module card component
- [x] B6.3 Summary card component
- [x] B6.4 Sidebar navigation
- [x] B6.5 Dashboard header
- [x] B6.6 Module cards (MRV, NDC, Registry)
- [x] B6.7 Cross-system chart placeholder
- [ ] B6.8 User management table component
- [ ] B6.9 API key management component
- [ ] B6.10 Audit log viewer component
- [ ] B6.11 Notification system component

---

### STREAM C: MRV SYSTEM
Owner: MRV Team | Priority: P1 (Core data source for NDC)

#### C1. MRV Scaffold [COMPLETE]
- [x] C1.1 Next.js app (port 3001)
- [x] C1.2 Prisma schema (TenantConfig, Inventory, SectorData, CategoryData, ActivityData, EmissionFactor, EmissionCalculation, QAQCRecord, KeyCategoryAnalysis, Recalculation)
- [x] C1.3 All module pages scaffolded (21 pages)
- [x] C1.4 All API route files created (15 routes)
- [x] C1.5 All component files created (9 components)

#### C2. MRV Database Integration [NOT STARTED]
- [ ] C2.1 Prisma client initialization (lib/prisma.ts)
- [ ] C2.2 Prisma migration
- [ ] C2.3 Seed: Default IPCC emission factors (all sectors, Tier 1)
- [ ] C2.4 Seed: IPCC category codes and names
- [ ] C2.5 Seed: GWP values (AR5)
- [ ] C2.6 Seed: Sample inventory with sector data

#### C3. MRV Inventory API [ROUTES EXIST - NEED DB LOGIC]
- [x] C3.1 GET /api/v1/inventory (stub with mock data)
- [x] C3.2 POST /api/v1/inventory (stub)
- [x] C3.3 GET /api/v1/inventory/[year] (stub)
- [x] C3.4 PUT /api/v1/inventory/[year] (stub)
- [ ] C3.5 Replace GET /inventory with Prisma query
- [ ] C3.6 Replace POST /inventory with Prisma create + validation
- [ ] C3.7 Replace GET /inventory/[year] with Prisma findUnique
- [ ] C3.8 Replace PUT /inventory/[year] with Prisma update
- [ ] C3.9 Implement DELETE /inventory/[year]
- [ ] C3.10 Implement inventory status transitions (DRAFT→IN_REVIEW→APPROVED→SUBMITTED→PUBLISHED)
- [ ] C3.11 Emit webhook on status change

#### C4. MRV Sector & Category API [ROUTES EXIST - NEED DB LOGIC]
- [x] C4.1 GET /api/v1/sectors (stub)
- [x] C4.2 GET /api/v1/sectors/[code] (stub)
- [x] C4.3 GET /api/v1/categories/[code] (stub)
- [ ] C4.4 Replace with Prisma queries
- [ ] C4.5 Implement sector data creation on inventory creation (auto-create 5 sectors)
- [ ] C4.6 Implement category data CRUD under sectors
- [ ] C4.7 Implement sector total recalculation on category update

#### C5. MRV Activity Data & Emission Factors API [ROUTES EXIST - NEED DB LOGIC]
- [x] C5.1 GET/POST /api/v1/activity-data (stub)
- [x] C5.2 GET/POST /api/v1/emission-factors (stub)
- [ ] C5.3 Replace with Prisma queries
- [ ] C5.4 Implement emission factor lookup (tenant-specific → default IPCC fallback)
- [ ] C5.5 Implement activity data validation (Zod schemas already exist)
- [ ] C5.6 Implement bulk activity data import endpoint

#### C6. MRV Calculation Engine [PARTIAL]
- [x] C6.1 Tier 1 calculation (lib/calculations/tier1.ts) - COMPLETE
- [x] C6.2 Tier 2 signatures (lib/calculations/tier2.ts) - STUB
- [x] C6.3 Tier 3 placeholder (lib/calculations/tier3.ts) - EMPTY
- [x] C6.4 Default emission factors (lib/emission-factors/defaults.ts)
- [ ] C6.5 Implement Tier 2 calculations (country-specific EF, NCV, carbon content)
- [ ] C6.6 Implement Tier 3 framework (model interface for LEAP, TIMES, etc.)
- [ ] C6.7 POST /api/v1/calculations - trigger calculation run
- [ ] C6.8 Store EmissionCalculation results in database
- [ ] C6.9 Recalculate sector/inventory totals after calculation
- [ ] C6.10 Implement GWP conversion (AR4, AR5, AR6 support)

#### C7. MRV QA/QC System [ROUTES EXIST - NEED IMPLEMENTATION]
- [x] C7.1 QA/QC route stubs
- [x] C7.2 QA/QC component stubs
- [ ] C7.3 Implement Tier 1 General QC checks (completeness, sign errors, unit consistency)
- [ ] C7.4 Implement Tier 1 Category-specific QC (range checks, time series consistency)
- [ ] C7.5 Implement key category analysis (Level + Trend assessment)
- [ ] C7.6 Implement uncertainty analysis (Approach 1: error propagation)
- [ ] C7.7 QA/QC review workflow (assign reviewer, submit findings, approve/reject)
- [ ] C7.8 QA/QC status tracking per inventory

#### C8. MRV Reporting [ROUTES EXIST - NEED IMPLEMENTATION]
- [x] C8.1 NIR route stub
- [x] C8.2 BTR route stub
- [x] C8.3 Exports route stub (page exists)
- [ ] C8.4 NIR chapter generation (pull data, format per UNFCCC guidelines)
- [ ] C8.5 BTR Chapter II generation (CTF tables)
- [ ] C8.6 CRF/CRT table export
- [ ] C8.7 CSV/JSON data export
- [ ] C8.8 PDF report generation

#### C9. MRV Emissions Summary API [ROUTE EXISTS - NEED IMPLEMENTATION]
- [x] C9.1 GET /api/v1/emissions (stub)
- [ ] C9.2 Implement aggregated emissions by year
- [ ] C9.3 Implement emissions by sector breakdown
- [ ] C9.4 Implement emissions by gas breakdown
- [ ] C9.5 Implement time series (multi-year trend)
- [ ] C9.6 Implement per-capita and GDP intensity calculations

---

### STREAM D: NDC TOOLS
Owner: NDC Team | Priority: P1 (Depends on MRV for emissions data)

#### D1. NDC Scaffold [COMPLETE]
- [x] D1.1 Next.js app (port 3002)
- [x] D1.2 Prisma schema (TenantConfig, NDC, Target, ProgressRecord, TargetProgress, Baseline, Projection, PolicyMeasure, PolicyTarget, PolicyImpact, GapAnalysis, FinanceNeed)
- [x] D1.3 All module pages scaffolded (18 pages)
- [x] D1.4 All API route files created (14 routes)
- [x] D1.5 All component files created (9 components)

#### D2. NDC Database Integration [NOT STARTED]
- [ ] D2.1 Prisma client initialization
- [ ] D2.2 Prisma migration
- [ ] D2.3 Seed: Sample NDC with targets
- [ ] D2.4 Seed: Sample baseline scenarios
- [ ] D2.5 Seed: Sample policies

#### D3. NDC Target Management API [ROUTES EXIST - NEED DB LOGIC]
- [x] D3.1 CRUD route stubs for NDC and targets
- [ ] D3.2 Replace with Prisma queries
- [ ] D3.3 Implement NDC version management (NDC 1.0, 2.0, etc.)
- [ ] D3.4 Implement target validation (Zod)
- [ ] D3.5 Implement target status transitions
- [ ] D3.6 Emit webhooks on target changes

#### D4. NDC Progress Tracking [PARTIAL]
- [x] D4.1 Progress calculator (lib/calculations/progress-calculator.ts) - COMPLETE
- [x] D4.2 Progress API route stub
- [x] D4.3 Progress sync route stub
- [ ] D4.4 Connect progress calculator to API endpoint
- [ ] D4.5 Implement MRV sync (call MRV emissions API, store progress record)
- [ ] D4.6 Implement per-target progress calculation
- [ ] D4.7 Implement on-track detection algorithm
- [ ] D4.8 Store ProgressRecord and TargetProgress in database

#### D5. NDC Projections & Scenarios [PARTIAL]
- [x] D5.1 Projection engine file exists
- [x] D5.2 Scenario builder file exists
- [ ] D5.3 Implement projection engine (linear, exponential, compound growth methods)
- [ ] D5.4 Implement scenario builder (BAU, WEM, WAM)
- [ ] D5.5 Connect to API endpoints
- [ ] D5.6 Store Projection and Baseline records in database

#### D6. NDC Gap Analysis [PARTIAL]
- [x] D6.1 Gap analyzer file exists
- [x] D6.2 Gap analysis API route stub
- [ ] D6.3 Implement gap analysis (current vs projected vs target)
- [ ] D6.4 Implement sectoral gap breakdown
- [ ] D6.5 Generate recommendations based on gap size
- [ ] D6.6 Store GapAnalysis in database

#### D7. NDC Policy Measures [ROUTES EXIST - NEED DB LOGIC]
- [x] D7.1 Policy CRUD route stubs
- [x] D7.2 Policy table component
- [ ] D7.3 Replace with Prisma queries
- [ ] D7.4 Implement policy-target linkage
- [ ] D7.5 Implement policy impact tracking (actual vs expected)
- [ ] D7.6 Implement cost-benefit calculation

#### D8. NDC Finance Tracking [ROUTES EXIST - NEED DB LOGIC]
- [x] D8.1 Finance route stubs
- [ ] D8.2 Implement finance needs assessment storage
- [ ] D8.3 Implement finance flow tracking
- [ ] D8.4 Implement gap calculation (need - secured)

#### D9. NDC Reporting [ROUTES EXIST - NEED IMPLEMENTATION]
- [x] D9.1 BTR Chapter 3 route stub
- [ ] D9.2 Implement BTR Chapter 3 generation (progress + targets + policies)
- [ ] D9.3 Implement NDC update document generation

---

### STREAM E: REGISTRY ENHANCEMENTS
Owner: Registry Team | Priority: P2 (Existing UI complete, needs API)

#### E1. Registry Current State [MOSTLY COMPLETE]
- [x] E1.1 Full UI for all workflows (PCN, PDD, Authorization, Implementation, Monitoring, Issuance)
- [x] E1.2 Credit listings and management UI
- [x] E1.3 Transaction UI
- [x] E1.4 Article 6 / ITMO dashboard UI
- [x] E1.5 Compliance tracking UI
- [x] E1.6 Public portal UI

#### E2. Registry API v1 [NOT STARTED]
- [ ] E2.1 Create/update Prisma schema for Registry
- [ ] E2.2 Prisma migration
- [ ] E2.3 GET/POST /api/v1/projects
- [ ] E2.4 GET/PUT/DELETE /api/v1/projects/[id]
- [ ] E2.5 GET /api/v1/projects/[id]/lifecycle
- [ ] E2.6 GET/POST /api/v1/credits
- [ ] E2.7 GET /api/v1/credits/[serialNumber]
- [ ] E2.8 GET/POST /api/v1/transactions
- [ ] E2.9 GET /api/v1/transactions/[id]
- [ ] E2.10 GET/POST /api/v1/itmo
- [ ] E2.11 GET/POST /api/v1/itmo/authorizations
- [ ] E2.12 GET/POST /api/v1/itmo/transfers
- [ ] E2.13 GET /api/v1/compliance
- [ ] E2.14 GET /api/v1/public/projects (public endpoint, no auth)
- [ ] E2.15 GET /api/v1/public/credits/verify (public verification)

#### E3. Registry Business Logic [NOT STARTED]
- [ ] E3.1 Credit serial number generation algorithm
- [ ] E3.2 Credit issuance workflow (verify monitoring report → issue)
- [ ] E3.3 Credit transfer logic (balance validation, atomic transfer)
- [ ] E3.4 Credit retirement logic (permanent, irreversible)
- [ ] E3.5 ITMO authorization workflow (corresponding adjustments)
- [ ] E3.6 ITMO transfer to international registry
- [ ] E3.7 Project lifecycle state machine
- [ ] E3.8 Webhook emission on credit events

---

### STREAM F: SHARED PACKAGES
Owner: Platform Team | Priority: P0

#### F1. api-types Package [COMPLETE]
- [x] F1.1 Common types (User, Organization, Tenant)
- [x] F1.2 MRV types (Inventory, Emissions, ActivityData)
- [x] F1.3 NDC types (NDC, Target, Progress, Policy)
- [x] F1.4 Registry types (Project, Credit, Transaction)
- [x] F1.5 Event types (WebhookEvent, EventType)
- [x] F1.6 API response types (ApiResponse, PaginatedResponse)

#### F2. api-client Package [COMPLETE]
- [x] F2.1 Base client (auth, error handling, timeout)
- [x] F2.2 MRV client (inventory, emissions, sectors)
- [x] F2.3 NDC client (targets, progress, policies)
- [x] F2.4 Registry client (projects, credits, transactions)

#### F3. UI Package [COMPLETE]
- [x] F3.1 Button component (variants, sizes, loading)
- [x] F3.2 Form components (field, label, input, textarea, select)
- [x] F3.3 Table components (header, body, row, cell)
- [x] F3.4 Chart container component
- [x] F3.5 Card components (header, content, footer, stat card)
- [x] F3.6 Layout components (page layout, sidebar layout)

#### F4. Utils Package [COMPLETE]
- [x] F4.1 Date utilities
- [x] F4.2 Format utilities (emissions, currency, percentage)
- [x] F4.3 Validation utilities (country code, email, year)

---

### STREAM G: INTEGRATION & CROSS-SYSTEM
Owner: Platform Team | Priority: P2 (After individual services work)

#### G1. MRV → NDC Data Flow [NOT STARTED]
- [ ] G1.1 NDC calls MRV emissions API to get latest inventory data
- [ ] G1.2 NDC stores synced emissions as ProgressRecord
- [ ] G1.3 Automatic sync trigger when MRV inventory is approved
- [ ] G1.4 Data mapping: MRV sectors → NDC target sectors

#### G2. Registry → NDC Data Flow [NOT STARTED]
- [ ] G2.1 NDC calls Registry API to get credit offset data
- [ ] G2.2 Credits retired → count toward NDC target progress
- [ ] G2.3 ITMO transfers → corresponding adjustments in NDC tracking

#### G3. Unified Reporting (BTR) [NOT STARTED]
- [ ] G3.1 Portal aggregates BTR Chapter II (from MRV)
- [ ] G3.2 Portal aggregates BTR Chapter III (from NDC)
- [ ] G3.3 Portal aggregates BTR Chapter IV (from Registry/NDC)
- [ ] G3.4 Combined BTR document generation

#### G4. Cross-System Dashboard [NOT STARTED]
- [ ] G4.1 Emissions trend + NDC target pathway combined chart
- [ ] G4.2 Registry credit impact on emissions accounting
- [ ] G4.3 Policy effectiveness measured against MRV data

---

## MILESTONES

| Milestone | Target | Depends On | Status |
|-----------|--------|------------|--------|
| **M1: Apps Compile & Start** | - | A3 | NOT STARTED |
| **M2: Databases Created** | - | A4 | NOT STARTED |
| **M3: Portal Auth Working** | - | M1, M2, B2 | NOT STARTED |
| **M4: MRV Inventory CRUD** | - | M2, C2, C3 | NOT STARTED |
| **M5: NDC Targets CRUD** | - | M2, D2, D3 | NOT STARTED |
| **M6: Registry API v1** | - | M2, E2 | NOT STARTED |
| **M7: MRV Calculations Run** | - | M4, C6 | NOT STARTED |
| **M8: NDC Reads MRV Data** | - | M4, M5, G1 | NOT STARTED |
| **M9: Dashboard Shows Real Data** | - | M4, M5, M6, B4 | NOT STARTED |
| **M10: BTR Report Generation** | - | M7, M8, G3 | NOT STARTED |

---

## RISK REGISTER

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Prisma schema mismatch across services | HIGH | MEDIUM | Shared type validation |
| Auth bypass in production | CRITICAL | HIGH | Implement B2.5-B2.14 before deploy |
| Mock data left in API routes | MEDIUM | HIGH | Systematic replacement per stream |
| No test coverage | HIGH | CERTAIN | Add tests as part of each stream |
| Service-to-service auth missing | HIGH | CERTAIN | Implement API key validation (B2.14) |

---

## HOW TO USE THIS TRACKER

1. **Check current status:** Read this file to see what's done/pending
2. **Pick next work:** Follow milestone dependencies (M1 → M2 → M3...)
3. **Update after work:** Mark items [x] when completed
4. **Use the /nctp skill:** Invoke the Claude Code skill to get status, plan next steps, or update progress
