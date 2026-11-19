import type { StaticImageData } from "next/image";

import appdev from "@/assets/photos/appdev.jpg";
import business from "@/assets/photos/business.jpg";
import code from "@/assets/photos/code.jpg";
import columns from "@/assets/photos/columns.jpg";
import dashboards from "@/assets/photos/dashboards.jpg";
import health from "@/assets/photos/health.jpg";
import launch from "@/assets/photos/launch.jpg";
import servers from "@/assets/photos/servers.jpg";
import team from "@/assets/photos/team.jpg";

/**
 * Local copies of the photographs the content file assigns to solution areas
 * and sectors, keyed the way the content file keys them. All are licensed
 * stand-ins until the client supplies their own.
 */
type Photo = { src: StaticImageData; alt: string };

export const solutionPhotos: Record<string, Photo> = {
  "application-development-modernization": {
    src: appdev,
    alt: "Source code open on a developer's monitor",
  },
  "data-analytics": { src: dashboards, alt: "Analytics dashboards showing charts and trend lines" },
  "devops-cloud-enablement": { src: servers, alt: "Rows of servers in a data center" },
  "enterprise-architecture": { src: team, alt: "A team planning around a shared table" },
  "quality-engineering-ivv": { src: code, alt: "A developer's workstation with code on screen" },
  "emerging-technologies": { src: launch, alt: "A rocket's trail arcing through the sky at dusk" },
};

export const sectorPhotos: Record<string, Photo> = {
  government: { src: columns, alt: "Classical columns of a federal building, seen from below" },
  defense: { src: servers, alt: "Rows of servers in a data center" },
  health: { src: health, alt: "A clinician working at a laptop beside a stethoscope" },
  commercial: { src: business, alt: "Colleagues reviewing figures together at a desk" },
};

/** Industry names for the slugs each sector lists in the content file. */
export const industryNames: Record<string, string> = {
  "federal-government": "Federal government",
  "state-government": "State government",
  "local-government": "Local government",
  "defense-intelligence": "Defense and intelligence",
  healthcare: "Healthcare",
  "banking-financial-services": "Banking and financial services",
  education: "Education",
  "energy-utilities": "Energy and utilities",
  "retail-ecommerce": "Retail and e-commerce",
  telecommunications: "Telecommunications",
};
