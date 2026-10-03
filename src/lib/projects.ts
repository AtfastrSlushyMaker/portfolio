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
  /** Brand color sampled from the project's own logo. */
  color: string;
  /** One logo per project in /public/logos/projects (the project's own, or its defining technology's). */
  logo: string;
  /** Real screenshots or official artwork from the project, never generated mock-ups. */
  gallery?: { src: string; width: number; height: number; caption: string }[];
}

export const projects: Project[] = [
  {
    id: "boundless", color: "#d6b27a", logo: "/logos/projects/boundless.png", title: "Boundless", category: "AI & data", subtitle: "Local-first AI role-playing game", role: "Solo project", year: "2026",
    description: "Describe any world, become anyone, and play by writing what you do. An AI Game Master narrates, while a state engine keeps every person, place, item and timeline consistent.",
    detail: "A Next.js client streams each turn from a FastAPI backend. The model only proposes narration and state changes; the backend validates, resolves and reconciles them, then commits narration, state and checkpoint to PostgreSQL in one transaction.",
    stack: ["Next.js", "FastAPI", "PostgreSQL", "pgvector", "Docker"],
    links: [{label: "Explore the source", href: "https://github.com/AtfastrSlushyMaker/boundless"}],
    gallery: [{src: "/projects/boundless/banner.webp", width: 1600, height: 667, caption: "Project banner from the Boundless repository."}],
    sections: [
      {title:"Turn pipeline",text:"Each action runs through a streamed narrator, a canon check that can trigger a repair pass, and a state interpreter that proposes structured operations. An entity resolver maps every reference to an existing ID, or marks it ambiguous rather than guessing, before merge-safe updates and deterministic reconciliation."},
      {title:"Memory and timelines",text:"Typed long-term memory uses pgvector hybrid retrieval. Characters keep provenance-ranked facts, relationships carry dated events, and any turn can be edited, regenerated, rewound or branched through checkpoints without corrupting the story."},
      {title:"Local-first models",text:"Runs on native Apple Silicon MLX, Ollama, or any OpenAI-compatible server, with model roles for narration, state and summaries. Embeddings default to a local provider, and the whole stack starts with Docker Compose on loopback-only ports."},
    ],
    note: "In active development; runs locally rather than as a hosted service.",
  },
  {
    id: "memo", color: "#f2c200", logo: "/logos/projects/memo.png", title: "MEMO", category: "Applications", subtitle: "Workplace management platform", role: "Full-stack & cloud · Internship", year: "2026",
    description: "A multi-tenant workplace platform for people, everyday operations, and communication, with a permission-aware AI assistant.",
    detail: "Built with Angular, Spring Boot, and PostgreSQL. Added streamed, source-grounded answers through FastAPI and deployed a demo to Azure AKS with Terraform and GitHub Actions OIDC.",
    stack: ["Angular", "Spring Boot", "PostgreSQL", "FastAPI", "Terraform"],
    links: [{label: "Explore the source", href: "https://github.com/AtfastrSlushyMaker/memo"}],
    gallery: [{src: "/projects/memo/dashboard.jpg", width: 1280, height: 720, caption: "Tenant dashboard: the day’s workday, requests and schedule in one place."}, {src: "/projects/memo/ask-memo.jpg", width: 1280, height: 720, caption: "Ask MEMO: a streamed answer grounded in the user’s own tickets, with sources."}, {src: "/projects/memo/organization-chart.jpg", width: 1280, height: 720, caption: "Organization chart built from each employee’s reporting line."}, {src: "/projects/memo/platform-console.jpg", width: 1280, height: 720, caption: "Separate platform console for operators, without tenant business data."}, {src: "/projects/memo/arabic-rtl.jpg", width: 1280, height: 720, caption: "Arabic right-to-left layout in dark mode."}],
    note: "AKS demonstration deployment, not an always-on public demo.",
  },
  {
    id: "home-lab", color: "#e95420", logo: "/logos/projects/ubuntu.svg", title: "Home lab", category: "Cloud", subtitle: "Self-hosted Ubuntu server", role: "Personal infrastructure", year: "2026",
    description: "A repurposed laptop running as an always-on Ubuntu server: private cloud storage, monitoring, network-wide DNS filtering and a local AI chat, reachable from my devices over a private mesh VPN.",
    detail: "Containers sit behind a Caddy reverse proxy. Prometheus, Grafana, cAdvisor, Node Exporter and Uptime Kuma cover observability, AdGuard Home handles DNS, and a UFW firewall only admits essential traffic.",
    stack: ["Ubuntu", "Docker", "Caddy", "Prometheus", "Grafana", "Tailscale", "Nextcloud", "AdGuard Home"],
    links: [],
    sections: [
      {title:"Services",text:"Nextcloud for files, served by Caddy with Nginx and PHP-FPM after migrating off Apache. Open WebUI talks to Ollama running on my desktop GPU. MariaDB and Redis listen on localhost only."},
      {title:"Monitoring",text:"Prometheus scrapes Node Exporter, cAdvisor and an AdGuard exporter with seven-day retention. Grafana dashboards cover the system, containers and DNS analytics; Uptime Kuma tracks service health."},
      {title:"Network and security",text:"A Tailscale mesh connects my devices. AdGuard Home serves DHCP and DNS with curated blocklists for network-wide ad and tracker blocking. The firewall denies incoming traffic by default, and containers update automatically each night."},
    ],
    note: "Private by design: services are reachable only over the VPN, so there is no public demo.",
  },
  {
    id: "atlasmesh", color: "#22d3ee", logo: "/logos/projects/atlasmesh.svg", title: "AtlasMesh", category: "AI & data", subtitle: "Real-time geospatial platform", role: "Solo project", year: "2026",
    description: "Aircraft, satellites, ships, and a changing planet. Eighteen data sources brought together on an interactive 3D globe.",
    detail: "Built the React/CesiumJS interface and Node.js backend, with real-time WebSocket updates, satellite propagation, entity search, and independently managed data layers.",
    stack: ["React", "CesiumJS", "TypeScript", "Node.js"],
    links: [{label: "Explore AtlasMesh", href: "https://atlasmesh.onrender.com"}, {label: "Source", href: "https://github.com/AtfastrSlushyMaker/AtlasMesh"}],
    gallery: [{src: "/projects/atlasmesh/globe.jpg", width: 1600, height: 1000, caption: "The live globe: aircraft, quakes, alerts, fire hotspots, satellites and cameras."}],
  },
  {
    id: "elif-ai-agent", color: "#8b5cf6", logo: "/logos/projects/groq.svg", title: "Elif AI Agent", category: "AI & data", subtitle: "Natural-language community search", role: "Independent companion service", year: "2025–26",
    description: "A natural-language interface to the Elif community, built as an independent service rather than coupled to the main application.",
    detail: "The agent retrieves community context, plans bounded API calls through Groq, and returns grounded answers with follow-up suggestions. FastAPI keeps the service separate from the product backend.",
    stack: ["Python", "FastAPI", "Groq", "LLM tools"],
    links: [{label: "Explore the source", href: "https://github.com/AtfastrSlushyMaker/elif-community-ai-agent-nl"}],
  },
  {
    id: "hybrid-cloud", color: "#e8503a", logo: "/logos/projects/openstack.svg", title: "Hybrid cloud", category: "Cloud", subtitle: "OpenStack + Kubernetes + Azure", role: "Infrastructure automation · Academic project", year: "2026",
    description: "The infrastructure behind Elif: Kubernetes on OpenStack, with Azure AKS capacity connected through Karmada.",
    detail: "Ansible and Heat provision and configure the cluster. The documented deployment brings together Octavia load balancing, multi-cluster workload policies, and Prometheus/Grafana monitoring.",
    stack: ["OpenStack", "Cinder", "Swift", "Ansible", "Kubernetes", "Karmada", "Azure AKS", "Prometheus", "Grafana"],
    links: [{label: "Automation source", href: "https://github.com/AtfastrSlushyMaker/ansible-openstack-k8s"}],
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
    id: "elif", color: "#3aa7a0", logo: "/logos/projects/elif.png", title: "Elif", category: "Applications", subtitle: "Pet-care community platform", role: "Community module · Team project", year: "2025–26",
    description: "A pet-care platform connecting people, services, and their animals. My focus: the community that brings them together.",
    detail: "Built posts, threaded discussions, voting, moderation, real-time chat, mentions, and notifications. Community search connects to a separate natural-language AI service.",
    stack: ["Angular", "Spring Boot", "MySQL", "WebSocket"],
    links: [{label: "Explore the source", href: "https://github.com/AtfastrSlushyMaker/Elif"}],
  },
  {
    id: "the-12th-player", color: "#0b8a2e", logo: "/logos/projects/the-12th-player.svg", title: "The 12th Player", category: "AI & data", subtitle: "Football analytics and predictions", role: "Machine learning · Team project", year: "2025–26",
    description: "Football analytics for season rankings, match predictions, tactical styles, and emerging talent across Europe's major leagues.",
    detail: "A React interface and FastAPI backend expose trained models: KNN for standings, Random Forest for match outcomes, KMeans for team styles, and LightGBM for scouting.",
    stack: ["Python", "FastAPI", "React", "scikit-learn", "LightGBM"],
    links: [{label: "Explore the app", href: "https://the-12th-player-app.onrender.com"}, {label: "Source", href: "https://github.com/AtfastrSlushyMaker/the-12th-player"}],
    gallery: [{src: "/projects/the-12th-player/home.jpg", width: 1600, height: 1000, caption: "Landing page of the deployed app."}, {src: "/projects/the-12th-player/rankings.jpg", width: 1600, height: 1000, caption: "Season forecast from the KNN standings model."}],
  },
  {
    id: "myskills", color: "#4f6bff", logo: "/logos/projects/myskills.png", title: "MySkills", category: "Applications", subtitle: "Training management platform", role: "Full-stack development · Internship", year: "2025",
    description: "A training management platform that takes a course from scheduling and registration through to certification.",
    detail: "Built during a six-week Smart Skills internship, with separate roles for administrators, coordinators, trainers, and trainees, approval workflows, notifications, and analytics.",
    stack: ["Laravel", "React", "TypeScript", "MySQL"],
    links: [{label: "Explore the source", href: "https://github.com/AtfastrSlushyMaker/MySkills"}],
    gallery: [{src: "/projects/myskills/dashboard.jpg", width: 1600, height: 797, caption: "Administrator dashboard."}],
  },
  {
    id: "wamiago", color: "#2e6fb0", logo: "/logos/projects/wamiago.png", title: "WamiaGo", category: "Applications", subtitle: "Bicycle rental and transportation", role: "Bicycle module · Team project", year: "2024",
    description: "A transportation platform for Tunisia, connecting a JavaFX desktop application and a Symfony web experience.",
    detail: "Built the electric bicycle module: station-based availability, QR-code unlocking, and the rental lifecycle, with shared data models and workflows across web and desktop.",
    stack: ["JavaFX", "Symfony", "PHP", "MySQL"],
    links: [{label: "Web source", href: "https://github.com/AtfastrSlushyMaker/WamiaGo-Webapp"}, {label: "Desktop source", href: "https://github.com/AtfastrSlushyMaker/WamiaGo-Desktop"}],
  },
];

/** Smaller projects listed under the showcase, linking straight to GitHub. */
export const moreProjects = [
  {
    title: "Open Ambient LED Control",
    description: "Desktop lighting studio for Bluetooth lamps: screen-matched ambient light, effects and music-reactive modes.",
    stack: "Python · CustomTkinter · Bluetooth LE",
    href: "https://github.com/AtfastrSlushyMaker/Open-Ambient-LED-Control",
  },
];
