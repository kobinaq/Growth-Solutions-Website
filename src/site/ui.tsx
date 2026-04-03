import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { MouseEvent, ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { ImageAsset, SiteContent, SiteLink } from "@/site/types";

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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-[color:rgb(255_255_255_/_0.86)] text-[var(--color-black)] backdrop-blur-[16px]">
      <div className="site-shell">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-4">
          <button
            type="button"
            onClick={() => onNavigate("/")}
            className="flex items-center"
            aria-label={brand.name}
          >
            <img
              src="/logo.svg"
              alt="Growth Solutions logo"
              className="h-10 w-auto max-w-[10.5rem] object-contain"
            />
          </button>

          <nav className="hidden items-center justify-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <HeaderLink
                key={link.label}
                currentPath={currentPath}
                link={link}
                onNavigate={onNavigate}
              />
            ))}
          </nav>

          <button
            type="button"
            onClick={onToggleMenu}
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-[16px] border border-black/10 bg-black/5 text-[var(--color-black)] lg:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="border-t border-black/10 lg:hidden">
          <div className="site-shell py-3">
            <nav className="grid gap-1">
              {navLinks.map((link) => (
                <HeaderLink
                  key={link.label}
                  currentPath={currentPath}
                  link={link}
                  onNavigate={onNavigate}
                  stacked
                />
              ))}
            </nav>
          </div>
        </div>
      ) : null}
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
      className={cn(
        "site-label text-black/55",
        active ? "text-[var(--color-black)]" : "hover:text-[var(--color-black)]",
        stacked ? "rounded-[16px] border border-black/10 px-4 py-3" : "px-0 py-1"
      )}
    >
      {link.label}
    </a>
  );
}

export function SiteFooter({
  footer,
  navLinks,
  navigate,
}: {
  footer: SiteContent["footer"];
  navLinks: SiteLink[];
  navigate: (path: string) => void;
}) {
  return (
    <footer className="border-t border-white/10 bg-[#212325] text-white">
      <div className="site-shell py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_1fr]">
          <div className="max-w-xl">
            <p className="site-label text-white/60">Community-led development</p>
            <h2 className="site-title-md mt-5">Growth Solutions</h2>
            <p className="site-copy-sm mt-6 max-w-lg text-white/60">
              Strategy, systems support, and implementation guidance rooted in
              local ownership, inclusive participation, and sustainable impact.
            </p>
          </div>

          <div>
            <p className="site-label text-white/60">Navigation</p>
            <div className="mt-5 grid gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href ?? link.path ?? "#"}
                  onClick={(event) => handleLinkClick(event, link, navigate)}
                  className="site-copy-sm text-white/70 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="site-label text-white/60">Contact</p>
            <div className="mt-5 grid gap-3">
              {footer.contactLinks.map((link) => (
                <a
                  key={`${link.label}-${link.value}`}
                  href={link.href ?? "#"}
                  target={isExternalLink(link.href) ? "_blank" : undefined}
                  rel={isExternalLink(link.href) ? "noreferrer" : undefined}
                  className={cn(
                    "site-copy-sm text-white/70",
                    link.href ? "hover:text-white" : "cursor-default"
                  )}
                >
                  <span className="site-label mr-2 text-white/45">{link.label}</span>
                  {link.value}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6">
          <p className="site-copy-sm text-white/50">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}

type Tone = "dark" | "cream" | "grey";

export function PageBand({
  children,
  tone = "dark",
  className,
  innerClassName,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  innerClassName?: string;
}) {
  const toneClass =
    tone === "cream"
      ? "relative isolate overflow-hidden bg-[linear-gradient(180deg,#18734d_0%,#0f6a43_52%,#0b5d3a_100%)] text-white"
      : tone === "grey"
        ? "bg-[var(--color-grey)] text-[var(--color-black)]"
        : "bg-[var(--color-grey)] text-[var(--color-black)]";

  return (
    <section className={cn("flex w-full", toneClass, className)}>
      {tone === "cream" ? (
        <>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_36%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_32%)]" />
        </>
      ) : null}
      <div className={cn("site-shell relative z-10 w-full py-16 md:py-20 lg:py-24", innerClassName)}>
        {children}
      </div>
    </section>
  );
}

export function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.3, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={cn("site-label", className)}>{children}</p>;
}

export function ImagePanel({
  image,
  className,
  imgClassName,
}: {
  image: ImageAsset;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[16px] border border-black/10 bg-black/[0.03]",
        className
      )}
    >
      <img
        src={image.src}
        alt={image.alt}
        className={cn("h-full w-full object-cover", imgClassName)}
      />
    </div>
  );
}
