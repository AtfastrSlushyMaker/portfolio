import { SectionReveal } from "./section-reveal";
const skills = [
  {title:"Interfaces",items:"React, Angular, TypeScript, CesiumJS"},
  {title:"Backend",items:"Spring Boot, Node.js, FastAPI, Laravel, Symfony"},
  {title:"Infrastructure",items:"Kubernetes, OpenStack, Azure, Ansible, Terraform, Docker"},
  {title:"AI & data",items:"Python, scikit-learn, LLM tools, PostgreSQL, MySQL"},
];
export function About() {
  return <section id="about" className="about-section page-section" aria-labelledby="about-title">
    <SectionReveal className="about-intro">
      <h2 id="about-title">About me</h2>
      <div className="about-copy">
        <p>I’m a fifth-year, final-year engineering student at ESPRIT in Tunisia, specializing in Cloud Computing & DevOps (ARCTIC).</p>
        <p>I’m looking for an end-of-study internship in cloud engineering, DevOps, or full-stack development.</p>
        <p>My work includes OpenStack and Kubernetes infrastructure, web applications, real-time geospatial systems, and machine-learning services. The project descriptions identify my contribution within each team.</p>
      </div>
    </SectionReveal>
    <div className="skills-list">{skills.map(skill => <div key={skill.title}><h3>{skill.title}</h3><p>{skill.items}</p></div>)}</div>
  </section>;
}
