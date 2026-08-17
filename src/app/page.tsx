"use client";

import { projects, experience, skills, type Project } from "@/lib/projects";
import WaterBackground from "@/components/WaterBackground";

function PlatformBadge({ platform }: { platform: Project["platform"] }) {
  return (
    <span className="bg-primary/10 text-primary font-mono text-[10px] px-2 py-1 rounded-sm uppercase tracking-wide border border-primary/20">
      {platform}
    </span>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const reverse = index % 2 === 1;
  const demoImage = project.demos[0];
  const imgSrc = typeof demoImage.src === "object" ? demoImage.src.src : demoImage.src;


  return (
    <article className="group grid grid-cols-1 gap-8 lg:grid-cols-12 animate-reveal">
      <div className={`lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}>
        <div className="aspect-[16/10] w-full bg-neutral-900 ring-1 ring-border overflow-hidden rounded-sm transition-all duration-500 group-hover:ring-primary/40 group-hover:scale-[1.01] group-hover:shadow-2xl group-hover:shadow-primary/5 active:scale-[0.99] transform">
          <img
            src={imgSrc}
            alt={demoImage.alt}
            width={1200}
            height={800}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </div>
      </div>
      <div className={`flex flex-col justify-between lg:col-span-5 py-2 ${reverse ? "lg:order-1" : ""}`}>
        <div>
          <div className="flex items-center gap-2 mb-4">
            <PlatformBadge platform={project.platform} />
            <span className="text-muted-foreground font-mono text-[10px]">{project.year}</span>
          </div>
          <h3 className="text-3xl font-bold tracking-tight mb-4">{project.title}</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="font-mono text-[10px] border border-border px-2 py-1 text-muted-foreground">
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-6 font-mono text-[11px] uppercase tracking-widest items-center">
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={
                link.primary
                  ? "text-primary hover:text-primary/80 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] transform hover:underline underline-offset-4"
                  : "text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] transform"
              }
            >
              {link.label}
            </a>
          ))}
          {project.apk && (
            <a
              href={project.apk}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] transform font-bold border border-primary/25 hover:border-primary/55 px-2 py-1 rounded-sm text-[10px] tracking-wider"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3 h-3"
              >
                <path d="M12 17V3" />
                <path d="m6 11 6 6 6-6" />
                <path d="M19 21H5" />
              </svg>
              Download APK
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function PortfolioPage() {
  const email = "kimanitimothy642@gmail.com";
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen text-foreground font-sans selection:bg-primary selection:text-primary-foreground relative overflow-hidden">
      <WaterBackground />
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <span className="font-mono text-xs tracking-tighter font-bold uppercase select-none">
            Timothy Kimani<span className="text-muted-foreground"> / {currentYear}</span>
          </span>
          <div className="flex items-center gap-8 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <a href="#projects" className="hover:text-primary transition-all duration-300 hover:scale-105 active:scale-95 transform">Projects</a>
            <a href="#experience" className="hover:text-primary transition-all duration-300 hover:scale-105 active:scale-95 transform">Experience</a>
            <a href="#contact" className="hover:text-primary transition-all duration-300 hover:scale-105 active:scale-95 transform">Contact</a>
            <a
              href="/portfolio/cv.pdf"
              download="Timothy_Kimani_CV.pdf"
              className="text-primary hover:text-primary-foreground hover:bg-primary border border-primary/30 px-2.5 py-1.5 rounded-sm transition-all duration-300 font-bold hover:scale-[1.05] active:scale-[0.95] transform"
            >
              Download CV
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <section className="mb-32 animate-reveal">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs text-primary uppercase tracking-[0.3em]">
              Fullstack Engineer
            </span>
            <h1 className="text-balance text-6xl font-extrabold tracking-tighter md:text-8xl lg:max-w-[12ch]">
              Building robust <span className="text-muted-foreground">digital systems</span> for the modern web.
            </h1>
            <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
              I design and ship high-performance distributed architectures and precision-engineered user interfaces across web and mobile.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/portfolio/cv.pdf"
                download="Timothy_Kimani_CV.pdf"
                className="inline-flex items-center justify-center font-mono text-[10px] uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-3 rounded-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 transform hover:shadow-lg hover:shadow-primary/25"
              >
                Download CV
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center font-mono text-[10px] uppercase tracking-widest border border-border hover:bg-white/5 px-5 py-3 rounded-sm transition-all duration-300 text-muted-foreground hover:text-foreground hover:scale-105 active:scale-95 transform"
              >
                Get In Touch
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-2 max-w-2xl">
              {skills.map((s) => (
                <span key={s} className="font-mono text-[10px] border border-border px-2 py-1 text-muted-foreground uppercase tracking-wider transition-all duration-300 hover:text-primary hover:border-primary/40 hover:bg-primary/5 select-none hover:scale-105 transform">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="mb-32">
          <div className="mb-12 flex items-end justify-between border-b border-border pb-4">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Selected Works ({String(projects.length).padStart(2, "0")})
            </h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hidden md:block">
              Web · Mobile · Systems
            </span>
          </div>
          <div className="grid gap-16">
            {projects.map((p, i) => (
              <ProjectRow key={p.id} project={p} index={i} />
            ))}
          </div>
        </section>

        <section id="experience" className="mb-32">
          <div className="mb-12 flex items-end justify-between border-b border-border pb-4">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Professional History
            </h2>
          </div>
          <div className="space-y-12 max-w-3xl">
            {experience.map((e) => (
              <div key={e.period} className="flex flex-col md:flex-row md:gap-12 animate-reveal">
                <span className="w-32 shrink-0 font-mono text-xs text-muted-foreground mb-2 md:mb-0">
                  {e.period}
                </span>
                <div>
                  <h4 className="text-xl font-bold">{e.role}</h4>
                  <p className="text-primary font-mono text-xs mb-4 uppercase tracking-wider">
                    {e.company}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">{e.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="border-t border-border pt-20 animate-reveal">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-extrabold tracking-tighter mb-4">
                Let&apos;s build<br />something resilient.
              </h2>
              <p className="text-muted-foreground">
                Available for senior fullstack roles and select engineering consulting.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <a
                href={`mailto:${email}`}
                className="group flex items-center justify-between border border-border p-6 hover:border-primary transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] hover:shadow-lg hover:shadow-primary/5"
              >
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Inquiries
                </span>
                <span className="text-xl font-bold group-hover:text-primary transition-colors">
                  {email}
                </span>
              </a>
              <div className="flex gap-8 font-mono text-xs text-muted-foreground uppercase tracking-widest px-1">
                <a
                  href="https://www.linkedin.com/in/timothy-kimani-9966841a2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-all duration-300 hover:scale-105 active:scale-95 transform"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/Timothy970"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-all duration-300 hover:scale-105 active:scale-95 transform"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 mx-auto max-w-6xl px-6 py-12 flex justify-between border-t border-border mt-20 font-mono text-[9px] text-muted-foreground uppercase tracking-[0.2em]">
        <span>© {currentYear} Timothy Kimani</span>
        <span>Built with precision</span>
      </footer>
    </div>
  );
}
