# Integration Specification

## Technical Integration Between MRV, NDC Tools, and Carbon Registry

---

## 1. Data Model Integration

### 1.1 Shared Entity Model

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        SHARED ENTITY MODEL                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ORGANIZATION                                                           │
│  ├── id: UUID                                                           │
│  ├── name: string                                                       │
│  ├── type: enum [GOVERNMENT, PRIVATE, NGO, INTERNATIONAL]               │
│  └── contacts: Contact[]                                                │
│                                                                         │
│  SECTOR                                                                 │
│  ├── id: string (IPCC code)                                             │
│  ├── name: string                                                       │
│  ├── parent_id: string                                                  │
│  └── level: number                                                      │
│                                                                         │
│  LOCATION                                                               │
│  ├── id: UUID                                                           │
│  ├── name: string                                                       │
│  ├── type: enum [COUNTRY, REGION, DISTRICT, SITE]                       │
│  ├── coordinates: GeoJSON                                               │
│  └── parent_id: UUID                                                    │
│                                                                         │
│  EMISSION_FACTOR                                                        │
│  ├── id: UUID                                                           │
│  ├── source: enum [IPCC_DEFAULT, COUNTRY_SPECIFIC, PROJECT_SPECIFIC]    │
│  ├── value: decimal                                                     │
│  ├── unit: string                                                       │
│  ├── uncertainty: decimal                                               │
│  ├── sector_id: string                                                  │
│  └── valid_period: DateRange                                            │
│                                                                         │
│  GHG_TYPE                                                               │
│  ├── id: string (CO2, CH4, N2O, HFCs, PFCs, SF6, NF3)                   │
│  ├── name: string                                                       │
│  └── gwp_ar5: decimal                                                   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 1.2 MRV System Data Model

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        MRV DATA MODEL                                   │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  INVENTORY                                                              │
│  ├── id: UUID                                                           │
│  ├── year: number                                                       │
│  ├── status: enum [DRAFT, SUBMITTED, REVIEWED, PUBLISHED]               │
│  ├── submission_date: datetime                                          │
│  └── sectors: InventorySector[]                                         │
│                                                                         │
│  INVENTORY_SECTOR                                                       │
│  ├── id: UUID                                                           │
│  ├── inventory_id: UUID                                                 │
│  ├── sector_id: string                                                  │
│  ├── methodology_tier: number (1, 2, 3)                                 │
│  └── categories: InventoryCategory[]                                    │
│                                                                         │
│  INVENTORY_CATEGORY                                                     │
│  ├── id: UUID                                                           │
│  ├── sector_id: UUID                                                    │
│  ├── category_code: string                                              │
│  ├── activity_data: ActivityData[]                                      │
│  ├── emission_factors: EmissionFactor[]                                 │
│  └── emissions: Emission[]                                              │
│                                                                         │
│  ACTIVITY_DATA                                                          │
│  ├── id: UUID                                                           │
│  ├── category_id: UUID                                                  │
│  ├── source: string                                                     │
│  ├── value: decimal                                                     │
│  ├── unit: string                                                       │
│  ├── uncertainty: decimal                                               │
│  └── documentation: string                                              │
│                                                                         │
│  EMISSION                                                               │
│  ├── id: UUID                                                           │
│  ├── category_id: UUID                                                  │
│  ├── ghg_type: string                                                   │
│  ├── value: decimal (Gg)                                                │
│  ├── co2_equivalent: decimal                                            │
│  └── uncertainty: decimal                                               │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 1.3 NDC Tools Data Model

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      NDC TOOLS DATA MODEL                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  NDC                                                                    │
│  ├── id: UUID                                                           │
│  ├── version: string (1.0, 2.0, 3.0)                                    │
│  ├── submission_date: date                                              │
│  ├── target_year: number                                                │
│  └── targets: NDCTarget[]                                               │
│                                                                         │
│  NDC_TARGET                                                             │
│  ├── id: UUID                                                           │
│  ├── ndc_id: UUID                                                       │
│  ├── type: enum [ABSOLUTE, BAU, INTENSITY, PEAKING, NET_ZERO]           │
│  ├── sector_id: string (null for economy-wide)                          │
│  ├── base_year: number                                                  │
│  ├── base_value: decimal                                                │
│  ├── target_value: decimal                                              │
│  ├── target_year: number                                                │
│  ├── conditional: boolean                                               │
│  └── progress: TargetProgress[]                                         │
│                                                                         │
│  TARGET_PROGRESS                                                        │
│  ├── id: UUID                                                           │
│  ├── target_id: UUID                                                    │
│  ├── year: number                                                       │
│  ├── actual_value: decimal                                              │
│  ├── projected_value: decimal                                           │
│  └── status: enum [ON_TRACK, AT_RISK, OFF_TRACK]                        │
│                                                                         │
│  POLICY_MEASURE                                                         │
│  ├── id: UUID                                                           │
│  ├── name: string                                                       │
│  ├── type: enum [REGULATORY, ECONOMIC, INFORMATION, VOLUNTARY]          │
│  ├── sector_id: string                                                  │
│  ├── target_id: UUID                                                    │
│  ├── expected_reduction: decimal                                        │
│  ├── status: enum [PLANNED, ADOPTED, IMPLEMENTED]                       │
│  └── implementation_progress: decimal                                   │
│                                                                         │
│  SCENARIO                                                               │
│  ├── id: UUID                                                           │
│  ├── name: string                                                       │
│  ├── type: enum [BASELINE, NDC, ENHANCED, SENSITIVITY]                  │
│  ├── assumptions: JSON                                                  │
│  └── projections: ScenarioProjection[]                                  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 1.4 Carbon Registry Data Model

```
┌─────────────────────────────────────────────────────────────────────────┐
│                   CARBON REGISTRY DATA MODEL                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  PROJECT                                                                │
│  ├── id: UUID                                                           │
│  ├── registration_number: string                                        │
│  ├── name: string                                                       │
│  ├── proponent_id: UUID (Organization)                                  │
│  ├── sector_id: string                                                  │
│  ├── location_id: UUID                                                  │
│  ├── methodology: string                                                │
│  ├── crediting_period_start: date                                       │
│  ├── crediting_period_end: date                                         │
│  ├── expected_reductions: decimal                                       │
│  ├── market_type: enum [VCM, ARTICLE_6]                                 │
│  └── lifecycle_stage: ProjectStage                                      │
│                                                                         │
│  PROJECT_STAGE (enum)                                                   │
│  ├── PCN_SUBMITTED                                                      │
│  ├── PCN_APPROVED                                                       │
│  ├── PDD_SUBMITTED                                                      │
│  ├── PDD_APPROVED                                                       │
│  ├── AUTHORIZATION_REQUESTED                                            │
│  ├── AUTHORIZED                                                         │
│  ├── IMPLEMENTATION                                                     │
│  ├── MONITORING                                                         │
│  ├── ISSUANCE                                                           │
│  └── COMPLETED                                                          │
│                                                                         │
│  CREDIT                                                                 │
│  ├── id: UUID                                                           │
│  ├── serial_number: string                                              │
│  ├── project_id: UUID                                                   │
│  ├── vintage_year: number                                               │
│  ├── quantity: decimal (tCO2eq)                                         │
│  ├── status: enum [ACTIVE, RETIRED, CANCELLED, TRANSFERRED]             │
│  ├── issuance_date: date                                                │
│  └── verification_report_id: UUID                                       │
│                                                                         │
│  ITMO                                                                   │
│  ├── id: UUID                                                           │
│  ├── credit_id: UUID                                                    │
│  ├── authorization_id: UUID                                             │
│  ├── acquiring_country: string (ISO)                                    │
│  ├── transfer_date: date                                                │
│  ├── corresponding_adjustment: decimal                                  │
│  └── cad_reference: string                                              │
│                                                                         │
│  TRANSACTION                                                            │
│  ├── id: UUID                                                           │
│  ├── type: enum [ISSUANCE, TRANSFER, RETIREMENT, CANCELLATION]          │
│  ├── credit_ids: UUID[]                                                 │
│  ├── from_account_id: UUID                                              │
│  ├── to_account_id: UUID                                                │
│  ├── quantity: decimal                                                  │
│  ├── price_per_unit: decimal                                            │
│  ├── transaction_date: datetime                                         │
│  └── status: enum [PENDING, COMPLETED, FAILED]                          │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. API Integration

### 2.1 API Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        API ARCHITECTURE                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│                     ┌─────────────────────┐                             │
│                     │    API Gateway      │                             │
│                     │    (Authentication, │                             │
│                     │     Rate Limiting)  │                             │
│                     └──────────┬──────────┘                             │
│                                │                                        │
│         ┌──────────────────────┼──────────────────────┐                │
│         │                      │                      │                │
│         ▼                      ▼                      ▼                │
│  ┌─────────────┐       ┌─────────────┐       ┌─────────────┐          │
│  │  /api/mrv   │       │ /api/ndc    │       │/api/registry│          │
│  │             │       │             │       │             │          │
│  │ /inventory  │       │ /targets    │       │ /projects   │          │
│  │ /emissions  │       │ /policies   │       │ /credits    │          │
│  │ /sectors    │       │ /scenarios  │       │ /itmos      │          │
│  │ /qaqc       │       │ /progress   │       │/transactions│          │
│  └─────────────┘       └─────────────┘       └─────────────┘          │
│         │                      │                      │                │
│         └──────────────────────┼──────────────────────┘                │
│                                │                                        │
│                     ┌──────────┴──────────┐                            │
│                     │   Integration API   │                            │
│                     │   /api/integration  │                            │
│                     │                     │                            │
│                     │ /sync               │                            │
│                     │ /validate           │                            │
│                     │ /reports            │                            │
│                     └─────────────────────┘                            │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Key Integration Endpoints

#### Cross-System Validation

```yaml
POST /api/integration/validate/project-eligibility
Description: Validate project against NDC targets and MRV baseline
Request:
  project_id: UUID
  sector_id: string
  expected_reductions: decimal
Response:
  eligible: boolean
  ndc_alignment:
    target_id: UUID
    headroom_available: decimal
    contribution_percentage: decimal
  mrv_baseline:
    baseline_emissions: decimal
    additionality_confirmed: boolean
  issues: string[]
```

```yaml
POST /api/integration/sync/inventory-from-registry
Description: Sync verified project reductions to MRV inventory
Request:
  inventory_year: number
  project_ids: UUID[]
Response:
  synced_projects: number
  total_reductions: decimal
  inventory_adjustments:
    - category_id: string
      adjustment: decimal
      source_project: UUID
```

```yaml
POST /api/integration/reports/btr
Description: Generate BTR data package from all systems
Request:
  reporting_period_start: date
  reporting_period_end: date
  chapters: string[]
Response:
  chapter_1_nir:
    emissions_data: EmissionSummary[]
    methodology_notes: string
  chapter_2_progress:
    ndc_tracking: NDCProgress
    itmo_summary: ITMOSummary
  export_formats: [CRF, CTF, PDF]
```

### 2.3 Event-Driven Integration

```yaml
Events Published by MRV System:
  - inventory.published
    payload: { inventory_id, year, total_emissions }
  - emission_factor.updated
    payload: { factor_id, old_value, new_value }
  - qaqc.completed
    payload: { inventory_id, status, issues_found }

Events Published by NDC Tools:
  - target.updated
    payload: { target_id, old_value, new_value }
  - policy.status_changed
    payload: { policy_id, old_status, new_status }
  - progress.calculated
    payload: { target_id, year, progress_percentage }

Events Published by Registry:
  - project.stage_changed
    payload: { project_id, old_stage, new_stage }
  - credits.issued
    payload: { project_id, quantity, serial_numbers }
  - itmo.transferred
    payload: { itmo_id, from_country, to_country, quantity }
  - corresponding_adjustment.applied
    payload: { inventory_year, adjustment_amount, itmo_ids }

Event Subscriptions:
  MRV System subscribes to:
    - credits.issued (update verified reductions)
    - itmo.transferred (apply corresponding adjustment)

  NDC Tools subscribes to:
    - inventory.published (update progress tracking)
    - credits.issued (track market contributions)
    - project.stage_changed (monitor implementation)

  Registry subscribes to:
    - inventory.published (validate project baselines)
    - target.updated (re-check project eligibility)
```

---

## 3. Data Flow Specifications

### 3.1 Project Registration to Inventory

```
┌─────────────────────────────────────────────────────────────────────────┐
│            PROJECT REGISTRATION TO INVENTORY FLOW                       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  REGISTRY                          MRV                  NDC TOOLS       │
│  ────────                          ───                  ─────────       │
│                                                                         │
│  1. Project Created                                                     │
│        │                                                                │
│        ├───── Validate Against ─────► Check Sector Targets              │
│        │      NDC Targets                    │                          │
│        │                                     │                          │
│        ◄─────── Eligibility ────────────────┘                          │
│        │        Confirmed                                               │
│        │                                                                │
│  2. Authorization Granted                                               │
│        │                                                                │
│        ├───── Request Baseline ────► Provide Baseline                   │
│        │      Emissions               Emissions Data                    │
│        │                                     │                          │
│        ◄────── Baseline Data ───────────────┘                          │
│        │                                                                │
│  3. Credits Issued                                                      │
│        │                                                                │
│        ├───── Verified Reductions ──► Update Inventory ──► Update       │
│        │                              with Reductions      Progress     │
│        │                                                   Tracking     │
│        │                                                                │
│  4. ITMO Transfer (Article 6.2)                                         │
│        │                                                                │
│        ├───── Trigger CA ───────────► Apply Corresponding               │
│        │                              Adjustment                        │
│        │                                     │                          │
│        │                                     ├────────────► Update NDC  │
│        │                                     │              Progress    │
│        │                                     │                          │
│        ├───── CAD Sync ──────────────────────┘                         │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Annual Reporting Data Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                   ANNUAL REPORTING DATA FLOW                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  DATA SOURCES              PROCESSING              OUTPUTS              │
│  ────────────              ──────────              ───────              │
│                                                                         │
│  Energy Statistics ───┐                                                 │
│                       │                                                 │
│  Industrial Data ─────┼───► MRV Processing ────┐                        │
│                       │     (IPCC Methods)     │                        │
│  Agricultural Data ───┤                        │                        │
│                       │                        │                        │
│  Land Use Data ───────┤                        ├───► National           │
│                       │                        │     Inventory          │
│  Waste Statistics ────┘                        │     Report             │
│                                                │                        │
│  Project Monitoring ──┐                        │                        │
│  Reports              │                        │                        │
│                       ├───► Registry ──────────┤                        │
│  Verification         │     Processing         │                        │
│  Reports ─────────────┘                        │                        │
│                                                │                        │
│  Policy Status ───────┐                        ├───► BTR                │
│                       │                        │     Chapter 2          │
│  Implementation       ├───► NDC Tools ─────────┤                        │
│  Reports ─────────────┤     Processing         │                        │
│                       │                        │                        │
│  Finance Data ────────┘                        ├───► BTR                │
│                                                │     Chapter 4          │
│  ITMO Transfers ──────────────────────────────┤                        │
│                                                │                        │
│                                                └───► Dashboards         │
│                                                      & Reports          │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Authentication & Authorization

### 4.1 Role-Based Access Control

```yaml
Roles:
  SYSTEM_ADMIN:
    description: Full system access
    permissions: [ALL]

  MRV_COORDINATOR:
    description: National inventory coordinator
    permissions:
      - mrv.inventory.*
      - mrv.qaqc.*
      - ndc.progress.read
      - registry.projects.read

  SECTOR_LEAD:
    description: Sector-specific inventory compiler
    permissions:
      - mrv.inventory.sector.{sector_id}.*
      - mrv.activity_data.{sector_id}.*

  NDC_ANALYST:
    description: NDC planning and tracking
    permissions:
      - ndc.*
      - mrv.inventory.read
      - registry.projects.read

  REGISTRY_ADMIN:
    description: Carbon registry administrator
    permissions:
      - registry.*
      - mrv.emission_factors.read
      - ndc.targets.read

  PROJECT_DEVELOPER:
    description: Project proponent
    permissions:
      - registry.projects.own.*
      - registry.credits.own.read
      - registry.transactions.own.*

  VERIFIER:
    description: Third-party verifier
    permissions:
      - registry.projects.assigned.read
      - registry.verification.*

  PUBLIC:
    description: Public access
    permissions:
      - public.*
```

### 4.2 Cross-System Authorization

```yaml
Integration Permissions:
  mrv_to_ndc:
    - Inventory data feeds NDC progress tracking
    - Triggered automatically on inventory publication
    - No additional authorization required

  ndc_to_registry:
    - Target data used for eligibility checks
    - Requires REGISTRY_ADMIN or PROJECT_DEVELOPER role
    - Audit logged for accountability

  registry_to_mrv:
    - Verified reductions update inventory
    - Requires MRV_COORDINATOR approval
    - Corresponding adjustments auto-applied for ITMOs

  cross_system_reporting:
    - BTR generation requires MRV_COORDINATOR role
    - Pulls from all systems with read access
    - Export permissions checked per report type
```

---

## 5. Error Handling & Data Validation

### 5.1 Validation Rules

```yaml
MRV Validation:
  - Emissions must be non-negative
  - Activity data sources must be documented
  - Time series must be complete from base year
  - Uncertainty bounds must be within IPCC ranges
  - Recalculations must be explained

NDC Validation:
  - Target year must be after base year
  - Progress values must align with inventory data
  - Conditional targets must specify conditions
  - Policy measures must link to targets

Registry Validation:
  - Project sector must match methodology
  - Crediting period must not exceed maximum
  - Credit quantity must match verification report
  - ITMO transfers must not exceed authorization
  - Corresponding adjustments must balance

Cross-System Validation:
  - Project emissions must be within sector baseline
  - Issued credits must not exceed NDC headroom
  - Sum of adjustments must equal ITMO transfers
  - Registry totals must reconcile with inventory
```

### 5.2 Error Response Format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Project emissions exceed sector baseline",
    "details": {
      "field": "expected_reductions",
      "constraint": "must_not_exceed_baseline",
      "actual_value": 150000,
      "maximum_value": 120000,
      "source_system": "mrv",
      "reference_data": {
        "sector_id": "1A1",
        "baseline_year": 2020,
        "baseline_emissions": 120000
      }
    },
    "suggestions": [
      "Review project boundary definition",
      "Verify baseline calculation methodology",
      "Contact MRV team for baseline clarification"
    ]
  }
}
```

---

## 6. Performance Requirements

### 6.1 System Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| API Response Time (P95) | < 500ms | 95th percentile latency |
| Inventory Calculation | < 30s | Full national inventory |
| Report Generation | < 5min | Complete BTR package |
| Data Sync Latency | < 1min | Cross-system updates |
| System Uptime | 99.9% | Monthly availability |
| Concurrent Users | 500+ | Simultaneous active users |

### 6.2 Data Volume Estimates

| Data Type | Volume | Growth Rate |
|-----------|--------|-------------|
| Annual Inventory Records | ~10,000 per year | Linear |
| Project Records | ~1,000 total | 20% annual |
| Credit Records | ~1M per year | Variable |
| Transaction Records | ~50,000 per year | Growing |
| Document Storage | ~100GB | 50% annual |
