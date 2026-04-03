export type SiteLink = {
  label: string;
  path?: string;
  href?: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type ImageAsset = {
  src: string;
  alt: string;
};

export type PartnerLogo = {
  name: string;
  src: string;
};

export type CtaLink = {
  label: string;
  path?: string;
  href?: string;
};

export type SharedCta = {
  title: string;
  description: string;
  primary: CtaLink;
  secondary?: CtaLink;
};

export type HomeContent = {
  hero: {
    eyebrow: string;
    title: string;
    description: string[];
    primaryCta: CtaLink;
    secondaryCta?: CtaLink;
    image: ImageAsset;
  };
  manifesto: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  process: {
    title: string;
    steps: Array<{
      title: string;
      description: string;
    }>;
  };
  partners: {
    title: string;
    logos: PartnerLogo[];
  };
  focusAreas: {
    title: string;
    intro: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  featuredProjects: {
    title: string;
    description: string;
    items: ProjectFeature[];
  };
  impactStatement: {
    eyebrow: string;
    title: string;
    description: string;
  };
  impactStats: Stat[];
  cta: SharedCta;
};

export type ProjectListItem = {
  title: string;
  description?: string;
  image: ImageAsset;
  slug?: string;
  stats?: Stat[];
};

export type ProjectFeature = ProjectListItem & {
  category: string;
};

export type AboutContent = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    image: ImageAsset;
  };
  about: {
    title: string;
    description: string;
  };
  ethos: {
    title: string;
    description: string;
  };
  guidingPrinciples: {
    title: string;
    items: string[];
  };
  approach: {
    title: string;
    description: string;
  };
  team: {
    title: string;
    members: Array<{
      name: string;
      role: string;
      bio: string;
      image: ImageAsset;
    }>;
  };
  partnerLogos: PartnerLogo[];
  clients: {
    title: string;
    description: string;
    items: string[];
  };
  partnersCta: {
    eyebrow: string;
  } & SharedCta;
};

export type ServiceContent = {
  title: string;
  summary: string;
  description: string[];
  offerings: string[];
  cta: string;
};

export type ServicesContent = {
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    primaryCta: CtaLink;
    secondaryCta: CtaLink;
    image: ImageAsset;
  };
  sectionIntro: {
    eyebrow: string;
    title: string;
    description: string;
  };
  services: ServiceContent[];
  bottomCta: SharedCta;
  stats: Stat[];
};

export type ProjectsContent = {
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    image: ImageAsset;
  };
  categories: Array<{
    title: string;
    projects: ProjectListItem[];
  }>;
  cta: SharedCta;
};

export type ProjectDetail = {
  slug: string;
  title: string;
  category: string;
  location: string;
  duration: string;
  images?: ImageAsset[];
  stats: Stat[];
  challenge: string;
  approach: string;
  outcomes: string[];
};

export type ContactContent = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    image: ImageAsset;
  };
  channels: Array<{
    title: string;
    value: string;
    href: string;
    note: string;
  }>;
  consultationTopics: string[];
  officeNote: {
    title: string;
    description: string;
  };
  cta: SharedCta;
};

export type SiteContent = {
  brand: {
    name: string;
    label: string;
  };
  navigation: SiteLink[];
  footer: {
    copyright: string;
    contactLinks: Array<{
      label: string;
      value: string;
      href?: string;
    }>;
  };
};
