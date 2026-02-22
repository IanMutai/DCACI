# NDC Tools Skill

## Overview

This skill enables Claude to assist users with the NDC Tools component of the National Climate Transparency Platform, supporting the full NDC lifecycle from planning through updating.

## Capabilities

### NDC Planning
- Baseline scenario development
- Emission projections
- Mitigation potential assessment
- Priority sector identification
- Stakeholder mapping

### Target Setting
- Target type selection (absolute, BAU, intensity, net-zero)
- Ambition assessment
- Equity consideration
- Conditional vs unconditional targets
- Sectoral target allocation

### Policy Analysis
- Policy instrument selection
- Marginal abatement cost analysis
- Co-benefits assessment
- Implementation feasibility
- Just transition considerations

### Progress Tracking
- Indicator development
- Data collection frameworks
- Progress calculation
- Gap analysis
- Course correction recommendations

### Implementation Support
- Action plan development
- Investment needs assessment
- Finance mobilization
- Institutional coordination
- Stakeholder engagement

## NDC Lifecycle Framework

### Phase 1: Planning
```
Inputs:
- Current GHG inventory
- Socioeconomic data
- Development priorities
- International commitments

Activities:
- Baseline modeling
- Gap analysis
- Stakeholder consultation
- Priority identification

Outputs:
- Baseline scenario
- Key sector priorities
- Stakeholder map
- Planning timeline
```

### Phase 2: Formulation
```
Inputs:
- Baseline scenario
- Mitigation options database
- Cost data
- Policy preferences

Activities:
- Target analysis
- Policy assessment
- Economic analysis
- Documentation drafting

Outputs:
- NDC targets
- Policy packages
- Cost estimates
- NDC document
```

### Phase 3: Implementation
```
Inputs:
- Approved NDC
- Budget allocations
- Institutional framework
- International support

Activities:
- Policy deployment
- Project development
- Capacity building
- Finance mobilization

Outputs:
- Implemented policies
- Project pipeline
- Trained staff
- Mobilized resources
```

### Phase 4: Tracking
```
Inputs:
- Implementation data
- Inventory updates
- Policy monitoring
- Finance tracking

Activities:
- Indicator monitoring
- Progress calculation
- Gap identification
- Reporting

Outputs:
- Progress reports
- BTR inputs
- Lessons learned
- Recommendations
```

### Phase 5: Updating
```
Inputs:
- Progress assessment
- GST outcomes
- New science/technology
- Stakeholder feedback

Activities:
- Review and assess
- Identify enhancements
- Draft updates
- Consultation

Outputs:
- Updated NDC
- Higher ambition
- Improved coverage
- Better implementation
```

## Target Types and Calculations

### Absolute Reduction Target
```
Target: Reduce emissions by X% below [base year] by [target year]

Calculation:
Target Emissions = Base Year Emissions × (1 - Reduction %)

Progress = (Base Year - Current) / (Base Year - Target) × 100%
```

### BAU Deviation Target
```
Target: Reduce emissions by X% below BAU by [target year]

Calculation:
Target Emissions = BAU Emissions × (1 - Reduction %)

Progress = (BAU - Current) / (BAU - Target) × 100%
```

### Intensity Target
```
Target: Reduce emissions intensity by X% by [target year]

Calculation:
Base Intensity = Base Emissions / Base GDP
Target Intensity = Base Intensity × (1 - Reduction %)

Current Intensity = Current Emissions / Current GDP
Progress = (Base Int - Current Int) / (Base Int - Target Int) × 100%
```

### Net-Zero Target
```
Target: Achieve net-zero emissions by [target year]

Components:
- Gross emissions reduction pathway
- Carbon removal requirements
- Residual emissions estimate

Progress = assessed against interim milestones
```

## Policy Analysis Framework

### Policy Instrument Types
| Type | Examples | Strengths | Considerations |
|------|----------|-----------|----------------|
| Regulatory | Standards, mandates, bans | Certainty, coverage | Enforcement, flexibility |
| Economic | Carbon tax, subsidies, ETS | Efficiency, revenue | Competitiveness, equity |
| Information | Labels, disclosure, campaigns | Awareness, choice | Impact measurement |
| Voluntary | Agreements, certification | Flexibility, buy-in | Additionality, verification |

### MACC Development
```
For each mitigation option:
1. Estimate abatement potential (tCO2eq/year)
2. Calculate implementation cost ($/tCO2eq)
3. Identify co-benefits and co-costs
4. Assess implementation barriers
5. Rank by cost-effectiveness
```

### Co-Benefits Assessment
- Air quality improvements
- Energy security
- Job creation
- Health benefits
- Ecosystem services
- Technology development

## Response Templates

### NDC Progress Report
```
NDC Version: [X.0]
Target Year: [YYYY]
Reporting Period: [Start] to [End]

Target Summary:
- Economy-wide: [X]% reduction from [base] by [target year]
- Status: [On Track / At Risk / Off Track]
- Current Progress: [X]%

Sectoral Progress:
| Sector | Target | Current | Status |
|--------|--------|---------|--------|
| Energy | [X]%   | [X]%    | [Status] |
| IPPU   | [X]%   | [X]%    | [Status] |
| Agriculture | [X]% | [X]%  | [Status] |
| LULUCF | [X] Mt | [X] Mt  | [Status] |
| Waste  | [X]%   | [X]%    | [Status] |

Key Achievements: [List]
Challenges: [List]
Recommendations: [List]
```

### Policy Assessment Summary
```
Policy: [Name]
Sector: [Sector]
Status: [Planned/Adopted/Implemented]

Impact Assessment:
- Expected Reduction: [X] tCO2eq/year
- Implementation Cost: $[X] million
- Cost-effectiveness: $[X]/tCO2eq

Co-benefits:
- [Benefit 1]: [Description]
- [Benefit 2]: [Description]

Implementation Progress: [X]%
Barriers Identified: [List]
Recommendations: [List]
```

### Scenario Comparison
```
Scenario Analysis for [Year]

| Indicator | Baseline | NDC | Enhanced |
|-----------|----------|-----|----------|
| Total Emissions | [X] Mt | [X] Mt | [X] Mt |
| vs Base Year | +[X]% | -[X]% | -[X]% |
| Cost | - | $[X]B | $[X]B |
| Jobs | - | +[X]K | +[X]K |

Key Differences:
- [Scenario 1 vs 2]: [Description]
- [Scenario 2 vs 3]: [Description]

Recommendation: [Based on analysis]
```

## Integration Points

### With MRV System
- Pull inventory data for baseline and tracking
- Use sector emissions for target allocation
- Validate progress against inventory trends

### With Carbon Registry
- Track carbon market contributions to NDC
- Assess ITMO impact on target achievement
- Verify project alignment with NDC goals

## Tools Reference

### Modeling Tools
- LEAP: Energy system scenarios
- TIMES/MARKAL: Optimization modeling
- CGE models: Economy-wide impacts
- Sector models: Detailed sector analysis

### Tracking Tools
- Climate Watch: International comparison
- National indicators dashboard
- BTR/NIR integration

### Analysis Tools
- MACC generators
- Co-benefits calculators
- Finance tracking systems

## Best Practices

### Target Setting
1. Base on robust inventory data
2. Consider development priorities
3. Assess implementation capacity
4. Ensure measurability
5. Plan for progression

### Progress Tracking
1. Define clear indicators
2. Establish data collection systems
3. Report regularly
4. Identify gaps early
5. Adapt as needed

### Stakeholder Engagement
1. Map all stakeholders
2. Ensure inclusive consultation
3. Document inputs
4. Provide feedback
5. Build ownership
