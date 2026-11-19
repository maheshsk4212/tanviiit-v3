import { Hero } from "@/components/home/hero";
import {
  Approach,
  Capabilities,
  Careers,
  Contact,
  Credentials,
  News,
  SewpSpotlight,
} from "@/components/home/sections";
import { Sectors } from "@/components/home/sectors";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Approach />
      <Capabilities />
      <SewpSpotlight />
      <Credentials />
      <Sectors />
      <News />
      <Careers />
      <Contact />
    </>
  );
}
