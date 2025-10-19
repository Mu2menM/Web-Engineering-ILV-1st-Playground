interface Bear {
  name: string;
  binomial: string;
  imageUrl: string;
  range: string;
}

interface WikipediaPage {
  imageinfo?: Array<{ url: string }>;
}

interface WikipediaPages {
  [key: string]: WikipediaPage;
}

interface WikipediaQuery {
  pages?: WikipediaPages;
}

interface WikipediaResponse {
  query?: WikipediaQuery;
  parse?: {
    wikitext: {
      '*': string;
    };
  };
}

export const initializeBearData = async (): Promise<void> => {
  const BASE_URL = 'https://en.wikipedia.org/w/api.php';
  const PAGE_TITLE = 'List_of_ursids';
  const PLACEHOLDER_IMG =
    'https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png';

  const fetchFromWiki = async (params: {
    [key: string]: string;
  }): Promise<WikipediaResponse> => {
    const url = `${BASE_URL}?${new URLSearchParams({ ...params, origin: '*' })}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Wikipedia API request failed: ${response.status}`);
      }
      return (await response.json()) as WikipediaResponse;
    } catch (err) {
      console.error('Error fetching from Wikipedia API:', err);
      throw new Error('Could not fetch data from Wikipedia.');
    }
  };

  const validateImageUrl = async (url: string): Promise<string> => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      if (!response.ok) {
        console.warn(`Image URL invalid: ${url} - Status: ${response.status}`);
        return PLACEHOLDER_IMG;
      }
      console.log(`Image URL validated successfully: ${url}`);
      return url;
    } catch (error) {
      console.warn(`Image validation failed for ${url}:`, error);
      return PLACEHOLDER_IMG;
    }
  };

  console.log('FIXED: Consistent error handling with proper logging');

  const getImageUrl = async (fileName: string | null): Promise<string> => {
    if (!fileName) return PLACEHOLDER_IMG;
    try {
      const data = await fetchFromWiki({
        action: 'query',
        titles: `File:${fileName}`,
        prop: 'imageinfo',
        iiprop: 'url',
        format: 'json',
      });

      const pages = data.query?.pages;
      if (!pages) return PLACEHOLDER_IMG;

      // Type-safe approach
      const pageValues: WikipediaPage[] = Object.values(pages);
      if (pageValues.length === 0) return PLACEHOLDER_IMG;

      const page = pageValues[0];
      const url = page.imageinfo ? page.imageinfo[0].url : PLACEHOLDER_IMG;
      return await validateImageUrl(url);
    } catch (err) {
      console.warn(`Failed to fetch image for ${fileName}:`, err);
      return PLACEHOLDER_IMG;
    }
  };

  const extractBears = async (wikitext: string): Promise<Bear[]> => {
    const rows = wikitext.split('{{Species table/row');
    const bears: Bear[] = [];

    for (const row of rows) {
      const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
      const binomialMatch = row.match(/\|binomial=(.*?)\n/);
      const imageMatch = row.match(/\|image=(.*?)\n/);
      const rangeMatch = row.match(/\|range=(.*?)\n/);

      if (nameMatch?.[1] && binomialMatch?.[1]) {
        const fileName = imageMatch?.[1]
          ? imageMatch[1].trim().replace('File:', '')
          : null;
        const range = rangeMatch?.[1]
          ? rangeMatch[1].split('|')[0].trim()
          : 'Unknown';

        bears.push({
          name: nameMatch[1],
          binomial: binomialMatch[1].trim(),
          imageUrl: await getImageUrl(fileName),
          range,
        });
      }
    }
    return bears;
  };

  const renderBears = (bears: Bear[]): void => {
    const container = document.querySelector<HTMLDivElement>(
      '.more_bears .bear-list'
    );
    if (!container) return;

    if (!bears.length) {
      container.innerHTML = '<p style="color:red;">No bear data found.</p>';
      return;
    }

    container.innerHTML = bears
      .map(
        (bear) => `
        <div class="bear">
          <img src="${bear.imageUrl}" alt="Image of ${bear.name}" style="width:200px; height:auto;">
          <p><b>${bear.name}</b> (${bear.binomial})</p>
          <p>Range: ${bear.range}</p>
        </div>`
      )
      .join('');
  };

  try {
    const data = await fetchFromWiki({
      action: 'parse',
      page: PAGE_TITLE,
      prop: 'wikitext',
      format: 'json',
    });

    if (!data.parse?.wikitext?.['*']) {
      throw new Error('No wikitext found in response');
    }

    const bears = await extractBears(data.parse.wikitext['*']);
    renderBears(bears);
  } catch (error) {
    console.error('Error loading bear data:', error);
    const container = document.querySelector<HTMLDivElement>(
      '.more_bears .bear-list'
    );
    if (container) {
      container.innerHTML =
        '<p style="color:red;"> Failed to load bear data. Please try again later.</p>';
    }
  }
};
