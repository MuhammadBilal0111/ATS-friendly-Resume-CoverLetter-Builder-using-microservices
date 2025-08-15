import * as fs from 'fs/promises';

const promptCache: Record<string, string> = {};

export async function loadPrompt(filename: string): Promise<string> {
  if (promptCache[filename]) {
    return promptCache[filename];
  }
  const filePath = `${process.cwd()}/apps/ai/src/ai/prompts/${filename}`;
  try {
    const content = await fs.readFile(filePath, 'utf8');
    promptCache[filename] = content; // Cache for future calls
    return content;
  } catch (err) {
    throw new Error(
      `Failed to load prompt file "${filename}": ${(err as Error).message}`,
    );
  }
}
