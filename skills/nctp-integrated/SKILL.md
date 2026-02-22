# National Climate Transparency Platform (NCTP) Skill

## Overview

This skill enables Claude to assist users with the National Climate Transparency Platform, an integrated system combining MRV (Monitoring, Reporting, Verification), NDC Tools, and a Carbon Registry.

## Capabilities

Claude can assist with:

### MRV System Operations
- GHG inventory compilation and calculations
- Sector-specific emission estimation (Energy, IPPU, Agriculture, LULUCF, Waste)
- Activity data collection and validation
- Emission factor selection and application
- Uncertainty analysis and key category identification
- QA/QC procedures and documentation
- BTR and NIR report preparation

### NDC Tools Operations
- Baseline scenario development
- Target setting and ambition assessment
- Policy impact analysis
- Progress tracking and indicator management
- Scenario comparison and modeling
- Cost-benefit analysis
- Implementation planning

### Carbon Registry Operations
- Project lifecycle management (PCN → PDD → Authorization → Monitoring → Issuance)
- Credit issuance and tracking
- Article 6.2 ITMO management
- Transaction processing
- Compliance monitoring
- Public portal queries

### Cross-System Integration
- Data validation across systems
- BTR chapter generation
- Corresponding adjustment calculations
- Progress reconciliation
- Integrated reporting

## Usage Guidelines

### When users ask about GHG inventory:
1. Identify the sector and category
2. Determine the appropriate IPCC tier
3. Guide through activity data requirements
4. Apply emission factors correctly
5. Calculate emissions with uncertainty
6. Document methodology and sources

### When users ask about NDC progress:
1. Identify relevant NDC targets
2. Pull latest inventory data
3. Calculate progress against target
4. Identify contributing factors
5. Highlight risks and opportunities
6. Generate progress summary

### When users ask about carbon projects:
1. Determine project type (VCM or Article 6)
2. Guide through appropriate lifecycle stage
3. Validate against NDC targets
4. Check carbon budget availability
5. Process required documentation
6. Generate status reports

### When users ask about reporting:
1. Identify report type (BTR, NIR, annual)
2. Gather data from all relevant systems
3. Apply appropriate formats (CRF, CTF)
4. Ensure consistency across chapters
5. Generate documentation
6. Prepare for review

## Key Concepts

### IPCC Sectors
- **1. Energy**: Fuel combustion and fugitive emissions
- **2. IPPU**: Industrial processes and product use
- **3. Agriculture**: Livestock, soils, rice cultivation
- **4. LULUCF**: Land use, forestry, land use change
- **5. Waste**: Solid waste, wastewater, incineration

### Project Lifecycle Stages
1. **PCN**: Project Concept Note - initial proposal
2. **PDD**: Project Design Document - detailed design
3. **Authorization**: Government approval (especially Article 6)
4. **Implementation**: Project construction/start
5. **Monitoring**: Ongoing measurement and reporting
6. **Issuance**: Credit generation and registration

### Key Metrics
- **tCO2eq**: Tonnes of CO2 equivalent
- **GWP**: Global Warming Potential
- **ITMOs**: Internationally Transferred Mitigation Outcomes
- **CA**: Corresponding Adjustment

## Response Patterns

### For inventory queries:
```
Sector: [Energy/IPPU/Agriculture/LULUCF/Waste]
Category: [IPCC category code and name]
Methodology: [Tier 1/2/3]
Activity Data: [value] [unit] from [source]
Emission Factor: [value] [unit] from [source]
Emissions: [calculated value] tCO2eq
Uncertainty: [±X%]
```

### For project status queries:
```
Project: [Name]
Registration: [Number]
Stage: [Current lifecycle stage]
Expected Reductions: [X] tCO2eq/year
Crediting Period: [Start] to [End]
Market Type: [VCM/Article 6]
Next Steps: [Required actions]
```

### For progress tracking:
```
NDC Target: [Description]
Base Year: [Year] - [Value]
Target Year: [Year] - [Target Value]
Current Progress: [Latest Value] ([X]% of target)
Status: [On Track/At Risk/Off Track]
Contributing Factors: [List]
Recommendations: [List]
```

## Integration Awareness

Always consider cross-system implications:

1. **Credits → Inventory**: Issued credits may affect national totals
2. **ITMOs → Both**: Transfers require inventory adjustment and NDC tracking
3. **Targets → Projects**: NDC targets determine project eligibility
4. **Baseline → All**: Inventory baseline underpins everything

## Regulatory References

- Paris Agreement Article 13 (Enhanced Transparency Framework)
- Paris Agreement Article 6.2 (Cooperative Approaches)
- 2006 IPCC Guidelines for National GHG Inventories
- 2019 Refinement to IPCC Guidelines
- Modalities, Procedures and Guidelines (MPGs)
- National regulations (country-specific)

## Error Handling

When data is missing or inconsistent:
1. Clearly state what information is needed
2. Explain why it matters
3. Suggest data sources
4. Offer alternatives if available
5. Document assumptions made

## Continuous Improvement

Track and report:
- Data quality issues identified
- Methodology gaps discovered
- Process improvements suggested
- Training needs observed
