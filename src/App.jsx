const projects = [
  {
    id: "talent-search",
    index: "01",
    type: "RAG · Search · Responsible AI",
    title: "RAG-Powered Talent Search",
    description:
      "A privacy-aware search system that helps recruiters find relevant evidence across 220 anonymized resumes without asking an LLM to make the hiring decision.",
    proof: "Hybrid retrieval improved hit rate@3 from 0.500 to 1.000 on an eight-query evaluation set.",
    tags: ["LangChain", "FAISS", "BM25", "Streamlit"],
    href: "https://github.com/hazemmhassan/Elevvo_Internship/tree/main/task-08-rag-talent-search",
    image: "/assets/talent-search-results.png",
    imageAlt: "Talent search interface showing anonymized candidate matches and supporting evidence",
    imageWidth: 1280,
    imageHeight: 720,
  },
  {
    id: "text-to-sql",
    index: "02",
    type: "Agentic AI · Data",
    title: "Autonomous Text-to-SQL Agent",
    description:
      "An inspectable AI data assistant that translates business questions into SQL, corrects database errors, and returns answers backed by the executed query.",
    proof: "SQLGlot validation and read-only SQL execution create two independent safety boundaries.",
    tags: ["LangChain", "Gemini", "SQLGlot", "SQLite"],
    href: "https://github.com/hazemmhassan/Elevvo_Internship/tree/main/task-10-text-to-sql-agent",
    visual: "sql",
  },
  {
    id: "arabic-sentiment",
    index: "03",
    type: "Arabic NLP · Evaluation",
    title: "Arabic Sentiment Classifier",
    description:
      "An end-to-end Arabic NLP pipeline that compares a classical baseline with a fine-tuned AraBERT model and investigates where the model still fails.",
    proof: "Held-out macro F1 improved from 0.802 to 0.860, with detailed error analysis by class and annotation confidence.",
    tags: ["AraBERT", "PyTorch", "Hugging Face", "Gradio"],
    href: "https://github.com/hazemmhassan/arabic-sentiment-classifier",
    image: "/assets/arabic-sentiment-demo.png",
    imageAlt: "Arabic sentiment classifier interface with three-class probability output",
    imageWidth: 1902,
    imageHeight: 846,
  },
];

const services = [
  ["01", "RAG and document search", "Search and question-answering prototypes over private documents, with grounded responses and retrieval evaluation.", ["Hybrid retrieval", "Evidence", "Privacy"]],
  ["02", "AI data assistants", "Guarded workflows that let teams ask questions of structured data while keeping the model's actions visible.", ["Tool use", "SQL", "Guardrails"]],
  ["03", "NLP and model evaluation", "Classification, benchmarking, and error analysis that turns model behavior into measurable evidence.", ["Arabic NLP", "Metrics", "Analysis"]],
  ["04", "AI application backends", "API and data-layer foundations for AI features, from prototype architecture to inspectable system flows.", ["FastAPI", "Supabase", "REST"]],
];

const processSteps = [
  ["01", "Understand", "Clarify the user, data, decision, and constraints."],
  ["02", "Design", "Choose a simple architecture with explicit boundaries."],
  ["03", "Build", "Create the smallest useful end-to-end workflow."],
  ["04", "Evaluate", "Measure behavior, inspect failures, and improve."],
  ["05", "Document", "Make the result understandable and reproducible."],
];

function ArrowIcon() {
  return <svg aria-hidden="true" viewBox="0 0 20 20"><path d="M4 10h11M11 5l5 5-5 5" /></svg>;
}

function ExternalIcon() {
  return <svg aria-hidden="true" viewBox="0 0 20 20"><path d="M7 4h9v9M16 4l-9 9M13 11v5H4V7h5" /></svg>;
}

function BrandMark() {
  return (
    <a className="brand" href="#top" aria-label="Hazem Hassan, back to top">
      <span className="brand-mark">HH</span><span className="brand-name">Hazem Hassan</span>
    </a>
  );
}

function SystemVisual() {
  return (
    <div className="system-visual" aria-label="Diagram showing an evaluated AI system">
      <div className="visual-grid" aria-hidden="true" />
      <div className="system-node node-input"><span>INPUT</span>Documents + data</div>
      <div className="system-node node-retrieve"><span>RETRIEVE</span>Relevant evidence</div>
      <div className="system-core"><span className="core-orbit" /><span className="core-dot" /><strong>AI</strong><small>reason + act</small></div>
      <div className="system-node node-evaluate"><span>EVALUATE</span>Guardrails + metrics</div>
      <div className="system-node node-output"><span>OUTPUT</span>Useful, visible result</div>
      <svg className="system-lines" viewBox="0 0 600 430" aria-hidden="true">
        <path d="M145 92 C230 92, 215 183, 272 190" /><path d="M445 92 C370 92, 387 178, 328 190" />
        <path d="M145 338 C230 338, 218 250, 272 240" /><path d="M445 338 C370 338, 385 252, 328 240" />
      </svg>
    </div>
  );
}

function SqlVisual() {
  return (
    <div className="sql-visual" aria-label="Text-to-SQL system flow illustration">
      <div className="sql-window-bar"><span /><span /><span /><small>INSPECTABLE QUERY FLOW</small></div>
      <div className="sql-content">
        <p className="sql-question">Which countries generated the most revenue?</p>
        <div className="sql-step"><span>01</span><p>Inspect relevant schema</p><b>verified</b></div>
        <div className="sql-code"><span>SELECT</span> BillingCountry,<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SUM(Total) <span>AS</span> revenue<br /><span>FROM</span> Invoice<br /><span>GROUP BY</span> BillingCountry<br /><span>ORDER BY</span> revenue DESC;</div>
        <div className="sql-safety"><span>READ ONLY</span><span>VALIDATED</span><span>AUDITABLE</span></div>
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-visual-column">
        {project.visual === "sql" ? <SqlVisual /> : <div className="project-image-wrap"><img src={project.image} alt={project.imageAlt} width={project.imageWidth} height={project.imageHeight} loading="lazy" /></div>}
      </div>
      <div className="project-copy">
        <div className="project-meta"><span>{project.index}</span><p>{project.type}</p></div>
        <h3>{project.title}</h3><p className="project-description">{project.description}</p>
        <div className="project-proof"><span>VERIFIED SIGNAL</span><p>{project.proof}</p></div>
        <ul className="tag-list" aria-label={`${project.title} technologies`}>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
        <a className="text-link" href={project.href} target="_blank" rel="noreferrer">Explore the project <ExternalIcon /></a>
      </div>
    </article>
  );
}

function SectionHeading({ eyebrow, title, description, id }) {
  return <div className="section-heading"><p className="eyebrow">{eyebrow}</p><div><h2 id={id}>{title}</h2><p>{description}</p></div></div>;
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header"><div className="container header-inner"><BrandMark /><nav aria-label="Primary navigation"><a href="#work">Work</a><a href="#services">Services</a><a href="#about">About</a><a className="nav-cta" href="mailto:hazemhassan830@gmail.com">Let's talk <ArrowIcon /></a></nav></div></header>
      <main id="main-content">
        <section className="hero" id="top"><div className="container hero-grid">
          <div className="hero-copy"><p className="eyebrow hero-eyebrow"><span className="status-dot" /> Generative AI · RAG · Agentic systems</p><h1>AI systems that make your documents and data easier to use.</h1><p className="hero-lede">I build RAG search tools, guarded AI data assistants, and NLP applications with clear evaluation and inspectable results.</p><div className="hero-actions"><a className="button button-primary" href="#work">View selected work <ArrowIcon /></a><a className="button button-secondary" href="mailto:hazemhassan830@gmail.com">Discuss a project</a></div><div className="availability"><span className="avatar-mark">HH</span><p><strong>Available for focused AI projects</strong>Remote · Alexandria, Egypt</p></div></div>
          <SystemVisual />
        </div></section>

        <section className="section" id="work" aria-label="Selected work"><div className="container"><SectionHeading eyebrow="Selected work" title="Systems built around real constraints." description="Three projects showing how I retrieve evidence, constrain model behavior, evaluate results, and turn technical workflows into usable applications." id="work-title" /><div className="project-list">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div></div></section>

        <section className="section services-section" id="services" aria-labelledby="services-title"><div className="container"><SectionHeading eyebrow="What I can build" title="Services" description="Practical AI work, clearly scoped for teams exploring how language models and machine learning can make their information easier to search, understand, and act on." id="services-title" /><div className="service-grid">{services.map(([number, title, description, tags]) => <article className="service-card" key={number}><span className="service-number">{number}</span><h3>{title}</h3><p>{description}</p><ul className="service-tags">{tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></article>)}</div></div></section>

        <section className="section process-section" aria-labelledby="process-title"><div className="container"><SectionHeading eyebrow="How I work" title="Make the system understandable." description="A practical workflow that keeps the problem, engineering decisions, and evidence visible from start to finish." id="process-title" /><ol className="process-list">{processSteps.map(([number, title, description]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></li>)}</ol></div></section>

        <section className="section about-section" id="about" aria-labelledby="about-title"><div className="container about-grid"><div><p className="eyebrow">About</p><h2 id="about-title">Engineering AI beyond the demo.</h2></div><div className="about-copy"><p className="about-lede">I’m Hazem Hassan, a Generative AI Engineer focused on RAG, agentic workflows, NLP, and the backend systems that make AI applications useful and inspectable.</p><p>My work combines model development with evaluation, guardrails, and clear system boundaries. I care about understanding why a result works, where it can fail, and how another person can verify it.</p><div className="experience-grid" aria-label="Selected experience"><div><span>Current</span><strong>Backend Engineer & Data Science Lead</strong><p>PM Accelerator · Fit My Day</p></div><div><span>Training</span><strong>Agentic AI & Generative AI</strong><p>Digital Egypt Pioneers Initiative</p></div><div><span>Previous</span><strong>NLP & Generative AI Internships</strong><p>Elevvo · NeuralSeek</p></div><div><span>Foundation</span><strong>Computer & Communications Engineering</strong><p>Alexandria University · Expected 2027</p></div></div><div className="about-links"><a className="text-link" href="/Hazem-Hassan-Resume.pdf" target="_blank" rel="noreferrer">Download résumé <ExternalIcon /></a><a className="text-link" href="https://github.com/hazemmhassan" target="_blank" rel="noreferrer">GitHub <ExternalIcon /></a><a className="text-link" href="https://www.linkedin.com/in/hazem-hassan19" target="_blank" rel="noreferrer">LinkedIn <ExternalIcon /></a></div></div></div></section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="container contact-grid"><div><p className="eyebrow eyebrow-light">Have a project in mind?</p><h2 id="contact-title">Tell me what you want your documents or data to do.</h2></div><div className="contact-actions"><p>Share the problem, the available data, and what a useful result would look like. I’ll help turn it into a clear technical scope.</p><a className="button button-light" href="mailto:hazemhassan830@gmail.com">Email me <ArrowIcon /></a></div></div></section>
      </main>
      <footer><div className="container footer-inner"><BrandMark /><p>Generative AI · RAG · NLP · Backend systems</p><a href="#top">Back to top ↑</a></div></footer>
    </>
  );
}
