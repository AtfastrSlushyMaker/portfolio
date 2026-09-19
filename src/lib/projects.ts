export type ProjectCategory = "Applications" | "Cloud" | "AI & data";
export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  subtitle: string;
  role: string;
  year: string;
  description: string;
  detail: string;
  stack: string[];
  links: { label: string; href: string }[];
  note?: string;
  sections?: {title:string; text:string}[];
}

export const projects: Project[] = [
  {
    id: "atlasmesh", title: "AtlasMesh", category: "AI & data", subtitle: "Real-time geospatial platform", role: "Solo project", year: "2026",
    description: "Aircraft, satellites, ships, and a changing planet. Eighteen data sources brought together on an interactive 3D globe.",
    detail: "Built the React/CesiumJS interface and Node.js backend, with real-time WebSocket updates, satellite propagation, entity search, and independently managed data layers.",
    stack: ["React", "CesiumJS", "TypeScript", "Node.js"],
    links: [{label: "Explore AtlasMesh", href: "https://atlasmesh.onrender.com"}, {label: "Source", href: "https://github.com/AtfastrSlushyMaker/AtlasMesh"}],
  },
  {
    id: "elif", title: "Elif", category: "Applications", subtitle: "Pet-care community platform", role: "Community module · Team project", year: "2025–26",
    description: "A pet-care platform connecting people, services, and their animals. My focus: the community that brings them together.",
    detail: "Built posts, threaded discussions, voting, moderation, real-time chat, mentions, and notifications. Community search connects to a separate natural-language AI service.",
    stack: ["Angular", "Spring Boot", "MySQL", "WebSocket"],
    links: [{label: "Explore the source", href: "https://github.com/AtfastrSlushyMaker/Elif"}],
  },
  {
    id: "hybrid", title: "Hybrid cloud", category: "Cloud", subtitle: "OpenStack + Kubernetes + Azure", role: "Infrastructure automation · Academic project", year: "2026",
    description: "The infrastructure behind Elif: Kubernetes on OpenStack, with Azure AKS capacity connected through Karmada.",
    detail: "Ansible and Heat provision and configure the cluster. The documented deployment brings together Octavia load balancing, multi-cluster workload policies, and Prometheus/Grafana monitoring.",
    stack: ["OpenStack", "Cinder", "Swift", "Ansible", "Kubernetes", "Karmada", "Azure AKS", "Prometheus", "Grafana"],
    links: [{label: "Automation source", href: "https://github.com/AtfastrSlushyMaker/ansible"}],
    sections: [
      {title:"OpenStack services",text:"Nova provides compute instances; Neutron manages networks, ports, routers, and floating IPs; Keystone handles identity; Glance supplies VM images; Heat orchestrates infrastructure; Horizon provides administration; Octavia exposes Kubernetes workloads through load balancers."},
      {title:"Storage: design and deployed configuration",text:"The infrastructure included Cinder block storage and Swift object storage. Cinder-backed boot volumes and CSI provisioning were investigated, but the final deployment used ephemeral VM disks and local-path persistent volumes for MySQL. Swift provides the object-storage service in the infrastructure."},
      {title:"Automation and Kubernetes",text:"Ansible drives Heat provisioning and kubeadm configuration. The cluster uses containerd, Flannel networking, the OpenStack cloud controller, and Octavia integration for LoadBalancer services. The application includes Angular, Spring Boot, MySQL, an AI agent, and an OCR service."},
      {title:"Hybrid orchestration",text:"Karmada connects the private OpenStack cluster with a two-node Azure AKS cluster. Six propagation policies distribute workloads; a demonstration deployed four replicas, split evenly across the two clusters. Override policies handle cluster-specific configuration."},
      {title:"Monitoring and operations",text:"Prometheus collects cluster and infrastructure metrics through Node Exporter and OpenStack Exporter. Grafana dashboards cover Kubernetes, OpenStack, the application, and the hybrid deployment. Operational work included Octavia health-manager connectivity, restart recovery, ingress routing, and WebSocket behavior under scaling."},
    ],
    note: "Academic team project. Deployment details distinguish the working configuration from earlier designs.",
  },
  {
    id: "football", title: "The 12th Player", category: "AI & data", subtitle: "Football analytics and predictions", role: "Machine learning · Team project", year: "2025–26",
    description: "Football analytics for season rankings, match predictions, tactical styles, and emerging talent across Europe's major leagues.",
    detail: "A React interface and FastAPI backend expose trained models: KNN for standings, Random Forest for match outcomes, KMeans for team styles, and LightGBM for scouting.",
    stack: ["Python", "FastAPI", "React", "scikit-learn", "LightGBM"],
    links: [{label: "Explore the app", href: "https://the-12th-player-app.onrender.com"}, {label: "Source", href: "https://github.com/AtfastrSlushyMaker/the-12th-player"}],
  },
  {
    id: "memo", title: "MEMO", category: "Applications", subtitle: "Workplace management platform", role: "Full-stack & cloud · Internship", year: "2026",
    description: "A multi-tenant workplace platform for people, everyday operations, and communication, with a permission-aware AI assistant.",
    detail: "Built with Angular, Spring Boot, and PostgreSQL. Added streamed, source-grounded answers through FastAPI and deployed a demo to Azure AKS with Terraform and GitHub Actions OIDC.",
    stack: ["Angular", "Spring Boot", "PostgreSQL", "FastAPI", "Terraform"],
    links: [{label: "Explore the source", href: "https://github.com/AtfastrSlushyMaker/memo"}],
    note: "AKS demonstration deployment, not an always-on public demo.",
  },
  {
    id: "wamia", title: "WamiaGo", category: "Applications", subtitle: "Bicycle rental and transportation", role: "Bicycle module · Team project", year: "2024",
    description: "A transportation platform for Tunisia, connecting a JavaFX desktop application and a Symfony web experience.",
    detail: "Built the electric bicycle module: station-based availability, QR-code unlocking, and the rental lifecycle, with shared data models and workflows across web and desktop.",
    stack: ["JavaFX", "Symfony", "PHP", "MySQL"],
    links: [{label: "Web source", href: "https://github.com/AtfastrSlushyMaker/WamiaGo-Webapp"}, {label: "Desktop source", href: "https://github.com/AtfastrSlushyMaker/WamiaGo-Desktop"}],
  },
  {
    id: "myskills", title: "MySkills", category: "Applications", subtitle: "Training management platform", role: "Full-stack development · Internship", year: "2025",
    description: "A training management platform that takes a course from scheduling and registration through to certification.",
    detail: "Built during a six-week Smart Skills internship, with separate roles for administrators, coordinators, trainers, and trainees, approval workflows, notifications, and analytics.",
    stack: ["Laravel", "React", "TypeScript", "MySQL"],
    links: [{label: "Explore the source", href: "https://github.com/AtfastrSlushyMaker/MySkills"}],
  },
  {
    id: "agent", title: "Elif AI Agent", category: "AI & data", subtitle: "Natural-language community search", role: "Independent companion service", year: "2025–26",
    description: "A natural-language interface to the Elif community, built as an independent service rather than coupled to the main application.",
    detail: "The agent retrieves community context, plans bounded API calls through Groq, and returns grounded answers with follow-up suggestions. FastAPI keeps the service separate from the product backend.",
    stack: ["Python", "FastAPI", "Groq", "LLM tools"],
    links: [{label: "Explore the source", href: "https://github.com/AtfastrSlushyMaker/elif-community-ai-agent-nl"}],
  },
];
