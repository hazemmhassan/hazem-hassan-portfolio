import { render, screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import App from "./App";

describe("portfolio homepage", () => {
  test("gives clients a clear value proposition and next action", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /AI systems that make your documents and data easier to use/i,
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
  });

  test("presents exactly three selected projects with credible evidence", () => {
    render(<App />);

    const work = screen.getByRole("region", { name: /selected work/i });
    const projects = within(work).getAllByRole("article");
    expect(projects).toHaveLength(3);
    expect(within(work).getByText(/220 anonymized resumes/i)).toBeInTheDocument();
    expect(within(work).getByText(/read-only SQL/i)).toBeInTheDocument();
    expect(within(work).getByText(/0\.802 to 0\.860/i)).toBeInTheDocument();
  });

  test("lists client services and an accessible contact path", () => {
    render(<App />);

    const services = screen.getByRole("region", { name: /^services$/i });
    expect(within(services).getByText(/RAG and document search/i)).toBeInTheDocument();
    expect(within(services).getByText(/AI data assistants/i)).toBeInTheDocument();
    expect(within(services).getByText(/NLP and model evaluation/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /email me/i })).toHaveAttribute(
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
  });
});
