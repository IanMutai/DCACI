# MRV System Skill

## Overview

This skill enables Claude to assist users with the MRV (Monitoring, Reporting, and Verification) System component of the National Climate Transparency Platform.

## Capabilities

### GHG Inventory Management
- Create and manage annual inventory cycles
- Calculate emissions by sector, category, and gas
- Apply IPCC methodologies (Tier 1, 2, 3)
- Manage time series consistency
- Handle recalculations

### Sector-Specific Guidance

#### Energy Sector (IPCC Category 1)
- Fuel combustion calculations (Reference and Sectoral approaches)
- Fugitive emissions from oil, gas, and coal
- Transport emissions by mode
- Energy balance reconciliation

#### IPPU Sector (IPCC Category 2)
- Cement, lime, and glass production
- Chemical industry emissions
- Metal production (iron, steel, aluminum)
- F-gas emissions (refrigeration, electronics)

#### Agriculture Sector (IPCC Category 3)
- Enteric fermentation calculations
- Manure management systems
- Rice cultivation emissions
- Agricultural soils (direct and indirect N2O)
- Crop residue burning

#### LULUCF Sector (IPCC Category 4)
- Forest land carbon stock changes
- Land use conversion emissions
- Cropland and grassland management
- Wetland emissions
- Harvested wood products

#### Waste Sector (IPCC Category 5)
- Solid waste disposal (FOD model)
- Biological waste treatment
- Waste incineration
- Wastewater treatment

### QA/QC Procedures
- Tier 1 QC checklists
- Tier 2 category-specific QC
- Quality assurance reviews
- Uncertainty assessment
- Documentation requirements

### Reporting
- CRF table preparation
- NIR chapter drafting
- BTR inventory chapter
- Key category analysis

## Calculation Methods

### Basic Emission Calculation
```
Emissions = Activity Data × Emission Factor × (1 - Oxidation/Combustion Factor)
```

### Energy Sector Example (Tier 1)
```
CO2 Emissions (Gg) = Fuel Consumption (TJ) × Emission Factor (kg CO2/TJ) × 10^-6
```

### Livestock Emissions Example
```
CH4 from Enteric Fermentation = Σ(Population × Emission Factor per head)
```

### Waste Sector FOD Model
```
CH4 generated = Σ(DOCm × DDOCm decomposed × F × 16/12)
```

## Key Data Sources

### Activity Data
- National energy balance (energy ministry)
- Industrial production statistics
- Agricultural census and surveys
- Forest inventory data
- Waste management records

### Emission Factors
- IPCC defaults (2006 Guidelines, 2019 Refinement)
- Country-specific factors (where developed)
- Regional factors (from similar countries)
- Facility-specific factors (Tier 3)

## Response Templates

### Inventory Status Query
```
Inventory Year: [YYYY]
Status: [Draft/Under Review/Published]
Sectors Completed: [X/5]
Total Emissions: [X] Gg CO2eq
Key Categories: [List top 5]
Outstanding Issues: [List if any]
```

### Emission Calculation Result
```
Category: [IPCC Code] - [Name]
Tier: [1/2/3]
Activity Data: [Value] [Unit]
  Source: [Data provider]
  Year: [YYYY]
Emission Factor: [Value] [Unit]
  Source: [IPCC/Country-specific]
Calculated Emissions:
  CO2: [Value] Gg
  CH4: [Value] Gg ([CO2eq] Gg CO2eq)
  N2O: [Value] Gg ([CO2eq] Gg CO2eq)
Total: [Value] Gg CO2eq
Uncertainty: ±[X]%
```

### QC Checklist Response
```
QC Check: [Category Name]
Date: [Date]
Reviewer: [Name]

✓ Data transcription verified
✓ Units correctly converted
✓ Emission factors appropriate
✓ Calculations correct
✓ Time series consistent
✓ Documentation complete

Issues Found: [List or "None"]
Recommendations: [List if any]
```

## Guidance for Common Tasks

### Starting a New Inventory Year
1. Copy previous year structure
2. Update activity data sources
3. Review emission factor updates
4. Check for methodology changes
5. Plan data collection timeline

### Handling Data Gaps
1. Document the gap
2. Use interpolation/extrapolation if appropriate
3. Apply proxy data with documentation
4. Report as notation key if necessary
5. Include in improvement plan

### Conducting Key Category Analysis
1. Calculate level assessment (contribution to total)
2. Calculate trend assessment (contribution to trend)
3. Apply qualitative criteria
4. Combine results
5. Document key category list

### Preparing for Review
1. Complete all QC procedures
2. Verify CRF table consistency
3. Check documentation completeness
4. Prepare response materials
5. Archive all source data

## Error Handling

### Missing Activity Data
- Check alternative data sources
- Use proxy data with documentation
- Apply sectoral averages as last resort
- Report using appropriate notation key

### Inconsistent Time Series
- Identify the cause of inconsistency
- Apply splicing techniques if justified
- Document methodology changes
- Explain in NIR

### Emission Factor Questions
- Default to IPCC Tier 1 when uncertain
- Document factor selection rationale
- Flag for improvement if country-specific needed
- Note in uncertainty assessment

## Integration Points

### With NDC Tools
- Inventory data feeds progress tracking
- Baseline emissions inform target setting
- Sector trends support policy analysis

### With Carbon Registry
- Verified project reductions update inventory
- Activity data from monitoring reports
- Corresponding adjustments for ITMOs

## Regulatory Compliance

### IPCC Guidelines Adherence
- Follow 2006 Guidelines methodology
- Apply 2019 Refinement updates
- Use IPCC software for Tier 1
- Document any deviations

### ETF Requirements
- Complete CRF tables
- Provide methodology documentation
- Include uncertainty analysis
- Explain recalculations
