/**
 * Kenya County Data (all 47 counties)
 * Sources: KNBS 2019 Census, KNBS Gross County Product 2022/2024,
 * Global Forest Watch, KNBS Agriculture Report
 */

export interface County {
  code: string;
  name: string;
  population2019: number;
  area_km2: number;
  gcpBillionKES2022?: number;
  forestCoverPct?: number;
  primaryEconomy: string;
  cccfStatus: "enacted" | "pending";
  region: string;
}

export const counties: County[] = [
  { code: "001", name: "Mombasa", population2019: 1_208_333, area_km2: 219, gcpBillionKES2022: 564.1, forestCoverPct: 8.2, primaryEconomy: "Port, tourism, manufacturing", cccfStatus: "enacted", region: "Coast" },
  { code: "002", name: "Kwale", population2019: 866_820, area_km2: 8270, forestCoverPct: 12.5, primaryEconomy: "Agriculture, mining (titanium)", cccfStatus: "enacted", region: "Coast" },
  { code: "003", name: "Kilifi", population2019: 1_453_787, area_km2: 12610, forestCoverPct: 26.25, primaryEconomy: "Agriculture, tourism", cccfStatus: "enacted", region: "Coast" },
  { code: "004", name: "Tana River", population2019: 315_943, area_km2: 38437, forestCoverPct: 3.5, primaryEconomy: "Agriculture, pastoralism", cccfStatus: "enacted", region: "Coast" },
  { code: "005", name: "Lamu", population2019: 143_920, area_km2: 6273, forestCoverPct: 32.13, primaryEconomy: "Fishing, agriculture, tourism", cccfStatus: "enacted", region: "Coast" },
  { code: "006", name: "Taita-Taveta", population2019: 340_671, area_km2: 17084, forestCoverPct: 14.8, primaryEconomy: "Agriculture, mining, wildlife", cccfStatus: "enacted", region: "Coast" },
  { code: "007", name: "Garissa", population2019: 841_353, area_km2: 45720, forestCoverPct: 1.8, primaryEconomy: "Pastoralism, trade", cccfStatus: "enacted", region: "North Eastern" },
  { code: "008", name: "Wajir", population2019: 781_263, area_km2: 56686, forestCoverPct: 0.98, primaryEconomy: "Pastoralism", cccfStatus: "enacted", region: "North Eastern" },
  { code: "009", name: "Mandera", population2019: 867_457, area_km2: 25992, forestCoverPct: 1.2, primaryEconomy: "Pastoralism, trade", cccfStatus: "enacted", region: "North Eastern" },
  { code: "010", name: "Marsabit", population2019: 459_785, area_km2: 70961, forestCoverPct: 1.11, primaryEconomy: "Pastoralism", cccfStatus: "enacted", region: "Eastern" },
  { code: "011", name: "Isiolo", population2019: 268_002, area_km2: 25350, forestCoverPct: 2.1, primaryEconomy: "Pastoralism, livestock trade", cccfStatus: "enacted", region: "Eastern" },
  { code: "012", name: "Meru", population2019: 1_545_714, area_km2: 6936, gcpBillionKES2022: 407.4, forestCoverPct: 18.5, primaryEconomy: "Agriculture (tea, coffee, miraa)", cccfStatus: "enacted", region: "Eastern" },
  { code: "013", name: "Tharaka-Nithi", population2019: 393_177, area_km2: 2639, forestCoverPct: 15.2, primaryEconomy: "Agriculture (tea, coffee)", cccfStatus: "enacted", region: "Eastern" },
  { code: "014", name: "Embu", population2019: 608_599, area_km2: 2818, forestCoverPct: 16.8, primaryEconomy: "Agriculture (tea, coffee, macadamia)", cccfStatus: "enacted", region: "Eastern" },
  { code: "015", name: "Kitui", population2019: 1_136_187, area_km2: 30497, forestCoverPct: 5.3, primaryEconomy: "Agriculture, mining", cccfStatus: "enacted", region: "Eastern" },
  { code: "016", name: "Machakos", population2019: 1_421_932, area_km2: 6208, gcpBillionKES2022: 378.4, forestCoverPct: 6.8, primaryEconomy: "Manufacturing, agriculture", cccfStatus: "enacted", region: "Eastern" },
  { code: "017", name: "Makueni", population2019: 987_653, area_km2: 8009, forestCoverPct: 7.4, primaryEconomy: "Agriculture (fruits, livestock)", cccfStatus: "enacted", region: "Eastern" },
  { code: "018", name: "Nyandarua", population2019: 638_289, area_km2: 3245, forestCoverPct: 26.20, primaryEconomy: "Agriculture (dairy, potatoes)", cccfStatus: "enacted", region: "Central" },
  { code: "019", name: "Nyeri", population2019: 759_164, area_km2: 3337, forestCoverPct: 40.89, primaryEconomy: "Agriculture (tea, coffee, dairy)", cccfStatus: "enacted", region: "Central" },
  { code: "020", name: "Kirinyaga", population2019: 610_411, area_km2: 1478, forestCoverPct: 22.1, primaryEconomy: "Agriculture (rice, tea, coffee)", cccfStatus: "enacted", region: "Central" },
  { code: "021", name: "Murang'a", population2019: 1_065_640, area_km2: 2558, forestCoverPct: 19.3, primaryEconomy: "Agriculture (tea, coffee, avocado)", cccfStatus: "enacted", region: "Central" },
  { code: "022", name: "Kiambu", population2019: 2_417_735, area_km2: 2543, gcpBillionKES2022: 721.2, forestCoverPct: 12.4, primaryEconomy: "Manufacturing, agriculture, services", cccfStatus: "enacted", region: "Central" },
  { code: "023", name: "Turkana", population2019: 926_976, area_km2: 77000, forestCoverPct: 2.5, primaryEconomy: "Pastoralism, oil exploration, wind energy", cccfStatus: "enacted", region: "Rift Valley" },
  { code: "024", name: "West Pokot", population2019: 621_241, area_km2: 9169, forestCoverPct: 13.8, primaryEconomy: "Agriculture, pastoralism", cccfStatus: "enacted", region: "Rift Valley" },
  { code: "025", name: "Samburu", population2019: 310_327, area_km2: 21022, forestCoverPct: 3.2, primaryEconomy: "Pastoralism, wildlife tourism", cccfStatus: "enacted", region: "Rift Valley" },
  { code: "026", name: "Trans-Nzoia", population2019: 990_341, area_km2: 2496, forestCoverPct: 8.6, primaryEconomy: "Agriculture (maize, wheat, dairy)", cccfStatus: "enacted", region: "Rift Valley" },
  { code: "027", name: "Uasin Gishu", population2019: 1_163_186, area_km2: 3345, forestCoverPct: 7.9, primaryEconomy: "Agriculture (wheat, maize), manufacturing", cccfStatus: "enacted", region: "Rift Valley" },
  { code: "028", name: "Elgeyo-Marakwet", population2019: 454_480, area_km2: 3030, forestCoverPct: 18.7, primaryEconomy: "Agriculture (maize, pyrethrum)", cccfStatus: "enacted", region: "Rift Valley" },
  { code: "029", name: "Nandi", population2019: 885_711, area_km2: 2884, forestCoverPct: 15.6, primaryEconomy: "Agriculture (tea, maize, dairy)", cccfStatus: "enacted", region: "Rift Valley" },
  { code: "030", name: "Baringo", population2019: 666_763, area_km2: 11015, forestCoverPct: 8.9, primaryEconomy: "Agriculture, pastoralism, beekeeping", cccfStatus: "enacted", region: "Rift Valley" },
  { code: "031", name: "Laikipia", population2019: 518_560, area_km2: 9462, forestCoverPct: 9.5, primaryEconomy: "Ranching, wildlife, horticulture", cccfStatus: "enacted", region: "Rift Valley" },
  { code: "032", name: "Nakuru", population2019: 2_162_202, area_km2: 7495, gcpBillionKES2022: 600.5, forestCoverPct: 11.3, primaryEconomy: "Agriculture, manufacturing, tourism", cccfStatus: "enacted", region: "Rift Valley" },
  { code: "033", name: "Narok", population2019: 1_157_873, area_km2: 17944, forestCoverPct: 21.5, primaryEconomy: "Agriculture (wheat), tourism (Maasai Mara)", cccfStatus: "enacted", region: "Rift Valley" },
  { code: "034", name: "Kajiado", population2019: 1_117_840, area_km2: 21901, forestCoverPct: 4.6, primaryEconomy: "Pastoralism, real estate, mining", cccfStatus: "enacted", region: "Rift Valley" },
  { code: "035", name: "Kericho", population2019: 901_777, area_km2: 2479, forestCoverPct: 22.8, primaryEconomy: "Agriculture (tea)", cccfStatus: "enacted", region: "Rift Valley" },
  { code: "036", name: "Bomet", population2019: 875_689, area_km2: 2471, forestCoverPct: 24.28, primaryEconomy: "Agriculture (tea, maize)", cccfStatus: "enacted", region: "Rift Valley" },
  { code: "037", name: "Kakamega", population2019: 1_867_579, area_km2: 3052, forestCoverPct: 9.8, primaryEconomy: "Agriculture (sugarcane), mining (gold)", cccfStatus: "enacted", region: "Western" },
  { code: "038", name: "Vihiga", population2019: 590_013, area_km2: 531, forestCoverPct: 5.4, primaryEconomy: "Agriculture, small-scale mining", cccfStatus: "enacted", region: "Western" },
  { code: "039", name: "Bungoma", population2019: 1_670_570, area_km2: 3033, forestCoverPct: 7.2, primaryEconomy: "Agriculture (sugarcane, maize)", cccfStatus: "enacted", region: "Western" },
  { code: "040", name: "Busia", population2019: 893_681, area_km2: 1695, forestCoverPct: 0.56, primaryEconomy: "Agriculture, cross-border trade", cccfStatus: "enacted", region: "Western" },
  { code: "041", name: "Siaya", population2019: 993_183, area_km2: 2530, forestCoverPct: 0.23, primaryEconomy: "Agriculture (sugarcane, rice), fishing", cccfStatus: "enacted", region: "Nyanza" },
  { code: "042", name: "Kisumu", population2019: 1_155_574, area_km2: 2086, forestCoverPct: 3.8, primaryEconomy: "Trade, fishing, manufacturing", cccfStatus: "enacted", region: "Nyanza" },
  { code: "043", name: "Homa Bay", population2019: 1_131_950, area_km2: 3183, forestCoverPct: 2.4, primaryEconomy: "Agriculture, fishing", cccfStatus: "enacted", region: "Nyanza" },
  { code: "044", name: "Migori", population2019: 1_116_436, area_km2: 2587, forestCoverPct: 0.31, primaryEconomy: "Agriculture, mining (gold)", cccfStatus: "enacted", region: "Nyanza" },
  { code: "045", name: "Kisii", population2019: 1_266_860, area_km2: 1318, forestCoverPct: 4.1, primaryEconomy: "Agriculture (tea, bananas, coffee)", cccfStatus: "enacted", region: "Nyanza" },
  { code: "046", name: "Nyamira", population2019: 605_576, area_km2: 899, forestCoverPct: 6.7, primaryEconomy: "Agriculture (tea, bananas)", cccfStatus: "enacted", region: "Nyanza" },
  { code: "047", name: "Nairobi", population2019: 4_397_073, area_km2: 696, gcpBillionKES2022: 3379.4, forestCoverPct: 3.5, primaryEconomy: "Services, finance, manufacturing, tech", cccfStatus: "enacted", region: "Nairobi" },
];

export const nationalPopulation = {
  census2019: 47_564_296,
  estimated2024: 52_428_000,
  males2019: 23_548_056,
  females2019: 24_014_716,
  source: "KNBS 2019 Census",
} as const;

export const topCountiesByGCP = [
  { name: "Nairobi", gcpBillionKES: 3379.4, shareOfGDP: 27.5 },
  { name: "Kiambu", gcpBillionKES: 721.2, shareOfGDP: 5.9 },
  { name: "Nakuru", gcpBillionKES: 600.5, shareOfGDP: 4.9 },
  { name: "Mombasa", gcpBillionKES: 564.1, shareOfGDP: 4.6 },
  { name: "Meru", gcpBillionKES: 407.4, shareOfGDP: 3.3 },
  { name: "Machakos", gcpBillionKES: 378.4, shareOfGDP: 3.1 },
] as const;

export const forestCoverRankings = {
  highest: [
    { name: "Nyeri", percentage: 40.89 },
    { name: "Lamu", percentage: 32.13 },
    { name: "Kilifi", percentage: 26.25 },
    { name: "Nyandarua", percentage: 26.20 },
    { name: "Bomet", percentage: 24.28 },
  ],
  lowest: [
    { name: "Siaya", percentage: 0.23 },
    { name: "Migori", percentage: 0.31 },
    { name: "Busia", percentage: 0.56 },
    { name: "Wajir", percentage: 0.98 },
    { name: "Marsabit", percentage: 1.11 },
  ],
  nationalAverage: 10, // % as of 2021 assessment
  constitutionalTarget: 10, // %
  goalBy2032: 30, // %
  source: "Global Forest Watch / Kenya Forest Service 2021 Assessment",
} as const;
