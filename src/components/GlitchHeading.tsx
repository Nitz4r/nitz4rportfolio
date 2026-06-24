interface GlitchHeadingProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function GlitchHeading({ text, className = "", as: Tag = "h1" }: GlitchHeadingProps) {
  return (
    <Tag
      data-text={text}
      className={`glitch term-glow-strong text-terminal-bright font-bold tracking-tight ${className}`}
    >
      {text}
    </Tag>
  );
}
