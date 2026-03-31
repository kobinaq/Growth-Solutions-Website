import { useEffect, useMemo, useState } from "react";

import { siteContent, projectMap } from "@/site/content";
import { SiteFooter, SiteHeader } from "@/site/ui";
import {
  AboutPage,
  ContactPage,
  HomePage,
  NotFoundPage,
  ProjectDetailPage,
  ProjectsPage,
  ServicesPage,
} from "@/site/pages";

const normalizePath = (path: string) => {
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }

  return path;
};

function App() {
  const [pathname, setPathname] = useState(() =>
    normalizePath(window.location.pathname)
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setPathname(normalizePath(window.location.pathname));
      setMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (nextPath: string) => {
    const normalizedPath = normalizePath(nextPath);

    if (normalizedPath === pathname) {
      setMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.history.pushState({}, "", normalizedPath);
    setPathname(normalizedPath);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeProject = projectMap.get(pathname);

  const activePage = useMemo(() => {
    if (pathname === "/") {
      return "home";
    }

    if (pathname === "/about") {
      return "about";
    }

    if (pathname === "/services") {
      return "services";
    }

    if (pathname === "/projects") {
      return "projects";
    }

    if (pathname === "/contact") {
      return "contact";
    }

    if (activeProject) {
      return "project-detail";
    }

    return "not-found";
  }, [activeProject, pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_top,rgba(31,122,86,0.22),transparent_58%),radial-gradient(circle_at_right,rgba(219,170,89,0.24),transparent_38%)]" />
      <div className="fixed inset-0 -z-20 bg-[linear-gradient(180deg,rgba(249,246,238,1),rgba(244,239,227,0.94)_42%,rgba(248,247,243,1))]" />

      <SiteHeader
        brand={siteContent.brand}
        currentPath={pathname}
        isMenuOpen={mobileMenuOpen}
        navLinks={siteContent.navigation}
        onNavigate={navigate}
        onToggleMenu={() => setMobileMenuOpen((open) => !open)}
      />

      <main className="pb-16 pt-28">
        {activePage === "home" && <HomePage navigate={navigate} />}
        {activePage === "about" && <AboutPage navigate={navigate} />}
        {activePage === "services" && <ServicesPage navigate={navigate} />}
        {activePage === "projects" && (
          <ProjectsPage navigate={navigate} projects={projectMap} />
        )}
        {activePage === "contact" && <ContactPage navigate={navigate} />}
        {activePage === "project-detail" && activeProject && (
          <ProjectDetailPage project={activeProject} navigate={navigate} />
        )}
        {activePage === "not-found" && <NotFoundPage navigate={navigate} />}
      </main>

      <SiteFooter footer={siteContent.footer} navigate={navigate} />
    </div>
  );
}

export default App;
