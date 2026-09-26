export type Experience = {
  period: string;
  role: string;
  organization: string;
  client: string;
  summary: string;
  highlights: string[];
  technologies: string[];
};

export type Project = {
  name: string;
  kind: string;
  positioning: string;
  description: string;
  details: string[];
  technologies: string[];
  repository?: string;
  demo?: string;
};

export type ArchitecturePattern = {
  id: string;
  title: string;
  description: string;
  stages: { label: string; detail: string }[];
};

export const profile = {
  name: 'Satyajit Senapati',
  role: 'Lead Data & AI Engineer',
  email: 'satyajit.senapati.pro@gmail.com',
  location: 'India',
  resume: './Satyajit-Senapati-Resume.pdf',
  github: 'https://github.com/Satyajit-Senapati',
  linkedin: 'https://www.linkedin.com/in/satyajit-senapati-007/',
};

export const experience: Experience[] = [
  {
    period: 'Oct 2023 — Present',
    role: 'Lead Azure Data & AI Engineer',
    organization: 'Cognizant Technology Solutions',
    client: 'Optum',
    summary: 'Leading Synapse source onboarding, RAG applications, and Elasticsearch search, with Azure delivery automated through Terraform and GitHub Actions.',
    highlights: [
      'Designed Synapse pipelines that ingest from SQL Server, SharePoint Lists, Adobe Analytics, REST APIs, and ADLS.',
      'Built reusable BTS and STG pipeline frameworks to reduce onboarding effort for new data sources.',
      'Developed RAG applications and AI agent workflows, plus Elasticsearch-powered enterprise search.',
      'Automated deployments and Azure infrastructure with GitHub Actions and Terraform; mentored engineers and guided architecture.',
    ],
    technologies: ['Azure Synapse', 'ADLS Gen2', 'PySpark', 'Data Vault 2.0', 'OpenAI APIs', 'Elasticsearch', '.NET', 'Terraform'],
  },
  {
    period: 'Feb 2023 — Sep 2023',
    role: 'Azure Data Engineer',
    organization: 'Microland',
    client: 'Mandai',
    summary: 'Built metadata-driven Databricks workflows and Delta Lake transformations, including full and incremental loads from ADLS.',
    highlights: [
      'Implemented full and incremental ingestion from ADLS into Delta Lake using PySpark and Spark SQL.',
      'Created modular parent–child notebooks and metadata-driven orchestration for Fact and Dimension tables.',
      'Improved workflow performance using parallel execution and parameterized notebooks.',
    ],
    technologies: ['Azure Databricks', 'Azure Data Factory', 'Delta Lake', 'PySpark', 'Spark SQL', 'GitHub Actions'],
  },
  {
    period: 'Aug 2021 — Jan 2023',
    role: 'Azure Databricks Engineer',
    organization: 'TEKsystems Global Services',
    client: 'Spreetail',
    summary: 'Built Raw, Bronze, and Silver lakehouse pipelines and dimensional models across Azure SQL, AWS S3, and ADLS.',
    highlights: [
      'Designed ingestion from Azure SQL, AWS S3, and ADLS into Raw, Bronze, and Silver layers.',
      'Built reusable notebooks, Fact and Dimension models, Synapse worker pipelines, and audit frameworks.',
      'Deployed Synapse and Databricks artifacts through Azure DevOps CI/CD.',
    ],
    technologies: ['Azure Databricks', 'Azure Synapse', 'Azure SQL', 'AWS S3', 'Delta Lake', 'Azure DevOps'],
  },
  {
    period: 'Feb 2017 — Jul 2021',
    role: 'Database, Big Data & Azure Engineering',
    organization: 'Tata Consultancy Services',
    client: 'Ericsson',
    summary: 'Progressed from database administration to Spark ETL, predictive models, and Azure Databricks and Delta Lake pipelines.',
    highlights: [
      'Built large-scale Spark and Python ETL pipelines and curated datasets from AWS S3.',
      'Developed traffic prediction, anomaly detection, and fault management models using Spark and Scikit-learn.',
      'Designed PySpark and Delta Lake transformation pipelines with full and incremental logic.',
    ],
    technologies: ['Apache Spark', 'Python', 'Databricks', 'Delta Lake', 'Oracle', 'SQL Server', 'AWS S3'],
  },
];

// Public demos were supplied by the owner; repository links are shown only for public projects.
export const liveProjects = [
  {
    name: 'InterviewOS',
    kind: 'LEARNING SYSTEM',
    positioning: 'A local-first workspace for technical interview preparation.',
    description: 'Brings structured study guides, question banks, and progress tracking together for data, cloud, AI, and coding topics.',
    details: ['Structured study guides and question banks', 'Browser-local notes, bookmarks, and progress', 'Offline-ready core learning experience'],
    technologies: ['React', 'TypeScript', 'IndexedDB'],
    demo: 'https://interviewos.sattyzone.workers.dev/',
  },
  {
    name: 'NEVRI',
    kind: 'PRODUCTIVITY APPLICATION',
    positioning: 'Notes and productivity across web and Android.',
    description: 'A cross-platform application with Firebase integration and platform-focused design.',
    details: ['Web and Android experiences', 'Firebase integration', 'Platform-focused design'],
    technologies: ['Firebase', 'Web', 'Android'],
    demo: 'https://nevri-notes.web.app/',
  },
] satisfies (Project & { demo: string })[];

export const localProjects = [
  {
    name: 'Orqalis',
    kind: 'ENGINEERING TOOLS',
    positioning: 'Local-first orchestration for engineering workflows.',
    description: 'A provider-neutral orchestrator with durable project memory, evidence-based review, repair loops, and safe Git delivery.',
    details: ['Project-local intelligence and execution history', 'Evidence-based review and repair loops', 'MCP integration and a local Control Center'],
    technologies: ['Multi-agent systems', 'MCP', 'Developer tooling'],
    repository: 'https://github.com/Satyajit-Senapati/Orqalis',
  },
  {
    name: 'PracticeLab',
    kind: 'LOCAL PRACTICE WORKSPACE',
    positioning: 'A local workspace for hands-on Python practice.',
    description: 'Turns a repository of Python problems into a searchable practice app with an in-browser runner and saved progress.',
    details: ['Searchable problem catalog with prompts and reference solutions', 'Solution, test, and input editors with a browser-based Python runner', 'Local drafts, progress tracking, and an Add Problem workflow'],
    technologies: ['Python', 'Pyodide', 'Node.js', 'Browser Workers'],
    repository: 'https://github.com/Satyajit-Senapati/PracticeLab',
  },
] satisfies (Project & { repository: string })[];

export const architecturePatterns: ArchitecturePattern[] = [
  {
    id: 'platform',
    title: 'Cloud Data Platform',
    description: 'A layered path from diverse enterprise sources to trusted analytical data.',
    stages: [
      { label: 'Sources', detail: 'Databases, APIs, files, and business systems provide the raw inputs.' },
      { label: 'Ingestion', detail: 'Parameterized Synapse and Data Factory pipelines move data securely.' },
      { label: 'Lakehouse', detail: 'ADLS and Delta Lake organize raw and curated data into layers.' },
      { label: 'Processing', detail: 'PySpark and SQL apply validation, transformation, and incremental logic.' },
      { label: 'Serving', detail: 'Data Vault and dimensional models support analytics and BI.' },
    ],
  },
  {
    id: 'rag',
    title: 'Retrieval-Augmented AI',
    description: 'Grounding AI responses in enterprise information through search and retrieval.',
    stages: [
      { label: 'Content', detail: 'Enterprise knowledge and documents become the source material.' },
      { label: 'Index', detail: 'Searchable representations make relevant content discoverable.' },
      { label: 'Retrieve', detail: 'Semantic and filtered search select useful context for a request.' },
      { label: 'Generate', detail: 'An LLM uses retrieved context to produce a response.' },
      { label: 'Application', detail: 'A .NET or Blazor interface delivers the experience to users.' },
    ],
  },
  {
    id: 'delivery',
    title: 'Production Delivery',
    description: 'The delivery path that keeps cloud data and AI systems repeatable and secure.',
    stages: [
      { label: 'Design', detail: 'Architecture and data contracts align technical delivery with business needs.' },
      { label: 'Provision', detail: 'Terraform defines Azure services and security infrastructure.' },
      { label: 'Build', detail: 'Reusable pipelines, applications, and notebooks implement the system.' },
      { label: 'Release', detail: 'CI/CD moves artifacts across development, test, and production.' },
      { label: 'Operate', detail: 'Monitoring, audit frameworks, and reviews support reliable operation.' },
    ],
  },
];

export const expertise = [
  { number: '01', title: 'Data Engineering', summary: 'Build reusable ingestion, lakehouse transformations, and dimensional models from diverse enterprise sources.', items: ['Apache Spark', 'PySpark', 'SQL', 'Delta Lake', 'ETL / ELT', 'Data Vault 2.0', 'Dimensional Modeling'] },
  { number: '02', title: 'Azure Data Platform', summary: 'Connect SQL Server, SharePoint, Adobe Analytics, REST APIs, and storage through Azure pipelines.', items: ['Azure Databricks', 'Data Factory', 'Synapse Analytics', 'ADLS Gen2', 'Azure Functions', 'Azure ML'] },
  { number: '03', title: 'AI & Intelligent Search', summary: 'Deliver RAG applications, AI agent workflows, and Elasticsearch-powered enterprise search.', items: ['OpenAI APIs', 'RAG', 'LLM Integration', 'Vector Search', 'Semantic Search', 'Elasticsearch', 'AI Agent Workflows'] },
  { number: '04', title: 'Software & Delivery', summary: 'Turn architecture into applications and repeatable releases with .NET, Terraform, and CI/CD.', items: ['Python', '.NET', 'C#', 'ASP.NET Core', 'Blazor', 'REST APIs', 'Terraform', 'CI/CD'] },
];

export const principles = [
  { title: 'Design for Real Use', description: 'Start with the decision or workflow the system must improve, then shape the architecture around it.' },
  { title: 'Make the Platform Repeatable', description: 'Reusable frameworks, configuration, and automation reduce friction as data sources and teams grow.' },
  { title: 'Build Security into the System', description: 'Network boundaries, secrets, and deployment controls belong in the architecture from the start.' },
];
