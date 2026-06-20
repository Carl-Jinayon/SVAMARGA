import fs from 'fs';

const scenarios = fs.readFileSync('curriculum enchance/REAL_WORLD_SCENARIOS.md', 'utf8');
const implementation = fs.readFileSync('curriculum enchance/IMPLEMENTATION_GUIDE.md', 'utf8');

const output = `
export const scenariosMarkdown = ${JSON.stringify(scenarios)};
export const implementationMarkdown = ${JSON.stringify(implementation)};
`;

fs.writeFileSync('src/data/markdownData.ts', output);
console.log('Markdown data generated');
