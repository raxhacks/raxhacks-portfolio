export interface CharData {
  char: string;
  index: number;
}

export interface WordData {
  word: string;
  chars: CharData[];
}

export interface ProcessedTextResult {
  processedLines: WordData[][];
  totalChars: number;
}

export function processText(text: string): ProcessedTextResult {
  const rawLines = text.split("\n").map((lineRaw) => lineRaw.trim());
  let globalCharIndex = 0;
  const processedLines = rawLines.map((line) => {
    const words = line.split(/\s+/).filter(Boolean);
    return words.map((word) => {
      const chars = word.split("").map((char) => {
        const index = globalCharIndex++;
        return { char, index };
      });
      return { word, chars };
    });
  });
  return { processedLines, totalChars: globalCharIndex };
}
