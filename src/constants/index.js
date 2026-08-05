/**
 * Central data for Daniel Paul's portfolio.
 * Skills (Skills section), projects (Works), social links (Navbar/Contact).
 * Edit these arrays to update copy, links, and image paths. Image paths are relative to public/.
 */

export const skillsData = [
  {
    title: "Full-Stack Engineering",
    description:
      "From pixel-perfect React UIs to bulletproof FastAPI backends — I architect and ship production systems end-to-end, with a focus on clean architecture and developer experience.",
    items: [
      {
        title: "Frontend",
        description: "(React 19, TypeScript, Vite, Tailwind CSS, Zustand)",
      },
      {
        title: "Backend",
        description: "(FastAPI, Node.js, Express.js, REST APIs, SSE streaming)",
      },
      {
        title: "Databases",
        description: "(PostgreSQL, Supabase, MongoDB, SQLite, pgvector)",
      },
    ],
  },
  {
    title: "AI / ML Engineering",
    description:
      "Building agentic systems, RAG pipelines, and production LLM applications — not just wrappers around APIs. Real infrastructure, real reasoning, real results.",
    items: [
      {
        title: "Agentic AI",
        description: "(LangGraph, ReAct agents, multi-step tool-call reasoning)",
      },
      {
        title: "RAG & Embeddings",
        description: "(FAISS, pgvector, Sentence Transformers, Ollama, Instructor)",
      },
      {
        title: "Structured Outputs",
        description: "(Pydantic, streaming LLM responses, Instructor/SSE)",
      },
    ],
  },
  {
    title: "DevOps & Infrastructure",
    description:
      "Containerized, CI/CD-ready, cloud-deployed. I ship code that actually runs in production — reliably, securely, and at scale.",
    items: [
      {
        title: "Containerization",
        description: "(Docker, Docker Compose, cloud deployment pipelines)",
      },
      {
        title: "APIs & Protocols",
        description: "(REST, GraphQL, WebSockets, Server-Sent Events)",
      },
      {
        title: "Tooling",
        description: "(Git, GitHub Actions, Vite, Linux, Agile workflows)",
      },
    ],
  },
];

export const projects = [
  {
    title: "ClearNews",
    description: "News Narrative Intelligence Platform",
    tech: "React 19 · TypeScript · FastAPI · LangGraph · pgvector · Docker",
    image: "/assets/projects/clearnews.jpg",
    github: "https://github.com/K1NGS1LVER",
    detail:
      "Multi-stage ML pipeline ingesting live news feeds — embeddings, sentiment analysis, bias classification, and HDBSCAN story clustering. LangGraph ReAct agent with pgvector semantic search and cited-source SSE streaming.",
  },
  {
    title: "FinPath",
    description: "AI Financial Planner",
    tech: "React 19 · TypeScript · FastAPI · LangGraph · Zustand · Supabase",
    image: "/assets/projects/finpath.jpg",
    github: "https://github.com/K1NGS1LVER",
    detail:
      "Full-stack personal finance app with agentic LangGraph backend for multi-step financial reasoning via SSE-streamed LLM tool calls. Interactive Sankey diagrams, animated sidebar, and a token-based design system with light/dark support.",
  },
  {
    title: "docSeek",
    description: "Semantic Search & RAG System",
    tech: "Python · FastAPI · FAISS · Sentence Transformers · React",
    image: "/assets/projects/docseek.jpg",
    github: "https://github.com/K1NGS1LVER",
    detail:
      "Dense vector retrieval engine with FAISS (768-dim), achieving sub-15ms semantic search — a 40% speedup over full-text lookups. Concurrent ingestion pipeline parsing 10,000+ pages in under 5 minutes.",
  },
];

export const socials = [
  {
    name: "GitHub",
    href: "https://github.com/K1NGS1LVER",
    icon: "mdi:github",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/daniel-paul-dev",
    icon: "mdi:linkedin",
  },
  {
    name: "Email",
    href: "mailto:danielpaul150604@gmail.com",
    icon: "mdi:email-outline",
  },
];
