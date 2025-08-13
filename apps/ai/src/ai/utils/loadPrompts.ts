import fs from 'fs/promises';
import path from 'path';

// utility function to read the prompts from text file
export async function loadPrompt(filename: string): Promise<string> {
  const filePath = path.join(__dirname, '..', 'prompts', filename);
  const content = await fs.readFile(filePath, 'utf8');
  return content;
}
