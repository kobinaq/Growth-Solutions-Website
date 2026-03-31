import { ChevronRight, Mail, MessageCircle, Sparkles } from "lucide-react";
import { useState, type FormEvent } from "react";

import {
  aboutContent,
  contactContent,
  homeContent,
  projectsContent,
  servicesContent,
} from "@/site/content";
import type { ProjectDetail } from "@/site/types";
import {
  categoryIcons,
  ContentCard,
  CtaBanner,
  HeroPanel,
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
  return (
    <div className="space-y-10">
      <HeroPanel
        eyebrow={homeContent.hero.eyebrow}
        title={homeContent.hero.title}
        description={homeContent.hero.description}
        primaryCta={homeContent.hero.primaryCta}
        secondaryCta={homeContent.hero.secondaryCta}
        image={homeContent.hero.image}
        navigate={navigate}
        pill="Sustainable development through local ownership"
      />

      <ContentCard
        eyebrow="Partners"
        title={homeContent.partners.title}
        description="We collaborate across public, nonprofit, and development ecosystems to move ideas into durable outcomes."
      >
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          {homeContent.partners.logos.map((logo, index) => (
            <MotionCard
              key={logo.name}
              delay={index * 0.04}
              className="flex h-28 items-center justify-center rounded-[1.5rem] border border-border/60 bg-white/90 p-5"
            >
              <img src={logo.src} alt={logo.name} className="max-h-12 max-w-full object-contain" />
            </MotionCard>
          ))}
        </div>
      </ContentCard>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <ContentCard
          eyebrow="Process"
          title={homeContent.process.title}
          description="We move from listening to implementation in a way that protects local ownership and builds practical momentum."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {homeContent.process.steps.map((step, index) => (
              <MotionCard
                key={step.title}
                delay={index * 0.05}
                className="rounded-[1.75rem] border border-border/60 bg-white/80 p-6 shadow-[0_12px_36px_rgba(31,45,34,0.08)]"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/55">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {step.description}
                </p>
              </MotionCard>
            ))}
          </div>
        </ContentCard>

        <ContentCard
          eyebrow="Impact"
          title="Grounded in communities, measured by outcomes."
          description="Our work is built with communities, local institutions, and implementing partners who want practical, durable progress."
        >
          <div className="grid gap-4">
            {homeContent.impactStats.map((stat, index) => (
              <MotionCard
                key={stat.label}
                delay={index * 0.05}
                className="rounded-[1.5rem] border border-primary/10 bg-primary/[0.05] p-6"
              >
                <p className="text-3xl font-semibold text-primary">{stat.value}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.16em] text-foreground/68">
                  {stat.label}
                </p>
              </MotionCard>
            ))}
          </div>
        </ContentCard>
      </div>

      <ContentCard
        eyebrow="Focus Areas"
        title={homeContent.focusAreas.title}
        description={homeContent.focusAreas.intro}
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {homeContent.focusAreas.items.map((item, index) => {
            const Icon = categoryIcons[item.title] ?? Sparkles;

            return (
              <MotionCard
                key={item.title}
                delay={index * 0.04}
                className="rounded-[1.75rem] border border-border/60 bg-white/80 p-6 shadow-[0_12px_36px_rgba(31,45,34,0.08)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {item.description}
                </p>
              </MotionCard>
            );
          })}
        </div>
      </ContentCard>

      <ContentCard
        eyebrow="Featured Work"
        title={homeContent.featuredProjects.title}
        description={homeContent.featuredProjects.description}
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {homeContent.featuredProjects.items.map((item, index) => (
            <MotionCard
              key={item.slug}
              delay={index * 0.05}
              className="overflow-hidden rounded-[2rem] border border-border/60 bg-white/85 shadow-[0_12px_36px_rgba(31,45,34,0.08)]"
            >
              <button
                type="button"
                onClick={() => navigate(`/projects/${item.slug}`)}
                className="block w-full text-left"
              >
                <img
                  src={item.image.src}
                  alt={item.image.alt}
                  className="h-64 w-full object-cover"
                />
                <div className="p-6">
                  <p className="text-sm uppercase tracking-[0.16em] text-primary/60">
                    Featured project
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-foreground">
                    {item.label}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                    Explore project
                    <ChevronRight className="h-4 w-4" />
                  </p>
                </div>
              </button>
            </MotionCard>
          ))}
        </div>
      </ContentCard>

      <CtaBanner content={homeContent.cta} navigate={navigate} />
    </div>
  );
}

export function AboutPage({ navigate }: { navigate: (path: string) => void }) {
  return (
    <div className="space-y-10">
      <PageIntro
        eyebrow={aboutContent.hero.eyebrow}
        title={aboutContent.hero.title}
        description={aboutContent.hero.description}
        image={aboutContent.hero.image}
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <ContentCard
          eyebrow="About"
          title={aboutContent.about.title}
          description={aboutContent.about.description}
        />

        <ContentCard
          eyebrow="Our Ethos"
          title={aboutContent.ethos.title}
          description={aboutContent.ethos.description}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <ImageFrame
          image={aboutContent.hero.image}
          className="min-h-[25rem]"
        />
        <ContentCard
          eyebrow="How We Work"
          title="Local ownership is the anchor of every engagement."
          description="We support communities and institutions with facilitation, technical expertise, and implementation guidance, but the long-term value comes from building systems people can actually own and sustain."
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <ContentCard
          eyebrow="Guiding Principles"
          title={aboutContent.guidingPrinciples.title}
          description="These principles shape how we collaborate, design interventions, and support local systems."
        >
          <div className="grid gap-3">
            {aboutContent.guidingPrinciples.items.map((item, index) => (
              <MotionCard
                key={item}
                delay={index * 0.05}
                className="rounded-[1.35rem] border border-border/60 bg-white/70 px-5 py-4 text-sm text-foreground/78"
              >
                {item}
              </MotionCard>
            ))}
          </div>
        </ContentCard>

        <ContentCard
          eyebrow="Our Approach"
          title={aboutContent.approach.title}
          description={aboutContent.approach.description}
        />
      </div>

      <ContentCard
        eyebrow="Meet the Team"
        title={aboutContent.team.title}
        description="Experienced advisors and practitioners supporting sustainable, community-led outcomes."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {aboutContent.team.members.map((member, index) => (
            <MotionCard
              key={member.name}
              delay={index * 0.05}
              className="overflow-hidden rounded-[1.75rem] border border-border/60 bg-white/80 shadow-[0_12px_36px_rgba(31,45,34,0.08)]"
            >
              <img
                src={member.image.src}
                alt={member.image.alt}
                className="h-72 w-full object-cover object-top"
              />
              <div className="p-6">
                <p className="text-sm uppercase tracking-[0.16em] text-primary/60">
                  {member.role}
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {member.bio}
                </p>
              </div>
            </MotionCard>
          ))}
        </div>
      </ContentCard>

      <ContentCard
        eyebrow="Trusted Partners"
        title="Partnerships that extend reach and deepen impact."
        description="Our work has been strengthened through collaboration with development agencies, government actors, and mission-aligned institutions."
      >
        <div className="grid gap-4 md:grid-cols-4">
          {aboutContent.partnerLogos.map((logo) => (
            <div
              key={logo.name}
              className="flex h-24 items-center justify-center rounded-[1.4rem] border border-border/60 bg-white/90 p-5"
            >
              <img src={logo.src} alt={logo.name} className="max-h-10 max-w-full object-contain" />
            </div>
          ))}
        </div>
      </ContentCard>

      <CtaBanner
        content={aboutContent.partnersCta}
        navigate={navigate}
        eyebrow={aboutContent.partnersCta.eyebrow}
      />
    </div>
  );
}

export function ServicesPage({ navigate }: { navigate: (path: string) => void }) {
  return (
    <div className="space-y-10">
      <HeroPanel
        eyebrow={servicesContent.hero.eyebrow}
        title={servicesContent.hero.title}
        description={[servicesContent.hero.intro]}
        primaryCta={servicesContent.hero.primaryCta}
        secondaryCta={servicesContent.hero.secondaryCta}
        image={servicesContent.hero.image}
        navigate={navigate}
        pill="Tailored support for community development outcomes"
      />

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <ContentCard
          eyebrow={servicesContent.sectionIntro.eyebrow}
          title={servicesContent.sectionIntro.title}
          description={servicesContent.sectionIntro.description}
        >
          <div className="rounded-[1.6rem] border border-primary/10 bg-primary/[0.05] p-5 text-sm leading-7 text-foreground/78">
            We pair participatory methods with practical delivery support so plans do not stall at the workshop stage.
          </div>
        </ContentCard>

        <ImageFrame
          image={servicesContent.hero.image}
          className="min-h-[22rem]"
        />
      </div>

      <ContentCard
        eyebrow="Service Blueprint"
        title="Three service tracks built around community-led implementation."
        description="Each service can stand alone or be combined into a fuller engagement depending on your project stage."
      >
        <div className="grid gap-5">
          {servicesContent.services.map((service, index) => (
            <MotionCard
              key={service.title}
              delay={index * 0.05}
              className="rounded-[1.9rem] border border-border/60 bg-white/82 p-7 shadow-[0_12px_36px_rgba(31,45,34,0.08)]"
            >
              <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <p className="text-sm uppercase tracking-[0.16em] text-primary/60">
                    Service
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-foreground/80">
                    {service.summary}
                  </p>
                  <p className="mt-5 text-sm font-medium text-primary">
                    {service.cta}
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
                  <div className="space-y-4">
                    {service.description.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-sm leading-7 text-muted-foreground"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="rounded-[1.4rem] bg-secondary/70 p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground/70">
                      What We Offer
                    </p>
                    <div className="mt-4 grid gap-3">
                      {service.offerings.map((offering) => (
                        <p
                          key={offering}
                          className="text-sm leading-6 text-foreground/78"
                        >
                          {offering}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </MotionCard>
          ))}
        </div>
      </ContentCard>

      <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
        <CtaBanner
          content={servicesContent.bottomCta}
          navigate={navigate}
          className="h-full"
        />
        <ContentCard
          eyebrow="Stats"
          title="A track record rooted in local partnerships."
          description="We pair technical support with practical implementation experience."
          className="lg:max-w-sm"
        >
          <div className="grid gap-4">
            {servicesContent.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[1.3rem] border border-primary/10 bg-primary/[0.05] p-5"
              >
                <p className="text-3xl font-semibold text-primary">{stat.value}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.16em] text-foreground/68">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </ContentCard>
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
    <div className="space-y-10">
      <PageIntro
        eyebrow={projectsContent.hero.eyebrow}
        title={projectsContent.hero.title}
        description={projectsContent.hero.intro}
        image={projectsContent.hero.image}
      />

      <div className="grid gap-6">
        {projectsContent.categories.map((category, categoryIndex) => {
          const Icon = categoryIcons[category.title] ?? Sparkles;

          return (
            <ContentCard
              key={category.title}
              eyebrow="Project Area"
              title={category.title}
              description="Selected work demonstrating how community-led planning translates into measurable outcomes."
            >
              <div className="mb-6 flex items-center gap-3 text-primary">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/65">
                  Category {String(categoryIndex + 1).padStart(2, "0")}
                </p>
              </div>

              <div className="grid gap-4">
                {category.projectSlugs.map((slug, projectIndex) => {
                  const project = projects.get(`/projects/${slug}`);

                  if (!project) {
                    return null;
                  }

                  return (
                    <MotionCard
                      key={project.slug}
                      delay={projectIndex * 0.05}
                      className="overflow-hidden rounded-[1.75rem] border border-border/60 bg-white/80 shadow-[0_12px_36px_rgba(31,45,34,0.08)]"
                    >
                      <div className="grid gap-0 xl:grid-cols-[0.4fr_0.6fr]">
                        <img
                          src={getProjectImage(project).src}
                          alt={getProjectImage(project).alt}
                          className="h-full min-h-[16rem] w-full object-cover"
                        />

                        <div className="p-6">
                          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                            <div className="max-w-3xl">
                              <h3 className="text-2xl font-semibold text-foreground">
                                {project.title}
                              </h3>
                              <p className="mt-2 text-sm uppercase tracking-[0.14em] text-primary/60">
                                {project.location}
                              </p>
                              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                                {project.challenge}
                              </p>
                            </div>

                            <Button
                              onClick={() => navigate(`/projects/${project.slug}`)}
                              variant="outline"
                              className="rounded-full border-primary/25 bg-white px-5 text-primary hover:bg-primary hover:text-primary-foreground"
                            >
                              View Project
                            </Button>
                          </div>

                          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                            {project.stats.map((stat) => (
                              <div
                                key={stat.label}
                                className="rounded-[1.25rem] bg-secondary/70 px-4 py-4"
                              >
                                <p className="text-xl font-semibold text-foreground">
                                  {stat.value}
                                </p>
                                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-foreground/60">
                                  {stat.label}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </MotionCard>
                  );
                })}
              </div>
            </ContentCard>
          );
        })}
      </div>

      <CtaBanner content={projectsContent.cta} navigate={navigate} />
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
    <div className="space-y-10">
      <section className="overflow-hidden rounded-[2.25rem] border border-border/50 bg-white/78 p-8 shadow-[0_24px_80px_rgba(35,42,31,0.12)] sm:p-10 lg:p-12">
        <button
          type="button"
          onClick={() => navigate("/projects")}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-primary/80"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
          Back to Projects
        </button>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-primary/60">
              {project.category}
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-5 text-base leading-8 text-foreground/76">
              {project.location} | {project.duration}
            </p>
            <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/50 bg-white/80">
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
                className="rounded-[1.3rem] border border-primary/10 bg-primary/[0.05] p-5"
              >
                <p className="text-2xl font-semibold text-primary">{stat.value}</p>
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
                    className="overflow-hidden rounded-[1.4rem] border border-border/60 bg-white/80"
                  >
                    <img src={image.src} alt={image.alt} className="h-40 w-full object-cover" />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <ContentCard
          eyebrow="The Challenge"
          title="The challenge we needed to solve."
          description={project.challenge}
        />

        <ContentCard
          eyebrow="Our Approach"
          title="How we supported implementation."
          description={project.approach}
        />
      </div>

      <ContentCard
        eyebrow="Outcomes and Impact"
        title="What changed through the work."
        description="Results documented through delivery, coordination, and local institutional strengthening."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {project.outcomes.map((outcome, index) => (
            <MotionCard
              key={outcome}
              delay={index * 0.05}
              className="rounded-[1.5rem] border border-border/60 bg-white/80 p-6 text-sm leading-7 text-foreground/78 shadow-[0_12px_36px_rgba(31,45,34,0.08)]"
            >
              {outcome}
            </MotionCard>
          ))}
        </div>
      </ContentCard>

      <CtaBanner
        content={{
          title: "Start your project",
          description: "Every community has unique strengths. Let's discover yours together.",
          primary: {
            label: "Work With Us",
            path: "/contact",
          },
        }}
        navigate={navigate}
      />
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
    <div className="space-y-10">
      <PageIntro
        eyebrow={contactContent.hero.eyebrow}
        title={contactContent.hero.title}
        description={contactContent.hero.description}
        image={contactContent.hero.image}
      />

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <ContentCard
          eyebrow="Get In Touch"
          title={contactContent.officeNote.title}
          description={contactContent.officeNote.description}
        >
          <div className="grid gap-4">
            {contactContent.channels.map((channel) => (
              <a
                key={channel.title}
                href={channel.href}
                className="rounded-[1.5rem] border border-border/60 bg-white/90 p-5 transition hover:-translate-y-0.5"
              >
                <p className="text-sm uppercase tracking-[0.16em] text-primary/60">
                  {channel.title}
                </p>
                <p className="mt-2 text-xl font-semibold text-foreground">{channel.value}</p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{channel.note}</p>
              </a>
            ))}
          </div>
        </ContentCard>

        <ContentCard
          eyebrow="Inquiry Form"
          title="Draft an email with your project details."
          description="This form opens your mail app with the details prefilled. Update the email address in contact.json whenever you're ready."
        >
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              className="rounded-[1.1rem] border border-border bg-white px-4 py-3 outline-none transition focus:border-primary"
              required
            />
            <input
              value={organization}
              onChange={(event) => setOrganization(event.target.value)}
              placeholder="Organization"
              className="rounded-[1.1rem] border border-border bg-white px-4 py-3 outline-none transition focus:border-primary"
            />
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email address"
              className="rounded-[1.1rem] border border-border bg-white px-4 py-3 outline-none transition focus:border-primary"
              required
            />
            <select
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              className="rounded-[1.1rem] border border-border bg-white px-4 py-3 outline-none transition focus:border-primary"
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
              className="min-h-40 rounded-[1.1rem] border border-border bg-white px-4 py-3 outline-none transition focus:border-primary"
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
        </ContentCard>
      </div>

      <ContentCard
        eyebrow="Good Starting Points"
        title="Topics we can help you think through."
        description="If your need spans multiple areas, that's fine. We can usually scope the right next step after one conversation."
      >
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {contactContent.consultationTopics.map((item, index) => (
            <MotionCard
              key={item}
              delay={index * 0.04}
              className="rounded-[1.4rem] border border-border/60 bg-white/85 p-5 text-sm leading-7 text-foreground/78"
            >
              {item}
            </MotionCard>
          ))}
        </div>
      </ContentCard>

      <CtaBanner content={contactContent.cta} navigate={navigate} />
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
