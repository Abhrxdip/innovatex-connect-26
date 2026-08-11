import fs from 'fs';

const filePath = 'partners.csv';
if (fs.existsSync(filePath)) {
  fs.unlinkSync(filePath);
  console.log('deleted partners.csv');
}

const url = 'https://partners.piyalic290.workers.dev';

function parseCSVLine(line) {
  const result = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const c = line[i];
    if (c === '"') {
      inQuotes = !inQuotes;
    } else if (c === ',' && !inQuotes) {
      result.push(cur);
      cur = '';
    } else {
      cur += c;
    }
  }
  result.push(cur);
  return result.map((s) => s.replace(/^"|"$/g, '').trim());
}

const response = await fetch(url);
if (!response.ok) {
  throw new Error(`Failed to fetch ${url}: ${response.status}`);
}

const text = await response.text();
const lines = text.trim().split(/\r?\n/);
const headers = parseCSVLine(lines[0]);
const nameIdx = headers.indexOf('Community / Organization Name');
const logoIdx = headers.indexOf('Google Drive Link to Your Community Logo (Publicly Accessible)');
if (nameIdx === -1 || logoIdx === -1) {
  console.error('Header columns not found:', headers);
  process.exit(1);
}

for (let i = 1; i < lines.length; i += 1) {
  const row = parseCSVLine(lines[i]);
  const name = row[nameIdx] || '';
  const logo = row[logoIdx] || '';
  if (name.trim() && logo.trim()) {
    console.log(`${name.trim()} -> ${logo.trim()}`);
  }
}
