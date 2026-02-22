# Carbon Registry Skill

## Overview

This skill enables Claude to assist users with the Carbon Registry component of the National Climate Transparency Platform, managing carbon projects, credits, and Article 6.2 ITMOs.

## Capabilities

### Project Lifecycle Management
- Project Concept Note (PCN) submission and review
- Project Design Document (PDD) development
- Authorization processing (Article 6.2)
- Implementation tracking
- Monitoring and verification
- Credit issuance

### Credit Operations
- Credit issuance and serialization
- Transfer processing
- Retirement management
- Cancellation handling
- Public verification

### Article 6.2 Operations
- ITMO authorization
- Corresponding adjustment calculation
- CAD synchronization
- Bilateral agreement tracking
- Carbon budget management

### Compliance and Reporting
- Community Development Agreement tracking
- Annual compliance monitoring
- Transaction reporting
- Public disclosure

## Project Lifecycle Stages

### Stage 1: PCN (Project Concept Note)
```
Purpose: Initial project proposal and eligibility screening

Requirements:
- Project description
- Proponent information
- Location and boundaries
- Expected emission reductions
- SDG contributions
- Preliminary additionality

Outputs:
- Letter of No Objection (upon approval)
- Feedback on project viability

Timeline: 15-30 business days review
```

### Stage 2: PDD (Project Design Document)
```
Purpose: Detailed project design and methodology

Requirements:
- Complete project description
- Baseline scenario and methodology
- Monitoring plan
- Stakeholder consultation record
- Environmental impact assessment
- Community Development Agreement

Outputs:
- Letter of Approval (upon approval)
- Conditions for registration

Timeline: 30-60 business days review
```

### Stage 3: Authorization (Article 6.2)
```
Purpose: Government authorization for international transfer

Requirements:
- Validated PDD
- Buyer country information
- Transfer volumes requested
- Corresponding adjustment acceptance
- Carbon budget availability check
- Bilateral agreement reference

Outputs:
- Letter of Authorization
- ITMO allocation approval

Timeline: 14-30 business days (per regulations)
```

### Stage 4: Implementation
```
Purpose: Project construction and commencement

Requirements:
- Commencement declaration
- Construction progress reports
- Milestone tracking
- 12-month deadline compliance

Outputs:
- Project status updates
- Implementation confirmation

Timeline: Within 12 months of approval
```

### Stage 5: Monitoring
```
Purpose: Ongoing measurement and reporting

Requirements:
- Monitoring reports (annual/periodic)
- Data collection records
- QA/QC documentation
- Third-party verification

Outputs:
- Verified emission reductions
- Annual compliance confirmation

Timeline: Ongoing per monitoring plan
```

### Stage 6: Issuance
```
Purpose: Credit generation and registration

Requirements:
- Verified monitoring report
- Verification statement
- Issuance request
- Fee payment

Outputs:
- Serialized credits
- Registry records
- Public listing

Timeline: 10-20 business days
```

## Credit Serial Number Format

```
Format: [COUNTRY]-[YEAR]-[MARKET]-[PROJECT]-[SERIAL]

Example: KEN-2025-A6-00123-000001

Components:
- KEN: Country code (ISO 3166-1)
- 2025: Vintage year
- A6: Market type (A6 = Article 6, VCM = Voluntary)
- 00123: Project registration number
- 000001: Sequential serial within project-year
```

## ITMO Management

### Authorization Request
```
Required Information:
- Project ID and name
- Authorized quantity (tCO2eq)
- Acquiring country
- First transfer date
- Corresponding adjustment timing
- Bilateral agreement reference

Validation Checks:
□ Project is authorized for Article 6
□ Quantity within approved limit
□ Carbon budget available
□ Bilateral agreement active
□ CA timing acceptable
```

### Corresponding Adjustment Calculation
```
For Host Country (Seller):
CA = +[Transferred ITMOs]
(Added to reported emissions)

For Acquiring Country (Buyer):
CA = -[Acquired ITMOs]
(Subtracted from reported emissions)

Timing Options:
- Authorization: At point of authorization
- Issuance: When credits are issued
- First Transfer: When ITMOs leave registry
```

### CAD Synchronization
```
Sync Events:
- New authorization → Report to CAD
- ITMO issuance → Update CAD records
- Transfer → Notify both parties' CAD
- Cancellation → Update CAD

Data Elements:
- Authorization ID
- ITMO serial numbers
- Quantity and vintage
- Parties involved
- CA amounts
```

## Response Templates

### Project Status Query
```
Project: [Name]
Registration Number: [Number]
Proponent: [Organization]

Current Stage: [Stage Name]
  Status: [In Progress / Awaiting Review / Approved]
  Date Entered: [Date]
  Expected Completion: [Date]

Project Details:
- Sector: [IPCC Sector]
- Methodology: [Methodology ID]
- Location: [County/Region]
- Market Type: [VCM / Article 6]

Emission Reductions:
- Expected Annual: [X] tCO2eq
- Crediting Period: [Start] to [End]
- Total Expected: [X] tCO2eq

Credits Issued to Date: [X] tCO2eq
Credits Transferred: [X] tCO2eq
Credits Available: [X] tCO2eq

Next Steps:
1. [Action item]
2. [Action item]

Documents Required:
- [Document 1]: [Status]
- [Document 2]: [Status]
```

### Credit Listing
```
Credit Batch: [Serial Range]
Project: [Project Name]
Vintage Year: [Year]

Details:
- Quantity: [X] tCO2eq
- Market Type: [VCM / Article 6]
- Methodology: [Name]
- Verification Body: [Name]
- Issuance Date: [Date]

Status: [Active / Retired / Transferred / Cancelled]

SDG Contributions:
- SDG [X]: [Description]
- SDG [Y]: [Description]

Verification:
- Report ID: [ID]
- Verification Date: [Date]
- Verifier: [Organization]
```

### Transaction Record
```
Transaction ID: [ID]
Type: [Issuance / Transfer / Retirement / Cancellation]
Date: [Date and Time]

Credits:
- Serial Numbers: [Range]
- Quantity: [X] tCO2eq
- Project: [Project Name]
- Vintage: [Year]

Parties:
- From: [Account Name / "Registry" for issuance]
- To: [Account Name / "Retired" for retirement]

Price: $[X] per tCO2eq (if applicable)
Total Value: $[X] (if applicable)

Status: [Pending / Completed / Failed]
Blockchain Reference: [Hash] (if applicable)
```

### ITMO Transfer Summary
```
ITMO Transfer: [ID]
Date: [Date]

Transfer Details:
- Host Country: [Country]
- Acquiring Country: [Country]
- Project: [Name]
- Quantity: [X] ITMOs
- Vintage: [Year]

Corresponding Adjustments:
- Host Country: +[X] tCO2eq to [Year] inventory
- Acquiring Country: -[X] tCO2eq from [Year] inventory

Authorization Reference: [AUTH-XXXX]
Bilateral Agreement: [Agreement Name]

CAD Status: [Synced / Pending]
Last CAD Update: [Date/Time]
```

## Validation Rules

### Project Eligibility
```
□ Sector covered by national framework
□ Methodology approved
□ Location within jurisdiction
□ Proponent registered and eligible
□ Not registered elsewhere
□ Meets additionality criteria
□ Within NDC scope (Article 6)
```

### Credit Issuance
```
□ Monitoring report complete
□ Verification successful
□ Fees paid
□ No outstanding compliance issues
□ Within crediting period
□ Quantity matches verification
```

### ITMO Transfer
```
□ Project authorized for Article 6
□ Quantity within authorization
□ Carbon budget available
□ Acquiring country agreed
□ CA timing confirmed
□ All documentation complete
```

## Integration Points

### With MRV System
- Activity data from monitoring feeds inventory
- Verified reductions update national totals
- Corresponding adjustments applied automatically
- Sector baselines inform additionality

### With NDC Tools
- Project contributions tracked against targets
- Sectoral progress includes registry projects
- Carbon budget linked to NDC headroom
- Policy incentives reflected in project pipeline

## Regulatory Compliance

### National Regulations
- Project cycle timelines
- Fee structures
- Approval authorities
- Compliance requirements

### International Frameworks
- Article 6.2 requirements
- ITMO tracking standards
- CAD reporting format
- Transparency requirements

## Error Handling

### Registration Issues
- Duplicate project check
- Methodology mismatch
- Boundary overlap
- Documentation gaps

### Transaction Issues
- Insufficient balance
- Authorization exceeded
- Account restrictions
- System timeouts

### ITMO Issues
- Carbon budget exceeded
- Bilateral agreement expired
- CA timing conflict
- CAD sync failure
