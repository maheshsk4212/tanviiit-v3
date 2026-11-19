import { contactPaths, contractNumber, sectorTabs, solutionAreas, vehicleProfiles } from "./site";

/**
 * The site's menus, used by the desktop mega menu, the mobile menu and the
 * footer so the three can never disagree.
 *
 * Capability, sector and vehicle links are built from the content file rather
 * than typed again here.
 */

export type NavLink = { label: string; href: string; note?: string };

export type NavGroup = {
  key: string;
  label: string;
  href: string;
  /** One sentence shown at the left of the open panel. */
  intro: string;
  overview: string;
  columns: { heading: string; links: NavLink[] }[];
};

const shortNotes: Record<string, string> = {
  "application-development-modernization": "Build, integrate and modernize applications",
  "data-analytics": "BI, engineering, integration and reporting",
  "devops-cloud-enablement": "CI/CD, automation and cloud migration",
  "enterprise-architecture": "Architecture, assessments and roadmaps",
  "quality-engineering-ivv": "IV&V, test automation and performance",
  "emerging-technologies": "Evaluation, prototypes and automation",
};

export const navGroups: NavGroup[] = [
  {
    key: "capabilities",
    label: "Capabilities",
    href: "/capabilities",
    intro: "Six solution areas, delivered by one engineering team from design through testing.",
    overview: "All capabilities",
    columns: [
      {
        heading: "Solution areas",
        links: solutionAreas.map((area) => ({
          label: area.name,
          href: `/capabilities/${area.slug}`,
          note: shortNotes[area.slug],
        })),
      },
    ],
  },
  {
    key: "who-we-serve",
    label: "Who we serve",
    href: "/who-we-serve",
    intro: "Federal, state and local agencies, defense programs, health systems and regulated industry.",
    overview: "All sectors",
    columns: [
      {
        heading: "Sectors",
        links: sectorTabs.map((sector) => ({
          label: sector.tab,
          href: `/who-we-serve#${sector.key}`,
          note: sector.eyebrow,
        })),
      },
    ],
  },
  {
    key: "contract-vehicles",
    label: "Contract vehicles",
    href: "/contract-vehicles",
    intro: "Two contract vehicles: NASA SEWP VI for IT mission-based services, and the GSA Multiple Award Schedule.",
    overview: "Compare both vehicles",
    columns: [
      {
        heading: "Contract vehicles",
        links: vehicleProfiles.map((vehicle) => ({
          label: vehicle.name,
          href: "href" in vehicle && vehicle.href ? vehicle.href : `/contract-vehicles#${vehicle.id}`,
          note: `${vehicle.kind}. Contract ${contractNumber(vehicle)}`,
        })),
      },
    ],
  },
  {
    key: "company",
    label: "Company",
    href: "/about",
    intro: "A technology and consulting company in Chantilly, Virginia, serving clients since 2008.",
    overview: "About Tanvi IT",
    columns: [
      {
        heading: "Company",
        links: [
          { label: "About us", href: "/about", note: "Our story and approach" },
          { label: "Leadership", href: "/about#leadership", note: "The people who run the company" },
          {
            label: "Certifications",
            href: "/about#certifications",
            note: "ISO, CMMI and SBA credentials",
          },
          {
            label: "TA Federal joint venture",
            href: "/about#joint-venture",
            note: "SBA 8(a) mentor-protégé JV with AAC Inc.",
          },
          { label: "News", href: "/news", note: "Awards and announcements" },
        ],
      },
    ],
  },
];

/** Plain links that sit beside the groups in the header. */
export const navPlain: NavLink[] = [{ label: "Careers", href: "/careers" }];

export const contactHref = "/contact";

/** The routes the contact form offers: the three contact paths, plus job candidates. */
export const contactRoutes = [...contactPaths.map((path) => path.name), "Careers"];
