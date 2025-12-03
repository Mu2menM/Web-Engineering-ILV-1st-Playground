import { Injectable } from '@angular/core';
import { Bear } from '../models/bear.model';

interface WikiImageInfoResponse {
  query?: {
    pages?: {
      [key: string]: {
        pageid?: number;
        ns?: number;
        title?: string;
        imageinfo?: Array<{
          url: string;
        }>;
      };
    };
  };
}

interface WikiParseResponse {
  parse?: {
    pageid: number;
    title: string;
    wikitext?: {
      '*': string;
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class BearService {
  private readonly BASE_URL = 'https://en.wikipedia.org/w/api.php';
  private readonly PAGE_TITLE = 'List_of_ursids';
  private readonly PLACEHOLDER_IMG =
    'https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png';

  constructor() {}

  private readonly fetchFromWiki = async <T>(
    params: Record<string, string>
  ): Promise<T> => {
    const url = `${this.BASE_URL}?${new URLSearchParams({ ...params, origin: '*' })}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Wikipedia API error: ${response.status} ${response.statusText}`
      );
    }
    return response.json() as Promise<T>;
  };

  private readonly validateImageUrl = async (url: string): Promise<string> => {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      return res.ok ? url : this.PLACEHOLDER_IMG;
    } catch {
      return this.PLACEHOLDER_IMG;
    }
  };

  private readonly getImageUrl = async (
    fileName: string | null
  ): Promise<string> => {
    if (!fileName) return this.PLACEHOLDER_IMG;

    const data = await this.fetchFromWiki<WikiImageInfoResponse>({
      action: 'query',
      titles: `File:${fileName}`,
      prop: 'imageinfo',
      iiprop: 'url',
      format: 'json',
    });

    const page = Object.values(data.query?.pages || {})[0];
    const url = page?.imageinfo?.[0]?.url;

    return url ? await this.validateImageUrl(url) : this.PLACEHOLDER_IMG;
  };

  async getBears(): Promise<Bear[]> {
    const data = await this.fetchFromWiki<WikiParseResponse>({
      action: 'parse',
      page: this.PAGE_TITLE,
      prop: 'wikitext',
      format: 'json',
    });

    if (!data.parse?.wikitext?.['*']) {
      throw new Error('Wikipedia returned no wikitext — page may have changed');
    }

    const wikitext = data.parse.wikitext['*'];
    const rows = wikitext.split('{{Species table/row');
    const bears: Bear[] = [];

    for (const row of rows.slice(1)) {
      const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
      const binomialMatch = row.match(/\|binomial=(.*?)\n/);
      const imageMatch = row.match(/\|image=(.*?)\n/);
      const rangeMatch = row.match(/\|range=(.*?)\n/);

      if (nameMatch?.[1] && binomialMatch?.[1]) {
        const fileName = imageMatch?.[1]?.trim().replace('File:', '') || null;
        const range = rangeMatch?.[1]?.split('|')[0].trim() || 'Unknown';

        const imageUrl = await this.getImageUrl(fileName);

        bears.push({
          name: nameMatch[1],
          binomial: binomialMatch[1].trim(),
          imageUrl,
          range,
        });
      }
    }

    if (bears.length === 0) {
      throw new Error(
        'No bears found in Wikipedia table — structure may have changed'
      );
    }

    return bears.slice(0, 8);
  }
}
