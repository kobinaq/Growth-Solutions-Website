import { motion } from "framer-motion";
import {
  ArrowRight,
  Globe,
  Handshake,
  Leaf,
  Menu,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Users,
  X,
} from "lucide-react";
import type { MouseEvent, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import type {
  CtaLink,
  ImageAsset,
  SharedCta,
  SiteContent,
  SiteLink,
} from "@/site/types";

export const categoryIcons: Record<string, typeof Globe> = {
  "Organizational Development": Handshake,
  "Energy and Green Transition": SunMedium,
  Governance: ShieldCheck,
  "Gender and Social Inclusion": Users,
  Environment: Leaf,
};

export const isExternalLink = (link?: string) =>
  Boolean(link && (link.startsWith("http") || link.startsWith("mailto:")));

export function handleLinkClick(
  event: MouseEvent<HTMLAnchorElement>,
  link: SiteLink,
  navigate: (path: string) => void
) {
  if (link.path) {
    event.preventDefault();
    navigate(link.path);
  }
}

export function SiteHeader({
  brand,
  currentPath,
  isMenuOpen,
  navLinks,
  onNavigate,
  onToggleMenu,
}: {
  brand: SiteContent["brand"];
  currentPath: string;
  isMenuOpen: boolean;
  navLinks: SiteLink[];
  onNavigate: (path: string) => void;
  onToggleMenu: () => void;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[92rem] border-b border-foreground/10 bg-[rgba(248,244,236,0.76)] px-0 pb-4 pt-1 backdrop-blur">
        <div className="flex items-center justify-between gap-4 px-1">
          <button
            type="button"
            onClick={() => onNavigate("/")}
            className="flex items-center gap-3 text-left"
          >
            <img src="/logo.svg" alt="Growth Solutions logo" className="h-12 w-12 object-cover" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/65">
                {brand.label}
              </p>
              <p className="font-editorial text-[1.85rem] leading-none text-foreground">
                {brand.name}
              </p>
            </div>
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <HeaderLink
                key={link.label}
                currentPath={currentPath}
                link={link}
                onNavigate={onNavigate}
              />
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button
              onClick={() => onNavigate("/contact")}
              className="rounded-none border-b-2 border-primary bg-transparent px-0 py-0 text-sm font-semibold uppercase tracking-[0.18em] text-primary shadow-none hover:bg-transparent hover:text-primary/80"
            >
              Contact
            </Button>
          </div>

          <button
            type="button"
            onClick={onToggleMenu}
            className="inline-flex h-11 w-11 items-center justify-center border border-foreground/10 bg-white/70 text-foreground lg:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isMenuOpen ? (
          <div className="mt-4 space-y-2 border-t border-foreground/10 px-1 pt-4 lg:hidden">
            {navLinks.map((link) => (
              <HeaderLink
                key={link.label}
                currentPath={currentPath}
                link={link}
                onNavigate={onNavigate}
                stacked
              />
            ))}
            <Button
              onClick={() => onNavigate("/contact")}
              className="mt-3 w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Contact
            </Button>
          </div>
        ) : null}
      </div>
    </header>
  );
}

function HeaderLink({
  currentPath,
  link,
  onNavigate,
  stacked = false,
}: {
  currentPath: string;
  link: SiteLink;
  onNavigate: (path: string) => void;
  stacked?: boolean;
}) {
  const active = link.path ? currentPath === link.path : false;

  return (
    <a
      href={link.path ?? link.href ?? "#"}
      onClick={(event) => handleLinkClick(event, link, onNavigate)}
      className={[
        "px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em] transition",
        active
          ? "text-primary"
          : "text-foreground/68 hover:text-foreground",
        stacked ? "block w-full border-b border-foreground/10 text-center" : "",
      ].join(" ")}
    >
      {link.label}
    </a>
  );
}

export function SiteFooter({
  footer,
  navigate,
}: {
  footer: SiteContent["footer"];
  navigate: (path: string) => void;
}) {
  return (
    <footer className="mt-24 border-t border-foreground/10 bg-[#efe7d8] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[92rem] gap-10 lg:grid-cols-[1.2fr_0.8fr_0.7fr]">
        <div className="max-w-xl">
          <p className="text-sm uppercase tracking-[0.22em] text-primary/60">
            Community-led development
          </p>
          <h2 className="font-editorial mt-4 text-4xl leading-tight text-foreground sm:text-5xl">
            Growth Solutions
          </h2>
          <p className="mt-5 text-base leading-8 text-foreground/72">
            Strategy, systems support, and implementation guidance rooted in local ownership, inclusive participation, and sustainable impact.
          </p>
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-primary/60">Navigation</p>
          <div className="mt-5 grid gap-3">
            {footer.links
              .filter((link) => link.path)
              .map((link) => (
                <a
                  key={link.label}
                  href={link.href ?? link.path ?? "#"}
                  onClick={(event) => handleLinkClick(event, link, navigate)}
                  className="text-base text-foreground/74 transition hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
          </div>
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-primary/60">Connect</p>
          <div className="mt-5 grid gap-3">
          {footer.links.map((link) => (
            <a
              key={link.label}
              href={link.href ?? link.path ?? "#"}
              onClick={(event) => handleLinkClick(event, link, navigate)}
              target={isExternalLink(link.href) ? "_blank" : undefined}
              rel={isExternalLink(link.href) ? "noreferrer" : undefined}
              className="text-base text-foreground/74 transition hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-[92rem] border-t border-foreground/10 pt-6 text-sm text-foreground/64">
        {footer.copyright}
      </div>
    </footer>
  );
}

export function HeroPanel({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  image,
  navigate,
  pill,
}: {
  eyebrow: string;
  title: string;
  description: string[];
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
  image: ImageAsset;
  navigate: (path: string) => void;
  pill: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="overflow-hidden rounded-[2.75rem] border border-border/50 bg-[linear-gradient(135deg,rgba(249,245,236,0.97),rgba(236,243,235,0.94))] px-7 py-10 shadow-[0_28px_90px_rgba(35,42,31,0.14)] sm:px-10 sm:py-12 lg:px-14 lg:py-16"
    >
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            {pill}
          </div>
          <p className="mt-7 text-sm font-semibold uppercase tracking-[0.22em] text-primary/62">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
            {title}
          </h1>
          <div className="mt-6 max-w-3xl space-y-4">
            {description.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-8 text-foreground/78 sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ActionButton action={primaryCta} navigate={navigate} />
            {secondaryCta ? (
              <ActionButton action={secondaryCta} navigate={navigate} secondary />
            ) : null}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="overflow-hidden rounded-[2.2rem] border border-white/40 bg-white/80 shadow-[0_24px_80px_rgba(31,122,86,0.16)]">
            <img src={image.src} alt={image.alt} className="h-[21rem] w-full object-cover" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.6rem] bg-primary p-5 text-primary-foreground">
              <p className="text-sm uppercase tracking-[0.14em] text-primary-foreground/68">
                Strategic partnerships
              </p>
              <p className="mt-3 text-base leading-7">
                Agencies, civil society, and local actors aligned around shared outcomes.
              </p>
            </div>
            <div className="rounded-[1.6rem] border border-border/60 bg-white/80 p-5">
              <p className="text-sm uppercase tracking-[0.14em] text-foreground/60">
                Sustainable implementation
              </p>
              <p className="mt-3 text-base leading-7 text-foreground/78">
                Capacity building and long-term systems support embedded in delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export function PageIntro({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image?: ImageAsset;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid max-w-[92rem] gap-8 border-b border-foreground/10 pb-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary/62">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-4xl text-base leading-8 text-foreground/78 sm:text-lg">
            {description}
          </p>
        </div>
        {image ? (
          <div className="overflow-hidden rounded-[2rem] shadow-[0_18px_60px_rgba(35,42,31,0.12)]">
            <img src={image.src} alt={image.alt} className="h-[19rem] w-full object-cover" />
          </div>
        ) : null}
      </div>
    </motion.section>
  );
}

export function ContentCard({
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={[
        "border-t border-foreground/10 pt-7 sm:pt-8",
        className,
      ].join(" ")}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/60">
        {eyebrow}
      </p>
      <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
        {description}
      </p>
      {children ? <div className="mt-8">{children}</div> : null}
    </motion.section>
  );
}

export function CtaBanner({
  content,
  navigate,
  eyebrow,
  className = "",
}: {
  content: SharedCta;
  navigate: (path: string) => void;
  eyebrow?: string;
  className?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={[
        "overflow-hidden rounded-[2.25rem] bg-[linear-gradient(135deg,rgba(31,122,86,1),rgba(17,91,63,1))] p-8 text-primary-foreground shadow-[0_24px_80px_rgba(31,122,86,0.32)] sm:p-10",
        className,
      ].join(" ")}
    >
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight">
        {content.title}
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-8 text-primary-foreground/80">
        {content.description}
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <ActionButton action={content.primary} navigate={navigate} inverted />
        {content.secondary ? (
          <ActionButton
            action={content.secondary}
            navigate={navigate}
            secondary
            inverted
          />
        ) : null}
      </div>
    </motion.section>
  );
}

export function MotionCard({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.35, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ActionButton({
  action,
  navigate,
  secondary = false,
  inverted = false,
}: {
  action: CtaLink;
  navigate: (path: string) => void;
  secondary?: boolean;
  inverted?: boolean;
}) {
  const className = inverted
    ? secondary
      ? "rounded-full border border-white/20 bg-white/10 px-6 text-primary-foreground hover:bg-white/20"
      : "rounded-full bg-white px-6 text-primary hover:bg-secondary"
    : secondary
      ? "rounded-full border border-primary/20 bg-white px-6 text-primary hover:bg-secondary"
      : "rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90";

  if (action.path) {
    return (
      <Button onClick={() => navigate(action.path ?? "/")} className={className}>
        {action.label}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button asChild className={className}>
      <a
        href={action.href ?? "#"}
        target={isExternalLink(action.href) ? "_blank" : undefined}
        rel={isExternalLink(action.href) ? "noreferrer" : undefined}
      >
        {action.label}
        <ArrowRight className="ml-2 h-4 w-4" />
      </a>
    </Button>
  );
}

export function ImageFrame({
  image,
  className = "",
}: {
  image: ImageAsset;
  className?: string;
}) {
  return (
    <div
      className={[
        "overflow-hidden rounded-[2rem] border border-white/50 bg-white/80 shadow-[0_18px_60px_rgba(35,42,31,0.12)]",
        className,
      ].join(" ")}
    >
      <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
    </div>
  );
}
