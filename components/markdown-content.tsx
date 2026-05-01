import Image from "next/image";

type MarkdownToken =
  | { type: "heading"; level: 2 | 3 | 4; text: string }
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "image"; alt: string; src: string }
  | { type: "code"; text: string };

function parseMarkdown(markdown: string) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const tokens: MarkdownToken[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const codeLines: string[] = [];
      index += 1;

      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }

      tokens.push({ type: "code", text: codeLines.join("\n") });
      index += 1;
      continue;
    }

    const imageMatch = line.match(/^!\[(.*?)]\((.*?)\)$/);

    if (imageMatch) {
      tokens.push({
        type: "image",
        alt: imageMatch[1],
        src: imageMatch[2],
      });
      index += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      tokens.push({ type: "heading", level: 2, text: line.slice(3) });
      index += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      tokens.push({ type: "heading", level: 3, text: line.slice(4) });
      index += 1;
      continue;
    }

    if (line.startsWith("#### ")) {
      tokens.push({ type: "heading", level: 4, text: line.slice(5) });
      index += 1;
      continue;
    }

    if (line.startsWith("> ")) {
      const quoteLines = [line.slice(2)];
      index += 1;

      while (index < lines.length && lines[index].trim().startsWith("> ")) {
        quoteLines.push(lines[index].trim().slice(2));
        index += 1;
      }

      tokens.push({ type: "quote", text: quoteLines.join(" ") });
      continue;
    }

    if (/^[-*]\s+/.test(line) || /^\d+\.\s+/.test(line)) {
      const ordered = /^\d+\.\s+/.test(line);
      const items: string[] = [];

      while (index < lines.length) {
        const current = lines[index].trim();
        const match = ordered
          ? current.match(/^\d+\.\s+(.*)$/)
          : current.match(/^[-*]\s+(.*)$/);

        if (!match) {
          break;
        }

        items.push(match[1]);
        index += 1;
      }

      tokens.push({ type: "list", ordered, items });
      continue;
    }

    const paragraphLines = [line];
    index += 1;

    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^(#{2,4}\s|[-*]\s+|\d+\.\s+|>\s|!\[|```)/.test(lines[index].trim())
    ) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }

    tokens.push({ type: "paragraph", text: paragraphLines.join(" ") });
  }

  return tokens;
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*.*?\*\*|\[.*?]\(.*?\))/g).filter(Boolean);

  return parts.map((part, index) => {
    const boldMatch = part.match(/^\*\*(.*?)\*\*$/);
    const linkMatch = part.match(/^\[(.*?)]\((.*?)\)$/);

    if (boldMatch) {
      return <strong key={index}>{boldMatch[1]}</strong>;
    }

    if (linkMatch) {
      const href = linkMatch[2];

      return (
        <a
          key={index}
          href={href}
          className="font-bold !text-maroon underline decoration-maroon/30 underline-offset-4"
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
        >
          {linkMatch[1]}
        </a>
      );
    }

    return <span key={index}>{part}</span>;
  });
}

function slugifyHeading(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function MarkdownContent({ markdown }: { markdown: string }) {
  const tokens = parseMarkdown(markdown);

  if (tokens.length === 0) {
    return (
      <p className="text-lg leading-9 text-ink/72">
        Konten artikel sedang disiapkan. Silakan cek kembali nanti untuk
        inspirasi lengkapnya.
      </p>
    );
  }

  return (
    <>
      {tokens.map((token, index) => {
        const key = `${token.type}-${index}`;

        if (token.type === "heading") {
          const headingId = slugifyHeading(token.text);

          if (token.level === 2) {
            return (
              <h2
                key={key}
                id={headingId}
                className="mt-12 scroll-mt-24 font-serif text-3xl font-bold text-maroon-dark"
              >
                {renderInline(token.text)}
              </h2>
            );
          }

          if (token.level === 3) {
            return (
              <h3
                key={key}
                id={headingId}
                className="mt-9 scroll-mt-24 text-2xl font-black text-maroon-dark"
              >
                {renderInline(token.text)}
              </h3>
            );
          }

          return (
            <h4
              key={key}
              id={headingId}
              className="mt-8 scroll-mt-24 text-xl font-black text-maroon-dark"
            >
              {renderInline(token.text)}
            </h4>
          );
        }

        if (token.type === "quote") {
          return (
            <blockquote
              key={key}
              className="mt-8 border-l-4 border-maroon bg-white/58 px-6 py-5 text-xl font-semibold leading-9 text-maroon-dark"
            >
              {renderInline(token.text)}
            </blockquote>
          );
        }

        if (token.type === "list") {
          const Tag = token.ordered ? "ol" : "ul";

          return (
            <Tag
              key={key}
              className={`mt-5 space-y-3 leading-8 text-ink/72 ${
                token.ordered ? "list-decimal" : "list-disc"
              } pl-6`}
            >
              {token.items.map((item, itemIndex) => (
                <li key={`${key}-${itemIndex}`}>{renderInline(item)}</li>
              ))}
            </Tag>
          );
        }

        if (token.type === "image") {
          return (
            <figure key={key} className="mt-10 overflow-hidden rounded-[1.4rem]">
              <Image
                src={token.src}
                alt={token.alt}
                width={1100}
                height={720}
                className="h-auto w-full object-cover"
              />
            </figure>
          );
        }

        if (token.type === "code") {
          return (
            <pre
              key={key}
              className="mt-6 overflow-x-auto rounded-[1rem] bg-maroon-dark p-5 text-sm leading-7 text-cream"
            >
              <code>{token.text}</code>
            </pre>
          );
        }

        return (
          <p key={key} className="mt-5 text-lg leading-9 text-ink/72">
            {renderInline(token.text)}
          </p>
        );
      })}
    </>
  );
}
