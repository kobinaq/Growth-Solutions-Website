import { ArrowRight, ChevronRight, Mail, Phone } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  aboutContent,
  contactContent,
  homeContent,
  projectsContent,
  servicesContent,
} from "@/site/content";
import type { CtaLink, ImageAsset, ProjectDetail, ProjectListItem } from "@/site/types";
import { FadeIn, ImagePanel, PageBand, SectionLabel, isExternalLink } from "@/site/ui";

const getProjectImage = (project: ProjectDetail | ProjectListItem): ImageAsset => {
  if ("image" in project) {
    return project.image;
  }

  return (
    project.images?.[0] ?? {
      src: "/projects/agroforestry-1.jpg",
      alt: `${project.title} project image`,
    }
  );
};

function ActionButton({
  action,
  navigate,
  tone = "dark",
  secondary = false,
  className,
}: {
  action: CtaLink;
  navigate: (path: string) => void;
  tone?: "dark" | "cream";
  secondary?: boolean;
  className?: string;
}) {
  const classes = cn(
    "site-label inline-flex items-center gap-2 rounded-[16px] px-5 py-4",
    tone === "dark"
      ? secondary
        ? "border border-black/15 bg-transparent text-[var(--color-black)] hover:bg-black/5"
        : "border border-[var(--color-cream)] bg-[var(--color-cream)] text-white hover:opacity-90"
      : secondary
        ? "border border-white/20 bg-transparent text-white hover:bg-white/10"
        : "border border-white bg-white text-[var(--color-cream)] hover:opacity-90",
    className
  );

  const content = (
    <>
      <span>{action.label}</span>
      <ArrowRight className="h-4 w-4" />
    </>
  );

  if (action.path) {
    return (
      <Button onClick={() => navigate(action.path ?? "/")} className={classes}>
        {content}
      </Button>
    );
  }

  return (
    <Button asChild className={classes}>
      <a
        href={action.href ?? "#"}
        target={isExternalLink(action.href) ? "_blank" : undefined}
        rel={isExternalLink(action.href) ? "noreferrer" : undefined}
      >
        {content}
      </a>
    </Button>
  );
}

function StatRow({
  stats,
  tone = "dark",
  className,
}: {
  stats: Array<{ value: string; label: string }>;
  tone?: "dark" | "cream";
  className?: string;
}) {
  const labelClass = tone === "dark" ? "text-black/55" : "text-white/70";
  const valueClass = tone === "dark" ? "text-[var(--color-black)]" : "text-white";

  return (
    <div className={cn("grid gap-6 sm:grid-cols-3", className)}>
      {stats.map((stat) => (
        <div key={stat.label} className="border-t border-current/10 pt-4">
          <p className={cn("site-title-md", valueClass)}>{stat.value}</p>
          <p className={cn("site-label mt-3", labelClass)}>{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

function FeaturedProject({
  project,
  category,
  navigate,
  tone = "cream",
  reversed = false,
}: {
  project: ProjectListItem & { category?: string };
  category: string;
  navigate: (path: string) => void;
  tone?: "dark" | "cream";
  reversed?: boolean;
}) {
  const textTone = tone === "dark" ? "text-[var(--color-black)]" : "text-white";
  const mutedTone = tone === "dark" ? "text-black/60" : "text-white/72";
  const imagePanelClass =
    tone === "dark"
      ? "border-black/10 bg-black/[0.03]"
      : "border-white/15 bg-white/8";

  return (
    <FadeIn
      className={cn(
        "grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12",
        reversed && "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
      )}
    >
      <ImagePanel image={getProjectImage(project)} className={cn("h-[300px] md:h-[380px]", imagePanelClass)} />
      <div className={textTone}>
        <SectionLabel className={mutedTone}>{project.category ?? category}</SectionLabel>
        <h3 className="site-title-lg mt-5">{project.title}</h3>
        {project.description ? (
          <p className={cn("site-copy-md mt-6 max-w-2xl", mutedTone)}>{project.description}</p>
        ) : null}
        {project.stats?.length ? (
          <StatRow
            stats={project.stats}
            tone={tone}
            className="mt-8 sm:grid-cols-2"
          />
        ) : null}
        {project.slug ? (
          <Button
            onClick={() => navigate(`/projects/${project.slug}`)}
            variant="link"
            className={cn(
              "site-label mt-8 inline-flex items-center gap-2 p-0",
              tone === "dark" ? "text-[var(--color-black)]" : "text-white"
            )}
          >
            Read project
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : null}
      </div>
    </FadeIn>
  );
}

function PageHero({
  eyebrow,
  title,
  description,
  image,
  actions,
  children,
}: {
  eyebrow?: string;
  title: string;
  description: string | string[];
  image: ImageAsset;
  actions?: ReactNode;
  children?: ReactNode;
}) {
  const paragraphs = Array.isArray(description) ? description : [description];

  return (
    <section className="relative isolate flex min-h-[72vh] w-full items-end overflow-hidden bg-[var(--color-black)] text-white md:min-h-[78vh] lg:min-h-[84vh]">
      <img
        src={image.src}
        alt={image.alt}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(11,16,18,0.94)_14%,rgba(11,16,18,0.74)_42%,rgba(11,16,18,0.24)_72%,rgba(11,16,18,0.1)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,16,18,0.18)_0%,rgba(11,16,18,0.16)_44%,rgba(11,16,18,0.78)_100%)]" />

      <div className="site-shell relative z-10 w-full py-16 md:py-20 lg:py-24">
        <FadeIn className="max-w-4xl">
          {eyebrow ? <SectionLabel className="text-white/72">{eyebrow}</SectionLabel> : null}
          <h1 className="site-title-xl mt-6 max-w-5xl text-white">{title}</h1>
          <div className="mt-8 max-w-3xl space-y-4">
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="site-copy-lg text-white/84">
                {paragraph}
              </p>
            ))}
          </div>
          {actions ? <div className="mt-10 flex flex-wrap gap-3">{actions}</div> : null}
          {children ? <div className="mt-14 max-w-3xl">{children}</div> : null}
        </FadeIn>
      </div>
    </section>
  );
}

export function HomePage({ navigate }: { navigate: (path: string) => void }) {
  return (
    <div>
      <PageHero
        eyebrow={homeContent.hero.eyebrow || undefined}
        title={homeContent.hero.title}
        description={homeContent.hero.description}
        image={homeContent.hero.image}
        actions={
          <>
            <ActionButton action={homeContent.hero.primaryCta} navigate={navigate} tone="cream" />
            {homeContent.hero.secondaryCta ? (
              <ActionButton
                action={homeContent.hero.secondaryCta}
                navigate={navigate}
                tone="cream"
                secondary
              />
            ) : null}
          </>
        }
      >
        <StatRow stats={homeContent.impactStats} tone="cream" />
      </PageHero>

      <PageBand tone="cream">
        <div className="grid gap-10 lg:grid-cols-[0.38fr_1.62fr]">
          <FadeIn>
            <SectionLabel className="text-white/70">{homeContent.partners.title}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.04}>
            <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-6">
              {homeContent.partners.logos.map((logo) => (
                <div
                  key={logo.name}
                  className="flex min-h-[96px] items-center justify-center rounded-[16px] border border-white/20 bg-white px-5 py-6"
                >
                  <img src={logo.src} alt={logo.name} className="max-h-12 w-auto max-w-full object-contain" />
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </PageBand>

      <PageBand tone="dark">
        <div className="grid gap-10 lg:grid-cols-[0.42fr_1.58fr]">
          <FadeIn>
            <SectionLabel className="text-black/55">{homeContent.manifesto.eyebrow}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="site-title-lg max-w-5xl">{homeContent.manifesto.title}</h2>
            <div className="mt-8 max-w-4xl space-y-5">
              {homeContent.manifesto.paragraphs.map((paragraph) => (
                <p key={paragraph} className="site-copy-md text-black/68">
                  {paragraph}
                </p>
              ))}
            </div>
          </FadeIn>
        </div>
      </PageBand>

      <PageBand tone="cream">
        <div className="grid gap-10 lg:grid-cols-[0.42fr_1.58fr]">
          <FadeIn>
            <SectionLabel className="text-white/70">Process</SectionLabel>
            <h2 className="site-title-lg mt-5">{homeContent.process.title}</h2>
          </FadeIn>
          <div className="grid gap-4">
            {homeContent.process.steps.map((step, index) => (
              <FadeIn
                key={step.title}
                delay={index * 0.04}
                className="grid gap-4 rounded-[16px] border border-white/15 bg-white/10 p-6 md:grid-cols-[120px_1fr]"
              >
                <p className="site-label text-white/70">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div>
                  <h3 className="site-title-md">{step.title}</h3>
                  <p className="site-copy-sm mt-4 max-w-3xl text-white/72">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </PageBand>

      <PageBand tone="grey">
        <div className="grid gap-10 lg:grid-cols-[0.42fr_1.58fr]">
          <FadeIn>
            <SectionLabel className="text-black/55">Focus Areas</SectionLabel>
            <h2 className="site-title-lg mt-5">{homeContent.focusAreas.title}</h2>
            <p className="site-copy-md mt-6 max-w-md text-black/65">
              {homeContent.focusAreas.intro}
            </p>
          </FadeIn>
          <div className="grid gap-3">
            {homeContent.focusAreas.items.map((item, index) => (
              <FadeIn
                key={item.title}
                delay={index * 0.04}
                className="grid gap-4 rounded-[16px] border border-black/10 bg-black/[0.03] p-6 md:grid-cols-[0.75fr_1.25fr]"
              >
                <h3 className="site-title-md">{item.title}</h3>
                <p className="site-copy-sm text-black/65">{item.description}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </PageBand>

      <PageBand tone="cream">
        <FadeIn>
          <SectionLabel className="text-white/70">Featured Work</SectionLabel>
          <h2 className="site-title-lg mt-5 max-w-4xl">{homeContent.featuredProjects.title}</h2>
          <p className="site-copy-md mt-6 max-w-3xl text-white/72">
            {homeContent.featuredProjects.description}
          </p>
        </FadeIn>
        <div className="mt-12 grid gap-14">
          {homeContent.featuredProjects.items.map((project, index) => (
            <FeaturedProject
              key={`${project.category}-${project.title}`}
              project={project}
              category={project.category}
              navigate={navigate}
              tone="cream"
              reversed={index % 2 === 1}
            />
          ))}
        </div>
      </PageBand>

      <PageBand tone="dark">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <FadeIn>
            <SectionLabel className="text-black/55">{homeContent.impactStatement.eyebrow}</SectionLabel>
            <h2 className="site-title-lg mt-5 max-w-5xl">{homeContent.impactStatement.title}</h2>
          </FadeIn>
          <FadeIn delay={0.05}>
            <p className="site-copy-md max-w-xl text-black/65">
              {homeContent.impactStatement.description}
            </p>
            <StatRow stats={homeContent.impactStats} className="mt-10" />
          </FadeIn>
        </div>
      </PageBand>

      <PageBand tone="cream">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <FadeIn>
            <SectionLabel className="text-white/70">Next Step</SectionLabel>
            <h2 className="site-title-lg mt-5">{homeContent.cta.title}</h2>
            <p className="site-copy-md mt-6 max-w-3xl text-white/72">
              {homeContent.cta.description}
            </p>
          </FadeIn>
          <FadeIn delay={0.05} className="flex flex-wrap gap-3">
            <ActionButton action={homeContent.cta.primary} navigate={navigate} tone="cream" />
            {homeContent.cta.secondary ? (
              <ActionButton
                action={homeContent.cta.secondary}
                navigate={navigate}
                tone="cream"
                secondary
              />
            ) : null}
          </FadeIn>
        </div>
      </PageBand>
    </div>
  );
}

export function AboutPage({ navigate }: { navigate: (path: string) => void }) {
  return (
    <div>
      <PageHero
        eyebrow={aboutContent.hero.eyebrow}
        title={aboutContent.hero.title}
        description={aboutContent.hero.description}
        image={aboutContent.hero.image}
      />

      <PageBand tone="cream">
        <div className="grid gap-12 lg:grid-cols-2">
          <FadeIn>
            <SectionLabel className="text-white/70">About</SectionLabel>
            <h2 className="site-title-lg mt-5">{aboutContent.about.title}</h2>
            <p className="site-copy-md mt-6 max-w-3xl text-white/72">
              {aboutContent.about.description}
            </p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <SectionLabel className="text-white/70">{aboutContent.ethos.title}</SectionLabel>
            <p className="site-copy-md mt-5 max-w-3xl text-white/72">
              {aboutContent.ethos.description}
            </p>
          </FadeIn>
        </div>
      </PageBand>

      <PageBand tone="grey">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr]">
          <FadeIn>
            <SectionLabel className="text-black/55">{aboutContent.approach.title}</SectionLabel>
            <h2 className="site-title-lg mt-5">{aboutContent.hero.title}</h2>
            <p className="site-copy-md mt-6 max-w-2xl text-black/65">
              {aboutContent.approach.description}
            </p>
          </FadeIn>
          <div className="grid gap-3">
            <FadeIn delay={0.05}>
              <SectionLabel className="text-black/55">{aboutContent.guidingPrinciples.title}</SectionLabel>
            </FadeIn>
            {aboutContent.guidingPrinciples.items.map((item, index) => (
              <FadeIn
                key={item}
                delay={0.08 + index * 0.03}
                className="rounded-[16px] border border-black/10 bg-black/[0.03] px-5 py-5"
              >
                <p className="site-copy-sm text-black/68">{item}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </PageBand>

      <PageBand tone="cream">
        <FadeIn>
          <SectionLabel className="text-white/70">{aboutContent.team.title}</SectionLabel>
          <h2 className="site-title-lg mt-5 max-w-4xl">
            Building capacity. Empowering communities.
          </h2>
        </FadeIn>
        <div className="mt-12 grid gap-14">
          {aboutContent.team.members.map((member, index) => (
            <FadeIn
              key={member.name}
              delay={index * 0.04}
              className={cn(
                "grid items-start gap-8 lg:grid-cols-[0.86fr_1.14fr]",
                index % 2 === 1 && "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
              )}
            >
              <ImagePanel
                image={member.image}
                className="group aspect-square w-full border-white/15 bg-white/8"
                imgClassName="object-cover object-[center_18%] grayscale transition duration-500 ease-out group-hover:grayscale-0"
              />
              <div>
                <SectionLabel className="text-white/70">{member.role}</SectionLabel>
                <h3 className="site-title-md mt-5">{member.name}</h3>
                <p className="site-copy-md mt-6 max-w-3xl text-white/72">{member.bio}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </PageBand>

      <PageBand tone="dark">
        <div className="grid gap-10 lg:grid-cols-[0.35fr_1.65fr]">
          <FadeIn>
            <SectionLabel className="text-black/55">Partners</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.04}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {aboutContent.partnerLogos.map((logo) => (
                <div
                  key={logo.name}
                  className="flex min-h-[96px] items-center justify-center rounded-[16px] border border-black/10 bg-white px-5 py-6"
                >
                  <img src={logo.src} alt={logo.name} className="max-h-12 w-auto max-w-full object-contain" />
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </PageBand>

      <PageBand tone="grey">
        <div className="grid gap-10 lg:grid-cols-[0.42fr_1.58fr]">
          <FadeIn>
            <SectionLabel className="text-black/55">{aboutContent.clients.title}</SectionLabel>
            <h2 className="site-title-lg mt-5 max-w-4xl">{aboutContent.clients.description}</h2>
          </FadeIn>
          <div className="grid gap-3">
            {aboutContent.clients.items.map((item, index) => (
              <FadeIn
                key={item}
                delay={index * 0.03}
                className="rounded-[16px] border border-black/10 bg-black/[0.03] px-5 py-5"
              >
                <p className="site-copy-sm text-black/68">{item}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </PageBand>

      <PageBand tone="cream">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <FadeIn>
            <SectionLabel className="text-white/70">{aboutContent.partnersCta.eyebrow}</SectionLabel>
            <h2 className="site-title-lg mt-5">{aboutContent.partnersCta.title}</h2>
            <p className="site-copy-md mt-6 max-w-3xl text-white/72">
              {aboutContent.partnersCta.description}
            </p>
          </FadeIn>
          <FadeIn delay={0.04}>
            <ActionButton action={aboutContent.partnersCta.primary} navigate={navigate} tone="cream" />
          </FadeIn>
        </div>
      </PageBand>
    </div>
  );
}

export function ServicesPage({ navigate }: { navigate: (path: string) => void }) {
  return (
    <div>
      <PageHero
        eyebrow={servicesContent.hero.eyebrow}
        title={servicesContent.hero.title}
        description={servicesContent.hero.intro}
        image={servicesContent.hero.image}
        actions={
          <>
            <ActionButton action={servicesContent.hero.primaryCta} navigate={navigate} tone="cream" />
            <ActionButton
              action={servicesContent.hero.secondaryCta}
              navigate={navigate}
              tone="cream"
              secondary
            />
          </>
        }
      />

      <PageBand tone="cream">
        <div className="grid gap-10 lg:grid-cols-[0.42fr_1.58fr]">
          <FadeIn>
            <SectionLabel className="text-white/70">{servicesContent.sectionIntro.eyebrow}</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="site-title-lg max-w-5xl">{servicesContent.sectionIntro.title}</h2>
            <p className="site-copy-md mt-6 max-w-4xl text-white/72">
              {servicesContent.sectionIntro.description}
            </p>
          </FadeIn>
        </div>
      </PageBand>

      {servicesContent.services.map((service, index) => {
        const tone = index % 2 === 0 ? "dark" : "cream";
        const labelColor = tone === "dark" ? "text-black/55" : "text-white/70";
        const bodyColor = tone === "dark" ? "text-black/65" : "text-white/72";
        const cardClass =
          tone === "dark"
            ? "border-black/10 bg-black/[0.03]"
            : "border-white/15 bg-white/10";

        return (
          <PageBand key={service.title} tone={tone}>
            <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
              <FadeIn>
                <SectionLabel className={labelColor}>{service.title}</SectionLabel>
                <h2 className="site-title-lg mt-5 max-w-3xl">{service.summary}</h2>
                <p className={cn("site-copy-sm mt-6", labelColor)}>{service.cta}</p>
              </FadeIn>
              <div className="grid gap-5">
                <FadeIn delay={0.04} className="space-y-5">
                  {service.description.map((paragraph) => (
                    <p key={paragraph} className={cn("site-copy-md", bodyColor)}>
                      {paragraph}
                    </p>
                  ))}
                </FadeIn>
                <FadeIn delay={0.08} className={cn("rounded-[16px] border p-6", cardClass)}>
                  <SectionLabel className={labelColor}>What We Offer</SectionLabel>
                  <div className="mt-5 grid gap-3">
                    {service.offerings.map((offering) => (
                      <div key={offering} className="border-t border-current/10 pt-3">
                        <p className={cn("site-copy-sm", bodyColor)}>{offering}</p>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              </div>
            </div>
          </PageBand>
        );
      })}

      <PageBand tone="grey">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <FadeIn>
            <SectionLabel className="text-black/55">Track Record</SectionLabel>
            <h2 className="site-title-lg mt-5 max-w-4xl">
              A service approach shaped by field experience and long-term systems thinking.
            </h2>
          </FadeIn>
          <FadeIn delay={0.05}>
            <StatRow stats={servicesContent.stats} />
          </FadeIn>
        </div>
      </PageBand>

      <PageBand tone="cream">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <FadeIn>
            <SectionLabel className="text-white/70">Next Step</SectionLabel>
            <h2 className="site-title-lg mt-5">{servicesContent.bottomCta.title}</h2>
            <p className="site-copy-md mt-6 max-w-3xl text-white/72">
              {servicesContent.bottomCta.description}
            </p>
          </FadeIn>
          <FadeIn delay={0.04} className="flex flex-wrap gap-3">
            <ActionButton action={servicesContent.bottomCta.primary} navigate={navigate} tone="cream" />
            {servicesContent.bottomCta.secondary ? (
              <ActionButton
                action={servicesContent.bottomCta.secondary}
                navigate={navigate}
                tone="cream"
                secondary
              />
            ) : null}
          </FadeIn>
        </div>
      </PageBand>
    </div>
  );
}

export function ProjectsPage({ navigate }: { navigate: (path: string) => void }) {
  return (
    <div>
      <PageHero
        eyebrow={projectsContent.hero.eyebrow}
        title={projectsContent.hero.title}
        description={projectsContent.hero.intro}
        image={projectsContent.hero.image}
      />

      {projectsContent.categories.map((category, index) => {
        const tone = index % 2 === 0 ? "cream" : "grey";

        return (
          <PageBand key={category.title} tone={tone}>
            <FadeIn>
              <SectionLabel className={tone === "cream" ? "text-white/70" : "text-black/55"}>
                {category.title}
              </SectionLabel>
              <h2 className="site-title-lg mt-5">{category.title}</h2>
            </FadeIn>
            <div className="mt-12 grid gap-14">
              {category.projects.map((project, projectIndex) => (
                <FeaturedProject
                  key={`${category.title}-${project.title}`}
                  project={project}
                  category={category.title}
                  navigate={navigate}
                  tone={tone === "cream" ? "cream" : "dark"}
                  reversed={projectIndex % 2 === 1}
                />
              ))}
            </div>
          </PageBand>
        );
      })}

      <PageBand tone="dark">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <FadeIn>
            <SectionLabel className="text-black/55">Next Step</SectionLabel>
            <h2 className="site-title-lg mt-5">{projectsContent.cta.title}</h2>
            <p className="site-copy-md mt-6 max-w-3xl text-black/65">
              {projectsContent.cta.description}
            </p>
          </FadeIn>
          <FadeIn delay={0.04}>
            <ActionButton action={projectsContent.cta.primary} navigate={navigate} />
          </FadeIn>
        </div>
      </PageBand>
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
    <div>
      <PageBand tone="dark" className="pt-6">
        <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr]">
          <FadeIn>
            <Button
              onClick={() => navigate("/projects")}
              variant="link"
              className="site-label inline-flex items-center gap-2 p-0 text-black/55"
            >
              <ChevronRight className="h-4 w-4 rotate-180" />
              Back to projects
            </Button>
            <SectionLabel className="mt-10 text-black/55">{project.category}</SectionLabel>
            <h1 className="site-title-xl mt-5 max-w-5xl">{project.title}</h1>
            <p className="site-copy-sm mt-6 text-black/60">
              {project.location} | {project.duration}
            </p>
            {project.stats.length ? <StatRow stats={project.stats} className="mt-10" /> : null}
          </FadeIn>
          <FadeIn delay={0.08}>
            <ImagePanel image={getProjectImage(project)} className="h-[420px] border-black/10 bg-black/[0.03] md:h-[560px]" />
          </FadeIn>
        </div>
      </PageBand>

      <PageBand tone="cream">
        <div className="grid gap-10 lg:grid-cols-2">
          <FadeIn className="rounded-[16px] border border-white/15 bg-white/10 p-6">
            <SectionLabel className="text-white/70">The Challenge</SectionLabel>
            <p className="site-copy-md mt-5 text-white/72">{project.challenge}</p>
          </FadeIn>
          <FadeIn delay={0.04} className="rounded-[16px] border border-white/15 bg-white/10 p-6">
            <SectionLabel className="text-white/70">Our Approach</SectionLabel>
            <p className="site-copy-md mt-5 text-white/72">{project.approach}</p>
          </FadeIn>
        </div>
      </PageBand>

      <PageBand tone="grey">
        <FadeIn>
          <SectionLabel className="text-black/55">Outcomes and Impact</SectionLabel>
          <h2 className="site-title-lg mt-5">What changed through the work.</h2>
        </FadeIn>
        <div className="mt-10 grid gap-3">
          {project.outcomes.map((outcome, index) => (
            <FadeIn
              key={outcome}
              delay={index * 0.03}
              className="rounded-[16px] border border-black/10 bg-black/[0.03] px-5 py-5"
            >
              <p className="site-copy-sm text-black/68">{outcome}</p>
            </FadeIn>
          ))}
        </div>
      </PageBand>

      <PageBand tone="cream">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <FadeIn>
            <SectionLabel className="text-white/70">Next Step</SectionLabel>
            <h2 className="site-title-lg mt-5">Start your project</h2>
            <p className="site-copy-md mt-6 max-w-3xl text-white/72">
              Every community has unique strengths. Let&apos;s discover yours together.
            </p>
          </FadeIn>
          <FadeIn delay={0.04}>
            <ActionButton action={{ label: "Work With Us", path: "/contact" }} navigate={navigate} tone="cream" />
          </FadeIn>
        </div>
      </PageBand>
    </div>
  );
}

export function ContactPage({ navigate }: { navigate: (path: string) => void }) {
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(contactContent.consultationTopics[0] ?? "");
  const [message, setMessage] = useState("");
  const quickContact =
    contactContent.channels.find((channel) => channel.title === "Mobile") ??
    contactContent.channels.find((channel) => channel.title === "Telephone");

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
      "naadedeiagbey@gmail.com";

    window.location.href = `mailto:${emailLink}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div>
      <PageHero
        eyebrow={contactContent.hero.eyebrow}
        title={contactContent.hero.title}
        description={contactContent.hero.description}
        image={contactContent.hero.image}
      />

      <PageBand tone="cream">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <FadeIn>
            <SectionLabel className="text-white/70">Get in Touch</SectionLabel>
            <h2 className="site-title-lg mt-5">{contactContent.officeNote.title}</h2>
            <p className="site-copy-md mt-6 max-w-2xl text-white/72">
              {contactContent.officeNote.description}
            </p>
            <div className="mt-10 grid gap-3">
              {contactContent.channels.map((channel, index) => (
                <FadeIn
                  key={channel.title}
                  delay={index * 0.03}
                  className="rounded-[16px] border border-white/15 bg-white/10 px-5 py-5"
                >
                  <a
                    href={channel.href}
                    target={isExternalLink(channel.href) ? "_blank" : undefined}
                    rel={isExternalLink(channel.href) ? "noreferrer" : undefined}
                    className="block"
                  >
                    <SectionLabel className="text-white/70">{channel.title}</SectionLabel>
                    <p className="site-title-md mt-4">{channel.value}</p>
                    <p className="site-copy-sm mt-4 text-white/72">{channel.note}</p>
                  </a>
                </FadeIn>
              ))}
            </div>
          </FadeIn>

          <FadeIn
            delay={0.05}
            className="rounded-[16px] border border-white/15 bg-white/10 p-6 text-white md:p-8"
          >
            <SectionLabel className="text-white/70">Inquiry Form</SectionLabel>
            <h3 className="site-title-md mt-5">Draft an email with your project details.</h3>
            <p className="site-copy-sm mt-5 max-w-2xl text-white/72">
              This form opens your mail app with the details prefilled. Update the
              email address in `contact.json` whenever you&apos;re ready.
            </p>

            <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                className="rounded-[16px] border border-white/10 bg-white/5 px-4 py-4 text-white outline-none placeholder:text-white/35 focus:border-white/30"
                required
              />
              <input
                value={organization}
                onChange={(event) => setOrganization(event.target.value)}
                placeholder="Organization"
                className="rounded-[16px] border border-white/10 bg-white/5 px-4 py-4 text-white outline-none placeholder:text-white/35 focus:border-white/30"
              />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                className="rounded-[16px] border border-white/10 bg-white/5 px-4 py-4 text-white outline-none placeholder:text-white/35 focus:border-white/30"
                required
              />
              <select
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                className="rounded-[16px] border border-white/10 bg-white/5 px-4 py-4 text-white outline-none focus:border-white/30"
              >
                {contactContent.consultationTopics.map((item) => (
                  <option key={item} value={item} className="text-black">
                    {item}
                  </option>
                ))}
              </select>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Tell us about your project, timeline, or support needed."
                className="min-h-40 rounded-[16px] border border-white/10 bg-white/5 px-4 py-4 text-white outline-none placeholder:text-white/35 focus:border-white/30"
                required
              />
              <div className="flex flex-wrap gap-3">
                <Button
                  type="submit"
                  className="site-label inline-flex items-center gap-2 rounded-[16px] border border-white bg-white px-5 py-4 text-[var(--color-cream)] hover:opacity-90"
                >
                  <Mail className="h-4 w-4" />
                  Draft Email
                </Button>
                {quickContact?.href ? (
                  <Button
                    type="button"
                    variant="outline"
                    className="site-label inline-flex items-center gap-2 rounded-[16px] border border-white/20 bg-transparent px-5 py-4 text-white hover:bg-white/10"
                    onClick={() => {
                      window.location.href = quickContact.href;
                    }}
                  >
                    <Phone className="h-4 w-4" />
                    Call {quickContact.title}
                  </Button>
                ) : null}
              </div>
            </form>
          </FadeIn>
        </div>
      </PageBand>

    </div>
  );
}

export function NotFoundPage({ navigate }: { navigate: (path: string) => void }) {
  return (
    <PageBand tone="dark">
      <div className="grid gap-10 rounded-[16px] border border-black/10 bg-black/[0.03] p-8 md:p-10">
        <FadeIn>
          <SectionLabel className="text-black/55">Page not found</SectionLabel>
          <h1 className="site-title-lg mt-5">This route does not have content yet.</h1>
          <p className="site-copy-md mt-6 max-w-2xl text-black/65">
            The site is reading from page-specific JSON files. If you add another
            page later, we can wire another route to it just as cleanly.
          </p>
        </FadeIn>
        <FadeIn delay={0.04}>
          <ActionButton action={{ label: "Return Home", path: "/" }} navigate={navigate} />
        </FadeIn>
      </div>
    </PageBand>
  );
}
