import { useState } from "react";

const projects = [
  {
    id: "talent-search",
    index: "01",
    type: "RAG · Search · Responsible AI",
    title: "RAG-Powered Talent Search",
    challenge:
      "Recruiters need to find relevant experience quickly without allowing a model to make the hiring decision.",
    contribution:
      "Designed and built a privacy-aware hybrid retrieval workflow over 220 anonymized resumes, with a Streamlit interface that exposes supporting evidence.",
    evidence: "Hybrid retrieval improved hit rate@3 from 0.500 to 1.000 on an eight-query evaluation set.",
    scope: "Decision-support prototype; recruiters must verify the evidence and make the final decision.",
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
    challenge:
      "Teams need to ask business questions of structured data without exposing the database to unsafe model-generated actions.",
    contribution:
      "Built an agent workflow that inspects schema, generates SQL, repairs execution errors, validates queries, and returns answers backed by the executed SQL.",
    evidence: "SQLGlot validation and read-only SQL execution create two independent safety boundaries.",
    scope: "Read-only SQLite prototype built for inspectable analytical queries.",
    tags: ["LangChain", "Gemini", "SQLGlot", "SQLite"],
    href: "https://github.com/hazemmhassan/Elevvo_Internship/tree/main/task-10-text-to-sql-agent",
    visual: "sql",
  },
  {
    id: "arabic-sentiment",
    index: "03",
    type: "Arabic NLP · Evaluation",
    title: "Arabic Sentiment Classifier",
    challenge:
      "Arabic sentiment varies by dialect and context, while aggregate accuracy can hide class-specific weaknesses.",
    contribution:
      "Built and compared a classical baseline and fine-tuned AraBERT pipeline, then added a Gradio interface and error analysis.",
    evidence: "Held-out macro F1 improved from 0.802 to 0.860, with detailed error analysis by class and annotation confidence.",
    scope: "Evaluated on held-out ArSAS data; results do not represent production traffic.",
    tags: ["AraBERT", "PyTorch", "Hugging Face", "Gradio"],
    href: "https://github.com/hazemmhassan/arabic-sentiment-classifier",
    image: "/assets/arabic-sentiment-demo.png",
    imageAlt: "Arabic sentiment classifier interface with three-class probability output",
    imageWidth: 1902,
    imageHeight: 846,
  },
];

const services = [
  ["01", "AI knowledge assistants", "A scoped assistant that searches private documents and returns answers with visible supporting evidence.", ["RAG", "Hybrid search", "Evaluation"]],
  ["02", "AI data assistants", "A guarded assistant that turns business questions into traceable queries and understandable answers.", ["SQL", "Tool use", "Guardrails"]],
  ["03", "NLP and model evaluation", "A measurable NLP prototype with benchmarking, error analysis, and a simple review interface.", ["Classification", "Metrics", "Arabic NLP"]],
  ["04", "AI feature backends & APIs", "Backend foundations that connect models, data, and user-facing applications through clear interfaces.", ["FastAPI", "Supabase", "REST"]],
];

const problems = [
  ["Knowledge is scattered", "Policies, SOPs, reports, and reference documents are useful only when people can find the right answer quickly."],
  ["Routine work repeats", "Searching, copying, checking, and preparing the same information can consume time that should go to higher-value decisions."],
  ["AI output needs evidence", "An answer is more useful when its source, limits, and system actions remain visible to the person reviewing it."],
];

const skillGroups = [
  ["Generative AI & NLP", ["Python", "LangChain", "RAG", "FAISS", "BM25", "Hugging Face Transformers", "Embeddings", "Prompt engineering", "Gemini"]],
  ["Machine Learning & Evaluation", ["PyTorch", "TensorFlow", "scikit-learn", "AI response evaluation", "XGBoost", "LightGBM", "Pandas", "NumPy"]],
  ["Backend & Data", ["FastAPI", "Supabase", "Node.js", "REST APIs", "SQL", "MySQL", "Docker"]],
  ["Interfaces & Visualization", ["Streamlit", "Gradio", "React", "Plotly"]],
];

const experience = [
  ["Aug 2026 - Present", "Backend Engineer & Data Science Lead", "PM Accelerator · Fit My Day", "Leading backend architecture, database-schema design, and system-flow planning for an in-progress workout-planning and recommendation platform."],
  ["Jul 2026 - Present", "Agentic AI & Generative AI System Developer Trainee", "Digital Egypt Pioneers Initiative (DEPI)", "Completing a six-month applied training program covering LLMs, RAG and memory systems, agentic AI, AI application development, deployment, and a capstone project."],
  ["Aug 2026 - Sep 2026", "NLP Engineering Intern", "Elevvo", "Built four NLP projects spanning topic modeling, extractive question answering, privacy-aware RAG, and guarded Text-to-SQL."],
  ["Jul 2026 - Aug 2026", "Generative AI Intern", "NeuralSeek", "Independently built a Generative AI agent that analyzes business challenges and recommends practical solutions."],
  ["Nov 2024 - Jan 2025", "AI Response Evaluator", "Outlier", "Evaluated English and occasional Arabic AI responses against rubrics for accuracy, instruction following, reasoning, and writing quality."],
];

const education = [
  ["Degree", "B.Sc. in Computer & Communications Engineering", "Alexandria University", "Oct 2022 - Expected Jul 2027"],
  ["Completed training", "Data Analytics", "National Telecommunication Institute", "Completed Sep 2025"],
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

function closeMobileMenu(event) {
  event.currentTarget.closest("details")?.removeAttribute("open");
}

function BrandMark() {
  return (
    <a className="brand" href="#top" aria-label="Hazem Hassan, back to top">
      <span className="brand-mark">HH</span><span className="brand-name">Hazem Hassan</span>
    </a>
  );
}

function Portrait() {
  return (
    <div className="portrait-shell">
      <img
        className="portrait-image"
        src="/assets/hazem-hassan-portrait.jpeg"
        alt="Hazem Hassan"
        width="1280"
        height="1280"
        fetchPriority="high"
      />
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
        <h3>{project.title}</h3>
        <dl className="project-details">
          <div><dt>Challenge</dt><dd>{project.challenge}</dd></div>
          <div><dt>My contribution</dt><dd>{project.contribution}</dd></div>
          <div><dt>Evidence</dt><dd>{project.evidence}</dd></div>
          <div><dt>Current scope</dt><dd>{project.scope}</dd></div>
        </dl>
        <ul className="tag-list" aria-label={`${project.title} technologies`}>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
        <a className="text-link" href={project.href} target="_blank" rel="noreferrer">View code <ExternalIcon /></a>
      </div>
    </article>
  );
}

function SectionHeading({ eyebrow, title, description, id }) {
  return <div className="section-heading"><p className="eyebrow">{eyebrow}</p><div><h2 id={id}>{title}</h2><p>{description}</p></div></div>;
}

function ContactForm() {
  const [status, setStatus] = useState({ type: "idle", message: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setStatus({
        type: "error",
        message: "The form is not connected yet. Please email me directly instead.",
      });
      return;
    }

    setStatus({ type: "sending", message: "Sending your enquiry…" });
    const formData = new FormData(form);
    formData.set("access_key", accessKey);
    formData.set("subject", "New portfolio enquiry for Hazem Hassan");
    formData.set("from_name", "Hazem Hassan Portfolio");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error("Form delivery failed");
      }

      form.reset();
      setStatus({
        type: "success",
        message: "Thanks—your message was sent. I’ll reply by email as soon as I can.",
      });
    } catch {
      setStatus({
        type: "error",
        message: "I could not send your message. Please try again or email me directly.",
      });
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="contact-name">Name</label>
        <input id="contact-name" name="name" type="text" autoComplete="name" required />
      </div>
      <div className="form-row">
        <label htmlFor="contact-email">Email</label>
        <input id="contact-email" name="email" type="email" autoComplete="email" spellCheck="false" required />
      </div>
      <div className="form-row">
        <label htmlFor="contact-project-type">What do you need help with?</label>
        <select id="contact-project-type" name="project_type" defaultValue="" required>
          <option value="" disabled>Select a project type</option>
          <option value="AI assistant">AI assistant</option>
          <option value="NLP or model evaluation">NLP or model evaluation</option>
          <option value="AI backend or API">AI backend or API</option>
          <option value="Other">Other / not sure yet</option>
        </select>
      </div>
      <div className="form-row">
        <label htmlFor="contact-message">Project details</label>
        <textarea
          id="contact-message"
          name="message"
          rows="6"
          minLength="20"
          placeholder="Briefly describe the problem, available information, and the result you need."
          required
        />
      </div>
      <div className="bot-field" aria-hidden="true">
        <label htmlFor="contact-botcheck">Leave this field empty</label>
        <input id="contact-botcheck" type="checkbox" name="botcheck" tabIndex="-1" autoComplete="off" />
      </div>
      <p className="form-privacy">Please do not include passwords, API keys, or confidential data.</p>
      <button className="button button-light form-submit" type="submit" disabled={status.type === "sending"}>
        {status.type === "sending" ? "Sending…" : "Send enquiry"} <ArrowIcon />
      </button>
      {status.type !== "idle" && (
        <p
          className={`form-status form-status-${status.type}`}
          role={status.type === "error" ? "alert" : "status"}
          aria-live="polite"
        >
          {status.message}
        </p>
      )}
    </form>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header"><div className="container header-inner"><BrandMark /><nav className="desktop-nav" aria-label="Primary navigation"><a href="#about">About</a><a href="#services">Services</a><a href="#work">Work</a><a href="#experience">Experience</a><a className="nav-cta" href="mailto:hazemhassan830@gmail.com">Let's talk <ArrowIcon /></a></nav><details className="mobile-nav"><summary>Menu</summary><nav aria-label="Mobile navigation"><a href="#about" onClick={closeMobileMenu}>About</a><a href="#services" onClick={closeMobileMenu}>Services</a><a href="#work" onClick={closeMobileMenu}>Work</a><a href="#experience" onClick={closeMobileMenu}>Experience</a><a href="#contact" onClick={closeMobileMenu}>Contact</a></nav></details></div></header>
      <main id="main-content">
        <section className="hero" id="top"><div className="container hero-grid">
          <div className="hero-copy"><p className="eyebrow hero-eyebrow"><span className="status-dot" /> AI Engineer</p><h1>Hazem Hassan</h1><p className="hero-positioning">I design and build practical AI applications that help individuals, startups, and teams reduce repetitive work and use their information more effectively.</p><p className="hero-lede">From AI assistants and NLP systems to evaluation and backend integration, I turn a clearly defined problem into an inspectable end-to-end prototype.</p><div className="hero-actions"><a className="button button-primary" href="#work">View selected work <ArrowIcon /></a><a className="button button-secondary" href="mailto:hazemhassan830@gmail.com">Discuss a project</a></div><div className="availability"><span className="avatar-mark">HH</span><p><strong>Available for remote AI projects</strong>Alexandria, Egypt</p></div></div>
          <Portrait />
        </div></section>

        <section className="section about-intro" id="about" aria-labelledby="about-title"><div className="container story-grid"><div><p className="eyebrow">About me</p><h2 id="about-title">Why practical AI matters to me.</h2></div><div className="story-copy"><p className="about-lede">My interest in AI began with a simple observation: people spend significant time repeating tasks that follow similar steps, while mistakes can still happen when the work becomes tiring or difficult to manage.</p><p>I became interested in how AI could support this work—sometimes by assisting with one small task and sometimes by connecting several steps into a useful system.</p><p>I’m especially motivated by work that helps individuals, startups, and small teams use their documents and data more effectively. I want to build tools that save effort while keeping their results clear, grounded, and reviewable.</p><div className="about-links"><a className="text-link" href="/Hazem-Hassan-Resume.pdf" target="_blank" rel="noreferrer">View résumé <ExternalIcon /></a><a className="text-link" href="https://github.com/hazemmhassan" target="_blank" rel="noreferrer">GitHub <ExternalIcon /></a><a className="text-link" href="https://www.linkedin.com/in/hazem-hassan19" target="_blank" rel="noreferrer">LinkedIn <ExternalIcon /></a></div></div></div></section>

        <section className="section focus-section" id="focus" aria-labelledby="focus-title"><div className="container"><SectionHeading eyebrow="My focus" title="Problems I help solve." description="AI is most useful when it reduces a real burden and leaves people with a result they can understand and review." id="focus-title" /><div className="problem-grid">{problems.map(([title, description]) => <article key={title}><span aria-hidden="true" /><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>

        <section className="section services-section" id="services" aria-labelledby="services-title"><div className="container"><SectionHeading eyebrow="What I can build" title="Services" description="Practical AI work, clearly scoped for teams exploring how language models and machine learning can make their information easier to search, understand, and act on." id="services-title" /><div className="service-grid">{services.map(([number, title, description, tags]) => <article className="service-card" key={number}><span className="service-number">{number}</span><h3>{title}</h3><p>{description}</p><ul className="service-tags">{tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></article>)}</div></div></section>

        <section className="section" id="work" aria-label="Selected work"><div className="container"><SectionHeading eyebrow="Selected work" title="Systems built around real constraints." description="Three projects showing how I retrieve evidence, constrain model behavior, evaluate results, and turn technical workflows into usable applications." id="work-title" /><div className="project-list">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div></div></section>

        <section className="section skills-section" id="skills" aria-labelledby="skills-title"><div className="container"><SectionHeading eyebrow="Toolkit" title="Technical skills" description="Tools I have used across AI, machine learning, evaluation, backend development, data work, and application interfaces." id="skills-title" /><div className="skills-grid">{skillGroups.map(([group, items]) => <article key={group}><h3>{group}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div></div></section>

        <section className="section experience-section" id="experience" aria-labelledby="experience-title"><div className="container"><SectionHeading eyebrow="Professional path" title="Experience" description="Applied roles and training environments where I have worked with backend systems, NLP projects, Generative AI, and model evaluation." id="experience-title" /><div className="timeline">{experience.map(([date, role, organization, description]) => <article key={`${role}-${organization}`}><p>{date}</p><div><h3>{role}</h3><span>{organization}</span></div><p>{description}</p></article>)}</div></div></section>

        <section className="section education-section" id="education" aria-labelledby="education-title"><div className="container"><SectionHeading eyebrow="Foundation" title="Education and training" description="Formal engineering education and completed technical training in data analytics." id="education-title" /><div className="education-grid">{education.map(([type, title, organization, date]) => <article key={title}><span>{type}</span><h3>{title}</h3><p>{organization}</p><small>{date}</small></article>)}</div></div></section>

        <section className="section process-section" id="process" aria-labelledby="process-title"><div className="container"><SectionHeading eyebrow="How I work" title="Make the system understandable." description="A practical workflow that keeps the problem, engineering decisions, and evidence visible from start to finish." id="process-title" /><ol className="process-list">{processSteps.map(([number, title, description]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></li>)}</ol></div></section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="container contact-grid"><div className="contact-intro"><p className="eyebrow eyebrow-light">Have a project in mind?</p><h2 id="contact-title">Tell me what you want AI to improve.</h2><p>Share the process, available information, and the result you need. I’ll help turn the idea into a clear and realistic technical scope.</p><div className="contact-links"><a href="mailto:hazemhassan830@gmail.com">Email me directly <ExternalIcon /></a><a href="https://www.linkedin.com/in/hazem-hassan19" target="_blank" rel="noreferrer" aria-label="Contact on LinkedIn">LinkedIn <ExternalIcon /></a><a href="https://github.com/hazemmhassan" target="_blank" rel="noreferrer">GitHub <ExternalIcon /></a></div></div><ContactForm /></div></section>
      </main>
      <footer><div className="container footer-inner"><BrandMark /><p>Generative AI · RAG · NLP · Backend systems</p><a href="#top">Back to top ↑</a></div></footer>
    </>
  );
}
