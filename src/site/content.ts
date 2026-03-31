import aboutJson from "@/content/pages/about.json";
import contactJson from "@/content/pages/contact.json";
import homeJson from "@/content/pages/home.json";
import projectsJson from "@/content/pages/projects.json";
import servicesJson from "@/content/pages/services.json";
import siteJson from "@/content/site.json";

import type {
  AboutContent,
  ContactContent,
  HomeContent,
  ProjectDetail,
  ProjectsContent,
  ServicesContent,
  SiteContent,
} from "@/site/types";

export const siteContent = siteJson as SiteContent;
export const homeContent = homeJson as HomeContent;
export const aboutContent = aboutJson as AboutContent;
export const contactContent = contactJson as ContactContent;
export const servicesContent = servicesJson as ServicesContent;
export const projectsContent = projectsJson as ProjectsContent;

const projectModules = import.meta.glob("../content/projects/*.json", {
  eager: true,
  import: "default",
}) as Record<string, ProjectDetail>;

export const projectDetails = Object.values(projectModules).sort((first, second) =>
  first.title.localeCompare(second.title)
);

export const projectMap = new Map(
  projectDetails.map((project) => [`/projects/${project.slug}`, project])
);
