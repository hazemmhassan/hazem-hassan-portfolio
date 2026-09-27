import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import App from "./App";

describe("portfolio homepage", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  test("introduces Hazem personally before presenting the work", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Hazem Hassan/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view selected work/i })).toHaveAttribute(
      "href",
      "#work",
    );
    expect(screen.getByRole("link", { name: /discuss a project/i })).toHaveAttribute(
      "href",
      "mailto:hazemhassan830@gmail.com",
    );
    expect(screen.getByText(/^AI Engineer$/i)).toBeInTheDocument();
    expect(screen.queryByText(/^Generative AI Engineer$/i)).not.toBeInTheDocument();
  });

  test("places About directly after the opening and shows Hazem's portrait", () => {
    const { container } = render(<App />);

    const opening = container.querySelector("main > section:first-child");
    expect(opening).toHaveAttribute("id", "top");
    expect(opening?.nextElementSibling).toHaveAttribute("id", "about");
    const portrait = screen.getByRole("img", { name: /Hazem Hassan/i });
    expect(portrait).toHaveAttribute("src", "/assets/hazem-hassan-portrait.jpeg");
    expect(portrait).toHaveAttribute("width", "1280");
    expect(portrait).toHaveAttribute("height", "1280");
    expect(screen.queryByText(/portrait to be added/i)).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view résumé/i })).toHaveAttribute(
      "href",
      "/Hazem-Hassan-Resume.pdf",
    );
  });

  test("exposes the complete portfolio story without a credentials section", () => {
    const { container } = render(<App />);

    expect(container.querySelectorAll("main > section").length).toBeGreaterThanOrEqual(9);
    expect(screen.getByRole("heading", { name: /problems I help solve/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /technical skills/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^experience$/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /education and training/i })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /certifications and achievements/i })).not.toBeInTheDocument();
  });

  test("places the DEPI program second in the experience timeline", () => {
    render(<App />);

    const experience = screen.getByRole("region", { name: /^experience$/i });
    const entries = within(experience).getAllByRole("article");

    expect(entries).toHaveLength(5);
    expect(entries[0]).toHaveTextContent(/PM Accelerator.*Fit My Day/i);
    expect(entries[1]).toHaveTextContent(/Digital Egypt Pioneers Initiative.*DEPI/i);
    expect(entries[1]).toHaveTextContent(/Agentic AI.*Generative AI System Developer/i);
    expect(screen.getAllByText(/Digital Egypt Pioneers Initiative/i)).toHaveLength(1);
  });

  test("shows client evidence before the technical toolkit", () => {
    const { container } = render(<App />);

    const sectionIds = [...container.querySelectorAll("main > section")].map(
      (section) => section.id,
    );

    expect(sectionIds.indexOf("work")).toBeLessThan(sectionIds.indexOf("skills"));
  });

  test("presents exactly three selected projects with credible evidence", () => {
    render(<App />);

    const work = screen.getByRole("region", { name: /selected work/i });
    const projects = within(work).getAllByRole("article");
    expect(projects).toHaveLength(3);
    expect(within(work).getByText(/220 anonymized resumes/i)).toBeInTheDocument();
    expect(within(work).getAllByText(/read-only SQL/i).length).toBeGreaterThanOrEqual(1);
    expect(within(work).getByText(/0\.802 to 0\.860/i)).toBeInTheDocument();

    for (const project of projects) {
      expect(within(project).getByText(/^Challenge$/i)).toBeInTheDocument();
      expect(within(project).getByText(/^My contribution$/i)).toBeInTheDocument();
      expect(within(project).getByText(/^Evidence$/i)).toBeInTheDocument();
      expect(within(project).getByText(/^Current scope$/i)).toBeInTheDocument();
      expect(within(project).getByRole("link", { name: /view code/i })).toBeInTheDocument();
    }
  });

  test("lists client services and an accessible contact path", () => {
    render(<App />);

    const services = screen.getByRole("region", { name: /^services$/i });
    expect(within(services).getByText(/AI knowledge assistants/i)).toBeInTheDocument();
    expect(within(services).getByText(/AI data assistants/i)).toBeInTheDocument();
    expect(within(services).getByText(/NLP and model evaluation/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /email me/i })).toHaveAttribute(
      "href",
      "mailto:hazemhassan830@gmail.com",
    );
  });

  test("provides an accessible project enquiry form and direct contact fallbacks", () => {
    render(<App />);

    const contact = screen.getByRole("region", { name: /tell me what you want AI to improve/i });
    expect(within(contact).getByLabelText(/^Name$/i)).toBeRequired();
    expect(within(contact).getByLabelText(/^Email$/i)).toBeRequired();
    expect(within(contact).getByLabelText(/What do you need help with/i)).toBeRequired();
    expect(within(contact).getByLabelText(/Project details/i)).toBeRequired();
    expect(within(contact).getByRole("button", { name: /send enquiry/i })).toBeEnabled();
    expect(within(contact).getByRole("link", { name: /email me directly/i })).toHaveAttribute(
      "href",
      "mailto:hazemhassan830@gmail.com",
    );
  });

  test("submits a project enquiry and confirms delivery", async () => {
    vi.stubEnv("VITE_WEB3FORMS_ACCESS_KEY", "test-access-key");
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
    vi.stubGlobal("fetch", fetchMock);
    render(<App />);

    fireEvent.change(screen.getByLabelText(/^Name$/i), { target: { value: "Mona Client" } });
    fireEvent.change(screen.getByLabelText(/^Email$/i), { target: { value: "mona@example.com" } });
    fireEvent.change(screen.getByLabelText(/What do you need help with/i), { target: { value: "AI assistant" } });
    fireEvent.change(screen.getByLabelText(/Project details/i), {
      target: { value: "I need an assistant that can search our internal documents." },
    });
    fireEvent.click(screen.getByRole("button", { name: /send enquiry/i }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const [endpoint, request] = fetchMock.mock.calls[0];
    expect(endpoint).toBe("https://api.web3forms.com/submit");
    expect(request.method).toBe("POST");
    expect(request.body.get("access_key")).toBe("test-access-key");
    expect(request.body.get("subject")).toMatch(/portfolio enquiry/i);
    expect(await screen.findByRole("status")).toHaveTextContent(/message was sent/i);
  });

  test("keeps the direct email option available when form delivery fails", async () => {
    vi.stubEnv("VITE_WEB3FORMS_ACCESS_KEY", "test-access-key");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, json: async () => ({ success: false }) }),
    );
    render(<App />);

    fireEvent.change(screen.getByLabelText(/^Name$/i), { target: { value: "Mona Client" } });
    fireEvent.change(screen.getByLabelText(/^Email$/i), { target: { value: "mona@example.com" } });
    fireEvent.change(screen.getByLabelText(/What do you need help with/i), { target: { value: "Other" } });
    fireEvent.change(screen.getByLabelText(/Project details/i), {
      target: { value: "I would like to discuss a possible AI project with you." },
    });
    fireEvent.click(screen.getByRole("button", { name: /send enquiry/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/could not send/i);
    expect(screen.getByRole("link", { name: /email me directly/i })).toHaveAttribute(
      "href",
      "mailto:hazemhassan830@gmail.com",
    );
  });

  test("reserves space for project images to prevent layout shift", () => {
    render(<App />);

    for (const image of screen.getAllByRole("img")) {
      expect(image).toHaveAttribute("width");
      expect(image).toHaveAttribute("height");
    }
  });

  test("keeps the opening focused by removing aggregate counters and numbered system labels", () => {
    const { container } = render(<App />);

    expect(screen.queryByText(/anonymized resumes searched/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/featured end-to-end systems/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/system\s*\/\s*01/i)).not.toBeInTheDocument();
    expect(container.querySelector(".signal-strip")).not.toBeInTheDocument();
  });

  test("uses working destinations for every contact call to action", () => {
    render(<App />);

    const contactLinks = [
      screen.getByRole("link", { name: /let's talk/i }),
      screen.getByRole("link", { name: /discuss a project/i }),
      screen.getByRole("link", { name: /email me/i }),
    ];

    for (const link of contactLinks) {
      expect(link).toHaveAttribute("href", "mailto:hazemhassan830@gmail.com");
    }

    expect(screen.getByRole("link", { name: /contact on LinkedIn/i })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/hazem-hassan19",
    );
  });

  test("provides mobile navigation that closes after a section is selected", () => {
    const { container } = render(<App />);
    const menu = container.querySelector(".mobile-nav");

    menu.setAttribute("open", "");
    fireEvent.click(within(menu).getByRole("link", { name: /^work$/i, hidden: true }));

    expect(menu).not.toHaveAttribute("open");
  });
});
