const flows: Record<string, {label:string; nodes:string[]; detail:string}> = {
 atlasmesh:{label:"Live data pipeline",nodes:["18 data sources","Node.js + WebSocket","React + CesiumJS"],detail:"Satellite propagation · entity search · map layers"},
 elif:{label:"Application architecture",nodes:["Angular","Spring Boot + WebSocket","MySQL"],detail:"Community · moderation · real-time chat"},
 hybrid:{label:"Hybrid cloud architecture",nodes:["OpenStack Kubernetes","Karmada","Azure AKS"],detail:"Ansible → Heat → kubeadm · Octavia ingress"},
 football:{label:"Prediction pipeline",nodes:["Football datasets","Trained ML models","FastAPI + React"],detail:"Standings · match outcomes · tactics · scouting"},
 memo:{label:"Platform architecture",nodes:["Angular","Spring Boot + FastAPI","PostgreSQL"],detail:"Permission-aware AI · Terraform · Azure AKS"},
 wamia:{label:"Shared application data",nodes:["JavaFX desktop","MySQL","Symfony web"],detail:"Bicycle stations · QR unlocking · rentals"},
 myskills:{label:"Training management",nodes:["React + TypeScript","Laravel","MySQL"],detail:"Registration · approvals · certificates"},
 agent:{label:"Agent workflow",nodes:["Community question","FastAPI + Groq tools","Elif community API"],detail:"Bounded tool calls · retrieved context · answers"},
};
export function ProjectArchitecture({id}:{id:string}) {
 const flow=flows[id];
 return <figure className="architecture"><figcaption>{flow.label}</figcaption><ol>{flow.nodes.map((node,i)=><li key={node}><span className="architecture-node">{node}</span>{i<flow.nodes.length-1&&<span className="architecture-connector" aria-hidden="true">↓</span>}</li>)}</ol><p>{flow.detail}</p></figure>;
}
