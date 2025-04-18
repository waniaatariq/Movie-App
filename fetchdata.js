require('dotenv').config({ path: '.env.local' }); // Explicitly load .env.local
const fs = require('fs');
const path = require('path');

async function main() {
  const filePath = path.join(__dirname, 'data', 'movies.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(raw);
  const apiKey = process.env.OMDB_API_KEY;

  if (!apiKey) {
    console.error('❌ Missing OMDB_API_KEY in .env.local');
    process.exit(1);
  }

  const fetch = (await import('node-fetch')).default; // Dynamic import

  for (const movie of data.movies) {
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?t=${encodeURIComponent(movie.title)}&apikey=${apiKey}`
      );
      const json = await res.json();
      movie.poster = json.Poster && json.Poster !== 'N/A' ? json.Poster : '';
      console.log(`✅ ${movie.title}: ${movie.poster}`);
    } catch (err) {
      console.warn(`⚠️  ${movie.title} failed: ${err.message}`);
      movie.poster = '';
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log('🎉 Updated data/movies.json with poster URLs!');
}

main();