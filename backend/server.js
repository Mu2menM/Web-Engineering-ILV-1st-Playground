const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// =================================================================
// 1. CONFIGURATION
// =================================================================

const allowedOrigins = [
  'http://localhost:4200', // Angular dev server
  'http://localhost:3000', // For running locally outside container
  'http://localhost'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// =================================================================
// 2. HELPER FUNCTIONS
// =================================================================

const BASE_URL = 'https://en.wikipedia.org/w/api.php';
const PLACEHOLDER_IMG = 'https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png';

const HEADERS = {
  'User-Agent': 'WildlifeWebsiteProject/1.0 (student_project_playground)'
};

const fetchFromWiki = async (params) => {
  const url = `${BASE_URL}?${new URLSearchParams({ ...params, origin: '*' }).toString()}`;

  // 3000ms timeout to prevent hanging forever
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);

  try {
    const response = await fetch(url, {
      headers: HEADERS,
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (response.status === 429) {
      throw new Error('Wikipedia Rate Limit Reached (429)');
    }
    if (!response.ok) {
      throw new Error(`Wikipedia API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

const getImageUrl = async (fileName) => {
  if (!fileName) return PLACEHOLDER_IMG;

  try {
    const data = await fetchFromWiki({
      action: 'query',
      titles: `File:${fileName}`,
      prop: 'imageinfo',
      iiprop: 'url',
      format: 'json',
    });

    const page = Object.values(data.query?.pages || {})[0];
    return page?.imageinfo?.[0]?.url || PLACEHOLDER_IMG;
  } catch (error) {
    console.error(`Error fetching image for ${fileName}:`, error.message);
    return PLACEHOLDER_IMG;
  }
};

// =================================================================
// 3. API ROUTES
// =================================================================

app.get('/api/bears', async (req, res) => {
  try {
    const data = await fetchFromWiki({
      action: 'parse',
      page: 'List_of_ursids',
      prop: 'wikitext',
      format: 'json',
    });

    const wikitext = data.parse?.wikitext?.['*'];
    if (!wikitext) {
      return res.status(500).json({ error: 'No wikitext found' });
    }

    const rows = wikitext.split('{{Species table/row');

    // Process rows to extract data first (Synchronous part)
    const bearPromises = rows.slice(1).map(async (row) => {
      const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
      const binomialMatch = row.match(/\|binomial=(.*?)\n/);
      const imageMatch = row.match(/\|image=(.*?)\n/);
      const rangeMatch = row.match(/\|range=(.*?)\n/);

      if (nameMatch?.[1] && binomialMatch?.[1]) {
        const fileName = imageMatch?.[1]?.trim().replace('File:', '') || null;
        const range = rangeMatch?.[1]?.split('|')[0].trim() || 'Unknown';

        // Fetch image asynchronously
        const imageUrl = await getImageUrl(fileName);

        return {
          name: nameMatch[1],
          binomial: binomialMatch[1].trim(),
          imageUrl,
          range,
        };
      }
      return null;
    });

    // Wait for ALL image fetches to finish in parallel
    const bears = (await Promise.all(bearPromises)).filter(Boolean);

    res.json(bears.slice(0, 8));

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Failed to fetch bears' });
  }
});

// =================================================================
// 4. START SERVER
// =================================================================

app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
