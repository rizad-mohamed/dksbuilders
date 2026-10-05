import { Hero } from "@/components/hero";
import { Company } from "@/components/company";
import { Services } from "@/components/services";
import { Projects } from "@/components/projects";
import { Process } from "@/components/process";
import { Contact } from "@/components/contact";
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Company />
      <Services />
      <Projects />
      <Process />
      <Contact />
    </main>
  );
}
