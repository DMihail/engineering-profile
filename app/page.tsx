"use client";

import { useState, useEffect } from "react";
import { T } from "./_components/tokens";
import { NavBar } from "./_components/nav-bar";
import { HeroSection } from "./_components/hero-section";
import { ImpactSection } from "./_components/impact-section";
import { CaseStudiesSection } from "./_components/case-studies-section";
import { SkillsSection } from "./_components/skills-section";
import { ExperienceSection } from "./_components/experience-section";
import { ContactSection } from "./_components/contact-section";
import { Footer } from "./_components/footer";

const SECTION_IDS = ["hero", "impact", "projects", "skills", "experience", "contact"];

export default function Home() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const obs: IntersectionObserver[] = [];
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
        { rootMargin: "-30% 0px -65% 0px" }
      );
      o.observe(el);
      obs.push(o);
    });
    return () => obs.forEach((o) => o.disconnect());
  }, []);

  return (
    <div style={{ background: T.bg, fontFamily: T.sans, minHeight: "100vh" }}>
      <NavBar active={active} />
      <HeroSection />
      <ImpactSection />
      <CaseStudiesSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
