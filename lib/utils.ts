import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type Part =
  | { type: "text"; content: string; index: number }
  | { type: "snippet"; content: string; index: number };


export function parseTextWithSnippets(text: string): Part[] {
  if (!text) return [];
  const regex = /```[\s\S]*?```/g;
  const parts: Part[] = [];

  let lastIndex = 0;
  let index = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: "text",
        content: text.slice(lastIndex, match.index),
        index: index++,
      });
    }
    match[0] = match[0].split('```').join('')
    parts.push({
      type: "snippet",
      content: match[0],
      index: index++,
    });

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push({
      type: "text",
      content: text.slice(lastIndex),
      index: index++,
    });
  }

  return parts;
}