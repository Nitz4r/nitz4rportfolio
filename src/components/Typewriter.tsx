import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onDone?: () => void;
  cursor?: boolean;
}

export function Typewriter({ text, speed = 28, delay = 0, className, onDone, cursor = false }: TypewriterProps) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setOut("");
    setDone(false);
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const start = setTimeout(function tick() {
      i++;
      setOut(text.slice(0, i));
      if (i < text.length) {
        timer = setTimeout(tick, speed);
      } else {
        setDone(true);
        onDone?.();
      }
    }, delay);
    return () => {
      clearTimeout(start);
      clearTimeout(timer);
    };
  }, [text, speed, delay, onDone]);

  return (
    <span className={`${className ?? ""} ${cursor && !done ? "term-cursor" : ""}`}>
      {out}
    </span>
  );
}
