import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docsPath = path.resolve(__dirname);

const apiDocs = fs
  .readdirSync(docsPath)
  .filter((file) => file.endsWith('.js'))
  .map((file) => path.join(docsPath, file));

export default apiDocs;