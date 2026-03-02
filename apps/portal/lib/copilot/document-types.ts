export type DocType = "ndc" | "btr" | "cap" | "sectoral" | "county"

export interface SectionSchema {
  id: string
  title: string
  description: string
  guideQuestions: string[]
  unfcccRef?: string
}

export interface DocumentTypeSchema {
  id: DocType
  title: string
  subtitle: string
  description: string
  icon: string
  color: string
  estimatedPages: string
  unfcccFramework: string
  kenyaOnly?: boolean      // hide country dropdown, fix to Kenya
  countyLevel?: boolean    // show Kenya county selector instead
  sections: SectionSchema[]
}

export const KENYA_COUNTIES = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo Marakwet",
  "Embu", "Garissa", "Homa Bay", "Isiolo", "Kajiado",
  "Kakamega", "Kericho", "Kiambu", "Kilifi", "Kirinyaga",
  "Kisii", "Kisumu", "Kitui", "Kwale", "Laikipia",
  "Lamu", "Machakos", "Makueni", "Mandera", "Marsabit",
  "Meru", "Migori", "Mombasa", "Murang'a", "Nairobi City",
  "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua",
  "Nyeri", "Samburu", "Siaya", "Taita Taveta", "Tana River",
  "Tharaka Nithi", "Trans Nzoia", "Turkana", "Uasin Gishu",
  "Vihiga", "Wajir", "West Pokot",
]

export const DOCUMENT_TYPES: DocumentTypeSchema[] = [
  {
    id: "ndc",
    title: "Nationally Determined Contribution",
    subtitle: "NDC",
    description: "Full NDC submission aligned with Paris Agreement Article 4, covering mitigation, adaptation, and means of implementation.",
    icon: "Target",
    color: "teal",
    estimatedPages: "40–80 pages",
    unfcccFramework: "Paris Agreement Art. 4 · Decision 4/CMA.1",
    sections: [
      {
        id: "executive-summary",
        title: "Executive Summary",
        description: "High-level overview of the country's NDC commitments, key targets, and implementation highlights.",
        guideQuestions: [
          "What is the country's overall GHG reduction target and by what year?",
          "What is the base year or BAU baseline?",
          "Is the target conditional, unconditional, or both?",
          "What are the two or three headline adaptation priorities?",
        ],
        unfcccRef: "Decision 4/CMA.1, Annex I",
      },
      {
        id: "national-circumstances",
        title: "National Circumstances",
        description: "Country profile, geography, economy, population, and climate vulnerability context.",
        guideQuestions: [
          "What is the country's total land area, population, and GDP?",
          "What are the main climate hazards the country faces (drought, flooding, sea level rise)?",
          "What are the dominant economic sectors and their share of GDP?",
          "What is the country's current total GHG emissions (MtCO2e) and per capita figure?",
        ],
        unfcccRef: "Paris Agreement Art. 4.9",
      },
      {
        id: "mitigation-contribution",
        title: "Mitigation Contribution",
        description: "Quantified GHG reduction targets — conditional and unconditional — with sector-level breakdown.",
        guideQuestions: [
          "What is the unconditional reduction target (% or absolute MtCO2e)?",
          "What is the conditional reduction target requiring international support?",
          "Which sectors are covered: energy, transport, agriculture, LULUCF, waste, IPPU?",
          "What is the BAU or baseline emissions trajectory?",
          "What is the target year (e.g. 2030, 2035)?",
        ],
        unfcccRef: "Paris Agreement Art. 4 · Annex to Decision 4/CMA.1",
      },
      {
        id: "adaptation-component",
        title: "Adaptation Component",
        description: "National adaptation priorities, vulnerable sectors, and planned adaptation actions.",
        guideQuestions: [
          "What are the three most climate-vulnerable sectors or communities?",
          "What adaptation actions are planned (e.g. early warning systems, climate-smart agriculture)?",
          "Are there national adaptation plans (NAP) or adaptation strategies already in place?",
          "What are the expected outcomes and indicators for adaptation?",
        ],
        unfcccRef: "Paris Agreement Art. 7",
      },
      {
        id: "loss-and-damage",
        title: "Loss and Damage",
        description: "Assessment of unavoidable climate impacts and planned responses under Article 8.",
        guideQuestions: [
          "What losses and damages has the country already experienced (economic and non-economic)?",
          "What early warning and risk insurance mechanisms are in place?",
          "What international support is needed for loss and damage?",
        ],
        unfcccRef: "Paris Agreement Art. 8 · Decision 2/CP.19",
      },
      {
        id: "means-of-implementation",
        title: "Means of Implementation",
        description: "Finance, technology transfer, and capacity building needs to implement the NDC.",
        guideQuestions: [
          "What is the total estimated cost to implement the NDC?",
          "How much can the country finance domestically vs. internationally?",
          "What technologies are needed (e.g. renewable energy, climate-smart agriculture tools)?",
          "What capacity building gaps exist in government, data systems, and MRV?",
        ],
        unfcccRef: "Paris Agreement Art. 9–11",
      },
      {
        id: "fairness-ambition",
        title: "Fairness and Ambition",
        description: "Explanation of why this NDC represents the country's highest possible ambition and a fair contribution.",
        guideQuestions: [
          "How does this NDC progress beyond the previous submission?",
          "What development constraints limit more ambitious targets?",
          "How does the target compare to a 1.5°C-compatible pathway?",
          "What equity considerations underpin the conditional/unconditional split?",
        ],
        unfcccRef: "Paris Agreement Art. 4.3",
      },
      {
        id: "planning-process",
        title: "Planning Process",
        description: "Stakeholder engagement, institutional arrangements, and MRV systems used to develop this NDC.",
        guideQuestions: [
          "Which ministries and agencies led the NDC preparation?",
          "How were civil society, private sector, and communities consulted?",
          "What MRV system will track implementation?",
          "How will the NDC be updated in the next revision cycle?",
        ],
        unfcccRef: "Paris Agreement Art. 4.9",
      },
    ],
  },
  {
    id: "btr",
    title: "Biennial Transparency Report",
    subtitle: "BTR",
    description: "UNFCCC-mandated transparency report under the Enhanced Transparency Framework, covering GHG inventory, NDC progress, and support received.",
    icon: "BarChart3",
    color: "blue",
    estimatedPages: "80–200 pages",
    unfcccFramework: "Decision 18/CMA.1 · Paris Agreement Art. 13",
    sections: [
      {
        id: "national-circumstances",
        title: "National Circumstances",
        description: "Country profile and institutional arrangements for transparency.",
        guideQuestions: [
          "What are the key national circumstances affecting emissions (geography, economy, population growth)?",
          "What institutional arrangements support climate transparency?",
          "What data systems and national statistics offices provide GHG data?",
        ],
        unfcccRef: "Decision 18/CMA.1, Annex, Chapter II",
      },
      {
        id: "ghg-inventory",
        title: "GHG Inventory Summary",
        description: "National GHG inventory in IPCC 2006 guidelines format, all sectors and gases.",
        guideQuestions: [
          "What are the total net GHG emissions (MtCO2e) for the most recent inventory year?",
          "What is the breakdown by sector: Energy, IPPU, Agriculture, LULUCF, Waste?",
          "Which gases are covered: CO2, CH4, N2O, HFCs, PFCs, SF6?",
          "What is the trend over the last 5–10 years?",
          "What QA/QC procedures were applied?",
        ],
        unfcccRef: "Decision 18/CMA.1, Chapter III · IPCC 2006 GL",
      },
      {
        id: "ndc-progress",
        title: "NDC Progress Tracking",
        description: "Progress towards achieving nationally determined contribution targets.",
        guideQuestions: [
          "What qualitative and quantitative indicators track NDC progress?",
          "What is the current % progress against the headline target?",
          "Which sectors are on track and which are off track?",
          "What policies have been implemented since the last report?",
        ],
        unfcccRef: "Decision 18/CMA.1, Chapter IV",
      },
      {
        id: "policies-measures",
        title: "Policies and Measures",
        description: "Description of domestic policies and measures implemented to achieve the NDC.",
        guideQuestions: [
          "What are the top 5 mitigation policies (name, sector, expected MtCO2e impact)?",
          "What adaptation policies have been implemented?",
          "Are any policies being phased in or out? What is their current status?",
        ],
        unfcccRef: "Decision 18/CMA.1, Chapter IV",
      },
      {
        id: "projections",
        title: "Projections",
        description: "GHG emission projections under different policy scenarios (BAU, WEM, WAM).",
        guideQuestions: [
          "What are the BAU emissions projected for the target year?",
          "What is the WEM (with existing measures) projection?",
          "What is the WAM (with additional measures) projection?",
          "What key assumptions underlie these scenarios (GDP growth, population, energy mix)?",
        ],
        unfcccRef: "Decision 18/CMA.1, Chapter V",
      },
      {
        id: "climate-finance",
        title: "Climate Finance Received",
        description: "International climate finance received, including sources, channels, and uses.",
        guideQuestions: [
          "What climate finance was received in the reporting period (USD millions)?",
          "Which funds/sources: GCF, GEF, bilateral, multilateral development banks?",
          "How was finance split: mitigation vs adaptation vs capacity building?",
          "What domestic finance was mobilized?",
        ],
        unfcccRef: "Decision 18/CMA.1, Chapter VII",
      },
      {
        id: "technology-capacity",
        title: "Technology Transfer & Capacity Building",
        description: "Technology needs, transfers received, and capacity building activities.",
        guideQuestions: [
          "What technology needs assessments (TNA) have been conducted?",
          "What technologies were transferred or accessed in the reporting period?",
          "What capacity building programmes were completed?",
          "What institutional capacity gaps remain?",
        ],
        unfcccRef: "Decision 18/CMA.1, Chapter VIII",
      },
      {
        id: "vulnerability-adaptation",
        title: "Vulnerability and Adaptation",
        description: "Climate vulnerability assessment and adaptation actions taken.",
        guideQuestions: [
          "What climate change impacts have been observed (temperature rise, rainfall changes, extreme events)?",
          "What are the most vulnerable sectors and populations?",
          "What adaptation actions were implemented and what were their outcomes?",
          "What loss and damage has been documented?",
        ],
        unfcccRef: "Decision 18/CMA.1, Chapter VI",
      },
    ],
  },
  {
    id: "cap",
    title: "National Climate Action Plan",
    subtitle: "CAP / NAP",
    description: "Kenya's comprehensive climate action plan integrating mitigation and adaptation priorities with implementation roadmaps, finance strategies, and MRV frameworks.",
    icon: "Globe2",
    color: "green",
    estimatedPages: "60–120 pages",
    unfcccFramework: "UNFCCC NAP Process · Paris Agreement Art. 7.9",
    kenyaOnly: true,
    sections: [
      {
        id: "executive-summary",
        title: "Executive Summary",
        description: "Overview of Kenya's climate goals, key priorities, and the structure of the plan.",
        guideQuestions: [
          "What are the top 3 national climate priorities?",
          "What headline emission reduction and adaptation targets does this plan set?",
          "What is the plan's implementation timeframe?",
          "Who are the primary implementing agencies?",
        ],
      },
      {
        id: "country-context",
        title: "Kenya Context & Vulnerability",
        description: "Climate science context, observed impacts, and projected future risks by sector across Kenya.",
        guideQuestions: [
          "What are the observed temperature and rainfall trends in Kenya over the last 30 years?",
          "What extreme events (floods, droughts, flash floods) have increased in frequency?",
          "What are the climate projections for Kenya in 2050 under low and high emission scenarios?",
          "Which regions and populations in Kenya are most vulnerable?",
        ],
      },
      {
        id: "national-climate-goals",
        title: "National Climate Goals",
        description: "Kenya's long-term climate vision, NDC targets, and net-zero pathway.",
        guideQuestions: [
          "What is Kenya's long-term climate vision (referencing the Second NDC 2031–2035)?",
          "How do Kenya's NDC targets translate into this action plan?",
          "Are there sector-specific targets beyond the overall NDC?",
        ],
      },
      {
        id: "mitigation-actions",
        title: "Mitigation Actions & Targets",
        description: "Sector-by-sector mitigation actions with targets, timelines, and emission reduction potential.",
        guideQuestions: [
          "What are the 5–10 highest-impact mitigation actions across energy, transport, agriculture, forestry, and waste?",
          "For each action: what is the expected MtCO2e reduction, cost, and timeline?",
          "Which actions are already underway vs. planned?",
          "What policies or regulations will drive implementation?",
        ],
      },
      {
        id: "adaptation-measures",
        title: "Adaptation Measures",
        description: "Adaptation priorities by sector with specific actions, outcomes, and indicators.",
        guideQuestions: [
          "What adaptation actions are planned for agriculture, water, health, and coastal areas in Kenya?",
          "What are the success indicators for each adaptation measure?",
          "What community-based adaptation approaches are included?",
          "How are indigenous and local knowledge systems integrated?",
        ],
      },
      {
        id: "implementation-plan",
        title: "Implementation Plan & Timeline",
        description: "Phased implementation roadmap with institutional responsibilities and milestones.",
        guideQuestions: [
          "What are the short-term (1–3 year), medium-term (3–7 year), and long-term (7–15 year) milestones?",
          "Which ministry or agency (MECF, sector ministries, county governments) leads each action area?",
          "What coordination mechanisms exist across ministries and between national and county governments?",
          "How will implementation progress be reviewed?",
        ],
      },
      {
        id: "finance-requirements",
        title: "Finance Requirements",
        description: "Total climate finance needed, domestic sources, and international funding gaps.",
        guideQuestions: [
          "What is the total estimated cost of the plan (USD millions)?",
          "How is finance split: mitigation vs adaptation?",
          "What is the domestic vs. international financing mix?",
          "What Climate Change Fund allocations, GCF, GEF, or bilateral arrangements are targeted?",
        ],
      },
      {
        id: "mrv-framework",
        title: "MRV Framework",
        description: "Monitoring, reporting, and verification system for tracking plan implementation.",
        guideQuestions: [
          "What indicators will be used to track progress (GHG, economic, social)?",
          "What data systems and institutions (NEMA, Kenya Meteorological Dept, sector ministries) are responsible for MRV?",
          "How frequently will progress be reported?",
          "How does this MRV framework link to the UNFCCC Enhanced Transparency Framework?",
        ],
      },
      {
        id: "stakeholder-engagement",
        title: "Stakeholder Engagement",
        description: "Consultation process, stakeholder roles, and ongoing engagement mechanisms.",
        guideQuestions: [
          "How were civil society, private sector, and communities consulted?",
          "What gender and social inclusion considerations shaped the plan?",
          "How will youth and indigenous communities be engaged in implementation?",
          "What ongoing multi-stakeholder platforms will oversee the plan?",
        ],
      },
    ],
  },
  {
    id: "county",
    title: "County Climate Change Action Plan",
    subtitle: "County CCAP",
    description: "County-level climate action plan under Kenya's Climate Change Act 2016 (Section 13), covering county GHG baseline, mitigation and adaptation priorities, and resource mobilisation.",
    icon: "MapPin",
    color: "purple",
    estimatedPages: "30–60 pages",
    unfcccFramework: "Kenya Climate Change Act 2016 · NCCAP 2023–2027",
    kenyaOnly: true,
    countyLevel: true,
    sections: [
      {
        id: "executive-summary",
        title: "Executive Summary",
        description: "Overview of the county's climate priorities, key actions, and alignment with national targets.",
        guideQuestions: [
          "What are the top 3 climate risks facing this county?",
          "What headline mitigation and adaptation actions does this plan commit to?",
          "What is the plan's implementation period?",
          "Which county departments and partners lead implementation?",
        ],
      },
      {
        id: "county-profile",
        title: "County Profile & Climate Vulnerability",
        description: "County geography, demographics, economy, livelihoods, and observed climate change impacts.",
        guideQuestions: [
          "What is the county's area, population, and main livelihoods (agriculture, pastoralism, fishing, industry)?",
          "What climate hazards are most severe in this county (droughts, floods, landslides, heat stress)?",
          "What observed changes in temperature and rainfall have been documented?",
          "Which sub-counties, communities, or ecosystems are most vulnerable and why?",
        ],
      },
      {
        id: "ghg-baseline",
        title: "County GHG Inventory & Baseline",
        description: "Sector-level GHG emissions baseline for the county, key emission sources, and data gaps.",
        guideQuestions: [
          "What are the main emission sources in the county (agriculture and livestock, land use, energy, transport, waste)?",
          "What is the estimated total county GHG baseline (tCO2e) and reference year?",
          "What county-level data is available from KNBS, NEMA, or sector reports?",
          "What are the major data gaps and how will they be addressed?",
        ],
      },
      {
        id: "mitigation-actions",
        title: "County Mitigation Actions & Targets",
        description: "Priority mitigation actions aligned with Kenya's Second NDC, with county-level targets and timelines.",
        guideQuestions: [
          "What are the top 5 mitigation actions the county will implement (e.g. agroforestry, clean cooking, solar energy, waste management)?",
          "What are the quantified emission reduction targets for this county?",
          "Which county department or implementing agency leads each action?",
          "What is the timeline and estimated cost for each action?",
        ],
      },
      {
        id: "adaptation-priorities",
        title: "County Adaptation Priorities",
        description: "Sector-specific adaptation actions for agriculture, water, health, ecosystems, and infrastructure.",
        guideQuestions: [
          "What adaptation actions are critical for the county's key sectors (e.g. drought-resistant crops, water harvesting, early warning systems)?",
          "Which communities or sub-counties will benefit from each adaptation action?",
          "What is the estimated cost and source of funding for adaptation?",
          "How will traditional/indigenous knowledge be integrated into adaptation?",
        ],
      },
      {
        id: "institutional-framework",
        title: "Implementation & Institutional Framework",
        description: "County institutional arrangements, roles of county departments, CCU, and national-county coordination.",
        guideQuestions: [
          "What is the county's Climate Change Unit (CCU) structure and staffing?",
          "How does the County Executive Committee Member (CECM) for Environment coordinate climate action?",
          "How does the county coordinate with the national Ministry of Environment and the Climate Change Directorate?",
          "What role do Ward administrators, community groups, and NGOs play in implementation?",
        ],
      },
      {
        id: "finance-resource-mobilisation",
        title: "Finance & Resource Mobilisation",
        description: "County budget allocation, Climate Change Fund access, and external grants for climate action.",
        guideQuestions: [
          "What percentage of the county budget is allocated to climate-related activities?",
          "Has the county accessed the Kenya Climate Change Fund? What projects were funded?",
          "What donor or NGO partnerships are in place (e.g. GCF, USAID, EU, SIDA)?",
          "What private sector investment opportunities exist in this county for clean energy, sustainable agriculture, or resilient infrastructure?",
        ],
      },
      {
        id: "mrv-reporting",
        title: "MRV & Annual Reporting",
        description: "County monitoring, reporting, and verification system linked to national transparency frameworks.",
        guideQuestions: [
          "What indicators will track the county's climate progress (GHG reductions, adaptation outcomes, finance mobilised)?",
          "How will the county collect and manage climate data (CIMES, sector databases)?",
          "What is the annual county climate reporting process to the Cabinet Secretary and County Assembly?",
          "How does county MRV contribute to Kenya's national BTR and UNFCCC transparency obligations?",
        ],
      },
    ],
  },
  {
    id: "sectoral",
    title: "Sectoral Climate Action Plan",
    subtitle: "Sectoral Plan",
    description: "Detailed action plan for a specific sector (energy, transport, agriculture, forestry, waste) with emission targets, interventions, technology needs, and finance.",
    icon: "Layers",
    color: "orange",
    estimatedPages: "30–60 pages",
    unfcccFramework: "NDC Sectoral Targets · IPCC AR6 Mitigation",
    sections: [
      {
        id: "sector-overview",
        title: "Sector Overview & Baseline",
        description: "Current sector profile, baseline emissions, key drivers, and data sources.",
        guideQuestions: [
          "Which sector is this plan for (energy, transport, agriculture, forestry, waste, industry)?",
          "What are the baseline emissions (MtCO2e) and year?",
          "What are the key emission sources within the sector?",
          "What is the sector's share of national GDP and employment?",
          "What data systems track emissions in this sector?",
        ],
      },
      {
        id: "targets",
        title: "Mitigation & Adaptation Targets",
        description: "Sector-specific reduction targets linked to the NDC, with interim milestones.",
        guideQuestions: [
          "What is the sector-level emission reduction target (% or absolute MtCO2e)?",
          "What is the target year?",
          "Is the target conditional, unconditional, or both?",
          "What are the 2027 and 2030 interim milestones?",
          "What adaptation targets exist for this sector?",
        ],
      },
      {
        id: "key-actions",
        title: "Key Actions & Interventions",
        description: "Prioritized list of specific mitigation and adaptation interventions with impact estimates.",
        guideQuestions: [
          "What are the top 5–8 interventions ranked by emission reduction potential?",
          "For each: what is the expected MtCO2e reduction, cost (USD), and timeline?",
          "What co-benefits (jobs, air quality, food security) does each action generate?",
          "Are any interventions already implemented? What have been the results?",
        ],
      },
      {
        id: "technology-needs",
        title: "Technology Needs",
        description: "Technologies required to achieve sector targets, current gaps, and transfer pathways.",
        guideQuestions: [
          "What technologies are critical to achieving the sector target?",
          "Which technologies are already available domestically vs. requiring transfer?",
          "What barriers exist to technology adoption (cost, skills, infrastructure)?",
          "What technology partnerships or licences are planned?",
        ],
      },
      {
        id: "finance-requirements",
        title: "Finance Requirements",
        description: "Sector investment needs, financing instruments, and international funding sources.",
        guideQuestions: [
          "What is the total investment required to implement this sectoral plan (USD millions)?",
          "What domestic public and private finance is available?",
          "What is the international finance gap?",
          "Which financing instruments are most appropriate (grants, concessional loans, blended finance, carbon markets)?",
        ],
      },
      {
        id: "implementation-roadmap",
        title: "Implementation Roadmap",
        description: "Phased action plan with institutional leads, milestones, and enabling conditions.",
        guideQuestions: [
          "What are the short-term (1–2 years), medium-term (3–5 years), and long-term (5–10 years) actions?",
          "Which ministry or agency leads implementation?",
          "What regulatory or policy changes are needed to enable action?",
          "What are the key risks to implementation and mitigation measures?",
        ],
      },
      {
        id: "mrv-plan",
        title: "Sector MRV Plan",
        description: "Monitoring and reporting system for tracking sector-level progress.",
        guideQuestions: [
          "What key performance indicators (KPIs) will track progress?",
          "Which institution is responsible for data collection and reporting?",
          "How frequently will sector progress be assessed?",
          "How does this link to the national MRV system and BTR reporting?",
        ],
      },
    ],
  },
]

export function getDocumentType(id: DocType): DocumentTypeSchema {
  const found = DOCUMENT_TYPES.find((d) => d.id === id)
  if (!found) throw new Error(`Unknown document type: ${id}`)
  return found
}

export interface SectionState {
  id: string
  title: string
  content: string
  status: "pending" | "generating" | "complete" | "review"
  lastUpdated?: string
}

export interface DocumentState {
  id: string
  docType: DocType
  title: string
  country: string
  county?: string        // for county-level documents (Kenya county name)
  createdAt: string
  currentSectionId: string
  sections: Record<string, SectionState>
}

export function initDocumentState(
  docType: DocType,
  title: string,
  country: string,
  county?: string
): DocumentState {
  const schema = getDocumentType(docType)
  const sections: Record<string, SectionState> = {}
  schema.sections.forEach((s) => {
    sections[s.id] = { id: s.id, title: s.title, content: "", status: "pending" }
  })
  return {
    id: crypto.randomUUID(),
    docType,
    title,
    country,
    county,
    createdAt: new Date().toISOString(),
    currentSectionId: schema.sections[0].id,
    sections,
  }
}
