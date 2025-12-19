import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const currentFile = fileURLToPath(import.meta.url);
const utilsDir = dirname(currentFile);
const srcDir = dirname(utilsDir);

export function loadABI(abiFileName) {
  const abiPath = join(srcDir, 'abis', abiFileName);
  const contractJson = JSON.parse(readFileSync(abiPath, 'utf8'));
  
  // If the JSON has an 'abi' property (Foundry format), return just the ABI array
  // Otherwise, assume the entire file is the ABI array
  return contractJson.abi || contractJson;
}

