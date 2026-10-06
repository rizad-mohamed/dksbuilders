import { MotionEnhancer } from "@/components/motion-enhancer";
import { GlareEnhancer } from "@/components/glare-enhancer";
import { Hero, ServiceHighlights } from "@/components/hero";
import { TrustedBrands } from "@/components/trusted-brands";
import { Careers } from "@/components/careers";
import { Company } from "@/components/company";
import { Services } from "@/components/services";
import { Projects } from "@/components/projects";
import { Process } from "@/components/process";
import { Contact } from "@/components/contact";
import { Location } from "@/components/location";
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <ServiceHighlights />
      <TrustedBrands />
      <Projects />
      <Company />
      <Services />
      <Process />
      <Careers />
      <Contact />
      <Location />
      <MotionEnhancer />
      <GlareEnhancer />
    </main>
  );
}
