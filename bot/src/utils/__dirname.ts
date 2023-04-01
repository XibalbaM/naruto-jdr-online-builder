import { dirname } from 'path';
import { fileURLToPath } from 'url';

const utilsDirname = dirname(fileURLToPath(import.meta.url));
export default utilsDirname.substring(0, utilsDirname.lastIndexOf('\\'));