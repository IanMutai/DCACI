# System Architecture Diagrams

## National Climate Transparency Platform Architecture

---

## 1. High-Level Architecture

```mermaid
graph TB
    subgraph "User Layer"
        GOV[Government Officials]
        DEV[Project Developers]
        PUB[Public Users]
        INT[International Partners]
    end

    subgraph "Presentation Layer"
        DASH[Unified Dashboard]
        MRV_UI[MRV Interface]
        NDC_UI[NDC Tools Interface]
        REG_UI[Registry Interface]
        PUB_UI[Public Portal]
    end

    subgraph "API Gateway"
        GW[API Gateway]
        AUTH[Authentication]
        RATE[Rate Limiting]
    end

    subgraph "Service Layer"
        MRV_SVC[MRV Service]
        NDC_SVC[NDC Service]
        REG_SVC[Registry Service]
        INT_SVC[Integration Service]
        RPT_SVC[Reporting Service]
    end

    subgraph "Integration Layer"
        EVT[Event Bus]
        SYNC[Data Sync Engine]
        VAL[Validation Engine]
    end

    subgraph "Data Layer"
        MRV_DB[(MRV Database)]
        NDC_DB[(NDC Database)]
        REG_DB[(Registry Database)]
        REF_DB[(Reference Data)]
        DOC_DB[(Document Store)]
    end

    subgraph "External Systems"
        CAD[UNFCCC CAD]
        IPCC[IPCC EF Database]
        GIS[GIS Services]
    end

    GOV --> DASH
    DEV --> REG_UI
    PUB --> PUB_UI
    INT --> GW

    DASH --> GW
    MRV_UI --> GW
    NDC_UI --> GW
    REG_UI --> GW
    PUB_UI --> GW

    GW --> AUTH
    AUTH --> RATE
    RATE --> MRV_SVC
    RATE --> NDC_SVC
    RATE --> REG_SVC
    RATE --> INT_SVC
    RATE --> RPT_SVC

    MRV_SVC --> EVT
    NDC_SVC --> EVT
    REG_SVC --> EVT
    INT_SVC --> EVT

    EVT --> SYNC
    SYNC --> VAL

    MRV_SVC --> MRV_DB
    NDC_SVC --> NDC_DB
    REG_SVC --> REG_DB
    INT_SVC --> REF_DB
    RPT_SVC --> DOC_DB

    INT_SVC --> CAD
    MRV_SVC --> IPCC
    REG_SVC --> GIS
```

---

## 2. MRV System Architecture

```mermaid
graph TB
    subgraph "Data Collection"
        EN[Energy Data]
        IND[Industrial Data]
        AG[Agriculture Data]
        LU[Land Use Data]
        WS[Waste Data]
    end

    subgraph "MRV Processing"
        DC[Data Collector]
        CAL[Calculator Engine]
        TS[Time Series Manager]
        UNC[Uncertainty Module]
        QC[QA/QC Module]
    end

    subgraph "Output"
        INV[Inventory Database]
        NIR[NIR Generator]
        CRF[CRF Tables]
        DASH[Dashboard]
    end

    EN --> DC
    IND --> DC
    AG --> DC
    LU --> DC
    WS --> DC

    DC --> CAL
    CAL --> TS
    CAL --> UNC
    TS --> QC
    UNC --> QC

    QC --> INV
    INV --> NIR
    INV --> CRF
    INV --> DASH
```

### MRV Data Flow

```mermaid
sequenceDiagram
    participant DS as Data Source
    participant DC as Data Collector
    participant VAL as Validator
    participant CAL as Calculator
    participant DB as Database
    participant RPT as Report Generator

    DS->>DC: Submit Activity Data
    DC->>VAL: Validate Data
    VAL-->>DC: Validation Result

    alt Valid Data
        DC->>DB: Store Activity Data
        DC->>CAL: Trigger Calculation
        CAL->>DB: Get Emission Factors
        CAL->>CAL: Calculate Emissions
        CAL->>DB: Store Emissions
        DB->>RPT: Data Available
        RPT->>RPT: Generate Reports
    else Invalid Data
        DC-->>DS: Request Correction
    end
```

---

## 3. NDC Tools Architecture

```mermaid
graph TB
    subgraph "Input Sources"
        MRV[MRV Inventory]
        POL[Policy Database]
        ECO[Economic Data]
        TGT[Target Definitions]
    end

    subgraph "Analysis Engine"
        BL[Baseline Module]
        SC[Scenario Builder]
        PRG[Progress Calculator]
        MAC[MACC Generator]
    end

    subgraph "Tracking"
        IND[Indicator Manager]
        TRK[Progress Tracker]
        ALR[Alert System]
    end

    subgraph "Output"
        DASH[Progress Dashboard]
        RPT[Progress Reports]
        BTR[BTR Chapter 2]
    end

    MRV --> BL
    ECO --> BL
    TGT --> BL

    BL --> SC
    POL --> SC
    SC --> PRG
    SC --> MAC

    PRG --> IND
    PRG --> TRK
    TRK --> ALR

    IND --> DASH
    TRK --> RPT
    PRG --> BTR
```

### NDC Progress Calculation Flow

```mermaid
sequenceDiagram
    participant INV as MRV Inventory
    participant TGT as Target Definition
    participant CAL as Progress Calculator
    participant TRK as Tracker
    participant DASH as Dashboard
    participant ALR as Alert System

    INV->>CAL: Latest Emissions Data
    TGT->>CAL: Target Parameters
    CAL->>CAL: Calculate Progress
    CAL->>TRK: Update Progress
    TRK->>DASH: Refresh Display

    alt Off Track
        TRK->>ALR: Trigger Alert
        ALR->>ALR: Notify Stakeholders
    end
```

---

## 4. Carbon Registry Architecture

```mermaid
graph TB
    subgraph "Project Management"
        PCN[PCN Module]
        PDD[PDD Module]
        AUT[Authorization]
        IMP[Implementation]
        MON[Monitoring]
        ISS[Issuance]
    end

    subgraph "Credit Management"
        SER[Serialization]
        LED[Credit Ledger]
        TXN[Transaction Engine]
        RET[Retirement Module]
    end

    subgraph "Article 6"
        ITMO[ITMO Manager]
        CA[Corresponding Adj]
        CAD[CAD Sync]
        BIL[Bilateral Agreements]
    end

    subgraph "Public Interface"
        PUB[Public Portal]
        VER[Verification API]
        REG[Registry Browser]
    end

    PCN --> PDD
    PDD --> AUT
    AUT --> IMP
    IMP --> MON
    MON --> ISS

    ISS --> SER
    SER --> LED
    LED --> TXN
    TXN --> RET

    AUT --> ITMO
    ITMO --> CA
    CA --> CAD
    ITMO --> BIL

    LED --> PUB
    LED --> VER
    LED --> REG
```

### Credit Lifecycle Flow

```mermaid
sequenceDiagram
    participant PRJ as Project
    participant VVB as Verifier
    participant ISS as Issuance Module
    participant LED as Ledger
    participant BUY as Buyer
    participant RET as Retirement

    PRJ->>VVB: Submit Monitoring Report
    VVB->>VVB: Verify Reductions
    VVB->>ISS: Verification Report
    ISS->>ISS: Generate Serial Numbers
    ISS->>LED: Create Credits
    LED->>PRJ: Credits Issued

    BUY->>LED: Purchase Request
    LED->>LED: Transfer Credits
    LED->>BUY: Credits Received

    BUY->>RET: Retire Credits
    RET->>LED: Update Status
    LED->>LED: Mark Retired
```

---

## 5. Integration Architecture

```mermaid
graph TB
    subgraph "MRV System"
        MRV_DB[(Inventory DB)]
        MRV_PUB[Event Publisher]
        MRV_SUB[Event Subscriber]
    end

    subgraph "NDC Tools"
        NDC_DB[(NDC DB)]
        NDC_PUB[Event Publisher]
        NDC_SUB[Event Subscriber]
    end

    subgraph "Registry"
        REG_DB[(Registry DB)]
        REG_PUB[Event Publisher]
        REG_SUB[Event Subscriber]
    end

    subgraph "Event Bus"
        EB[Message Broker]
        Q1[MRV Events Queue]
        Q2[NDC Events Queue]
        Q3[Registry Events Queue]
    end

    subgraph "Integration Service"
        SYNC[Sync Engine]
        VAL[Validator]
        TRANS[Transformer]
    end

    MRV_PUB --> Q1
    NDC_PUB --> Q2
    REG_PUB --> Q3

    Q1 --> EB
    Q2 --> EB
    Q3 --> EB

    EB --> MRV_SUB
    EB --> NDC_SUB
    EB --> REG_SUB

    EB --> SYNC
    SYNC --> VAL
    VAL --> TRANS
    TRANS --> MRV_DB
    TRANS --> NDC_DB
    TRANS --> REG_DB
```

### Cross-System Event Flow

```mermaid
sequenceDiagram
    participant REG as Registry
    participant EB as Event Bus
    participant MRV as MRV System
    participant NDC as NDC Tools

    REG->>EB: credits.issued {project, quantity}
    EB->>MRV: Notify
    EB->>NDC: Notify

    MRV->>MRV: Update Inventory
    NDC->>NDC: Update Progress

    MRV->>EB: inventory.updated
    EB->>NDC: Notify
    NDC->>NDC: Recalculate Progress
```

---

## 6. BTR Generation Flow

```mermaid
graph TB
    subgraph "Data Sources"
        MRV_D[MRV Data]
        NDC_D[NDC Data]
        REG_D[Registry Data]
        ADP_D[Adaptation Data]
        FIN_D[Finance Data]
    end

    subgraph "BTR Generator"
        CH1[Chapter 1: NIR]
        CH2[Chapter 2: NDC Progress]
        CH3[Chapter 3: Adaptation]
        CH4[Chapter 4: Support]
        CH5[Chapter 5: Improvement]
    end

    subgraph "Quality Check"
        CONS[Consistency Check]
        COMP[Completeness Check]
        FMT[Format Validation]
    end

    subgraph "Output"
        BTR[BTR Document]
        CRF[CRF Tables]
        CTF[CTF Tables]
        SUP[Supporting Docs]
    end

    MRV_D --> CH1
    NDC_D --> CH2
    REG_D --> CH2
    ADP_D --> CH3
    FIN_D --> CH4

    CH1 --> CONS
    CH2 --> CONS
    CH3 --> CONS
    CH4 --> CONS
    CH5 --> CONS

    CONS --> COMP
    COMP --> FMT

    FMT --> BTR
    FMT --> CRF
    FMT --> CTF
    FMT --> SUP
```

---

## 7. Deployment Architecture

```mermaid
graph TB
    subgraph "Cloud Infrastructure"
        subgraph "Load Balancer"
            LB[Application Load Balancer]
        end

        subgraph "Compute Cluster"
            WEB1[Web Server 1]
            WEB2[Web Server 2]
            API1[API Server 1]
            API2[API Server 2]
        end

        subgraph "Data Tier"
            PG_P[(PostgreSQL Primary)]
            PG_R[(PostgreSQL Replica)]
            REDIS[(Redis Cache)]
            ES[(Elasticsearch)]
        end

        subgraph "Storage"
            S3[Object Storage]
            EFS[File Storage]
        end

        subgraph "External"
            CDN[CDN]
            WAF[Web Application Firewall]
        end
    end

    subgraph "Users"
        USR[Users]
    end

    USR --> CDN
    CDN --> WAF
    WAF --> LB

    LB --> WEB1
    LB --> WEB2
    WEB1 --> API1
    WEB2 --> API2

    API1 --> PG_P
    API2 --> PG_P
    PG_P --> PG_R

    API1 --> REDIS
    API2 --> REDIS

    API1 --> ES
    API2 --> ES

    API1 --> S3
    API2 --> S3
    WEB1 --> EFS
    WEB2 --> EFS
```

---

## 8. Security Architecture

```mermaid
graph TB
    subgraph "Perimeter"
        WAF[Web Application Firewall]
        DDoS[DDoS Protection]
    end

    subgraph "Access Control"
        IAM[Identity Management]
        RBAC[Role-Based Access]
        MFA[Multi-Factor Auth]
    end

    subgraph "Application Security"
        ENC_T[Encryption in Transit]
        ENC_R[Encryption at Rest]
        SEC_H[Security Headers]
    end

    subgraph "Data Protection"
        MASK[Data Masking]
        AUDIT[Audit Logging]
        BACKUP[Encrypted Backups]
    end

    subgraph "Monitoring"
        SIEM[Security Monitoring]
        IDS[Intrusion Detection]
        ALERT[Alert System]
    end

    WAF --> IAM
    DDoS --> IAM
    IAM --> RBAC
    RBAC --> MFA

    MFA --> ENC_T
    ENC_T --> ENC_R
    ENC_R --> SEC_H

    SEC_H --> MASK
    MASK --> AUDIT
    AUDIT --> BACKUP

    AUDIT --> SIEM
    SIEM --> IDS
    IDS --> ALERT
```

---

## Diagram Legend

| Symbol | Meaning |
|--------|---------|
| Rectangle | Component/Service |
| Cylinder | Database |
| Diamond | Decision Point |
| Arrow | Data/Control Flow |
| Dashed Line | Optional/Async |
| Subgraph | Logical Grouping |
