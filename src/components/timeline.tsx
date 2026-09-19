import { UiIcon } from "./ui-icon";
const timelineItems = [
  {
    year: "2026",
    title: "Full-Stack & Cloud Engineering Intern",
    organization: "Banque de Tunisie",
    location: "Remote · Tunisia",
    period: "Jul - Aug 2026",
    description: [
      "Built MEMO with Angular, Spring Boot, and PostgreSQL: tenant-scoped workplace operations, messaging, audit trails, and a separate platform console.",
      "Integrated a FastAPI assistant with streamed, source-grounded answers and delegated authorization enforced by Spring.",
      "Deployed a demo to Azure AKS with Terraform and GitHub Actions OIDC; added container builds and Prometheus/Grafana monitoring.",
    ],
  },
  {
    year: "2025",
    title: "Full-Stack Developer Intern",
    organization: "Smart Skills",
    location: "El Ghazela Technology Park, Ariana",
    period: "Jun - Aug 2025",
    description: [
      "Engineered MySkills, a multi-role training management platform (Admin, Coordinator, Trainer, Trainee) with Laravel 12, React 18.3, and MySQL",
      "Built 70+ RESTful API endpoints with token-based authentication via Laravel Sanctum and granular RBAC enforced end-to-end",
      "Delivered an automated certificate generation pipeline and a dual-channel notification system (in-app + SMTP email)",
    ],
  },
  {
    year: "2023",
    title: "Operations Intern",
    organization: "Tunisair",
    location: "Tunis-Carthage International Airport",
    period: "Jun 2023",
    description: [
      "Observed and supported airline ticketing, refund processing, and day-to-day operational workflows",
    ],
  },
  {
    year: "2022",
    title: "Engineering Degree - Computer Science",
    organization: "ESPRIT School of Engineering",
    location: "Ariana, Tunisia",
    period: "2022 - 2027 (Expected)",
    description: [
      "Fifth year (final year). Specialty: ARCTIC (Cloud Computing & DevOps)",
      "Key coursework: Software Engineering, Data Structures & Algorithms, OOP, Web Development, Cloud Infrastructure",
    ],
    isEducation: true,
  },
];

export function Timeline() {
  return (
    <section id="experience" className="journey-section page-section" aria-labelledby="journey-title">
      <div className="journey-heading"><h2 id="journey-title">Experience</h2><p>Internships and education.</p></div>
      <div className="journey-list">
        {timelineItems.map((item) => (
          <details key={item.title} className="journey-entry">
            <summary><span className="journey-date">{item.period}</span><span className="journey-identity"><strong>{item.organization}</strong><span>{item.title}</span></span><span className="journey-expand" aria-hidden="true"><UiIcon name="plus" /></span></summary>
            <div className="journey-body"><p>{item.location}</p><ul>{item.description.map(line => <li key={line}>{line}</li>)}</ul></div>
          </details>
        ))}
      </div>
    </section>
  );
}
