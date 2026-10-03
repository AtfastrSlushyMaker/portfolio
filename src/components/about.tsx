const capabilities = [
  { title: "Infrastructure", items: ["Kubernetes", "OpenStack", "Azure AKS", "Terraform", "Ansible", "Docker", "Prometheus & Grafana"] },
  { title: "Backend", items: ["Spring Boot", "Node.js", "FastAPI", "Laravel", "Symfony"] },
  { title: "Interfaces", items: ["React", "Angular", "TypeScript", "CesiumJS"] },
  { title: "AI & data", items: ["Python", "scikit-learn", "LLM tool calling", "PostgreSQL", "MySQL"] },
];

export function About() {
  return (
    <section id="about" className="about page-section" aria-labelledby="about-title">
      <p className="section-label" id="about-title">About</p>
      <p className="about-statement" data-scrub-words>
        I&rsquo;m in my fifth and final year at ESPRIT, specializing in Cloud Computing &amp; DevOps. Most of my work sits where infrastructure meets applications: Kubernetes on OpenStack, deployments to Azure, and the web platforms that run on them.
      </p>
      <div className="capabilities">
        {capabilities.map(cap => (
          <div key={cap.title} className="capability" data-reveal>
            <h3>{cap.title}</h3>
            <ul>{cap.items.map(item => <li key={item}>{item}</li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  );
}
