import { fetchJson, fetchImageUrl } from './utils.js';

/**
 * loadBears(options)
 * - options.targetSelector: container where bears will be rendered (inside .bears-list)
 * - options.baseUrl: wikipedia api base
 * - options.title: page title to parse
 * - options.placeholderImage: fallback image
 */
export async function loadBears({ targetSelector, baseUrl, title, placeholderImage }) {
    const params = {
        action: "parse",
        page: title,
        prop: "wikitext",
        // no section to ensure complete wikitext for robust parsing
        format: "json",
        origin: "*"
    };

    const url = baseUrl + "?" + new URLSearchParams(params).toString();
    const res = await fetchJson(url);
    const wikitext = res.parse && res.parse.wikitext && res.parse.wikitext['*'];
    if (!wikitext) throw new Error('No wikitext returned');

    // naive but robust: split rows by the species row marker. This mirrors the original approach
    const rowChunks = wikitext.split('{{Species table/row');
    // the first chunk is before the first row; skip it
    const rows = rowChunks.slice(1);

    // build list of entries in order
    const entries = rows.map(row => {
        // pull out simple fields using regex; values may not exist
        const nameMatch = row.match(/\|name=\s*\[\[(.*?)\]\]/);
        const binomialMatch = row.match(/\|binomial=\s*([^\n|}]*)/);
        const imageMatch = row.match(/\|image=\s*(.*?)\n/);

        return {
            name: nameMatch ? nameMatch[1].trim() : null,
            binomial: binomialMatch ? binomialMatch[1].trim() : null,
            imageFile: imageMatch ? imageMatch[1].trim().replace(/^File:/i, '') : null
        };
    }).filter(e => e.name); // filter out rows without a name (defensive)

    // For each entry, obtain image URL (or placeholder)
    const imagePromises = entries.map(async (entry) => {
        if (entry.imageFile) {
            try {
                const imageUrl = await fetchImageUrl(entry.imageFile, baseUrl);
                return { ...entry, image: imageUrl };
            } catch (err) {
                // fallback to placeholder on error
                return { ...entry, image: placeholderImage };
            }
        } else {
            return { ...entry, image: placeholderImage };
        }
    });

    const resolved = await Promise.all(imagePromises);

    // render in original order, no duplicates
    const container = document.querySelector(targetSelector);
    if (!container) return;

    // clear
    container.innerHTML = '';

    resolved.forEach(bear => {
        const el = document.createElement('div');
        el.className = 'bear';
        el.innerHTML = `
      <img src="${bear.image}" alt="${bear.name}" style="width:200px; height:auto;">
      <p><strong>${bear.name}</strong>${bear.binomial ? ` (${bear.binomial})` : ''}</p>
    `;
        container.appendChild(el);
    });

    return resolved;
}
