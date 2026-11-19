import type { MetadataRoute } from "next";

import { solutionAreas } from "@/content/site";

// NEEDS-CONFIRMATION: the production domain.
const base = "https://www.tanviit.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/capabilities",
    ...solutionAreas.map((area) => `/capabilities/${area.slug}`),
    "/who-we-serve",
    "/contract-vehicles",
    "/contract-vehicles/sewp-vi",
    "/about",
    "/news",
    "/careers",
    "/contact",
  ];
  return paths.map((path) => ({ url: `${base}${path}`, priority: path === "" ? 1 : 0.7 }));
}
