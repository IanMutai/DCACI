# Platform Overview

## National Climate Transparency Platform (NCTP)

### Executive Summary

The National Climate Transparency Platform (NCTP) represents a paradigm shift in how countries manage their climate commitments. By integrating three critical systems—MRV, NDC Tools, and Carbon Registry—into a unified platform, NCTP eliminates data silos, reduces reporting burden, and enables evidence-based climate policy.

---

## The Integration Imperative

### Current Challenges

Most countries operate disconnected systems for:
- **GHG inventory management** (often Excel-based)
- **NDC planning and tracking** (separate databases or documents)
- **Carbon project registration** (isolated registries or third-party platforms)

This fragmentation creates:
- Data inconsistencies between reports
- Duplicated effort in data collection
- Inability to track NDC progress against actual emissions
- Missed opportunities for carbon market revenue
- Compliance risks with ETF requirements

### The NCTP Solution

NCTP creates a **single source of truth** for national climate data:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SINGLE SOURCE OF TRUTH                              │
│                                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                     │
│  │   National  │    │    NDC      │    │   Carbon    │                     │
│  │     GHG     │◄──►│  Targets &  │◄──►│   Market    │                     │
│  │  Inventory  │    │   Policies  │    │  Activities │                     │
│  └─────────────┘    └─────────────┘    └─────────────┘                     │
│         │                  │                  │                             │
│         └──────────────────┼──────────────────┘                             │
│                            ▼                                                │
│              ┌─────────────────────────┐                                    │
│              │   Unified Data Layer    │                                    │
│              │   • Activity Data       │                                    │
│              │   • Emission Factors    │                                    │
│              │   • Project Records     │                                    │
│              │   • Transaction History │                                    │
│              └─────────────────────────┘                                    │
│                            │                                                │
│         ┌──────────────────┼──────────────────┐                            │
│         ▼                  ▼                  ▼                            │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                     │
│  │     BTR     │    │    NDC      │    │   Market    │                     │
│  │   Report    │    │  Dashboard  │    │   Reports   │                     │
│  └─────────────┘    └─────────────┘    └─────────────┘                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## System Components

### 1. MRV System

The MRV (Monitoring, Reporting, and Verification) system provides the foundational data infrastructure for climate transparency.

#### Core Capabilities

| Capability | Description |
|------------|-------------|
| **GHG Inventory Management** | Complete national inventory across all IPCC sectors (Energy, IPPU, Agriculture, LULUCF, Waste) |
| **Multi-Tier Methodology** | Support for Tier 1, 2, and 3 IPCC methodologies with automatic tier selection guidance |
| **Time Series Management** | Consistent historical data from base year through current period |
| **Uncertainty Analysis** | Automated uncertainty calculations using IPCC Approach 1 and 2 |
| **Key Category Analysis** | Identification and prioritization of significant emission sources |
| **QA/QC Workflows** | Built-in quality control checklists and quality assurance review processes |

#### Sector Coverage

```
ENERGY (1)
├── Fuel Combustion (1A)
│   ├── Energy Industries
│   ├── Manufacturing Industries
│   ├── Transport
│   └── Other Sectors
└── Fugitive Emissions (1B)
    ├── Solid Fuels
    └── Oil and Natural Gas

IPPU (2)
├── Mineral Industry
├── Chemical Industry
├── Metal Industry
└── Product Uses

AGRICULTURE (3)
├── Enteric Fermentation
├── Manure Management
├── Rice Cultivation
└── Agricultural Soils

LULUCF (4)
├── Forest Land
├── Cropland
├── Grassland
├── Wetlands
└── Settlements

WASTE (5)
├── Solid Waste Disposal
├── Biological Treatment
├── Incineration
└── Wastewater
```

#### Integration with Registry

When carbon projects generate verified emission reductions:
1. Project monitoring data flows into MRV activity data
2. Verified reductions are reflected in national totals
3. Article 6.2 transfers trigger corresponding adjustments
4. Inventory remains consistent with registry records

---

### 2. NDC Tools

The NDC Tools component provides comprehensive support for the full NDC lifecycle.

#### NDC Lifecycle Support

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│PLANNING │───►│FORMULATE│───►│IMPLEMENT│───►│ TRACK   │───►│ UPDATE  │
└─────────┘    └─────────┘    └─────────┘    └─────────┘    └─────────┘
     │              │              │              │              │
     ▼              ▼              ▼              ▼              ▼
  Baseline      Targets &      Policies &    Indicators &   Revised
  Analysis      Scenarios      Investments   Progress       Targets
```

#### Tool Categories

| Category | Tools | Purpose |
|----------|-------|---------|
| **Baseline** | GHG Inventory, IPCC Software | Establish reference emissions |
| **Modeling** | LEAP, TIMES, OSeMOSYS | Scenario analysis and projections |
| **Target Setting** | Ambition tools, equity frameworks | Define appropriate targets |
| **Policy Analysis** | MACC, co-benefits tools | Design effective policies |
| **Costing** | Investment models, CPEIR | Estimate resource needs |
| **Tracking** | Indicator systems, dashboards | Monitor implementation |

#### Integration with Registry

The NDC Tools connect to the Registry to:
- Validate project eligibility against sectoral targets
- Track carbon credit contributions to NDC achievement
- Monitor ITMO transfers against carbon budget
- Assess policy effectiveness using market data

---

### 3. Carbon Registry

The Carbon Registry manages the full lifecycle of carbon projects and credits.

#### Project Lifecycle

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        PROJECT LIFECYCLE                                │
├─────────┬─────────┬─────────┬─────────┬─────────┬─────────┬────────────┤
│   PCN   │   PDD   │  AUTH   │  IMPL   │MONITOR  │ ISSUE   │  TRADE     │
│         │         │         │         │         │         │            │
│ Concept │ Design  │Approval │ Start   │ Verify  │ Credits │ Transfer   │
│  Note   │Document │         │         │         │         │            │
└─────────┴─────────┴─────────┴─────────┴─────────┴─────────┴────────────┘
     │         │         │         │         │         │         │
     ▼         ▼         ▼         ▼         ▼         ▼         ▼
  Letter    Letter   Letter    Commence  Report   Credits   Trans-
    of        of      of        Notice   Submit   Issued   action
  No Obj   Approval  Auth                                  Record
```

#### Key Features

**Project Management**
- Multi-stage workflow with regulatory compliance
- Document management and versioning
- Stakeholder notifications and approvals
- Community Development Agreement tracking

**Credit Operations**
- Credit issuance based on verified reductions
- Serial number assignment and tracking
- Transfer and retirement processing
- Public verification portal

**Article 6.2 Support**
- ITMO tracking and management
- Corresponding adjustments automation
- CAD (Centralized Accounting Database) synchronization
- Bilateral agreement management
- Carbon budget compliance checking

#### Integration with MRV

Registry data feeds back to MRV for:
- Activity data from monitoring reports
- Emission factors from project validations
- Verified reductions for inventory adjustments
- Corresponding adjustments for ITMO transfers

---

## Cross-System Workflows

### Workflow 1: BTR Preparation

The Biennial Transparency Report draws from all three systems:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      BTR PREPARATION WORKFLOW                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  MRV SYSTEM                 NDC TOOLS              CARBON REGISTRY      │
│  ──────────                 ─────────              ───────────────      │
│                                                                         │
│  GHG Inventory ────────────────────────────────► Chapter 1: NIR         │
│                                                                         │
│                    NDC Progress ───────────────► Chapter 2: Progress    │
│                    Tracking                                             │
│                                                                         │
│                                   ITMO Records ► Chapter 2: Art 6.2     │
│                                                                         │
│  Adaptation Data ──────────────────────────────► Chapter 3: Adaptation  │
│                                                                         │
│                    Finance Tracking ───────────► Chapter 4: Support     │
│                                                                         │
│                                                                         │
│                            ▼                                            │
│              ┌─────────────────────────────┐                            │
│              │   BIENNIAL TRANSPARENCY     │                            │
│              │         REPORT              │                            │
│              └─────────────────────────────┘                            │
└─────────────────────────────────────────────────────────────────────────┘
```

### Workflow 2: Project Authorization

Article 6.2 authorization requires multi-system coordination:

```
1. PROJECT APPLICATION
   └─► Registry: Project details submitted

2. ELIGIBILITY CHECK
   └─► NDC Tools: Verify alignment with sectoral targets
   └─► MRV: Confirm additionality against baseline

3. CARBON BUDGET CHECK
   └─► NDC Tools: Calculate available headroom
   └─► Registry: Apply corresponding adjustment preview

4. AUTHORIZATION DECISION
   └─► Registry: Issue authorization letter
   └─► NDC Tools: Update committed volumes

5. IMPLEMENTATION
   └─► Registry: Track project milestones
   └─► MRV: Receive monitoring data

6. ITMO ISSUANCE
   └─► Registry: Generate ITMOs
   └─► MRV: Apply corresponding adjustment
   └─► NDC Tools: Update NDC progress tracking
```

### Workflow 3: Annual Reporting Cycle

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    ANNUAL REPORTING CYCLE                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Q1: DATA COLLECTION                                                    │
│  ─────────────────────                                                  │
│  • Energy balance data → MRV                                            │
│  • Industrial surveys → MRV                                             │
│  • Project monitoring reports → Registry                                │
│  • Policy implementation status → NDC Tools                             │
│                                                                         │
│  Q2: COMPILATION & ANALYSIS                                             │
│  ─────────────────────────────                                          │
│  • GHG inventory calculations → MRV                                     │
│  • Trend analysis → MRV                                                 │
│  • Target progress assessment → NDC Tools                               │
│  • Credit issuance processing → Registry                                │
│                                                                         │
│  Q3: QUALITY ASSURANCE                                                  │
│  ────────────────────────                                               │
│  • QA/QC procedures → MRV                                               │
│  • Cross-system validation → All                                        │
│  • Uncertainty update → MRV                                             │
│  • Verification review → Registry                                       │
│                                                                         │
│  Q4: REPORTING & IMPROVEMENT                                            │
│  ────────────────────────────                                           │
│  • Annual report generation → All                                       │
│  • BTR chapter updates → All (biennial)                                 │
│  • Improvement plan update → MRV                                        │
│  • System enhancements → All                                            │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Technology Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        FRONTEND LAYER                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                     │
│  │   MRV       │  │  NDC Tools  │  │  Registry   │                     │
│  │  Dashboard  │  │  Dashboard  │  │  Dashboard  │                     │
│  └─────────────┘  └─────────────┘  └─────────────┘                     │
│                         │                                               │
├─────────────────────────┼───────────────────────────────────────────────┤
│                    API GATEWAY                                          │
├─────────────────────────┼───────────────────────────────────────────────┤
│                         │                                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                     │
│  │    MRV      │  │  NDC Tools  │  │  Registry   │                     │
│  │   Service   │  │   Service   │  │   Service   │                     │
│  └─────────────┘  └─────────────┘  └─────────────┘                     │
│         │                │                │                             │
├─────────┼────────────────┼────────────────┼─────────────────────────────┤
│                    INTEGRATION LAYER                                    │
│              ┌─────────────────────────┐                                │
│              │   Event Bus / Message   │                                │
│              │        Queue            │                                │
│              └─────────────────────────┘                                │
├─────────────────────────────────────────────────────────────────────────┤
│                     DATA LAYER                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                     │
│  │  Inventory  │  │    NDC      │  │   Project   │                     │
│  │     DB      │  │     DB      │  │     DB      │                     │
│  └─────────────┘  └─────────────┘  └─────────────┘                     │
│                         │                                               │
│              ┌─────────────────────────┐                                │
│              │   Shared Reference DB   │                                │
│              │  (EFs, Categories, etc) │                                │
│              └─────────────────────────┘                                │
└─────────────────────────────────────────────────────────────────────────┘
```

### Technology Stack

| Component | Technology |
|-----------|------------|
| Frontend | Next.js 16, React 19, Tailwind CSS |
| API Layer | REST + GraphQL |
| Backend Services | Node.js / Python |
| Databases | PostgreSQL, TimescaleDB |
| Message Queue | Redis / RabbitMQ |
| Search | Elasticsearch |
| Authentication | OAuth 2.0 / OIDC |
| Hosting | Cloud-native (AWS/Azure/GCP) |

---

## Security & Compliance

### Data Security
- End-to-end encryption for data in transit and at rest
- Role-based access control (RBAC)
- Audit logging for all data modifications
- Regular security assessments and penetration testing

### Regulatory Compliance
- GDPR-compliant data handling
- National data sovereignty support
- UNFCCC reporting format compliance
- ISO 27001 alignment

---

## Deployment Options

### Cloud Deployment
- Fully managed SaaS option
- Multi-tenant architecture
- Automatic updates and maintenance

### On-Premise Deployment
- Self-hosted option for data sovereignty
- Container-based deployment (Docker/Kubernetes)
- Full control over infrastructure

### Hybrid Deployment
- Sensitive data on-premise
- Processing and analytics in cloud
- Best of both worlds

---

## Support & Maintenance

### Technical Support
- 24/7 critical issue support
- Regular system health monitoring
- Proactive issue identification

### Continuous Improvement
- Regular feature updates
- IPCC guideline updates
- User feedback integration

### Training & Capacity Building
- Online training modules
- In-person workshops
- Documentation and guides
