# NCTP Prompt Library

## Comprehensive Prompts for National Climate Transparency Platform Operations

---

## 1. Onboarding Prompts

### 1.1 Country Setup
```
You are helping set up the National Climate Transparency Platform for [COUNTRY_NAME].

Please guide me through the initial configuration:

1. BASIC INFORMATION
   - Country name and ISO code
   - Base year for GHG inventory
   - NDC submission history
   - National climate focal point

2. REGULATORY FRAMEWORK
   - Climate change legislation
   - Carbon market regulations
   - Designated National Authority (DNA)
   - Lead inventory agency

3. EXISTING SYSTEMS
   - Current GHG inventory system
   - NDC tracking mechanisms
   - Carbon project registration
   - Data management infrastructure

4. PRIORITY SECTORS
   - Key emission sources
   - Mitigation priorities
   - Data availability by sector

5. CAPACITY ASSESSMENT
   - Technical staff available
   - Training needs identified
   - International support received

Based on this information, create a customized setup plan for the NCTP.
```

### 1.2 Data Migration
```
I need to migrate existing climate data into the NCTP. Please help me with:

1. GHG INVENTORY DATA
   - Historical inventory years available: [LIST]
   - Current format: [Excel/Database/Other]
   - Sectors with complete data: [LIST]
   - Known data gaps: [LIST]

2. NDC INFORMATION
   - Current NDC version: [1.0/2.0/3.0]
   - Target type: [Absolute/BAU/Intensity]
   - Sectoral targets defined: [Yes/No]

3. CARBON PROJECTS (if any)
   - Number of registered projects: [NUMBER]
   - Current registry platform: [NAME]
   - Project documentation available: [Yes/No]

Please provide:
- Data mapping recommendations
- Quality check procedures
- Migration timeline estimate
- Validation checklist
```

---

## 2. MRV System Prompts

### 2.1 Inventory Compilation
```
Help me compile the GHG inventory for [YEAR] in [COUNTRY].

SECTOR: [Energy/IPPU/Agriculture/LULUCF/Waste]

Available activity data:
- [Data type 1]: [Value] [Unit] from [Source]
- [Data type 2]: [Value] [Unit] from [Source]

Please:
1. Identify the appropriate IPCC categories
2. Recommend methodology tier based on data availability
3. Select appropriate emission factors
4. Calculate emissions with uncertainty
5. Document methodology and sources
6. Identify any data gaps or issues
```

### 2.2 Key Category Analysis
```
Perform a key category analysis for [COUNTRY]'s [YEAR] inventory.

Total national emissions: [VALUE] Gg CO2eq

Sector totals:
- Energy: [VALUE] Gg CO2eq
- IPPU: [VALUE] Gg CO2eq
- Agriculture: [VALUE] Gg CO2eq
- LULUCF: [VALUE] Gg CO2eq
- Waste: [VALUE] Gg CO2eq

Please:
1. Calculate level assessment (contribution to total)
2. Calculate trend assessment (if time series provided)
3. Apply qualitative criteria
4. Identify key categories
5. Recommend methodology improvements for key categories
6. Prioritize improvement actions
```

### 2.3 QA/QC Review
```
Conduct a QA/QC review for [SECTOR] in the [YEAR] inventory.

Category under review: [IPCC CODE] - [CATEGORY NAME]

Reported values:
- Activity data: [VALUE] [UNIT]
- Emission factor: [VALUE] [UNIT]
- Calculated emissions: [VALUE] Gg

Please perform:
1. Tier 1 QC checks (general procedures)
   - Data transcription verification
   - Unit conversion check
   - Calculation verification
   - Time series consistency

2. Tier 2 QC checks (category-specific)
   - Emission factor appropriateness
   - Activity data quality assessment
   - Comparison with independent data
   - Trend analysis

3. Documentation review
   - Source documentation complete
   - Methodology clearly described
   - Uncertainty properly estimated

Provide findings and recommendations.
```

### 2.4 Recalculation Assessment
```
Assess the need for recalculation in [COUNTRY]'s inventory.

Situation:
- [Describe change: new methodology/new data/error correction]

Previous values (YEAR):
- [Category]: [OLD VALUE] Gg CO2eq

Proposed new values:
- [Category]: [NEW VALUE] Gg CO2eq

Please:
1. Determine if recalculation is required per IPCC guidance
2. Calculate the significance threshold
3. Assess impact on total emissions and trends
4. Document justification for recalculation
5. Identify years requiring recalculation
6. Prepare explanation for NIR
```

---

## 3. NDC Tools Prompts

### 3.1 Target Progress Assessment
```
Assess progress toward [COUNTRY]'s NDC target.

NDC Target:
- Type: [Absolute/BAU/Intensity/Net-zero]
- Target: [DESCRIPTION]
- Base year: [YEAR] - [VALUE]
- Target year: [YEAR] - [TARGET VALUE]

Current status:
- Latest inventory year: [YEAR]
- Current emissions: [VALUE]

Please provide:
1. Progress calculation (% toward target)
2. Trajectory analysis (on track / at risk / off track)
3. Gap to target
4. Contributing factors
5. Sectors driving progress or delays
6. Recommendations for course correction
```

### 3.2 Policy Impact Analysis
```
Analyze the expected impact of [POLICY NAME].

Policy details:
- Sector: [SECTOR]
- Type: [Regulatory/Economic/Information/Voluntary]
- Implementation status: [Planned/Adopted/Implemented]
- Start date: [DATE]

Expected outcomes:
- Target emission reduction: [VALUE] tCO2eq/year
- Implementation cost: $[VALUE]

Please analyze:
1. Cost-effectiveness ($/tCO2eq)
2. Comparison with alternative measures
3. Co-benefits assessment
4. Implementation barriers
5. Monitoring indicators
6. Recommendations
```

### 3.3 Scenario Development
```
Develop emission scenarios for [COUNTRY] to [TARGET YEAR].

Historical emissions (most recent 5 years):
- [YEAR]: [VALUE]
- [YEAR]: [VALUE]
- [YEAR]: [VALUE]
- [YEAR]: [VALUE]
- [YEAR]: [VALUE]

Key drivers:
- GDP growth assumption: [X]% annual
- Population growth: [X]% annual
- Energy demand growth: [X]% annual

Scenarios to develop:
1. BASELINE (BAU) - current policies only
2. NDC SCENARIO - planned policies implemented
3. ENHANCED SCENARIO - additional measures

For each scenario, provide:
- Emission projections by sector
- Key assumptions
- Mitigation measures included
- Cumulative emissions to target year
- Comparison with Paris Agreement goals
```

### 3.4 NDC Update Preparation
```
Help prepare [COUNTRY]'s NDC [VERSION] update.

Current NDC:
- Submission date: [DATE]
- Target: [DESCRIPTION]
- Progress to date: [X]%

Global Stocktake outcomes relevant:
- [GST finding 1]
- [GST finding 2]

Please assist with:
1. Gap analysis of current NDC
2. Enhanced ambition options
3. New sector coverage opportunities
4. Improved implementation mechanisms
5. Finance and support needs
6. Draft target language options
```

---

## 4. Carbon Registry Prompts

### 4.1 Project Registration
```
Help register a new carbon project in the registry.

Project information:
- Name: [PROJECT NAME]
- Proponent: [ORGANIZATION]
- Location: [LOCATION]
- Sector: [SECTOR]
- Methodology: [METHODOLOGY]
- Expected reductions: [VALUE] tCO2eq/year
- Crediting period: [START] to [END]
- Market type: [VCM/Article 6]

Please:
1. Check eligibility against national criteria
2. Verify methodology applicability
3. Validate against NDC alignment (if Article 6)
4. Check carbon budget availability (if Article 6)
5. Identify required documentation
6. Outline registration process and timeline
7. Calculate applicable fees
```

### 4.2 Credit Issuance
```
Process credit issuance request for [PROJECT NAME].

Project details:
- Registration number: [NUMBER]
- Monitoring period: [START] to [END]
- Verified reductions: [VALUE] tCO2eq

Verification information:
- Verification body: [NAME]
- Verification date: [DATE]
- Verification report ID: [ID]

Please:
1. Validate verification report completeness
2. Check compliance status
3. Calculate issuance quantity
4. Generate serial numbers
5. Process fee payment
6. Update registry records
7. Notify relevant parties
```

### 4.3 ITMO Authorization
```
Process Article 6.2 authorization request.

Project: [PROJECT NAME]
Registration: [NUMBER]

Authorization request:
- Quantity: [VALUE] ITMOs
- Acquiring country: [COUNTRY]
- First transfer period: [DATES]
- Bilateral agreement: [AGREEMENT NAME]

Please:
1. Verify project Article 6 eligibility
2. Check authorization within project limits
3. Assess carbon budget availability
4. Validate bilateral agreement terms
5. Calculate corresponding adjustment
6. Prepare authorization letter
7. Update CAD records
```

### 4.4 Transaction Processing
```
Process [TRANSACTION TYPE] for carbon credits.

Transaction type: [Issuance/Transfer/Retirement/Cancellation]

Credit details:
- Serial numbers: [RANGE]
- Quantity: [VALUE] tCO2eq
- Project: [NAME]
- Vintage: [YEAR]

Transaction details:
- From account: [NAME]
- To account: [NAME]
- Price: $[VALUE]/tCO2eq (if applicable)
- Purpose: [PURPOSE]

Please:
1. Validate transaction eligibility
2. Check account balances
3. Process transaction
4. Update registry records
5. Generate transaction confirmation
6. Notify parties
```

---

## 5. Integration Prompts

### 5.1 BTR Preparation
```
Help prepare [COUNTRY]'s Biennial Transparency Report.

Reporting period: [START] to [END]

Data needed from each system:

MRV SYSTEM:
- Latest inventory year: [YEAR]
- Recalculations performed: [Yes/No]

NDC TOOLS:
- NDC version being tracked: [VERSION]
- Progress indicators defined: [Yes/No]

CARBON REGISTRY:
- Active Article 6 projects: [NUMBER]
- ITMOs transferred in period: [VALUE]

Please generate:
1. Chapter 1 (NIR) summary from MRV
2. Chapter 2 (NDC Progress) from NDC Tools
3. Article 6.2 information from Registry
4. Consistency checks across chapters
5. CRF/CTF table alignment
6. Documentation checklist
```

### 5.2 Cross-System Validation
```
Perform cross-system data validation.

MRV reported emissions ([YEAR]): [VALUE] Gg CO2eq
Registry verified reductions: [VALUE] Gg CO2eq
NDC progress calculation base: [VALUE] Gg CO2eq

Checks needed:
1. Registry reductions reflected in inventory?
2. Corresponding adjustments applied for ITMOs?
3. NDC progress uses consistent inventory data?
4. Time series alignment across systems?

Please:
- Identify any discrepancies
- Explain root causes
- Recommend corrections
- Document reconciliation
```

### 5.3 Annual Reporting Cycle
```
Guide me through the annual reporting cycle for [YEAR].

Current month: [MONTH]

Please provide:
1. Q1 data collection checklist
   - Activity data sources to contact
   - Registry monitoring reports due
   - Policy status updates needed

2. Q2 compilation schedule
   - Sector deadlines
   - Calculation milestones
   - Cross-system integration points

3. Q3 quality assurance plan
   - QC procedures by sector
   - QA review schedule
   - Verification activities

4. Q4 reporting deliverables
   - Internal reports due
   - International submissions
   - System updates needed

Include key integration touchpoints between systems.
```

---

## 6. Troubleshooting Prompts

### 6.1 Data Quality Issues
```
Help resolve data quality issue in [SYSTEM].

Issue description:
- System: [MRV/NDC Tools/Registry]
- Component: [Specific component]
- Problem: [Description]
- Impact: [What's affected]

Context:
- When discovered: [DATE]
- Data involved: [DESCRIPTION]
- Users affected: [WHO]

Please:
1. Diagnose root cause
2. Assess data integrity impact
3. Recommend immediate fixes
4. Suggest preventive measures
5. Document for QA/QC records
```

### 6.2 Integration Failure
```
Troubleshoot integration issue between [SYSTEM 1] and [SYSTEM 2].

Error details:
- Error message: [MESSAGE]
- When occurred: [DATE/TIME]
- Operation attempted: [DESCRIPTION]

Expected behavior:
- [DESCRIPTION]

Actual behavior:
- [DESCRIPTION]

Please:
1. Identify failure point
2. Check data consistency
3. Verify API connectivity
4. Review event logs
5. Recommend resolution
6. Suggest monitoring improvements
```

### 6.3 Compliance Alert
```
Respond to compliance alert from [SYSTEM].

Alert details:
- Type: [Missing data/Deadline/Inconsistency/Other]
- Severity: [High/Medium/Low]
- Deadline: [DATE]
- Requirement: [DESCRIPTION]

Please:
1. Assess compliance risk
2. Identify immediate actions needed
3. Assign responsibilities
4. Create resolution timeline
5. Document corrective actions
6. Recommend preventive measures
```

---

## 7. Reporting Prompts

### 7.1 Executive Dashboard
```
Generate executive summary dashboard for [TIME PERIOD].

Include:
1. MRV STATUS
   - Latest inventory status
   - Key emissions trends
   - QA/QC completion

2. NDC PROGRESS
   - Target achievement status
   - Key policy implementation
   - Gap assessment

3. REGISTRY PERFORMANCE
   - Projects in pipeline
   - Credits issued
   - ITMO transfers
   - Revenue generated

4. ALERTS & ACTIONS
   - Upcoming deadlines
   - Outstanding issues
   - Recommended priorities

Format for [AUDIENCE: Minister/Technical Team/International Partners]
```

### 7.2 Sector Report
```
Generate comprehensive report for [SECTOR].

Include from MRV:
- Sector emissions trend
- Key categories
- Methodology tier status
- Data quality assessment

Include from NDC Tools:
- Sector target progress
- Policies implemented
- Mitigation measures

Include from Registry:
- Projects in sector
- Credits generated
- Market activity

Time period: [PERIOD]
Comparison: [Year-over-year/Against target/Against BAU]
```

---

## Usage Guidelines

### Prompt Customization
- Replace [BRACKETED] items with actual values
- Add country-specific context as needed
- Adjust technical depth for audience
- Include relevant regulations

### Response Expectations
- Structured, actionable outputs
- Clear methodology references
- Quantified results where possible
- Next steps identified

### Quality Assurance
- Verify calculations independently
- Cross-reference with official sources
- Document assumptions clearly
- Flag uncertainties
