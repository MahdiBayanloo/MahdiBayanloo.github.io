import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Proof } from "@/components/sections/Proof";
import { Skills } from "@/components/sections/Skills";
import { Work } from "@/components/sections/Work";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Proof />
        <Work />
        <Projects />
        <Skills />
        <Education />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
