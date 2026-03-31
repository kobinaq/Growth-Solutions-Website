import { ChevronRight, Mail, MessageCircle } from "lucide-react";
import { useState, type FormEvent } from "react";

import {
  aboutContent,
  contactContent,
  homeContent,
  projectMap,
  projectsContent,
  servicesContent,
} from "@/site/content";
import type { ProjectDetail } from "@/site/types";
import {
  ImageFrame,
  MotionCard,
  PageIntro,
} from "@/site/ui";
import { Button } from "@/components/ui/button";

const getProjectImage = (project: ProjectDetail) =>
  project.images?.[0] ?? {
    src: "/projects/agroforestry-1.jpg",
    alt: `${project.title} project image`,
  };

export function HomePage({ navigate }: { navigate: (path: string) => void }) {
  const featuredProjects = homeContent.featuredProjects.items.map((item) => ({
    item,
    project: projectMap.get(`/projects/${item.slug}`),
  }));

  return (
    <div className="space-y-20 sm:space-y-24">
      <section className="relative min-h-[88vh] overflow-hidden bg-[#1a2c22] text-white shadow-[0_28px_120px_rgba(22,34,27,0.3)]">
        <img
          src={homeContent.hero.image.src}
          alt={homeContent.hero.image.alt}
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,31,24,0.92),rgba(20,31,24,0.58),rgba(20,31,24,0.28))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(210,173,88,0.22),transparent_30%)]" />

        <div className="relative mx-auto grid min-h-[88vh] max-w-[92rem] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-end">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/72">
              {homeContent.hero.eyebrow}
            </p>
            <h1 className="font-editorial mt-6 max-w-4xl text-6xl leading-[0.92] sm:text-7xl lg:text-[6.4rem]">
              {homeContent.hero.title}
            </h1>
            <div className="mt-8 max-w-2xl space-y-4 text-base leading-8 text-white/82 sm:text-lg">
              {homeContent.hero.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button
                onClick={() => navigate(homeContent.hero.primaryCta.path ?? "/services")}
                className="rounded-full bg-[#f7f0df] px-7 text-[#173628] hover:bg-white"
              >
                {homeContent.hero.primaryCta.label}
              </Button>
              {homeContent.hero.secondaryCta ? (
                <Button
                  onClick={() => navigate(homeContent.hero.secondaryCta?.path ?? "/contact")}
                  variant="outline"
                  className="rounded-full border-white/25 bg-white/10 px-7 text-white hover:bg-white/18"
                >
                  {homeContent.hero.secondaryCta.label}
                </Button>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-12 lg:items-end">
            <div className="max-w-md rounded-[2rem] border border-white/12 bg-white/8 px-6 py-7 backdrop-blur-sm">
              <p className="text-sm uppercase tracking-[0.18em] text-white/60">
                Community-led, systems-aware
              </p>
              <p className="font-editorial mt-4 text-3xl leading-tight text-white/92">
                Strategy shaped with local realities, carried through with practical implementation support.
              </p>
            </div>

            <div className="grid w-full gap-5 border-t border-white/15 pt-6 sm:grid-cols-3">
              {homeContent.impactStats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-editorial text-4xl leading-none text-[#f4d79a] sm:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-[0.18em] text-white/66">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[92rem] space-y-20 px-4 sm:px-6 lg:px-8 sm:space-y-24">
      <section className="border-y border-border/70 py-6">
        <div className="grid items-center gap-5 lg:grid-cols-[0.55fr_1.45fr]">
          <p className="text-sm uppercase tracking-[0.18em] text-primary/60">
            {homeContent.partners.title}
          </p>
          <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {homeContent.partners.logos.map((logo) => (
              <div key={logo.name} className="flex items-center justify-center py-3 opacity-75 grayscale transition hover:opacity-100 hover:grayscale-0">
                <img src={logo.src} alt={logo.name} className="max-h-12 max-w-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.45fr_1.55fr] lg:gap-14">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-primary/60">
            {homeContent.manifesto.eyebrow}
          </p>
        </div>
        <div>
          <h2 className="font-editorial max-w-5xl text-5xl leading-[0.96] text-foreground sm:text-6xl">
            {homeContent.manifesto.title}
          </h2>
          <div className="mt-8 max-w-4xl space-y-6 text-base leading-8 text-foreground/78 sm:text-lg">
            {homeContent.manifesto.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[0.58fr_1.42fr] lg:gap-14">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-primary/60">Process</p>
          <h2 className="font-editorial mt-4 text-4xl leading-tight text-foreground sm:text-5xl">
            {homeContent.process.title}
          </h2>
          <p className="mt-5 max-w-md text-base leading-8 text-muted-foreground">
            We move from listening to implementation in a way that protects local ownership and builds practical momentum.
          </p>
        </div>
        <div className="relative border-l border-border/80 pl-8 sm:pl-10">
          {homeContent.process.steps.map((step, index) => (
            <div
              key={step.title}
              className={index === homeContent.process.steps.length - 1 ? "" : "pb-12"}
            >
              <div className="absolute -left-[0.56rem] mt-1 h-4 w-4 rounded-full border-4 border-background bg-primary" />
              <p className="text-xs uppercase tracking-[0.22em] text-primary/60">
                Step {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="font-editorial mt-3 text-3xl text-foreground sm:text-4xl">
                {step.title}
              </h3>
              <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:gap-14">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-primary/60">Focus Areas</p>
          <h2 className="font-editorial mt-4 text-4xl leading-tight text-foreground sm:text-5xl">
            {homeContent.focusAreas.title}
          </h2>
          <p className="mt-5 max-w-md text-base leading-8 text-muted-foreground">
            {homeContent.focusAreas.intro}
          </p>
        </div>
        <div className="divide-y divide-border/70 border-y border-border/70">
          {homeContent.focusAreas.items.map((item) => (
            <div key={item.title} className="grid gap-4 py-7 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="flex items-start gap-3">
                <div className="mt-2 h-2.5 w-2.5 rounded-full bg-primary" />
                <h3 className="font-editorial text-3xl text-foreground sm:text-[2.15rem]">
                  {item.title}
                </h3>
              </div>
              <p className="text-base leading-8 text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-10">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
          <p className="text-sm uppercase tracking-[0.2em] text-primary/60">
            Featured Work
          </p>
          <div>
            <h2 className="font-editorial text-5xl leading-[0.96] text-foreground sm:text-6xl">
              {homeContent.featuredProjects.title}
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
              {homeContent.featuredProjects.description}
            </p>
          </div>
        </div>

        <div className="space-y-12">
          {featuredProjects.map(({ item, project }, index) => (
            <article
              key={item.slug}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <img
                  src={item.image.src}
                  alt={item.image.alt}
                  className="h-[24rem] w-full rounded-[2rem] object-cover shadow-[0_22px_80px_rgba(29,39,31,0.12)] sm:h-[30rem]"
                />
              </div>
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <p className="text-sm uppercase tracking-[0.18em] text-primary/60">
                  {project?.category ?? "Featured project"}
                </p>
                <h3 className="font-editorial mt-4 text-4xl leading-tight text-foreground sm:text-5xl">
                  {project?.title ?? item.label}
                </h3>
                <p className="mt-4 text-sm uppercase tracking-[0.14em] text-foreground/56">
                  {project?.location ?? ""}
                </p>
                <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
                  {project?.challenge ?? item.label}
                </p>
                <div className="mt-8 flex flex-wrap gap-6">
                  {(project?.stats ?? []).slice(0, 2).map((stat) => (
                    <div key={stat.label}>
                      <p className="font-editorial text-4xl leading-none text-primary">
                        {stat.value}
                      </p>
                      <p className="mt-2 text-xs uppercase tracking-[0.18em] text-foreground/60">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => navigate(`/projects/${item.slug}`)}
                  variant="link"
                  className="mt-8 h-auto p-0 text-base font-semibold text-primary"
                >
                  Read the case study
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-8 border-y border-border/70 py-14 lg:grid-cols-[1.18fr_0.82fr] lg:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-primary/60">
            {homeContent.impactStatement.eyebrow}
          </p>
          <h2 className="font-editorial mt-5 max-w-5xl text-5xl leading-[0.96] text-foreground sm:text-6xl">
            {homeContent.impactStatement.title}
          </h2>
        </div>
        <div>
          <p className="max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
            {homeContent.impactStatement.description}
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {homeContent.impactStats.map((stat) => (
              <div key={stat.label}>
                <p className="font-editorial text-5xl leading-none text-primary sm:text-6xl">
                  {stat.value}
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-foreground/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-8 pb-4 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-primary/60">
            Next Project
          </p>
          <h2 className="font-editorial mt-4 text-5xl leading-[0.96] text-foreground sm:text-6xl">
            {homeContent.cta.title}
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
            {homeContent.cta.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => navigate(homeContent.cta.primary.path ?? "/contact")}
            className="rounded-full bg-primary px-7 text-primary-foreground hover:bg-primary/90"
          >
            {homeContent.cta.primary.label}
          </Button>
          {homeContent.cta.secondary ? (
            <Button
              onClick={() => navigate(homeContent.cta.secondary?.path ?? "/projects")}
              variant="outline"
              className="rounded-full border-primary/20 bg-white px-7 text-primary"
            >
              {homeContent.cta.secondary.label}
            </Button>
          ) : null}
        </div>
      </section>
      </div>
    </div>
  );
}

export function AboutPage({ navigate }: { navigate: (path: string) => void }) {
  return (
    <div className="space-y-20 sm:space-y-24">
      <PageIntro
        eyebrow={aboutContent.hero.eyebrow}
        title={aboutContent.hero.title}
        description={aboutContent.hero.description}
        image={aboutContent.hero.image}
      />

      <div className="mx-auto max-w-[92rem] space-y-20 px-4 sm:px-6 lg:px-8 sm:space-y-24">
        <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary/60">About</p>
            <h2 className="font-editorial mt-4 text-5xl leading-[0.96] text-foreground sm:text-6xl">
              Building capacity with communities, not around them.
            </h2>
          </div>
          <div className="space-y-6 text-base leading-8 text-muted-foreground sm:text-lg">
            <p>{aboutContent.about.description}</p>
            <p>{aboutContent.ethos.description}</p>
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <ImageFrame image={aboutContent.hero.image} className="min-h-[31rem]" />
          <div className="border-t border-foreground/10 pt-6">
            <p className="text-sm uppercase tracking-[0.2em] text-primary/60">Our Approach</p>
            <h3 className="font-editorial mt-4 text-4xl text-foreground sm:text-5xl">
              {aboutContent.approach.title}
            </h3>
            <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">
              {aboutContent.approach.description}
            </p>
            <div className="mt-10 border-t border-foreground/10 pt-6">
              <p className="text-sm uppercase tracking-[0.2em] text-primary/60">
                Guiding Principles
              </p>
              <div className="mt-5 divide-y divide-border/70 border-y border-border/70">
                {aboutContent.guidingPrinciples.items.map((item) => (
                  <div key={item} className="py-4 text-base leading-8 text-foreground/78">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-10">
          <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <p className="text-sm uppercase tracking-[0.2em] text-primary/60">Meet the Team</p>
            <div>
              <h2 className="font-editorial text-5xl leading-[0.96] text-foreground sm:text-6xl">
                Experienced practitioners working across planning, governance, and implementation.
              </h2>
            </div>
          </div>
          <div className="space-y-14">
            {aboutContent.team.members.map((member, index) => (
              <article
                key={member.name}
                className="grid items-start gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:gap-14"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <img
                    src={member.image.src}
                    alt={member.image.alt}
                    className="h-[24rem] w-full object-cover object-top shadow-[0_22px_80px_rgba(29,39,31,0.12)] sm:h-[30rem]"
                  />
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <p className="text-sm uppercase tracking-[0.18em] text-primary/60">
                    {member.role}
                  </p>
                  <h3 className="font-editorial mt-4 text-4xl leading-tight text-foreground sm:text-5xl">
                    {member.name}
                  </h3>
                  <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">
                    {member.bio}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-border/70 py-8">
          <div className="grid items-center gap-5 lg:grid-cols-[0.6fr_1.4fr]">
            <p className="text-sm uppercase tracking-[0.2em] text-primary/60">Trusted Partners</p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {aboutContent.partnerLogos.map((logo) => (
                <div key={logo.name} className="flex items-center justify-center py-3 opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0">
                  <img src={logo.src} alt={logo.name} className="max-h-12 max-w-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-8 pb-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary/60">
              {aboutContent.partnersCta.eyebrow}
            </p>
            <h2 className="font-editorial mt-4 text-5xl leading-[0.96] text-foreground sm:text-6xl">
              {aboutContent.partnersCta.title}
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
              {aboutContent.partnersCta.description}
            </p>
          </div>
          <Button
            onClick={() => navigate(aboutContent.partnersCta.primary.path ?? "/contact")}
            className="rounded-full bg-primary px-7 text-primary-foreground hover:bg-primary/90"
          >
            {aboutContent.partnersCta.primary.label}
          </Button>
        </section>
      </div>
    </div>
  );
}

export function ServicesPage({ navigate }: { navigate: (path: string) => void }) {
  return (
    <div className="space-y-20 sm:space-y-24">
      <PageIntro
        eyebrow={servicesContent.hero.eyebrow}
        title={servicesContent.hero.title}
        description={servicesContent.hero.intro}
        image={servicesContent.hero.image}
      />

      <div className="mx-auto max-w-[92rem] space-y-20 px-4 sm:px-6 lg:px-8 sm:space-y-24">
        <section className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary/60">
              {servicesContent.sectionIntro.eyebrow}
            </p>
          </div>
          <div>
            <h2 className="font-editorial text-5xl leading-[0.96] text-foreground sm:text-6xl">
              {servicesContent.sectionIntro.title}
            </h2>
            <p className="mt-6 max-w-4xl text-base leading-8 text-muted-foreground sm:text-lg">
              {servicesContent.sectionIntro.description}
            </p>
          </div>
        </section>

        <section className="space-y-16">
          {servicesContent.services.map((service, index) => (
            <article
              key={service.title}
              className="border-t border-foreground/10 pt-8"
            >
              <div className="grid gap-8 lg:grid-cols-[0.48fr_0.52fr] lg:gap-16">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-primary/60">
                    Service {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-editorial mt-4 text-4xl leading-tight text-foreground sm:text-5xl">
                    {service.title}
                  </h3>
                  <p className="mt-5 text-base leading-8 text-foreground/80 sm:text-lg">
                    {service.summary}
                  </p>
                  <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-primary/70">
                    {service.cta}
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="space-y-5">
                    {service.description.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-base leading-8 text-muted-foreground"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="grid gap-3 border-t border-border/70 pt-6">
                    <p className="text-sm uppercase tracking-[0.18em] text-primary/60">
                      What We Offer
                    </p>
                    {service.offerings.map((offering) => (
                      <div
                        key={offering}
                        className="border-b border-border/70 pb-3 text-base leading-7 text-foreground/78"
                      >
                        {offering}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="grid gap-10 border-y border-border/70 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary/60">Track Record</p>
            <h2 className="font-editorial mt-4 text-5xl leading-[0.96] text-foreground sm:text-6xl">
              A service approach shaped by field experience and long-term systems thinking.
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
              We pair technical support with participatory practice so communities and institutions can move from planning to implementation with confidence.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
            {servicesContent.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-editorial text-5xl leading-none text-primary sm:text-6xl">
                  {stat.value}
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-foreground/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 pb-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary/60">
              Let's Work Together
            </p>
            <h2 className="font-editorial mt-4 text-5xl leading-[0.96] text-foreground sm:text-6xl">
              {servicesContent.bottomCta.title}
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
              {servicesContent.bottomCta.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => navigate(servicesContent.bottomCta.primary.path ?? "/contact")}
              className="rounded-full bg-primary px-7 text-primary-foreground hover:bg-primary/90"
            >
              {servicesContent.bottomCta.primary.label}
            </Button>
            {servicesContent.bottomCta.secondary ? (
              <Button
                onClick={() => navigate(servicesContent.bottomCta.secondary?.path ?? "/projects")}
                variant="outline"
                className="rounded-full border-primary/20 bg-white px-7 text-primary"
              >
                {servicesContent.bottomCta.secondary.label}
              </Button>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
}

export function ProjectsPage({
  navigate,
  projects,
}: {
  navigate: (path: string) => void;
  projects: Map<string, ProjectDetail>;
}) {
  return (
    <div className="space-y-20 sm:space-y-24">
      <PageIntro
        eyebrow={projectsContent.hero.eyebrow}
        title={projectsContent.hero.title}
        description={projectsContent.hero.intro}
        image={projectsContent.hero.image}
      />

      <div className="mx-auto max-w-[92rem] space-y-20 px-4 sm:px-6 lg:px-8 sm:space-y-24">
        {projectsContent.categories.map((category, categoryIndex) => {
          return (
            <section key={category.title} className="space-y-8 border-t border-foreground/10 pt-8">
              <div className="grid gap-6 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-primary/60">
                    Category {String(categoryIndex + 1).padStart(2, "0")}
                  </p>
                  <h2 className="font-editorial mt-4 text-5xl leading-[0.96] text-foreground sm:text-6xl">
                    {category.title}
                  </h2>
                </div>
                <p className="max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
                  Selected work demonstrating how community-led planning translates into measurable outcomes.
                </p>
              </div>

              <div className="space-y-12">
                {category.projectSlugs.map((slug, projectIndex) => {
                  const project = projects.get(`/projects/${slug}`);

                  if (!project) {
                    return null;
                  }

                  return (
                    <MotionCard
                      key={project.slug}
                      delay={projectIndex * 0.05}
                      className="grid items-center gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:gap-14"
                    >
                      <div className={projectIndex % 2 === 1 ? "lg:order-2" : ""}>
                        <img
                          src={getProjectImage(project).src}
                          alt={getProjectImage(project).alt}
                          className="h-[22rem] w-full object-cover shadow-[0_22px_80px_rgba(29,39,31,0.12)] sm:h-[28rem]"
                        />
                      </div>

                      <div className={projectIndex % 2 === 1 ? "lg:order-1" : ""}>
                        <p className="text-sm uppercase tracking-[0.18em] text-primary/60">
                          {project.category}
                        </p>
                        <h3 className="font-editorial mt-4 text-4xl leading-tight text-foreground sm:text-5xl">
                          {project.title}
                        </h3>
                        <p className="mt-4 text-sm uppercase tracking-[0.14em] text-foreground/56">
                          {project.location}
                        </p>
                        <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
                          {project.challenge}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-6">
                          {project.stats.slice(0, 3).map((stat) => (
                            <div key={stat.label}>
                              <p className="font-editorial text-4xl leading-none text-primary">
                                {stat.value}
                              </p>
                              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-foreground/60">
                                {stat.label}
                              </p>
                            </div>
                          ))}
                        </div>
                        <Button
                          onClick={() => navigate(`/projects/${project.slug}`)}
                          variant="link"
                          className="mt-8 h-auto p-0 text-base font-semibold text-primary"
                        >
                          Read the case study
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </MotionCard>
                  );
                })}
              </div>
            </section>
          );
        })}

        <section className="grid gap-8 pb-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary/60">Start Your Project</p>
            <h2 className="font-editorial mt-4 text-5xl leading-[0.96] text-foreground sm:text-6xl">
              {projectsContent.cta.title}
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
              {projectsContent.cta.description}
            </p>
          </div>
          <Button
            onClick={() => navigate(projectsContent.cta.primary.path ?? "/contact")}
            className="rounded-full bg-primary px-7 text-primary-foreground hover:bg-primary/90"
          >
            {projectsContent.cta.primary.label}
          </Button>
        </section>
      </div>
    </div>
  );
}

export function ProjectDetailPage({
  navigate,
  project,
}: {
  navigate: (path: string) => void;
  project: ProjectDetail;
}) {
  return (
    <div className="space-y-20 sm:space-y-24">
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[92rem] border-b border-foreground/10 pb-10">
        <button
          type="button"
          onClick={() => navigate("/projects")}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-primary/80"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
          Back to Projects
        </button>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-primary/60">
              {project.category}
            </p>
            <h1 className="font-editorial mt-4 max-w-5xl text-5xl leading-[0.96] text-foreground sm:text-6xl">
              {project.title}
            </h1>
            <p className="mt-5 text-base leading-8 text-foreground/76">
              {project.location} | {project.duration}
            </p>
            <div className="mt-10 overflow-hidden shadow-[0_22px_80px_rgba(29,39,31,0.12)]">
              <img
                src={getProjectImage(project).src}
                alt={getProjectImage(project).alt}
                className="h-[22rem] w-full object-cover"
              />
            </div>
          </div>

          <div className="grid gap-3">
            {project.stats.map((stat) => (
              <div
                key={stat.label}
                className="border-b border-border/70 pb-4"
              >
                <p className="font-editorial text-5xl leading-none text-primary">{stat.value}</p>
                <p className="mt-1 text-sm uppercase tracking-[0.15em] text-foreground/68">
                  {stat.label}
                </p>
              </div>
            ))}
            {(project.images?.length ?? 0) > 1 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {project.images?.slice(1, 3).map((image) => (
                  <div
                    key={image.src}
                    className="overflow-hidden"
                  >
                    <img src={image.src} alt={image.alt} className="h-40 w-full object-cover" />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        </div>
      </section>

      <div className="mx-auto max-w-[92rem] space-y-20 px-4 sm:px-6 lg:px-8 sm:space-y-24">
        <section className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="border-t border-foreground/10 pt-6">
            <p className="text-sm uppercase tracking-[0.2em] text-primary/60">The Challenge</p>
            <h2 className="font-editorial mt-4 text-4xl text-foreground sm:text-5xl">
              The challenge we needed to solve.
            </h2>
            <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">
              {project.challenge}
            </p>
          </div>

          <div className="border-t border-foreground/10 pt-6">
            <p className="text-sm uppercase tracking-[0.2em] text-primary/60">Our Approach</p>
            <h2 className="font-editorial mt-4 text-4xl text-foreground sm:text-5xl">
              How we supported implementation.
            </h2>
            <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">
              {project.approach}
            </p>
          </div>
        </section>

        <section className="space-y-8 border-t border-foreground/10 pt-8">
          <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <p className="text-sm uppercase tracking-[0.2em] text-primary/60">Outcomes and Impact</p>
            <div>
              <h2 className="font-editorial text-5xl leading-[0.96] text-foreground sm:text-6xl">
                What changed through the work.
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
                Results documented through delivery, coordination, and local institutional strengthening.
              </p>
            </div>
          </div>
          <div className="divide-y divide-border/70 border-y border-border/70">
            {project.outcomes.map((outcome) => (
              <div key={outcome} className="py-5 text-base leading-8 text-foreground/78">
                {outcome}
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 pb-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary/60">Next Step</p>
            <h2 className="font-editorial mt-4 text-5xl leading-[0.96] text-foreground sm:text-6xl">
              Start your project
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
              Every community has unique strengths. Let's discover yours together.
            </p>
          </div>
          <Button
            onClick={() => navigate("/contact")}
            className="rounded-full bg-primary px-7 text-primary-foreground hover:bg-primary/90"
          >
            Work With Us
          </Button>
        </section>
      </div>
    </div>
  );
}

export function ContactPage({ navigate }: { navigate: (path: string) => void }) {
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(contactContent.consultationTopics[0] ?? "");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = `Consultation Request: ${topic}`;
    const body = [
      `Name: ${name}`,
      `Organization: ${organization}`,
      `Email: ${email}`,
      `Topic: ${topic}`,
      "",
      "Project details:",
      message,
    ].join("\n");

    const emailLink =
      contactContent.channels.find((channel) => channel.title === "Email")?.value ??
      "hello@growthsolutions.example";

    window.location.href = `mailto:${emailLink}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="space-y-20 sm:space-y-24">
      <PageIntro
        eyebrow={contactContent.hero.eyebrow}
        title={contactContent.hero.title}
        description={contactContent.hero.description}
        image={contactContent.hero.image}
      />

      <div className="mx-auto max-w-[92rem] space-y-20 px-4 sm:px-6 lg:px-8 sm:space-y-24">
        <section className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div className="space-y-8">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-primary/60">Get In Touch</p>
              <h2 className="font-editorial mt-4 text-5xl leading-[0.96] text-foreground sm:text-6xl">
                {contactContent.officeNote.title}
              </h2>
              <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
                {contactContent.officeNote.description}
              </p>
            </div>

            <div className="divide-y divide-border/70 border-y border-border/70">
              {contactContent.channels.map((channel) => (
                <a
                  key={channel.title}
                  href={channel.href}
                  className="block py-5 transition hover:text-primary"
                >
                  <p className="text-sm uppercase tracking-[0.16em] text-primary/60">
                    {channel.title}
                  </p>
                  <p className="font-editorial mt-2 text-3xl text-foreground sm:text-4xl">
                    {channel.value}
                  </p>
                  <p className="mt-3 text-base leading-8 text-muted-foreground">
                    {channel.note}
                  </p>
                </a>
              ))}
            </div>
          </div>

          <div className="border-t border-foreground/10 pt-6">
            <p className="text-sm uppercase tracking-[0.2em] text-primary/60">Inquiry Form</p>
            <h3 className="font-editorial mt-4 text-4xl text-foreground sm:text-5xl">
              Draft an email with your project details.
            </h3>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
              This form opens your mail app with the details prefilled. Update the email address in contact.json whenever you're ready.
            </p>

            <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                className="rounded-none border border-border bg-white px-4 py-3 outline-none transition focus:border-primary"
                required
              />
              <input
                value={organization}
                onChange={(event) => setOrganization(event.target.value)}
                placeholder="Organization"
                className="rounded-none border border-border bg-white px-4 py-3 outline-none transition focus:border-primary"
              />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                className="rounded-none border border-border bg-white px-4 py-3 outline-none transition focus:border-primary"
                required
              />
              <select
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                className="rounded-none border border-border bg-white px-4 py-3 outline-none transition focus:border-primary"
              >
                {contactContent.consultationTopics.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Tell us about your project, timeline, or support needed."
                className="min-h-40 rounded-none border border-border bg-white px-4 py-3 outline-none transition focus:border-primary"
                required
              />
              <div className="flex flex-wrap gap-3">
                <Button type="submit" className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90">
                  <Mail className="mr-2 h-4 w-4" />
                  Draft Email
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full border-primary/20 bg-white px-6 text-primary"
                  onClick={() => {
                    const whatsappLink = contactContent.channels[1]?.href;

                    if (whatsappLink) {
                      window.open(whatsappLink, "_blank", "noopener,noreferrer");
                    }
                  }}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Open WhatsApp
                </Button>
              </div>
            </form>
          </div>
        </section>

        <section className="grid gap-8 border-y border-border/70 py-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <p className="text-sm uppercase tracking-[0.2em] text-primary/60">Good Starting Points</p>
          <div>
            <h2 className="font-editorial text-5xl leading-[0.96] text-foreground sm:text-6xl">
              Topics we can help you think through.
            </h2>
            <div className="mt-8 divide-y divide-border/70 border-y border-border/70">
              {contactContent.consultationTopics.map((item) => (
                <div key={item} className="py-4 text-base leading-8 text-foreground/78">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-8 pb-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary/60">Next Step</p>
            <h2 className="font-editorial mt-4 text-5xl leading-[0.96] text-foreground sm:text-6xl">
              {contactContent.cta.title}
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
              {contactContent.cta.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => navigate(contactContent.cta.primary.path ?? "/services")}
              className="rounded-full bg-primary px-7 text-primary-foreground hover:bg-primary/90"
            >
              {contactContent.cta.primary.label}
            </Button>
            {contactContent.cta.secondary ? (
              <Button
                onClick={() => navigate(contactContent.cta.secondary?.path ?? "/projects")}
                variant="outline"
                className="rounded-full border-primary/20 bg-white px-7 text-primary"
              >
                {contactContent.cta.secondary.label}
              </Button>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
}

export function NotFoundPage({ navigate }: { navigate: (path: string) => void }) {
  return (
    <section className="rounded-[2.25rem] border border-border/60 bg-white/80 p-10 text-center shadow-[0_24px_80px_rgba(35,42,31,0.12)]">
      <p className="text-sm uppercase tracking-[0.18em] text-primary/60">
        Page not found
      </p>
      <h1 className="mt-3 text-4xl font-semibold text-foreground">
        This route does not have content yet.
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
        The site is reading from page-specific JSON files. If you add another page
        later, we can wire another route to it just as cleanly.
      </p>
      <Button
        onClick={() => navigate("/")}
        className="mt-8 rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90"
      >
        Return Home
      </Button>
    </section>
  );
}
