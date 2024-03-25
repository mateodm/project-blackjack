import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.join(__filename, ".."));


function delay(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
  }
  

export { __filename, __dirname , delay}