/**
 * Central data for Daniel Paul's portfolio.
 * Skills (Skills section), projects (Works), social links (Navbar/Contact).
 * Edit these arrays to update copy, links, and image paths. Image paths are relative to public/.
 */

export const skillsData = [
  {
    title: "Full-Stack Engineering",
    description:
      "From pixel-perfect React UIs to bulletproof FastAPI backends — I architect and ship production systems end-to-end, with a focus on clean architecture, performance, and eval-driven development.",
    items: [
      {
        title: "Languages",
        description: "(Python, TypeScript, JavaScript, SQL, Go, HTML5, CSS3)",
      },
      {
        title: "Frontend",
        description: "(React 19, Vite, Tailwind CSS, Zustand, npm)",
      },
      {
        title: "Backend & Tooling",
        description: "(FastAPI, Node.js, PostgreSQL, Supabase, SQLite, Redis, Docker, Git)",
      },
    ],
  },
  {
    title: "AI / ML & GenAI",
    description:
      "Building agentic systems, RAG pipelines, fine-tuned classifiers, and production LLM applications — not just API wrappers. Real infrastructure, real reasoning, real results.",
    items: [
      {
        title: "Agentic AI & RAG",
        description: "(LangGraph, Corrective RAG, pgvector, FAISS, SQLite FTS5, Ollama)",
      },
      {
        title: "ML & NLP Pipelines",
        description: "(BERT fine-tuning, XGBoost, SHAP, HDBSCAN, UMAP, spaCy, VADER)",
      },
      {
        title: "Audio & Vision",
        description: "(Whisper STT, Kokoro TTS, Tesseract OCR, SSE Streaming)",
      },
    ],
  },
  {
    title: "DevOps & Infrastructure",
    description:
      "Containerized, zero-dependency CLI tooling, and resilient API orchestration running reliably in production environments.",
    items: [
      {
        title: "Containerization",
        description: "(Docker, Docker Compose, Valkey/Redis caching, multi-stage builds)",
      },
      {
        title: "APIs & Protocols",
        description: "(Async FastAPI, REST, Server-Sent Events, WebSockets)",
      },
      {
        title: "Quality & Testing",
        description: "(pytest, E2E test suites, Type-safe Pydantic tool schemas)",
      },
    ],
  },
];

export const projects = [
  {
    title: "ClearNews",
    description: "News Narrative Intelligence Platform",
    tech: "Python · FastAPI · LangGraph · pgvector · BERT · XGBoost · Docker",
    image: "/assets/projects/clearnews-new.jpg",
    github: "https://github.com/K1NGS1LVER/ClearNews",
    detail:
      "Trained a fine-tuned BERT-base political-bias classifier and XGBoost death-risk forecaster with SHAP explanations over 1,000+ GDELT articles daily. LangGraph+Groq agent on hybrid pgvector + SQLite FTS5 (RRF-fused) retrieval with SSE streaming, Whisper STT, Kokoro TTS voice.",
  },
  {
    title: "docSeek",
    description: "Local-First Agentic RAG & Knowledge Platform",
    tech: "LangGraph · FAISS · SQLite FTS5 · Ollama · FastAPI · React",
    image: "/assets/projects/docseek-new.jpg",
    github: "https://github.com/K1NGS1LVER/docSeek-offline-agentic-RAG",
    detail:
      "Architected an on-device Corrective RAG engine with LangGraph + local Ollama (qwen2.5). Fused 768-dim FAISS dense + SQLite FTS5 sparse vectors via RRF for sub-15ms search, AST-aware chunking, 2D force-directed knowledge graph, and Kokoro TTS podcasts.",
  },
  {
    title: "teacher-sab",
    description: "Teaching System for AI Coding Agents",
    tech: "Node.js · npm · Interactive CLI · E2E Testing",
    image: "/assets/projects/teacher-sab.jpg",
    github: "https://github.com/K1NGS1LVER",
    detail:
      "Published an AI-native teaching system to production npm (teacher-sab@0.1.0, zero dependencies) packaging a framework fork into a Node CLI installer covering 10 AI harnesses. Adopts Vercel Labs npx skills add cross-agent convention.",
  },
  {
    title: "mcpium",
    description: "Composio 100-App Buildability Audit",
    tech: "Python · TypeScript AST · Gemini Flash · pytest",
    image: "/assets/projects/mcpium.jpg",
    github: "https://github.com/K1NGS1LVER/mcpium",
    detail:
      "Audited 100 SaaS apps for Composio buildability via three-way triangulation — live Composio catalog (500 toolkits), n8n credential AST (406 integrations), and search-grounded Gemini Flash agent at $0 API cost.",
  },
  {
    title: "neostats_credit_fraud",
    description: "Credit Risk & Regulatory ML Platform",
    tech: "LightGBM · EBM · SHAP · DuckDB · Groq · Docker",
    image: "/assets/projects/neostats.jpg",
    github: "https://github.com/K1NGS1LVER/neostats_credit_fraud",
    detail:
      "Built dual-model credit-risk platform (LightGBM + EBM) cutting Brier score to 0.061 on 10,000 loan records with automated FCRA/ECOA adverse-action notices. Shipped Talk-to-Data DuckDB NL-to-SQL with AST security guardrails & 4-tier LLM fallback.",
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
